import { useEffect, useRef } from "react";

export const StreamViewer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const socket = new WebSocket(`${protocol}://localhost:8080`);

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);

      if (message.offer) {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(message.offer)
        );
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.send(JSON.stringify({ answer }));
      } else if (message.iceCandidate) {
        await peerConnection.addIceCandidate(
          new RTCIceCandidate(message.iceCandidate)
        );
      }
    };

    peerConnection.ontrack = (event) => {
      if (videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return <video ref={videoRef} autoPlay playsInline />;
};
