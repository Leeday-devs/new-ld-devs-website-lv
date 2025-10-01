import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, GripVertical, Save, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  status: string;
  created_at: string;
}

export const KnowledgeHubCategoriesManagement = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [draggedItem, setDraggedItem] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast({
        title: "Error",
        description: "Failed to fetch categories.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || "",
        icon: category.icon || "",
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", description: "", icon: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: "", description: "", icon: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingCategory) {
        // Update existing category
        const { error } = await supabase
          .from("blog_categories")
          .update({
            name: formData.name,
            description: formData.description || null,
            icon: formData.icon || null,
          })
          .eq("id", editingCategory.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Category updated successfully!",
        });
      } else {
        // Create new category
        const maxOrder = Math.max(...categories.map((c) => c.display_order), 0);
        const slug = formData.name
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .trim();
        
        const { error } = await supabase.from("blog_categories").insert({
          name: formData.name,
          slug: slug,
          description: formData.description || null,
          icon: formData.icon || null,
          display_order: maxOrder + 1,
          status: "active",
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Category created successfully!",
        });
      }

      fetchCategories();
      handleCloseModal();
    } catch (error: any) {
      console.error("Error saving category:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save category.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("blog_categories")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Category deleted successfully!",
      });

      fetchCategories();
    } catch (error: any) {
      console.error("Error deleting category:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete category.",
        variant: "destructive",
      });
    }
  };

  const handleDragStart = (category: Category) => {
    setDraggedItem(category);
  };

  const handleDragOver = (e: React.DragEvent, category: Category) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === category.id) return;

    const draggedIndex = categories.findIndex((c) => c.id === draggedItem.id);
    const targetIndex = categories.findIndex((c) => c.id === category.id);

    const newCategories = [...categories];
    newCategories.splice(draggedIndex, 1);
    newCategories.splice(targetIndex, 0, draggedItem);

    setCategories(newCategories);
  };

  const handleDragEnd = async () => {
    if (!draggedItem) return;

    try {
      // Update display_order for all categories
      const updates = categories.map((category, index) => ({
        id: category.id,
        display_order: index + 1,
      }));

      for (const update of updates) {
        await supabase
          .from("blog_categories")
          .update({ display_order: update.display_order })
          .eq("id", update.id);
      }

      toast({
        title: "Success",
        description: "Category order updated!",
      });
    } catch (error) {
      console.error("Error updating order:", error);
      toast({
        title: "Error",
        description: "Failed to update category order.",
        variant: "destructive",
      });
      fetchCategories(); // Revert on error
    } finally {
      setDraggedItem(null);
    }
  };

  const emojiSuggestions = ["💰", "🤖", "📱", "🎨", "⚡", "🔧", "📊", "🌐", "💡", "🚀", "📝", "🎯"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Knowledge Hub Categories</h1>
          <p className="text-muted-foreground mt-1">Manage categories for your Knowledge Hub articles</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="gap-2">
          <Plus className="h-4 w-4" />
          New Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-2">Loading categories...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No categories found. Create your first category!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  draggable
                  onDragStart={() => handleDragStart(category)}
                  onDragOver={(e) => handleDragOver(e, category)}
                  onDragEnd={handleDragEnd}
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-move"
                >
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">{category.icon || "📄"}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold">{category.name}</h3>
                      {category.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground px-2 py-1 bg-background rounded">
                      Order: {category.display_order}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenModal(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="z-[100] max-w-lg" style={{ zIndex: 100 }}>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Create New Category"}
            </DialogTitle>
            <DialogDescription>
              {editingCategory
                ? "Update the category details below."
                : "Fill in the details to create a new category."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Website Costs & Design"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon / Emoji *</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="e.g. 💰"
                required
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {emojiSuggestions.map((emoji) => (
                  <Button
                    key={emoji}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({ ...formData, icon: emoji })}
                    className="h-8 w-8 p-0 text-lg"
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description explaining what guides are in this category"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleCloseModal}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit" className="gap-2">
                <Save className="h-4 w-4" />
                {editingCategory ? "Update" : "Create"} Category
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
