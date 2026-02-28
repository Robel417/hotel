import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { menuItems, type MenuItem } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const categories = [
  { key: "all", label: "All" },
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
  { key: "drinks", label: "Drinks" },
] as const;

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { addItem, setIsOpen, itemCount } = useCart();

  const filtered = activeCategory === "all" ? menuItems : menuItems.filter((i) => i.category === activeCategory);

  const handleAdd = (item: MenuItem) => {
    addItem(item);
    toast.success(`${item.name} added to cart`);
  };

  return (
    <div className="pt-16">
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold-light font-body text-sm tracking-[0.3em] uppercase mb-2">Culinary Excellence</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
          <p className="font-body text-primary-foreground/70 max-w-2xl mx-auto">
            Savor carefully crafted dishes prepared by our world-class chefs using the finest ingredients.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.key}
              variant={activeCategory === cat.key ? "gold" : "outline"}
              onClick={() => setActiveCategory(cat.key)}
              className="font-body"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Cart floating button (mobile) */}
        {itemCount > 0 && (
          <div className="fixed bottom-6 right-6 z-40 md:hidden">
            <Button variant="gold" size="lg" className="rounded-full shadow-gold" onClick={() => setIsOpen(true)}>
              <ShoppingCart className="h-5 w-5 mr-2" /> Cart ({itemCount})
            </Button>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-luxury transition-shadow group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="bg-secondary/10 text-secondary text-xs font-body px-2 py-1 rounded-full capitalize">{item.category}</span>
                <span className="font-heading text-xl font-bold text-secondary">${item.price}</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.name}</h3>
              <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:border-secondary transition-colors"
                onClick={() => handleAdd(item)}
              >
                <Plus className="h-4 w-4 mr-1" /> Add to Order
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
