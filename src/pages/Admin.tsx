import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2, Plus, Trash2, Edit, Check, X } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LazyImage } from "@/components/LazyImage";

export default function Admin() {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      toast.error("Unauthorized access");
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  if (authLoading || !user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your bookings, packages, and content.</p>
          </div>
        </div>

        <Tabs defaultValue="bookings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="contacts">Inquiries</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-4">
            <BookingsTab />
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <ContactsTab />
          </TabsContent>

          <TabsContent value="packages" className="space-y-4">
            <PackagesTab />
          </TabsContent>

          <TabsContent value="gallery" className="space-y-4">
            <GalleryTab />
          </TabsContent>

          <TabsContent value="blog" className="space-y-4">
            <BlogTab />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}

function BookingsTab() {
  // Placeholder for bookings list - using contacts for now as bookings might be stored there or in a separate table
  // Based on schema, there is a 'bookings' table.
  const bookings = useQuery(api.bookingHistory.list, { paginationOpts: { numItems: 20, cursor: null } });

  if (!bookings) return <div>Loading bookings...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
        <CardDescription>View and manage client appointments.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.page.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No bookings found.
                </TableCell>
              </TableRow>
            ) : (
              bookings.page.map((booking: any) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.date} at {booking.time}</TableCell>
                  <TableCell>
                    <div className="font-medium">{booking.name}</div>
                    <div className="text-xs text-muted-foreground">{booking.email}</div>
                  </TableCell>
                  <TableCell>{booking.type}</TableCell>
                  <TableCell>
                    <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function ContactsTab() {
  const contacts = useQuery(api.contacts.list);
  const updateStatus = useMutation(api.contacts.updateStatus);

  const handleStatusUpdate = async (id: any, newStatus: string) => {
    try {
      await updateStatus({ id, status: newStatus });
      toast.success("Status updated");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (!contacts) return <div>Loading inquiries...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inquiries & Leads</CardTitle>
        <CardDescription>Messages from contact forms and ambassador applications.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No inquiries found.
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((contact: any) => (
                <TableRow key={contact._id}>
                  <TableCell>{new Date(contact._creationTime).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-xs text-muted-foreground">{contact.email}</div>
                    <div className="text-xs text-muted-foreground">{contact.phone}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{contact.type}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate" title={contact.message}>
                    {contact.message || "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={contact.status === "new" ? "destructive" : "secondary"}>
                      {contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {contact.status === "new" && (
                      <Button size="sm" variant="ghost" onClick={() => handleStatusUpdate(contact._id, "contacted")}>
                        Mark Contacted
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function PackagesTab() {
  const packages = useQuery(api.packages.list);
  const createPackage = useMutation(api.packages.create);
  const updatePackage = useMutation(api.packages.update);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createPackage({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
        originalPrice: formData.get("originalPrice") ? Number(formData.get("originalPrice")) : undefined,
        sessions: formData.get("sessions") ? Number(formData.get("sessions")) : undefined,
        category: formData.get("category") as string,
        features: (formData.get("features") as string).split(",").map(s => s.trim()),
        isAvailable: true,
      });
      toast.success("Package created");
      setIsCreateOpen(false);
    } catch (error) {
      toast.error("Failed to create package");
    }
  };

  const toggleAvailability = async (pkg: any) => {
    try {
      await updatePackage({ id: pkg._id, isAvailable: !pkg.isAvailable });
      toast.success("Package updated");
    } catch (error) {
      toast.error("Failed to update package");
    }
  };

  if (!packages) return <div>Loading packages...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Package</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Package</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" placeholder="tattoo-removal" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (KSh)</Label>
                  <Input id="price" name="price" type="number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price</Label>
                  <Input id="originalPrice" name="originalPrice" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessions">Sessions</Label>
                  <Input id="sessions" name="sessions" type="number" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="features">Features (comma separated)</Label>
                <Textarea id="features" name="features" placeholder="Feature 1, Feature 2, Feature 3" required />
              </div>
              <DialogFooter>
                <Button type="submit">Create Package</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg._id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{pkg.title}</CardTitle>
                <Switch 
                  checked={pkg.isAvailable} 
                  onCheckedChange={() => toggleAvailability(pkg)}
                />
              </div>
              <CardDescription>{pkg.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">KSh {pkg.price.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pkg.description}</p>
              <div className="text-xs text-muted-foreground">
                {pkg.features.length} features listed
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function GalleryTab() {
  const gallery = useQuery(api.gallery.list);
  const createItem = useMutation(api.gallery.create);
  const removeItem = useMutation(api.gallery.remove);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createItem({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        beforeImageUrl: formData.get("beforeImageUrl") as string,
        afterImageUrl: formData.get("afterImageUrl") as string,
        sessions: Number(formData.get("sessions")),
        category: formData.get("category") as string,
      });
      toast.success("Gallery item added");
      setIsCreateOpen(false);
    } catch (error) {
      toast.error("Failed to add item");
    }
  };

  const handleRemove = async (id: any) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await removeItem({ id });
      toast.success("Item removed");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  if (!gallery) return <div>Loading gallery...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Image</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Gallery Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="beforeImageUrl">Before Image URL</Label>
                  <Input id="beforeImageUrl" name="beforeImageUrl" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="afterImageUrl">After Image URL</Label>
                  <Input id="afterImageUrl" name="afterImageUrl" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessions">Sessions</Label>
                  <Input id="sessions" name="sessions" type="number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" placeholder="Tattoo Removal" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Item</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((item) => (
          <Card key={item._id} className="overflow-hidden">
            <div className="aspect-square relative group">
              <LazyImage
                src={item.afterImageUrl}
                alt={item.title}
                containerClassName="w-full h-full"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="destructive" size="icon" onClick={() => handleRemove(item._id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-3">
              <div className="font-medium truncate">{item.title}</div>
              <div className="text-xs text-muted-foreground">{item.sessions} sessions</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BlogTab() {
  const posts = useQuery(api.blog.list);
  
  if (!posts) return <div>Loading posts...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Blog Posts</h3>
        <Button disabled><Plus className="mr-2 h-4 w-4" /> New Post (Coming Soon)</Button>
      </div>
      
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No blog posts yet.</div>
        ) : (
          posts.map((post) => (
            <Card key={post._id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{new Date(post._creationTime).toLocaleDateString()}</CardDescription>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}