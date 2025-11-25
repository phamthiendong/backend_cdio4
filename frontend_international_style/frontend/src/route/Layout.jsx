import { Outlet } from "react-router-dom";
import Navbar from "@components/Navbar";

export default function Layout(){
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pb-10"><Outlet /></main>
      <footer className="border-t py-6 text-center text-sm text-gray-500">© 2025 Demo UI.</footer>
    </div>
  )
}
