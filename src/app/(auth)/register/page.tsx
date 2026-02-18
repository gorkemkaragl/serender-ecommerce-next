"use client";

import { useActionState } from "react";
import { signup, type FormState } from "@/app/(auth)/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ArrowLeft, Loader2, User, Phone, Mail, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const initialState: FormState = { message: "" };

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(signup, initialState);

  return (
    <div className="w-full min-h-screen grid lg:grid-cols-2">
      
      {/* SOL TARAF: GÖRSEL (Bu sefer görseli sola alalım, değişiklik olsun) */}
      <div className="hidden lg:block relative order-2 lg:order-1 bg-secondary/20">
        <Image
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2400&auto=format&fit=crop"
          alt="Fresh Market"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
        
        <div className="absolute top-12 left-12">
           <h2 className="text-4xl font-serif font-bold text-white drop-shadow-md">Serender House</h2>
        </div>
      </div>

      {/* SAĞ TARAF: FORM */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-white py-12 order-1 lg:order-2 relative">
        
         <Link 
          href="/" 
          className="absolute top-8 left-8 md:left-16 lg:left-24 text-sm font-medium text-gray-500 hover:text-primary transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Market
        </Link>

        <div className="max-w-md w-full mx-auto space-y-8 mt-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-serif font-bold text-gray-900 tracking-tight">
              Create Account
            </h1>
            <p className="text-gray-500">
              Join our community of healthy living enthusiasts.
            </p>
          </div>

          {state.message && (
            <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl flex items-center gap-3 border border-red-100 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={18} />
              <span className="font-medium">{state.message}</span>
            </div>
          )}

          <form action={formAction} className="space-y-5">
            
            {/* Ad Soyad Yan Yana */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input id="firstName" name="firstName" placeholder="John" required className="pl-9 bg-gray-50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                 <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input id="lastName" name="lastName" placeholder="Doe" required className="pl-9 bg-gray-50" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input id="email" name="email" type="email" placeholder="name@example.com" required className="pl-10 h-11 bg-gray-50" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input id="phone" name="phone" type="tel" placeholder="+90 555 123 45 67" required className="pl-10 h-11 bg-gray-50" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input id="password" name="password" type="password" placeholder="Min. 6 characters" minLength={6} required className="pl-10 h-11 bg-gray-50" />
              </div>
            </div>

            <Button disabled={isPending} className="w-full h-12 text-base font-medium mt-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                </>
              ) : (
                "Get Started"
              )}
            </Button>
          </form>

          <div className="text-center text-sm pb-8">
            <span className="text-gray-500">Already a member? </span>
            <Link href="/login" className="text-primary font-bold hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}