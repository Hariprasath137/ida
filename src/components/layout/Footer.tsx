export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory py-20 px-8 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h2 className="text-3xl font-serif mb-4">IDA</h2>
          <p className="text-muted text-sm max-w-xs">
            Crafting sophisticated, unforgettable experiences. We are an experiential design studio redefining luxury events.
          </p>
        </div>
        
        <div className="flex flex-col gap-2 text-sm tracking-widest uppercase">
          <h3 className="text-olive mb-4 font-semibold">Navigation</h3>
          <a href="/about" className="hover:text-stone transition-colors">About Us</a>
          <a href="/services" className="hover:text-stone transition-colors">Capabilities</a>
          <a href="/contact" className="hover:text-stone transition-colors">Contact</a>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <h3 className="text-olive mb-4 font-semibold tracking-widest uppercase">Connect</h3>
          <p>hr@idainternational.com</p>
          <p>+91 98765 43210</p>
          <p className="mt-4 text-muted">Based in India, Available Worldwide.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-white/10 mt-16 pt-8 text-xs text-muted flex justify-between uppercase tracking-widest">
        <p>© 2026 IDA international Events.</p>
        <p>Designed for Excellence.</p>
      </div>
    </footer>
  );
}