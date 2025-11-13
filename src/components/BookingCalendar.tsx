import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface BookingCalendarProps {
  packageId?: string;
  onBookingComplete?: () => void;
}

export default function BookingCalendar({ packageId, onBookingComplete }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const availableSlots = useQuery(
    api.timeSlots.getAvailableSlots,
    selectedDate ? { date: format(selectedDate, "yyyy-MM-dd") } : "skip"
  );

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(""); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 shadow-lg backdrop-blur-xl bg-card/90">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Select Date & Time
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Calendar */}
          <div className="flex justify-center">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
              className="rounded-lg border-2"
            />
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">
                  Available Times for {format(selectedDate, "MMMM d, yyyy")}
                </h3>
                <Badge variant="outline" className="text-xs">
                  Real-time availability
                </Badge>
              </div>

              {availableSlots === undefined ? (
                <div className="text-center py-8">
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-muted rounded w-32 mx-auto"></div>
                    <div className="h-3 bg-muted rounded w-24 mx-auto"></div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {availableSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      type="button"
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      disabled={!slot.available}
                      onClick={() => handleTimeSelect(slot.time)}
                      className={cn(
                        "h-auto py-3 px-2 text-sm font-medium transition-all",
                        !slot.available && "opacity-50 cursor-not-allowed",
                        selectedTime === slot.time && "ring-2 ring-primary ring-offset-2"
                      )}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span>{slot.time}</span>
                        {slot.available ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <XCircle className="h-3 w-3 text-destructive" />
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              )}

              {availableSlots && availableSlots.every(slot => !slot.available) && (
                <div className="text-center py-6 bg-muted/50 rounded-lg">
                  <p className="text-muted-foreground">
                    No available slots for this date. Please select another day.
                  </p>
                </div>
              )}
            </div>
          )}

          {!selectedDate && (
            <div className="text-center py-8 bg-primary/5 rounded-lg border-2 border-primary/20">
              <Clock className="h-12 w-12 text-primary mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">
                Select a date to view available time slots
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedDate && selectedTime && (
        <Card className="border-2 border-primary bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Your Selected Appointment</p>
                <p className="font-bold text-lg">
                  {format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedTime}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
