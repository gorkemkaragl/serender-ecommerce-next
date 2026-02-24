import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Sadece Auth gerektiren veya session güncellenmesi gereken sayfaları kontrol et
  // Public (herkese açık) sayfalarda middleware'i çalıştırma
  const protectedRoutes = ['/account', '/checkout', '/orders', '/admin']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute || pathname === '/login' || pathname === '/signup') {
     return await updateSession(request)
  }

  // Diğer sayfalarda direkt devam et, session güncellemesini bekleme
  return NextResponse.next()
}