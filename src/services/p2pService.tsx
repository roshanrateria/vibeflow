import type { PeerConnection, SignalingMessage, ChatMessage, CallState } from '@/types/types';

/**
 * P2P WebRTC Service for Group Communication
 * Handles peer-to-peer connections, chat, and calling functionality
 * In demo mode, simulates P2P connections with local state
 */

class P2PService {
    private peers: Map<string, PeerConnection> = new Map();
    private localUserId: string | null = null;
    private localUserName: string | null = null;
    private messageCallbacks: Array<(message: ChatMessage) => void> = [];
    private callCallbacks: Array<(call: CallState) => void> = [];
    private connectionCallbacks: Array<(peerId: string, state: string) => void> = [];
    private demoMode = true; // Always true for demo

    // ICE servers configuration (STUN servers for NAT traversal)
    private iceServers = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
        ],
    };

    /**
     * Initialize P2P service with user information
     */
    initialize(userId: string, userName: string) {
        this.localUserId = userId;
        this.localUserName = userName;
        console.log(`[P2P] Initialized for user: ${userName} (${userId})`);
    }

    /**
     * Connect to a peer
     */
    async connectToPeer(peerId: string, peerName: string): Promise<void> {
        if (this.demoMode) {
            // Simulate connection in demo mode
            const peer: PeerConnection = {
                peerId,
                peerName,
                connectionState: 'connecting',
            };
            this.peers.set(peerId, peer);

            // Simulate connection success after delay
            setTimeout(() => {
                peer.connectionState = 'connected';
                this.peers.set(peerId, peer);
                this.notifyConnectionChange(peerId, 'connected');
            }, 1000);

            return;
        }

        // Real WebRTC implementation would go here
        try {
            const peerConnection = new RTCPeerConnection(this.iceServers);
            const dataChannel = peerConnection.createDataChannel('chat');

            const peer: PeerConnection = {
                peerId,
                peerName,
                connectionState: 'connecting',
                peerConnection,
                dataChannel,
            };

            this.setupDataChannel(dataChannel, peerId);
            this.setupPeerConnection(peerConnection, peerId);

            this.peers.set(peerId, peer);

            // Create and send offer
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            // In real implementation, send offer through signaling server
            this.sendSignalingMessage({
                type: 'offer',
                from: this.localUserId!,
                to: peerId,
                data: offer,
                timestamp: new Date(),
            });
        } catch (error) {
            console.error('[P2P] Error connecting to peer:', error);
            throw error;
        }
    }

    /**
     * Disconnect from a peer
     */
    disconnectFromPeer(peerId: string) {
        const peer = this.peers.get(peerId);
        if (!peer) return;

        if (peer.peerConnection) {
            peer.peerConnection.close();
        }
        if (peer.dataChannel) {
            peer.dataChannel.close();
        }
        if (peer.localStream) {
            peer.localStream.getTracks().forEach(track => track.stop());
        }
        if (peer.remoteStream) {
            peer.remoteStream.getTracks().forEach(track => track.stop());
        }

        this.peers.delete(peerId);
        this.notifyConnectionChange(peerId, 'disconnected');
    }

    /**
     * Send chat message to peer
     */
    sendMessage(peerId: string, content: string, type: 'text' | 'emoji' | 'location' = 'text'): ChatMessage {
        const message: ChatMessage = {
            id: `msg-${Date.now()}-${Math.random()}`,
            senderId: this.localUserId!,
            senderName: this.localUserName!,
            senderUsername: this.localUserName!,
            content,
            timestamp: new Date(),
            type,
            read: false,
            readBy: [],
            delivered: false,
            deliveredTo: [],
        };

        if (this.demoMode) {
            // In demo mode, simulate message delivery
            setTimeout(() => {
                this.notifyMessage(message);
            }, 100);
            return message;
        }

        const peer = this.peers.get(peerId);
        if (peer?.dataChannel && peer.dataChannel.readyState === 'open') {
            peer.dataChannel.send(JSON.stringify({ type: 'chat', data: message }));
        }

        return message;
    }

    /**
     * Broadcast message to all connected peers
     */
    broadcastMessage(content: string, type: 'text' | 'emoji' | 'location' = 'text'): ChatMessage[] {
        const messages: ChatMessage[] = [];
        this.peers.forEach((_, peerId) => {
            messages.push(this.sendMessage(peerId, content, type));
        });
        return messages;
    }

    /**
     * Initiate audio/video call
     */
    async initiateCall(peerId: string, type: 'audio' | 'video'): Promise<CallState> {
        const call: CallState = {
            id: `call-${Date.now()}`,
            callerId: this.localUserId!,
            callerName: this.localUserName!,
            receiverId: peerId,
            receiverName: this.peers.get(peerId)?.peerName || 'Unknown',
            type,
            status: 'ringing',
            startTime: new Date(),
        };

        if (this.demoMode) {
            // Simulate call in demo mode
            this.notifyCall(call);

            // Simulate call acceptance after 2 seconds
            setTimeout(() => {
                call.status = 'active';
                this.notifyCall(call);
            }, 2000);

            return call;
        }

        try {
            const peer = this.peers.get(peerId);
            if (!peer?.peerConnection) {
                throw new Error('Peer connection not established');
            }

            // Get local media stream
            const constraints = {
                audio: true,
                video: type === 'video',
            };
            const localStream = await navigator.mediaDevices.getUserMedia(constraints);
            peer.localStream = localStream;

            // Add tracks to peer connection
            localStream.getTracks().forEach(track => {
                peer.peerConnection!.addTrack(track, localStream);
            });

            // Send call request through signaling
            this.sendSignalingMessage({
                type: 'call-request',
                from: this.localUserId!,
                to: peerId,
                data: { callId: call.id, type },
                timestamp: new Date(),
            });

            this.notifyCall(call);
            return call;
        } catch (error) {
            console.error('[P2P] Error initiating call:', error);
            call.status = 'ended';
            throw error;
        }
    }

    /**
     * Answer incoming call
     */
    async answerCall(callId: string): Promise<void> {
        // Implementation for answering calls
        console.log('[P2P] Answering call:', callId);
    }

    /**
     * End active call
     */
    endCall(callId: string): void {
        // Implementation for ending calls
        console.log('[P2P] Ending call:', callId);
    }

    /**
     * Get connection state for a peer
     */
    getPeerState(peerId: string): string | null {
        return this.peers.get(peerId)?.connectionState || null;
    }

    /**
     * Get all connected peers
     */
    getConnectedPeers(): PeerConnection[] {
        return Array.from(this.peers.values()).filter(
            peer => peer.connectionState === 'connected'
        );
    }

    /**
     * Register callback for incoming messages
     */
    onMessage(callback: (message: ChatMessage) => void) {
        this.messageCallbacks.push(callback);
    }

    /**
     * Register callback for call events
     */
    onCall(callback: (call: CallState) => void) {
        this.callCallbacks.push(callback);
    }

    /**
     * Register callback for connection state changes
     */
    onConnectionChange(callback: (peerId: string, state: string) => void) {
        this.connectionCallbacks.push(callback);
    }

    // Private helper methods

    private setupDataChannel(dataChannel: RTCDataChannel, peerId: string) {
        dataChannel.onopen = () => {
            console.log('[P2P] Data channel opened with', peerId);
            const peer = this.peers.get(peerId);
            if (peer) {
                peer.connectionState = 'connected';
                this.notifyConnectionChange(peerId, 'connected');
            }
        };

        dataChannel.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'chat') {
                    this.notifyMessage(data.data);
                }
            } catch (error) {
                console.error('[P2P] Error parsing message:', error);
            }
        };

        dataChannel.onerror = (error) => {
            console.error('[P2P] Data channel error:', error);
        };

        dataChannel.onclose = () => {
            console.log('[P2P] Data channel closed with', peerId);
            this.disconnectFromPeer(peerId);
        };
    }

    private setupPeerConnection(peerConnection: RTCPeerConnection, peerId: string) {
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this.sendSignalingMessage({
                    type: 'ice-candidate',
                    from: this.localUserId!,
                    to: peerId,
                    data: event.candidate,
                    timestamp: new Date(),
                });
            }
        };

        peerConnection.ontrack = (event) => {
            const peer = this.peers.get(peerId);
            if (peer) {
                peer.remoteStream = event.streams[0];
            }
        };

        peerConnection.onconnectionstatechange = () => {
            const state = peerConnection.connectionState;
            const peer = this.peers.get(peerId);
            if (peer) {
                peer.connectionState = state as PeerConnection['connectionState'];
                this.notifyConnectionChange(peerId, state);
            }
        };
    }

    private sendSignalingMessage(message: SignalingMessage) {
        // In real implementation, send through signaling server
        console.log('[P2P] Signaling message:', message);
    }

    private notifyMessage(message: ChatMessage) {
        this.messageCallbacks.forEach(callback => callback(message));
    }

    private notifyCall(call: CallState) {
        this.callCallbacks.forEach(callback => callback(call));
    }

    private notifyConnectionChange(peerId: string, state: string) {
        this.connectionCallbacks.forEach(callback => callback(peerId, state));
    }
}

export const p2pService = new P2PService();
