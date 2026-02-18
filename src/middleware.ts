import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware' // Birazdan oluşturacağız

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Tüm request yollarını eşleştir, şunlar hariç:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images klasörü (public altındaki resimler)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}