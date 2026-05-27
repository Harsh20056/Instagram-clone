import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import CreatePostModal from "../posts/CreatePostModal";
import { FiSend } from "react-icons/fi";

const ProtectedLayout = ({ children }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#262626] flex flex-col md:flex-row font-sans antialiased">

      {/* Mobile Header element */}
      <Header />

      {/* Sidebar Area Column Spacer */}
      <div className="hidden md:block w-[72px] shrink-0">
        <Sidebar onCreatePost={() => setShowCreateModal(true)} />
      </div>

      {/* Mobile-only fallback for Sidebar execution layout */}
      <div className="md:hidden">
        <Sidebar onCreatePost={() => setShowCreateModal(true)} />
      </div>

      {/* Main Content Canvas Area */}
      <div className="flex-1 w-full pt-14 md:pt-0 pb-14 md:pb-0 min-h-screen bg-[#fafafa]">
        <main className="w-full h-full max-w-full">
          {children}
        </main>
      </div>

      {/* Floating Messages Pill in Bottom-Right */}
      <div className="fixed bottom-4 right-4 md:bottom-5 md:right-6 z-40 bg-[#1c2126] text-white hover:bg-[#2d3238] transition-all duration-200 shadow-[0_4px_12px_rgba(0,0,0,0.15)] rounded-full px-5 py-3.5 flex items-center gap-3 cursor-pointer">
        <FiSend size={18} className="transform rotate-45 -translate-y-0.5 text-white" />
        <span className="font-semibold text-[14px] tracking-wide">Messages</span>
        <div className="flex items-center ml-1">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=80"
            alt="chat-user-1"
            className="w-6 h-6 rounded-full border-2 border-[#1c2126] object-cover -ml-2 first:ml-0"
          />
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80"
            alt="chat-user-2"
            className="w-6 h-6 rounded-full border-2 border-[#1c2126] object-cover -ml-2"
          />
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&q=80"
            alt="chat-user-3"
            className="w-6 h-6 rounded-full border-2 border-[#1c2126] object-cover -ml-2"
          />
        </div>
      </div>

      {/* Post Creation Overlay */}
      {showCreateModal && (
        <CreatePostModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};

export default ProtectedLayout;