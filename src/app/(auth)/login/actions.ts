'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { db } from "@/db"
import { profiles } from "@/db/schema"
import { eq } from "drizzle-orm"

// Formun başlangıç durumu için tip tanımı
export type FormState = {
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
    phone?: string[];
  };
}

// --- LOGIN ACTION ---
export async function login(prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Supabase ile giriş yap
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Hata mesajlarını Türkçeleştirme / Güzelleştirme
    let userMessage = "Something went wrong.";
    
    if (error.message.includes("Invalid login credentials")) {
      userMessage = "Invalid email or password."; // Kullanıcı bulunamadı veya şifre yanlış
    }

    return { message: userMessage }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

// --- SIGNUP ACTION ---
export async function signup(prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const phone = formData.get('phone') as string

  // 1. TELEFON KONTROLÜ (Veritabanından)
  // Supabase Auth email'i otomatik kontrol eder ama telefonu biz etmeliyiz.
  const existingPhone = await db.query.profiles.findFirst({
    where: eq(profiles.phone, phone)
  });

  if (existingPhone) {
    return { message: "Bu telefon numarası zaten kullanılıyor." };
  }

  // 2. KAYIT İŞLEMİ
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      },
    },
  })

  if (error) {
    let userMessage = error.message;

    // Supabase'in "User already registered" hatasını yakala
    if (error.message.includes("User already registered") || error.code === "user_already_exists") {
       userMessage = "Bu email adresi zaten kayıtlı."; 
    }

    return { message: userMessage }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

// --- LOGOUT  ---
export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}