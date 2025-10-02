import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Upload, X, Image, Plus, Minus, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ReactQuill from 'react-quill';
import { sanitizeInput, sanitizeHtml } from '@/utils/security';
import 'react-quill/dist/quill.snow.css';

const CreateBlogPost = () => {
  const navigate = useNavigate();
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
    tags: "",
    meta_title: "",
    meta_description: "",
    focus_keyword: "",
    short_answer: "",
    author_name: "Lee Day",
    featured_image_alt: "",
    faqs: [] as { question: string; answer: string }[],
    related_article_ids: [] as string[]
  });

  const [availablePosts, setAvailablePosts] = useState<{ id: string; title: string }[]>([]);

  // Dynamic categories and posts from DB
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data: cats } = await supabase
        .from('blog_categories')
        .select('id,name')
        .eq('status', 'active')
        .order('name', { ascending: true });
      if (cats) setCategories(cats);

      const { data: posts } = await supabase
        .from('blog_posts')
        .select('id,title')
        .eq('status', 'published')
        .order('created_at', { ascending: false });
      if (posts) setAvailablePosts(posts);
    };
    fetchData();
  }, []);

  // Auto-generate SEO metadata when title or excerpt changes
  useEffect(() => {
    if (formData.title && !formData.meta_title) {
      const autoTitle = formData.title.slice(0, 60);
      setFormData(prev => ({ ...prev, meta_title: autoTitle }));
    }
    if (formData.excerpt && !formData.meta_description) {
      const autoDesc = formData.excerpt.slice(0, 155);
      setFormData(prev => ({ ...prev, meta_description: autoDesc }));
    }
  }, [formData.title, formData.excerpt]);

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

  const addFAQ = () => {
    if (formData.faqs.length < 10) {
      setFormData(prev => ({
        ...prev,
        faqs: [...prev.faqs, { question: "", answer: "" }]
      }));
    }
  };

  const removeFAQ = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => i === index ? { ...faq, [field]: value } : faq)
    }));
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
          published_at: publishedAt,
          meta_title: sanitizeInput(formData.meta_title) || null,
          meta_description: sanitizeInput(formData.meta_description) || null,
          focus_keyword: sanitizeInput(formData.focus_keyword) || null,
          short_answer: sanitizeInput(formData.short_answer) || null,
          author_name: sanitizeInput(formData.author_name),
          featured_image_alt: sanitizeInput(formData.featured_image_alt) || null,
          faqs: formData.faqs.length > 0 ? formData.faqs : null,
          related_article_ids: formData.related_article_ids.length > 0 ? formData.related_article_ids : null
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

      // Send Discord notification
      try {
        await supabase.functions.invoke('send-discord-notification', {
          body: {
            eventType: 'admin_action',
            data: {
              action: 'Knowledge Hub Article Created',
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

      // Automation tasks for published articles
      if (formData.status === 'published') {
        // Generate updated sitemap
        try {
          await supabase.functions.invoke('generate-sitemap');
          console.log('Sitemap generation triggered');
        } catch (err) {
          console.error('Failed to generate sitemap:', err);
        }

        // Get interlinking suggestions (non-blocking)
        try {
          const { data: suggestions } = await supabase.functions.invoke('suggest-interlinking', {
            body: {
              postId: slug,
              title: formData.title,
              category: formData.category,
              focusKeyword: formData.focus_keyword
            }
          });
          console.log('Interlinking suggestions:', suggestions);
        } catch (err) {
          console.error('Failed to get interlinking suggestions:', err);
        }
      }

      toast({
        title: "Success",
        description: `Knowledge Hub article ${formData.status === 'published' ? 'published' : 'saved as draft'} successfully!${formData.status === 'published' ? ' Sitemap updated automatically.' : ''}`,
      });

      // Navigate back to admin panel
      navigate('/admin/panel?tab=blog');
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/admin/panel?tab=blog')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Admin
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Create Knowledge Hub Article</h1>
              <p className="text-muted-foreground mt-1">Create and publish a new Knowledge Hub article. Fields marked * are required.</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
            <div className="space-y-6">
              {/* Basic Info */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Basic Information</h3>
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
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                    placeholder="Author name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value.slice(0, 500) }))}
                    placeholder="Brief description (30-50 words recommended)"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">{formData.excerpt.length}/500</p>
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
              </Card>

              {/* SEO Metadata */}
              <Card className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">SEO Metadata</h3>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    value={formData.meta_title}
                    onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value.slice(0, 60) }))}
                    placeholder="Auto-generated from title"
                  />
                  <p className="text-xs text-muted-foreground">{formData.meta_title.length}/60 chars</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    value={formData.meta_description}
                    onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value.slice(0, 155) }))}
                    placeholder="Auto-generated from excerpt"
                    rows={2}
                  />
                  <p className="text-xs text-muted-foreground">{formData.meta_description.length}/155 chars</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="focus_keyword">Focus Keyword</Label>
                  <Input
                    id="focus_keyword"
                    value={formData.focus_keyword}
                    onChange={(e) => setFormData(prev => ({ ...prev, focus_keyword: e.target.value }))}
                    placeholder="Primary SEO keyword"
                  />
                </div>
              </Card>

              {/* Schema Optimization */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Schema Optimization</h3>
                <div className="space-y-2">
                  <Label htmlFor="short_answer">Short Answer (Answer Box)</Label>
                  <Textarea
                    id="short_answer"
                    value={formData.short_answer}
                    onChange={(e) => setFormData(prev => ({ ...prev, short_answer: e.target.value }))}
                    placeholder="1-2 sentence summary for Google Answer Box"
                    rows={2}
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>FAQs (3-5 recommended)</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addFAQ}
                      disabled={formData.faqs.length >= 10}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add FAQ
                    </Button>
                  </div>
                  {formData.faqs.map((faq, index) => (
                    <Card key={index} className="p-4 space-y-3 bg-muted/30">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">FAQ {index + 1}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFAQ(index)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        value={faq.question}
                        onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                        placeholder="Question"
                      />
                      <Textarea
                        value={faq.answer}
                        onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                        placeholder="Answer"
                        rows={2}
                      />
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Related Articles */}
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Related Articles</h3>
                <div className="space-y-2">
                  <Label>Select Related Posts</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {availablePosts.map((post) => (
                      <label key={post.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.related_article_ids.includes(post.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData(prev => ({
                                ...prev,
                                related_article_ids: [...prev.related_article_ids, post.id]
                              }));
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                related_article_ids: prev.related_article_ids.filter(id => id !== post.id)
                              }));
                            }
                          }}
                          className="rounded border-input"
                        />
                        <span className="text-sm">{post.title}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Images */}
            <div className="space-y-6">
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Featured Image</h3>
                <div className="space-y-2">
                  <Label htmlFor="featured_image_alt">Alt Text for Featured Image</Label>
                  <Input
                    id="featured_image_alt"
                    value={formData.featured_image_alt}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured_image_alt: e.target.value }))}
                    placeholder="Descriptive alt text for accessibility and SEO"
                  />
                </div>
              </Card>

              <Card className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Images {formData.images.length > 0 && `(${formData.images.length})`}</h3>
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
              </Card>
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
                placeholder="Write your Knowledge Hub article content here..."
                style={{ minHeight: '400px' }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/admin/panel?tab=blog')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="btn-premium gap-2"
              disabled={isLoading || isUploading}
            >
              <Save className="h-4 w-4" />
              {isLoading ? "Saving..." : formData.status === 'published' ? "Publish Article" : "Save Draft"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPost;
