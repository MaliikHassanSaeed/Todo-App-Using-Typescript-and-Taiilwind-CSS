import Image from "next/image";
import { Inter } from "next/font/google";
import { TodoList } from "@/components/TodoList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <TodoList />;
}
