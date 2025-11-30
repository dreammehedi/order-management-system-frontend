
import { getAdminToken } from "@/hooks/handelAdminToken";
import { io } from "socket.io-client";

export const socket = io("https://oms-server.devmehedi.com", {
  auth: {
    token: getAdminToken(),
  },
  transports: ["websocket"], 
});

socket.on("connect", () => {
  console.log("🟢 Socket connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.log("🔴 Socket connect error:", err.message);
});

socket.on("orderUpdate", (data) => {
  console.log("📡 Real-time update received:", data);
  alert("Order Status: " + data.status);
});
