"use client";

import { useActionState } from "react";
import { login, type FormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ArrowLeft, Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const initialState: FormState = { message: "" };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className="w-full h-screen grid lg:grid-cols-2 overflow-hidden">
      
      {/* SOL TARAF: FORM ALANI */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-white relative">
        
        {/* Ana Sayfaya Dön Butonu */}
        <Link 
          href="/" 
          className="absolute top-8 left-8 md:left-16 lg:left-24 text-sm font-medium text-gray-500 hover:text-primary transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Market
        </Link>

        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-serif font-bold text-primary tracking-tight">
              Welcome Back
            </h1>
            <p className="text-gray-500">
              Enter your details to access your organic journey.
            </p>
          </div>

          {/* HATA MESAJI */}
          {state.message && (
            <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl flex items-center gap-3 border border-red-100 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={18} />
              <span className="font-medium">{state.message}</span>
            </div>
          )}

          <form action={formAction} className="space-y-6">
            <div className="space-y-4">
              
              {/* EMAIL INPUT (İKONLU) */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="hello@serender.com" 
                    required 
                    className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* PASSWORD INPUT (İKONLU) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                   <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                   <Link href="#" className="text-xs text-primary font-medium hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            <Button disabled={isPending} className="w-full h-12 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-500">Don&apos;t have an account? </span>
            <Link href="/register" className="text-primary font-bold hover:underline">
              Create free account
            </Link>
          </div>
        </div>
      </div>

      {/* SAĞ TARAF: GÖRSEL ALANI (MOBİLDE GİZLENİR) */}
      <div className="hidden lg:block relative bg-secondary/20">
        <Image
          src="https://images.unsplash.com/photo-1553787434-45e1d245bfbb?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Organic Food Background"
          fill
          className="object-cover"
          priority
        />
        {/* Karartma Efekti */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Marka Mesajı */}
        <div className="absolute bottom-12 left-12 right-12 text-white p-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl">
          <blockquote className="font-serif text-2xl italic mb-4">
            &quot;Nature&apos;s best, delivered to your doorstep. Experience the true taste of organic living.&quot;
          </blockquote>
          <p className="font-medium opacity-80">— Serender House Team</p>
        </div>
      </div>
      
    </div>
  );
}