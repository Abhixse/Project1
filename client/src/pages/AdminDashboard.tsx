import React, { useState, useEffect } from "react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertCircle } from "@/components/ui/alert";
import { LogOut, Plus, Edit2, Trash2, CheckCircle, AlertCircle as AlertIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ContentItem {
  _id: string;
  type: string;
  title: string;
  description?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
}

export default function AdminDashboard() {
  const { admin, logout, token } = useAdminAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activeTab, setActiveTab] = useState("industries");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "industry",
  });

  const contentTypes = [
    { value: "industry", label: "Industries" },
    { value: "material", label: "Packing Materials" },
    { value: "testimonial", label: "Testimonials" },
    { value: "product", label: "Products" },
    { value: "feature", label: "Features" },
  ];

  // Fetch content
  useEffect(() => {
    fetchContent();
  }, [activeTab, token]);

  const fetchContent = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/content?type=${activeTab}`);
      if (!response.ok) throw new Error("Failed to fetch content");
      const data = await response.json();
      setContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch content");
    } finally {
      setLoading(false);
    }
  };

  const handleAddContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          type: activeTab,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create content");
      }

      setSuccessMessage("Content added successfully!");
      setFormData({ title: "", description: "", type: activeTab });
      await fetchContent();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create content");
    }
  };

  const handleUpdateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!editingId) return;

    try {
      const response = await fetch(`/api/content/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          type: activeTab,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update content");
      }

      setSuccessMessage("Content updated successfully!");
      setFormData({ title: "", description: "", type: activeTab });
      setEditingId(null);
      await fetchContent();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update content");
    }
  };

  const handleDeleteContent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content?")) return;

    setError("");

    try {
      const response = await fetch(`/api/content/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete content");
      }

      setSuccessMessage("Content deleted successfully!");
      await fetchContent();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete content");
    }
  };

  const handleEditClick = (item: ContentItem) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      description: item.description || "",
      type: item.type,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", type: activeTab });
    setError("");
  };

  if (!admin) {
    navigate("/admin/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Vezo CMS</h1>
            <p className="text-muted-foreground mt-1">
              Welcome, {admin.username}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              logout();
              navigate("/admin/login");
            }}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {successMessage && (
          <Alert className="mb-6 border-green-600 bg-green-50 dark:bg-green-900/20">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert
            variant="destructive"
            className="mb-6"
          >
            <AlertIcon className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  {editingId ? "Edit" : "Add"}{" "}
                  {contentTypes.find((t) => t.value === activeTab)?.label}
                </CardTitle>
                <CardDescription>
                  {editingId
                    ? "Update the selected item"
                    : "Create new content"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form
                  onSubmit={editingId ? handleUpdateContent : handleAddContent}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title *</label>
                    <Input
                      type="text"
                      placeholder="Enter title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      placeholder="Enter description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded bg-background text-foreground min-h-24 resize-none"
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      type="submit"
                      className="flex-1"
                    >
                      {editingId ? "Update" : "Add"} Content
                    </Button>
                    {editingId && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Content List Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Content List</CardTitle>
              </CardHeader>

              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 lg:grid-cols-5 w-full mb-4">
                    {contentTypes.map((type) => (
                      <TabsTrigger key={type.value} value={type.value}>
                        {type.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {contentTypes.map((type) => (
                    <TabsContent key={type.value} value={type.value}>
                      {loading ? (
                        <div className="text-center py-8 text-muted-foreground">
                          Loading...
                        </div>
                      ) : content.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No {type.label.toLowerCase()} yet. Add one to get
                          started!
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {content.map((item) => (
                            <Card
                              key={item._id}
                              className={`p-4 flex justify-between items-center ${
                                editingId === item._id
                                  ? "ring-2 ring-primary"
                                  : ""
                              }`}
                            >
                              <div className="flex-1">
                                <h3 className="font-semibold text-foreground">
                                  {item.title}
                                </h3>
                                {item.description && (
                                  <p className="text-sm text-muted-foreground line-clamp-1">
                                    {item.description}
                                  </p>
                                )}
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleEditClick(item)}
                                  className="hover:bg-primary/10"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteContent(item._id)}
                                  className="hover:bg-destructive/10 text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
