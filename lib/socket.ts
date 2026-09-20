import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') : "https://beauty-ecommerce-mh7p.vercel.app");

export default socket;