import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import heroImage from "@/assets/hero-hotel.jpg";
import galleryPool from "@/assets/gallery-pool.jpg";
import gallerySpa from "@/assets/gallery-spa.jpg";
import galleryLobby from "@/assets/gallery-lobby.jpg";
import diningImage from "@/assets/dining.jpg";
import roomSuite from "@/assets/room-suite.jpg";

const images = [
  { src: heroImage, alt: "Hotel Exterior" },
  { src: galleryPool, alt: "Swimming Pool" },
  { src: gallerySpa, alt: "Spa & Wellness" },
  { src: galleryLobby, alt: "Grand Lobby" },
  { src: diningImage, alt: "Restaurant" },
  { src: roomSuite, alt: "Royal Suite" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-secondary font-body text-sm tracking-[0.3em] uppercase mb-2">Gallery</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground gold-underline inline-block">
            Discover Our Spaces
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-lg cursor-pointer group ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              onClick={() => setSelected(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${i === 0 ? "h-full min-h-[300px]" : "h-48 md:h-56"}`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300 flex items-end p-4">
                <p className="text-cream font-body text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div className="fixed inset-0 z-50 bg-primary/90 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            src={images[selected].src}
            alt={images[selected].alt}
            className="max-w-full max-h-[85vh] rounded-lg object-contain"
          />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
