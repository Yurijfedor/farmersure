import { useEffect, useRef } from "react";

export const StreamViewer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const socket = new WebSocket(`${protocol}://192.168.0.103:8080`);

    // Логування WebSocket
    socket.onopen = () => {
      console.log("✅ WebSocket підключено");
    };

    socket.onmessage = async (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("📩 Повідомлення від сервера:", message); // Лог повідомлення

        if (message.offer) {
          // Обробка отриманого offer
          console.log("🎥 Отримано offer:", message.offer);
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(message.offer)
          );
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          socket.send(JSON.stringify({ answer }));
        } else if (message.answer) {
          // Обробка отриманого answer
          console.log("🎥 Отримано answer:", message.answer);
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription(message.answer)
          );
        } else if (message.iceCandidate) {
          // Обробка отриманого iceCandidate
          console.log("🧊 Отримано iceCandidate:", message.iceCandidate);
          await peerConnection.addIceCandidate(
            new RTCIceCandidate(message.iceCandidate)
          );
        } else {
          console.warn("⚠️ Невідоме повідомлення:", message);
        }
      } catch (error) {
        console.error(
          "❌ Помилка при парсингу повідомлення від сервера:",
          error
        );
      }
    };

    socket.onerror = (err) => {
      console.error("❌ Помилка WebSocket:", err);
    };

    socket.onclose = () => {
      console.log("⚠️ WebSocket з'єднання закрито");
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
