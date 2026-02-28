import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import diningImage from "@/assets/dining.jpg";

const DiningSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="dining" className="py-24 bg-primary text-primary-foreground" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold-light font-body text-sm tracking-[0.3em] uppercase mb-2">Culinary Excellence</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              A Gastronomic Journey
            </h2>
            <p className="font-body text-primary-foreground/70 leading-relaxed mb-6">
              Our award-winning chefs craft exceptional dishes using the finest locally sourced and imported ingredients.
              From an exquisite breakfast spread to an intimate dinner experience, every meal at Robel Hotel is a celebration of flavor.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {["Breakfast", "Lunch", "Dinner", "Cocktails"].map((meal) => (
                <div key={meal} className="border border-primary-foreground/20 rounded-lg p-4 text-center">
                  <p className="font-heading text-lg text-gold-light">{meal}</p>
                </div>
              ))}
            </div>
            <Link to="/menu">
              <Button variant="hero" size="lg">Explore Our Menu</Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src={diningImage} alt="Fine dining at Robel Hotel" className="rounded-lg shadow-luxury w-full h-[450px] object-cover" loading="lazy" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DiningSection;
