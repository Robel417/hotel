import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-hotel.jpg";

const HeroSection = () => (
  <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
    <img src={heroImage} alt="Robel Hotel luxury exterior" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
    <div className="absolute inset-0 bg-hero-overlay" />

    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-gold-light font-body text-sm md:text-base tracking-[0.4em] uppercase mb-4"
      >
        Welcome to Luxury
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-cream mb-6 leading-tight"
      >
        Robel Hotel
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="font-body text-lg md:text-xl text-cream/80 mb-10 max-w-2xl mx-auto leading-relaxed"
      >
        Where timeless elegance meets modern luxury. Experience world-class hospitality in the heart of the city.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link to="/rooms">
          <Button variant="hero" size="xl">Book Your Stay</Button>
        </Link>
        <Link to="/menu">
          <Button variant="heroOutline" size="xl">Explore Dining</Button>
        </Link>
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <div className="w-6 h-10 border-2 border-cream/40 rounded-full flex justify-center pt-2">
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1.5 h-1.5 bg-secondary rounded-full"
        />
      </div>
    </motion.div>
  </section>
);

export default HeroSection;
