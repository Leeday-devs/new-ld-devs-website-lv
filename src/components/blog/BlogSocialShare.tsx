import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Link, 
  Heart,
  Bookmark,
  Share2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlogSocialShareProps {
  url: string;
  title: string;
  excerpt?: string;
}

export const BlogSocialShare = ({ url, title, excerpt }: BlogSocialShareProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(42);
  const { toast } = useToast();

  const shareUrl = typeof window !== 'undefined' ? window.location.href : url;
  const shareText = excerpt ? `${title} - ${excerpt}` : title;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

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

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from saved" : "Saved!",
      description: isSaved ? "Article removed from your saved list." : "Article saved for later reading.",
    });
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-background to-muted/30 border-border/50">
      <div className="flex flex-col gap-4">
        {/* Engagement Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={isLiked ? "default" : "outline"}
              size="sm"
              onClick={handleLike}
              className={`transition-all duration-200 ${
                isLiked ? 'bg-red-500 hover:bg-red-600' : ''
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="ml-1 font-medium">{likes}</span>
            </Button>
            
            <Button
              variant={isSaved ? "default" : "outline"}
              size="sm"
              onClick={handleSave}
              className={`transition-all duration-200 ${
                isSaved ? 'bg-primary hover:bg-primary/90' : ''
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              {isSaved ? 'Saved' : 'Save'}
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Share2 className="h-4 w-4" />
            Share article
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 min-w-0"
          >
            <a 
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Facebook className="h-4 w-4" />
              <span className="hidden sm:inline">Facebook</span>
            </a>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 min-w-0"
          >
            <a 
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Twitter className="h-4 w-4" />
              <span className="hidden sm:inline">Twitter</span>
            </a>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 min-w-0"
          >
            <a 
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Linkedin className="h-4 w-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex-1 min-w-0"
          >
            <Link className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Copy</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};