import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import CreatePostModal from "../posts/CreatePostModal";

const ProtectedLayout = ({ children }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#262626] flex flex-col md:flex-row font-sans antialiased">
      
      {/* Mobile Header element */}
      <Header />

      {/* Sidebar Area Column Spacer */}
      <div className="hidden md:block w-64 shrink-0">
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

      {/* Post Creation Overlay */}
      {showCreateModal && (
        <CreatePostModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};

export default ProtectedLayout;