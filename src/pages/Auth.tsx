import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";
const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8 transition-colors duration-300">
      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-5xl">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center shadow-emboss">
              <Scale className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-serif text-2xl font-semibold text-primary">
              Nyaya AI
            </span>
          </Link>
        </div>

        {/* Main Container */}
        <div className="relative bg-card border border-border rounded-3xl shadow-elevated overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px] lg:min-h-[650px]">
            
            {/* Branding Panel - Slides between left and right */}
            <motion.div
              className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center px-12 xl:px-16 relative"
              layout
              initial={false}
              animate={{
                x: isSignUp ? "100%" : "0%",
              }}
              transition={{ 
                type: "spring", 
                stiffness: 350, 
                damping: 35,
                mass: 0.8
              }}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: "50%",
                zIndex: 20,
                borderRadius: isSignUp ? "24px 0 0 24px" : "0 24px 24px 0",
              }}
            >
              {/* Decorative elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 border border-primary-foreground/20 rounded-full" />
                <div className="absolute bottom-10 right-10 w-48 h-48 border border-primary-foreground/10 rounded-full" />
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-dashed border-primary-foreground/10 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={isSignUp ? "signup-info" : "signin-info"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                  className="relative z-10 text-primary-foreground"
                >
                  <Link to="/" className="flex items-center gap-3 mb-10">
                    <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center backdrop-blur-sm border border-primary-foreground/20">
                      <Scale className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <span className="font-serif text-2xl font-semibold tracking-wide">
                        Nyaya AI
                      </span>
                      <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70">
                        Legal Intelligence
                      </p>
                    </div>
                  </Link>

                  <h2 className="font-serif text-3xl xl:text-4xl font-semibold leading-tight mb-4">
                    {isSignUp ? (
                      <>
                        Join the Future of
                        <br />
                        <span className="text-gold">Legal AI</span>
                      </>
                    ) : (
                      <>
                        Justice, <span className="text-gold">Explained</span>.
                        <br />
                        Law, <span className="text-gold">Simplified</span>.
                      </>
                    )}
                  </h2>

                  <p className="text-primary-foreground/80 leading-relaxed mb-8 font-sans">
                    {isSignUp
                      ? "Create your account and start exploring India's most comprehensive legal AI platform."
                      : "Access India's most comprehensive legal AI platform. Get instant answers grounded in Indian law."}
                  </p>

                  <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                      <span className="font-serif text-2xl font-bold">50K+</span>
                      <span className="text-xs text-primary-foreground/70 font-sans">Queries</span>
                    </div>
                    <div className="w-px h-10 bg-primary-foreground/20" />
                    <div className="flex flex-col">
                      <span className="font-serif text-2xl font-bold">98%</span>
                      <span className="text-xs text-primary-foreground/70 font-sans">Accuracy</span>
                    </div>
                    <div className="w-px h-10 bg-primary-foreground/20" />
                    <div className="flex flex-col">
                      <span className="font-serif text-2xl font-bold">24/7</span>
                      <span className="text-xs text-primary-foreground/70 font-sans">Available</span>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-primary-foreground/20">
                    <p className="text-sm text-primary-foreground/70 mb-3 font-sans">
                      {isSignUp ? "Already have an account?" : "Don't have an account?"}
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 font-sans"
                    >
                      {isSignUp ? "Sign In" : "Create Account"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Sign In Form - Right side when panel is left */}
            <div className="w-full lg:w-1/2 lg:ml-auto flex items-center justify-center p-8 lg:p-12">
              <AnimatePresence mode="wait">
                {!isSignUp && (
                  <motion.div
                    key="signin-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full max-w-md"
                  >
                    <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-2">
                      Welcome Back
                    </h2>
                    <p className="text-muted-foreground text-sm mb-8 font-sans">
                      Sign in to continue your legal research
                    </p>

                    <form className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground font-sans">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            className="pl-10 h-12 bg-background border-border font-sans"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground font-sans">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10 h-12 bg-background border-border font-sans"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                          <span className="text-muted-foreground font-sans">Remember me</span>
                        </label>
                        <a href="#" className="text-primary hover:underline font-sans">
                          Forgot password?
                        </a>
                      </div>

                      <Button className="w-full h-12 font-sans group" size="lg">
                        Sign In
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </form>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-3 text-muted-foreground font-sans">Or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-11 font-sans">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google
                      </Button>
                      <Button variant="outline" className="h-11 font-sans">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </Button>
                    </div>

                    <p className="lg:hidden text-center text-sm text-muted-foreground mt-6 font-sans">
                      Don't have an account?{" "}
                      <button onClick={() => setIsSignUp(true)} className="text-primary hover:underline font-medium">
                        Create one
                      </button>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sign Up Form - Left side when panel is right */}
            <div className="w-full lg:w-1/2 lg:absolute lg:left-0 lg:top-0 lg:bottom-0 flex items-center justify-center p-8 lg:p-12">
              <AnimatePresence mode="wait">
                {isSignUp && (
                  <motion.div
                    key="signup-form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full max-w-md"
                  >
                    <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-2">
                      Create Account
                    </h2>
                    <p className="text-muted-foreground text-sm mb-8 font-sans">
                      Join thousands using Nyaya AI for legal insights
                    </p>

                    <form className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground font-sans">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="Enter your name"
                            className="pl-10 h-12 bg-background border-border font-sans"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground font-sans">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            className="pl-10 h-12 bg-background border-border font-sans"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground font-sans">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10 h-12 bg-background border-border font-sans"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-border text-primary focus:ring-primary" />
                        <span className="text-sm text-muted-foreground font-sans">
                          I agree to the{" "}
                          <a href="#" className="text-primary hover:underline">Terms of Service</a>
                          {" "}and{" "}
                          <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                        </span>
                      </div>

                      <Button className="w-full h-12 font-sans group" size="lg">
                        Create Account
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </form>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-3 text-muted-foreground font-sans">Or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-11 font-sans">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google
                      </Button>
                      <Button variant="outline" className="h-11 font-sans">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </Button>
                    </div>

                    <p className="lg:hidden text-center text-sm text-muted-foreground mt-6 font-sans">
                      Already have an account?{" "}
                      <button onClick={() => setIsSignUp(false)} className="text-primary hover:underline font-medium">
                        Sign in
                      </button>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
