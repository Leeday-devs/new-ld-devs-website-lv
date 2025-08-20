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
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-white hover:bg-gray-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center group"
      aria-label="Chat to us now"
    >
      {/* Company Logo */}
      <img 
        src="/lovable-uploads/c05ee520-dfce-4d37-9abd-2ecb7430e4da.png" 
        alt="Company Logo" 
        className="w-10 h-10 object-contain group-hover:animate-bounce"
      />
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-gray-200 animate-ping opacity-20"></div>
      
      {/* Notification badge */}
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
        <span className="text-xs text-white font-bold">1</span>
      </div>
    </button>
  );
};

export default ChatButton;