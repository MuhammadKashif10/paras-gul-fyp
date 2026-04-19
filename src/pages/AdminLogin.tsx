import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import MotionWrapper from "@/components/animations/MotionWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminLogin } from "@/lib/api";
import { setAdminSession } from "@/lib/admin-auth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = (location.state as { from?: string } | null)?.from ?? "/admin";

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const session = await adminLogin(email, password);
      setAdminSession(session);
      navigate(redirectTo, { replace: true });
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 gradient-hero relative overflow-hidden">
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 gradient-glow"
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          <MotionWrapper>
            <Card className="rounded-3xl border-border/50 bg-card/95 shadow-card">
              <CardContent className="p-8 space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 border border-primary/30 mb-4">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                    Admin Login
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Sign in to review bookings and manage bridal entries.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter admin email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                  />
                </div>

                {error ? (
                  <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground">
                    {error}
                  </div>
                ) : null}

                <Button variant="hero" size="lg" className="w-full" onClick={handleLogin} disabled={loading}>
                  <LockKeyhole className="w-4 h-4 mr-2" />
                  {loading ? "Signing In..." : "Login to Dashboard"}
                </Button>
              </CardContent>
            </Card>
          </MotionWrapper>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
