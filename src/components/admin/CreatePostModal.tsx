import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save, Upload, X, Image } from "lucide-react";
import ReactQuill from 'react-quill';
import { sanitizeInput, sanitizeHtml } from '@/utils/security';
import 'react-quill/dist/quill.snow.css';

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}


const CreatePostModal = ({ open, onClose, onSuccess }: CreatePostModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    featured_image: "",
    images: [] as string[],
    status: "draft",
    tags: ""
  });

  // Dynamic categories from DB
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('id,name')
        .eq('status', 'active')
        .order('name', { ascending: true });
      if (!error) setCategories(data || []);
    };
    if (open) fetchCategories();
  }, [open]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };


  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file);

      if (error) {
        toast({
          title: "Upload Error",
          description: "Failed to upload image. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const { data: publicUrl } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      // Add to images array
      setFormData(prev => ({ 
        ...prev, 
        images: [...prev.images, publicUrl.publicUrl],
        // Keep featured_image for backward compatibility
        featured_image: prev.images.length === 0 ? publicUrl.publicUrl : prev.featured_image
      }));
      
      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred during upload.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Convert FileList to Array and process each file
    Array.from(files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: `${file.name} is larger than 5MB. Please select a smaller image.`,
          variant: "destructive",
        });
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file.`,
          variant: "destructive",
        });
        return;
      }
      
      handleImageUpload(file);
    });

    // Reset input value to allow selecting the same files again
    e.target.value = '';
  };

  const handleRemoveImage = (index?: number) => {
    if (index !== undefined) {
      // Remove specific image from array
      setFormData(prev => {
        const newImages = prev.images.filter((_, i) => i !== index);
        return {
          ...prev,
          images: newImages,
          featured_image: newImages.length > 0 ? newImages[0] : ""
        };
      });
    } else {
      // Remove all images (legacy support)
      setFormData(prev => ({ ...prev, images: [], featured_image: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      const slug = generateSlug(formData.title);
      const publishedAt = formData.status === 'published' ? new Date().toISOString() : null;
      const selectedCategory = categories.find((c) => c.name === formData.category);

      const { error } = await supabase
        .from('blog_posts')
        .insert({
          title: sanitizeInput(formData.title),
          slug,
          excerpt: formData.excerpt ? sanitizeInput(formData.excerpt) : null,
          content: sanitizeHtml(formData.content),
          category: sanitizeInput(formData.category),
          category_id: selectedCategory?.id || null,
          featured_image: formData.featured_image || null,
          images: formData.images.length > 0 ? formData.images : null,
          status: formData.status,
          author_id: user.id,
          published_at: publishedAt
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Error",
            description: "A post with this title already exists. Please choose a different title.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to create post. Please try again.",
            variant: "destructive",
          });
        }
        return;
      }

      // Reset form
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        featured_image: "",
        images: [],
        status: "draft",
        tags: ""
      });

      toast({
        title: "Success",
        description: `Blog post ${formData.status === 'published' ? 'published' : 'saved as draft'} successfully!`,
      });

      // Send Discord notification
      try {
        await supabase.functions.invoke('send-discord-notification', {
          body: {
            eventType: 'admin_action',
            data: {
              action: 'Blog Post Created',
              adminEmail: user?.email || 'Unknown Admin',
              details: `${formData.status === 'published' ? 'Published' : 'Created draft'}: "${formData.title}"`,
              postTitle: formData.title,
              category: formData.category,
              status: formData.status,
              excerpt: formData.excerpt?.substring(0, 100) + (formData.excerpt && formData.excerpt.length > 100 ? '...' : '')
            }
          }
        });
      } catch (discordError) {
        console.error('Failed to send Discord notification:', discordError);
      }

      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean']
    ],
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border border-border shadow-2xl"
        style={{ zIndex: 10000 }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Create New Blog Post
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Create and publish a new blog post. Fields marked * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value.slice(0, 200) }))}
                  placeholder="Enter post title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-popover">
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.name}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="e.g. react, javascript, web development"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value.slice(0, 500) }))}
                  placeholder="Brief description of the post (recommended: 30-50 words)"
                  rows={4}
                  className="w-full px-3 py-2 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-popover">
                    <SelectItem value="draft">Save as Draft</SelectItem>
                    <SelectItem value="published">Publish Now</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Images {formData.images.length > 0 && `(${formData.images.length})`}</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6">
                  {formData.images.length > 0 ? (
                    <div className="space-y-4">
                      {/* Image Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={image} 
                              alt={`Preview ${index + 1}`} 
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleRemoveImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                            <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                              {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Add More Button */}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        {isUploading ? "Uploading..." : "Add Another Image"}
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="mb-2"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {isUploading ? "Uploading..." : "Upload Images"}
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG up to 5MB each. Multiple images will create a slideshow.
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <div className="border border-input rounded-md overflow-hidden">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                modules={quillModules}
                placeholder="Write your blog post content here..."
                style={{ minHeight: '300px' }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="btn-premium gap-2"
              disabled={isLoading || isUploading}
            >
              <Save className="h-4 w-4" />
              {isLoading ? "Saving..." : formData.status === 'published' ? "Publish Post" : "Save Draft"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;