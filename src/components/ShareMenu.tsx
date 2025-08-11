import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Link as LinkIcon,
  MessageCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareMenuProps {
  title: string;
  excerpt?: string;
  url: string;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ title, excerpt, url }) => {
  const { toast } = useToast();

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedExcerpt = encodeURIComponent(excerpt || title);

  const links = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedExcerpt}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedExcerpt}%0A%0A${encodedUrl}`,
  };

  const openShareLink = async (shareUrl: string) => {
    const newWin = window.open(shareUrl, "_blank", "noopener");
    if (!newWin) {
      try {
        await navigator.clipboard.writeText(url);
        toast({ description: "Popup blocked. Link copied to clipboard." });
      } catch {
        toast({ description: "Please allow popups or copy the link manually." });
      }
    }
  };

  const handleDeviceShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, text: excerpt || title, url });
      } else {
        toast({ description: "Device share unavailable. Use other options below." });
      }
    } catch {
      toast({ description: "Sharing canceled or unavailable." });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({ description: "Link copied to clipboard." });
    } catch {
      toast({ description: "Failed to copy link. Please try again." });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-primary/10 hover:text-primary hover:border-primary"
          aria-label="Share this article"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-50 w-56 bg-popover text-popover-foreground border border-border shadow-lg">
        <DropdownMenuLabel>Share this article</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              handleDeviceShare();
            }}
            className="cursor-pointer"
          >
            <Share2 className="h-4 w-4 mr-2" /> Device share
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              openShareLink(links.twitter);
            }}
            className="cursor-pointer"
          >
            <Twitter className="h-4 w-4 mr-2" /> X (Twitter)
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              openShareLink(links.facebook);
            }}
            className="cursor-pointer"
          >
            <Facebook className="h-4 w-4 mr-2" /> Facebook
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              openShareLink(links.linkedin);
            }}
            className="cursor-pointer"
          >
            <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              openShareLink(links.whatsapp);
            }}
            className="cursor-pointer"
          >
            <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              openShareLink(links.email);
            }}
            className="cursor-pointer"
          >
            <Mail className="h-4 w-4 mr-2" /> Email
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              handleCopy();
            }}
            className="cursor-pointer"
          >
            <LinkIcon className="h-4 w-4 mr-2" /> Copy link
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareMenu;
