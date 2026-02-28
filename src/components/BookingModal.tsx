import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { rooms, type Room } from "@/data/mockData";
import { CheckCircle } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  preselectedRoom?: Room;
}

const BookingModal = ({ open, onClose, preselectedRoom }: Props) => {
  const [step, setStep] = useState<"form" | "confirmed">("form");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    roomId: preselectedRoom?.id || "",
    checkIn: "",
    checkOut: "",
    guests: "1",
  });

  const selectedRoom = rooms.find((r) => r.id === form.roomId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.roomId || !form.checkIn || !form.checkOut) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (new Date(form.checkOut) <= new Date(form.checkIn)) {
      toast.error("Check-out must be after check-in");
      return;
    }
    setStep("confirmed");
  };

  const handleClose = () => {
    setStep("form");
    setForm({ name: "", email: "", phone: "", roomId: preselectedRoom?.id || "", checkIn: "", checkOut: "", guests: "1" });
    onClose();
  };

  const nights = form.checkIn && form.checkOut
    ? Math.max(1, Math.ceil((new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / 86400000))
    : 0;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-background">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl text-foreground">Book Your Stay</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-body text-sm">Full Name *</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} className="font-body" />
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-sm">Email *</Label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} className="font-body" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-body text-sm">Phone</Label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} className="font-body" />
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-sm">Room *</Label>
                  <Select value={form.roomId} onValueChange={(v) => setForm({ ...form, roomId: v })}>
                    <SelectTrigger className="font-body"><SelectValue placeholder="Select room" /></SelectTrigger>
                    <SelectContent>
                      {rooms.map((r) => (
                        <SelectItem key={r.id} value={r.id} className="font-body">{r.name} — ${r.price}/night</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-body text-sm">Check-in *</Label>
                  <Input type="date" value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} className="font-body" />
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-sm">Check-out *</Label>
                  <Input type="date" value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} className="font-body" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-body text-sm">Guests</Label>
                <Select value={form.guests} onValueChange={(v) => setForm({ ...form, guests: v })}>
                  <SelectTrigger className="font-body"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((n) => (
                      <SelectItem key={n} value={String(n)} className="font-body">{n} Guest{n > 1 ? "s" : ""}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedRoom && nights > 0 && (
                <div className="bg-card rounded-lg p-4 flex justify-between items-center">
                  <span className="font-body text-sm text-muted-foreground">{nights} night{nights > 1 ? "s" : ""} × ${selectedRoom.price}</span>
                  <span className="font-heading text-xl font-bold text-secondary">${nights * selectedRoom.price}</span>
                </div>
              )}

              <Button variant="gold" size="lg" className="w-full" type="submit">Confirm Booking</Button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-secondary mx-auto mb-4" />
            <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
            <p className="font-body text-muted-foreground mb-2">Thank you, {form.name}!</p>
            <p className="font-body text-sm text-muted-foreground mb-6">
              Your reservation for {selectedRoom?.name} has been confirmed.
              A confirmation email has been sent to {form.email}.
            </p>
            <div className="bg-card rounded-lg p-4 mb-6 text-left space-y-1">
              <p className="font-body text-sm"><strong>Room:</strong> {selectedRoom?.name}</p>
              <p className="font-body text-sm"><strong>Check-in:</strong> {form.checkIn}</p>
              <p className="font-body text-sm"><strong>Check-out:</strong> {form.checkOut}</p>
              <p className="font-body text-sm"><strong>Guests:</strong> {form.guests}</p>
              <p className="font-body text-sm font-bold text-secondary"><strong>Total:</strong> ${nights * (selectedRoom?.price || 0)}</p>
            </div>
            <Button variant="gold" onClick={handleClose}>Done</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
