import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Calendar, Clock, Mail, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function BookingHistory() {
  const [email, setEmail] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [paginationOpts, setPaginationOpts] = useState({ numItems: 10, cursor: null as string | null });
  
  const bookingsResult = useQuery(
    api.bookingHistory.getUserBookings,
    searchEmail ? { email: searchEmail, paginationOpts } : "skip"
  );
  
  const cancelBooking = useMutation(api.timeSlots.cancelBooking);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    setSearchEmail(email);
    setPaginationOpts({ numItems: 10, cursor: null });
  };

  const handleCancel = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    
    try {
      await cancelBooking({ id: bookingId as any });
      toast.success("Booking cancelled successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to cancel booking");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const isUpcoming = (date: string, time: string) => {
    const bookingDateTime = new Date(`${date}T${time}`);
    return bookingDateTime > new Date();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  My Bookings
                </h1>
                <p className="text-lg text-muted-foreground">
                  View and manage your appointments
                </p>
              </div>

              {/* Search Form */}
              <Card className="mb-8 border-2 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Find Your Bookings
                  </CardTitle>
                  <CardDescription>
                    Enter the email address you used when booking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSearch} className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="email" className="sr-only">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12"
                        autoComplete="email"
                      />
                    </div>
                    <Button type="submit" size="lg" className="px-8">
                      Search
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Bookings List */}
              {searchEmail && (
                <div className="space-y-6">
                  {bookingsResult === undefined ? (
                    <div className="text-center py-12">
                      <div className="animate-pulse space-y-4">
                        <div className="h-32 bg-muted rounded-lg"></div>
                        <div className="h-32 bg-muted rounded-lg"></div>
                      </div>
                    </div>
                  ) : bookingsResult.page.length === 0 ? (
                    <Card className="border-2">
                      <CardContent className="pt-12 pb-12 text-center">
                        <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-lg font-semibold mb-2">No bookings found</p>
                        <p className="text-muted-foreground">
                          We couldn't find any bookings for {searchEmail}
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <>
                      {bookingsResult.page.map((booking, index) => (
                        <motion.div
                          key={booking._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="border-2 hover:border-primary transition-colors">
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-xl mb-2">
                                    {booking.name}
                                  </CardTitle>
                                  <div className="flex flex-wrap gap-2">
                                    <Badge className={getStatusColor(booking.status)}>
                                      {booking.status.toUpperCase()}
                                    </Badge>
                                    {isUpcoming(booking.date, booking.time) && booking.status !== "cancelled" && (
                                      <Badge variant="outline">Upcoming</Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  <span>{format(new Date(booking.date), "EEEE, MMMM d, yyyy")}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  <span>{booking.time}</span>
                                </div>
                              </div>

                              {booking.message && (
                                <div className="p-4 bg-muted/50 rounded-lg">
                                  <p className="text-sm text-muted-foreground">{booking.message}</p>
                                </div>
                              )}

                              {booking.status === "confirmed" && isUpcoming(booking.date, booking.time) && (
                                <div className="flex gap-2 pt-2">
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleCancel(booking._id)}
                                  >
                                    Cancel Booking
                                  </Button>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}

                      {/* Pagination Controls */}
                      <div className="flex items-center justify-between pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setPaginationOpts({ numItems: 10, cursor: null })}
                          disabled={paginationOpts.cursor === null}
                        >
                          <ChevronLeft className="h-4 w-4 mr-2" />
                          First Page
                        </Button>

                        <span className="text-sm text-muted-foreground">
                          Showing {bookingsResult.page.length} booking(s)
                        </span>

                        <Button
                          variant="outline"
                          onClick={() => setPaginationOpts({ numItems: 10, cursor: bookingsResult.continueCursor })}
                          disabled={bookingsResult.isDone}
                        >
                          Next Page
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
