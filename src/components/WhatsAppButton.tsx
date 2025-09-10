const ChatButton = () => {
  const whatsappNumber = "447586266007";
  const message = "Hi! I'm interested in your web development services.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 xs:bottom-6 xs:right-6 sm:bottom-6 sm:right-6 z-[9999] 
                 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 
                 bg-white hover:bg-gray-50 rounded-full shadow-2xl hover:shadow-3xl 
                 transition-all duration-300 hover:scale-110 flex items-center justify-center 
                 group touch-manipulation border-2 border-gray-100 animate-bounce
                 active:scale-95" // Added active state for better mobile feedback
      aria-label="Chat to us now - WhatsApp"
      style={{ 
        minHeight: '48px', // Ensure minimum touch target
        minWidth: '48px',
        zIndex: '9999'
      }}
    >
      {/* Company Logo - Mobile Optimized */}
      <img 
        src="/lovable-uploads/c05ee520-dfce-4d37-9abd-2ecb7430e4da.png" 
        alt="LD Development Logo" 
        className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain group-hover:animate-pulse"
      />
      
      {/* Ripple effect - Reduced on mobile */}
      <div className="absolute inset-0 rounded-full bg-orange/15 animate-ping opacity-20 xs:opacity-30"></div>
      
      {/* Notification badge - Mobile Optimized */}
      <div className="absolute -top-0.5 -right-0.5 xs:-top-1 xs:-right-1 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
        <span className="text-[10px] xs:text-xs text-white font-bold">!</span>
      </div>
      
      {/* Tooltip - Hidden on mobile, shown on hover for desktop */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap 
                      pointer-events-none hidden sm:block"> {/* Hidden on mobile */}
        Chat with us now!
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </button>
  );
};

export default ChatButton;