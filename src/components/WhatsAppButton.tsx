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
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-white hover:bg-gray-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center group touch-manipulation"
      aria-label="Chat to us now"
      style={{ minHeight: '48px', minWidth: '48px' }} // Ensure minimum touch target
    >
      {/* Company Logo */}
      <img 
        src="/lovable-uploads/c05ee520-dfce-4d37-9abd-2ecb7430e4da.png" 
        alt="Company Logo" 
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain group-hover:animate-bounce"
      />
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-gray-200 animate-ping opacity-20"></div>
      
      {/* Notification badge */}
      <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
        <span className="text-xs sm:text-sm text-white font-bold">1</span>
      </div>
    </button>
  );
};

export default ChatButton;