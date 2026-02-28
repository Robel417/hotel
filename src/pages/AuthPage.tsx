import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      toast.error("Please fill in all fields");
      return;
    }
    if (isLogin) {
      login(form.email, form.password);
      toast.success("Welcome back!");
    } else {
      register(form.name, form.email, form.password);
      toast.success("Account created successfully!");
    }
    navigate("/");
  };

  return (
    <div className="pt-16 min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="bg-card border border-border rounded-lg p-8 shadow-luxury">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h1>
            <p className="font-body text-sm text-muted-foreground">
              {isLogin ? "Sign in to your Robel Hotel account" : "Join us for an exceptional experience"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label className="font-body text-sm">Full Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} className="font-body" />
              </div>
            )}
            <div className="space-y-2">
              <Label className="font-body text-sm">Email</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} className="font-body" placeholder="admin@robelhotel.com for admin access" />
            </div>
            <div className="space-y-2">
              <Label className="font-body text-sm">Password</Label>
              <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} maxLength={128} className="font-body" placeholder="Any password works (mock)" />
            </div>
            <Button variant="gold" size="lg" className="w-full" type="submit">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <p className="text-center mt-6 font-body text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-secondary hover:underline font-medium">
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
