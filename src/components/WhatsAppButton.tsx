const ChatButton = () => {
  const whatsappNumber = "447586266007";
  const message = "Hi! I'm interested in your web development services.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    console.log("Chat button clicked!");
    console.log("Opening:", whatsappUrl);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-orange hover:bg-orange/90 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 px-6 py-4 group"
      aria-label="Chat to us now"
    >
      {/* Company Logo */}
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
        <img 
          src="/lovable-uploads/c05ee520-dfce-4d37-9abd-2ecb7430e4da.png" 
          alt="Company Logo" 
          className="w-6 h-6 object-contain"
        />
      </div>
      
      {/* Text */}
      <span className="text-white font-semibold text-sm whitespace-nowrap group-hover:animate-pulse">
        Chat to us now
      </span>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-orange animate-ping opacity-20"></div>
      
      {/* Notification badge */}
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
        <span className="text-xs text-white font-bold">1</span>
      </div>
    </button>
  );
};

export default ChatButton;