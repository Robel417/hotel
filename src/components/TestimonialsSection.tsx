import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/mockData";

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-section-cream" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-secondary font-body text-sm tracking-[0.3em] uppercase mb-2">Testimonials</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground gold-underline inline-block">
            Guest Experiences
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-background rounded-lg p-8 shadow-luxury relative"
            >
              <Quote className="h-8 w-8 text-secondary/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="font-body text-muted-foreground leading-relaxed mb-6 italic">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
