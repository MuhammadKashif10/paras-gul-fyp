import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, LogOut, ShieldCheck, Trash2 } from "lucide-react";
import MotionWrapper from "@/components/animations/MotionWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clearAdminSession, getAdminSession } from "@/lib/admin-auth";
import { deleteBooking, getBookings, updateBookingStatus } from "@/lib/api";
import type { BookingRecord, BookingStatus } from "@/types/bridal";

function getStatusVariant(status: BookingStatus) {
  if (status === "Approved") {
    return "default";
  }

  if (status === "Rejected") {
    return "destructive";
  }

  return "secondary";
}

const Admin = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getBookings();
      setBookings(response);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to load bookings.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleStatusChange = async (bookingId: string, status: BookingStatus) => {
    try {
      setActiveBookingId(bookingId);
      const updatedBooking = await updateBookingStatus(bookingId, status);
      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking._id === updatedBooking._id ? updatedBooking : booking,
        ),
      );
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to update booking status.",
      );
    } finally {
      setActiveBookingId(null);
    }
  };

  const handleDelete = async (bookingId: string) => {
    try {
      setActiveBookingId(bookingId);
      await deleteBooking(bookingId);
      setBookings((currentBookings) =>
        currentBookings.filter((booking) => booking._id !== bookingId),
      );
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to delete booking.",
      );
    } finally {
      setActiveBookingId(null);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="container mx-auto px-4">
        <MotionWrapper className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
                <ShieldCheck className="w-4 h-4" />
                Admin Dashboard
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">
                Booking <span className="text-gradient">Management</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Review user submissions, inspect recommended bridal hairstyles, and update booking status.
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                Signed in as {getAdminSession()?.admin.email}
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={loadBookings} disabled={loading}>
                Refresh Data
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  clearAdminSession();
                  navigate("/admin/login");
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </MotionWrapper>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className="rounded-2xl border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="text-3xl font-display font-bold text-gradient mb-1">
                {bookings.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Bookings</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="text-3xl font-display font-bold text-gradient-gold mb-1">
                {bookings.filter((booking) => booking.status === "Pending").length}
              </div>
              <div className="text-sm text-muted-foreground">Pending Reviews</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="text-3xl font-display font-bold text-gradient mb-1">
                {bookings.filter((booking) => booking.status === "Approved").length}
              </div>
              <div className="text-sm text-muted-foreground">Approved Bookings</div>
            </CardContent>
          </Card>
        </div>

        <MotionWrapper delay={0.1}>
          <Card className="rounded-3xl border-border/50 shadow-card overflow-hidden">
            <CardContent className="p-0">
              {error ? (
                <div className="border-b border-destructive/30 bg-destructive/10 px-6 py-4 text-sm text-destructive-foreground">
                  {error}
                </div>
              ) : null}

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Hair</TableHead>
                    <TableHead>Recommended Hairstyle</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Preview</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground py-10">
                        Loading bookings...
                      </TableCell>
                    </TableRow>
                  ) : bookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground py-10">
                        No bookings have been created yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    bookings.map((booking) => (
                      <TableRow key={booking._id}>
                        <TableCell className="font-medium text-foreground">{booking.name}</TableCell>
                        <TableCell>{booking.eventType}</TableCell>
                        <TableCell>{booking.hairLength}</TableCell>
                        <TableCell>{booking.recommendedHairstyle.name}</TableCell>
                        <TableCell>{booking.recommendedHairstyle.matchScore}%</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(booking.status)}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <motion.a
                            whileHover={{ scale: 1.03 }}
                            href={booking.image}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-border/50 px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            Open
                          </motion.a>
                        </TableCell>
                        <TableCell className="space-y-3">
                          <Select
                            value={booking.status}
                            onValueChange={(value) =>
                              handleStatusChange(booking._id, value as BookingStatus)
                            }
                            disabled={activeBookingId === booking._id}
                          >
                            <SelectTrigger className="min-w-[150px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Approved">Approved</SelectItem>
                              <SelectItem value="Rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(booking._id)}
                            disabled={activeBookingId === booking._id}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </MotionWrapper>
      </div>
    </div>
  );
};

export default Admin;
