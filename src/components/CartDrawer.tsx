import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const CartDrawer = () => {
  const { items, removeItem, updateQuantity, clearCart, total, isOpen, setIsOpen } = useCart();

  const handleOrder = () => {
    toast.success("Order placed successfully! Your food will be delivered to your room.");
    clearCart();
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="bg-background w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl text-foreground">Your Order</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <p className="font-heading text-lg text-muted-foreground">Your cart is empty</p>
            <p className="font-body text-sm text-muted-foreground/60">Add items from our menu to get started</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 mt-4 pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 bg-card rounded-lg p-3">
                  <div className="flex-1">
                    <p className="font-heading text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="font-body text-xs text-muted-foreground">${item.price} each</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-body text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                    <span className="font-heading text-sm font-bold text-secondary">${item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 mt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-body text-muted-foreground">Total</span>
                <span className="font-heading text-2xl font-bold text-secondary">${total}</span>
              </div>
              <Button variant="gold" size="lg" className="w-full" onClick={handleOrder}>Place Order</Button>
              <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={clearCart}>Clear Cart</Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
