import { Link } from "react-router-dom";
import { UnifiedDashboard } from "@/components/layout/UnifiedDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react";

const cartItems = [
  { id: 1, title: "Complete React Masterclass", instructor: "John Teacher", price: 49, originalPrice: 79, image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=120&fit=crop" },
  { id: 2, title: "Machine Learning Fundamentals", instructor: "Dr. Sarah Chen", price: 59, originalPrice: 99, image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=200&h=120&fit=crop" },
];

export default function Cart() {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const savings = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0);

  return (
    <UnifiedDashboard title="Shopping Cart">
      <div className="page-container max-w-4xl mx-auto">
        {cartItems.length === 0 ? (
          <Card className="text-center py-16">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Browse courses and add them to your cart</p>
            <Link to="/dashboard/catalog">
              <Button className="bg-lms-blue hover:bg-lms-blue/90">Browse Courses</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4 flex gap-4">
                    <img src={item.image} alt={item.title} className="w-32 h-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.instructor}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-bold">${item.price}</span>
                        <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="h-fit">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><span>${total + savings}</span></div>
                  <div className="flex justify-between text-lms-emerald"><span>Discount</span><span>-${savings}</span></div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t"><span>Total</span><span>${total}</span></div>
                </div>
                <Link to="/checkout">
                  <Button className="w-full bg-lms-blue hover:bg-lms-blue/90 gap-2">
                    Checkout <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </UnifiedDashboard>
  );
}
