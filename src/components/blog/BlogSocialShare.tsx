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
    <Card className="p-4 bg-background border border-border/30">
      <div className="flex items-center justify-between gap-3">
        {/* Engagement Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant={isLiked ? "default" : "ghost"}
            size="sm"
            onClick={handleLike}
            className={`h-8 px-2 text-xs ${
              isLiked ? 'bg-red-500 hover:bg-red-600 text-white' : 'hover:bg-muted'
            }`}
          >
            <Heart className={`h-3 w-3 ${isLiked ? 'fill-current' : ''}`} />
            <span className="ml-1">{likes}</span>
          </Button>
          
          <Button
            variant={isSaved ? "default" : "ghost"}
            size="sm"
            onClick={handleSave}
            className={`h-8 px-2 text-xs ${
              isSaved ? 'bg-primary hover:bg-primary/90' : 'hover:bg-muted'
            }`}
          >
            <Bookmark className={`h-3 w-3 ${isSaved ? 'fill-current' : ''}`} />
            <span className="ml-1 hidden sm:inline">Save</span>
          </Button>
        </div>

        {/* Social Share Buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-8 w-8 p-0"
          >
            <a 
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on Facebook"
            >
              <Facebook className="h-3 w-3" />
            </a>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-8 w-8 p-0"
          >
            <a 
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on Twitter"
            >
              <Twitter className="h-3 w-3" />
            </a>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-8 w-8 p-0"
          >
            <a 
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on LinkedIn"
            >
              <Linkedin className="h-3 w-3" />
            </a>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 w-8 p-0"
            title="Copy link"
          >
            <Link className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
};