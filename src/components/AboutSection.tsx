import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Star, Clock, Shield } from "lucide-react";
import galleryLobby from "@/assets/gallery-lobby.jpg";

const features = [
  { icon: Award, title: "Award Winning", desc: "Recognized for excellence in hospitality" },
  { icon: Star, title: "5-Star Service", desc: "Dedicated to exceeding every expectation" },
  { icon: Clock, title: "24/7 Concierge", desc: "At your service around the clock" },
  { icon: Shield, title: "Safe & Secure", desc: "Your comfort and safety is our priority" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-secondary font-body text-sm tracking-[0.3em] uppercase mb-2">About Us</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 gold-underline inline-block">
              A Legacy of Luxury
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6 mt-8">
              Nestled in the heart of the city, Robel Hotel has been a beacon of luxury and refined hospitality since 1985.
              Our commitment to excellence is reflected in every detail — from the meticulously designed suites to our
              world-class dining experiences.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Each guest is treated to a personalized experience that seamlessly blends traditional warmth with
              contemporary sophistication. Discover why discerning travelers choose Robel Hotel time and again.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <f.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-heading text-sm font-semibold text-foreground">{f.title}</h4>
                    <p className="text-xs text-muted-foreground font-body">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img src={galleryLobby} alt="Robel Hotel grand lobby" className="rounded-lg shadow-luxury w-full h-[500px] object-cover" />
            <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground p-6 rounded-lg shadow-gold">
              <p className="font-heading text-3xl font-bold">40+</p>
              <p className="font-body text-sm">Years of Excellence</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
