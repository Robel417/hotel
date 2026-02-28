import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Users, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { rooms } from "@/data/mockData";

const RoomsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="rooms" className="py-24 bg-section-cream" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-secondary font-body text-sm tracking-[0.3em] uppercase mb-2">Accommodations</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground gold-underline inline-block">
            Our Rooms & Suites
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.slice(0, 3).map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-background rounded-lg overflow-hidden shadow-luxury group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="font-heading text-lg font-bold text-secondary">${room.price}</span>
                  <span className="text-xs text-muted-foreground font-body">/night</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{room.name}</h3>
                <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-2">{room.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-body mb-4">
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {room.capacity} Guests</span>
                  <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5" /> {room.size}</span>
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-secondary" /> {room.rating}</span>
                </div>
                <Link to="/rooms">
                  <Button variant="gold" className="w-full">View Details</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/rooms">
            <Button variant="outline" size="lg">View All Rooms</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
