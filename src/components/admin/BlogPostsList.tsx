import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Edit, Trash2, Eye, Calendar, BarChart3 } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  category: string;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  view_count?: number;
}

interface BlogPostsListProps {
  posts: BlogPost[];
  onDelete: (postId: string) => void;
}

const BlogPostsList = ({ posts, onDelete }: BlogPostsListProps) => {
  const navigate = useNavigate();
  const getStatusBadge = (status: string) => {
    const variants = {
      published: "default",
      draft: "secondary", 
      archived: "outline"
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Knowledge Hub articles yet</h3>
        <p className="text-muted-foreground mb-4">
          Create your first Knowledge Hub article to get started.
        </p>
        <Button className="btn-premium">
          Create Your First Article
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id} className="hover:bg-muted/50">
              <TableCell>
                <div>
                  <div className="font-medium text-foreground line-clamp-1">
                    {post.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    /{post.slug}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {post.category}
                </Badge>
              </TableCell>
              <TableCell>
                {getStatusBadge(post.status)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Eye className="h-3 w-3" />
                  {post.view_count || 0}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {post.published_at 
                    ? format(new Date(post.published_at), 'MMM dd, yyyy')
                    : 'Not published'
                  }
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                    className="hover:bg-primary/10 hover:text-primary hover:border-primary"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  {post.status === 'published' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/knowledge-hub/${post.slug}`, '_blank')}
                      className="hover:bg-secondary/10 hover:text-secondary hover:border-secondary"
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(post.id)}
                    className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BlogPostsList;