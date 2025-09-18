import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Link, 
  Heart,
  MessageSquare,
  ArrowUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StickyShareButtonsProps {
  url: string;
  title: string;
  excerpt?: string;
}

export const StickyShareButtons = ({ url, title, excerpt }: StickyShareButtonsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(42);
  const { toast } = useToast();

  const shareUrl = typeof window !== 'undefined' ? window.location.href : url;
  const shareText = excerpt ? `${title} - ${excerpt}` : title;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  useEffect(() => {
    const toggleVisibility = () => {
      // Show sticky buttons after scrolling 300px
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Article link has been copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hi! I found this interesting article: ${title} - ${shareUrl}`);
    window.open(`https://wa.me/447586266007?text=${message}`, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
      <Card className="p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-orange-200/50 dark:border-white/10 shadow-2xl rounded-2xl">
        <div className="flex flex-col gap-2">
          {/* Like Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`w-12 h-12 p-0 rounded-xl transition-all duration-200 ${
              isLiked 
                ? 'bg-gradient-to-br from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600' 
                : 'hover:bg-gradient-to-br hover:from-red-500/20 hover:to-pink-500/20 hover:text-red-500'
            }`}
            title="Like this article"
          >
            <div className="flex flex-col items-center">
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs font-medium">{likes}</span>
            </div>
          </Button>

          {/* Share Buttons */}
          <div className="h-px bg-border my-1"></div>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="w-12 h-12 p-0 rounded-xl hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-blue-600/20 hover:text-blue-600 transition-all duration-200"
            title="Share on Facebook"
          >
            <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
              <Facebook className="h-4 w-4" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="w-12 h-12 p-0 rounded-xl hover:bg-gradient-to-br hover:from-sky-500/20 hover:to-sky-600/20 hover:text-sky-600 transition-all duration-200"
            title="Share on Twitter"
          >
            <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
              <Twitter className="h-4 w-4" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="w-12 h-12 p-0 rounded-xl hover:bg-gradient-to-br hover:from-blue-600/20 hover:to-blue-700/20 hover:text-blue-700 transition-all duration-200"
            title="Share on LinkedIn"
          >
            <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="w-12 h-12 p-0 rounded-xl hover:bg-gradient-to-br hover:from-green-500/20 hover:to-green-600/20 hover:text-green-600 transition-all duration-200"
            title="Copy link"
          >
            <Link className="h-4 w-4" />
          </Button>

          {/* WhatsApp Contact */}
          <div className="h-px bg-border my-1"></div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleWhatsAppClick}
            className="w-12 h-12 p-0 rounded-xl hover:bg-gradient-to-br hover:from-[#FF7A00]/20 hover:to-[#0D6EFD]/20 hover:text-[#FF7A00] transition-all duration-200"
            title="Contact us about this article"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>

          {/* Scroll to top */}
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="w-12 h-12 p-0 rounded-xl hover:bg-gradient-to-br hover:from-slate-500/20 hover:to-slate-600/20 hover:text-slate-600 transition-all duration-200"
            title="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};