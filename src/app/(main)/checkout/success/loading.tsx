export default function Loading() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center bg-background/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-primary"></div>
        
        <p className="text-sm font-serif italic text-primary/60 animate-pulse">
          Yükleniyor...
        </p>
      </div>
    </div>
  )
}