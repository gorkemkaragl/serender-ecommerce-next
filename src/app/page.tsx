export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      {/* Primary Renk ve Serif Font Testi */}
      <h1 className="text-4xl font-serif text-primary">
        GX Food - Premium Delivery
      </h1>
      
      {/* Accent Renk ve Sans Font Testi */}
      <p className="text-accent font-sans text-lg">
        Healthy food at your doorstep.
      </p>

      {/* Buton Testi */}
      <button className="bg-primary text-custom-white px-6 py-2 rounded-lg hover:opacity-90 transition">
        Order Now
      </button>
    </div>
  );
}