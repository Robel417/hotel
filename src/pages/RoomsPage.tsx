import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Users, Maximize, Wifi, Coffee, Bath, Tv, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { rooms } from "@/data/mockData";
import BookingModal from "@/components/BookingModal";
import type { Room } from "@/data/mockData";

const amenityIcons: Record<string, React.ElementType> = {
  "Wi-Fi": Wifi,
  "Coffee Maker": Coffee,
  "Jacuzzi": Bath,
  "Spa Bath": Bath,
  "Smart TV": Tv,
  "Rain Shower": Wind,
};

const RoomsPage = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();

  const openBooking = (room: Room) => {
    setSelectedRoom(room);
    setBookingOpen(true);
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold-light font-body text-sm tracking-[0.3em] uppercase mb-2">Accommodations</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Rooms & Suites</h1>
          <p className="font-body text-primary-foreground/70 max-w-2xl mx-auto">
            Each room is a sanctuary of comfort, thoughtfully designed to provide an exceptional experience.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="space-y-16">
          {rooms.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <img src={room.image} alt={room.name} className="rounded-lg shadow-luxury w-full h-[400px] object-cover" loading="lazy" />
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="flex items-center gap-2 mb-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`h-4 w-4 ${j < Math.floor(room.rating) ? "fill-secondary text-secondary" : "text-muted"}`} />
                  ))}
                  <span className="font-body text-sm text-muted-foreground ml-1">{room.rating}</span>
                </div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-3">{room.name}</h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-6">{room.description}</p>

                <div className="flex items-center gap-6 text-sm text-muted-foreground font-body mb-6">
                  <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-secondary" /> Up to {room.capacity} Guests</span>
                  <span className="flex items-center gap-1.5"><Maximize className="h-4 w-4 text-secondary" /> {room.size}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {room.amenities.map((a) => {
                    const Icon = amenityIcons[a];
                    return (
                      <span key={a} className="bg-card border border-border rounded-full px-3 py-1.5 text-xs font-body text-muted-foreground flex items-center gap-1.5">
                        {Icon && <Icon className="h-3 w-3" />}
                        {a}
                      </span>
                    );
                  })}
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <span className="font-heading text-3xl font-bold text-secondary">${room.price}</span>
                    <span className="font-body text-sm text-muted-foreground">/night</span>
                  </div>
                  <Button variant="gold" size="lg" onClick={() => openBooking(room)}>Book This Room</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} preselectedRoom={selectedRoom} />
    </div>
  );
};

export default RoomsPage;
