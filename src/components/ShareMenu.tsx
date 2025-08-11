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
          <DropdownMenuItem asChild>
            <a
              href={links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X (Twitter)"
              className="flex items-center gap-2"
            >
              <Twitter className="h-4 w-4" /> X (Twitter)
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href={links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              className="flex items-center gap-2"
            >
              <Facebook className="h-4 w-4" /> Facebook
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="flex items-center gap-2"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href={links.email}
              aria-label="Share via Email"
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" /> Email
            </a>
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
