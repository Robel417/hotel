const Logo = ({ className = "", light = false }: { className?: string; light?: boolean }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="1.5" className={light ? "text-secondary" : "text-secondary"} />
      <path d="M10 28V12h4.5c2.5 0 4 1.5 4 3.8 0 1.8-1 3-2.5 3.5L19.5 28h-3l-3-8h-0.5v8H10Zm3-10.5h1.2c1.2 0 1.8-.7 1.8-1.8s-.6-1.7-1.8-1.7H13v3.5Z" fill="currentColor" className={light ? "text-secondary" : "text-secondary"} />
      <path d="M21 28V12h3v6.5h4V12h3v16h-3v-7h-4v7h-3Z" fill="currentColor" className={light ? "text-secondary" : "text-secondary"} />
      <line x1="8" y1="32" x2="32" y2="32" stroke="currentColor" strokeWidth="1" className={light ? "text-gold-light" : "text-gold"} />
      <line x1="8" y1="8" x2="32" y2="8" stroke="currentColor" strokeWidth="1" className={light ? "text-gold-light" : "text-gold"} />
    </svg>
    <div className="flex flex-col leading-none">
      <span className={`font-heading text-lg font-bold tracking-wider ${light ? "text-cream" : "text-primary"}`}>
        ROBEL
      </span>
      <span className={`text-[10px] font-body tracking-[0.3em] uppercase ${light ? "text-gold-light" : "text-secondary"}`}>
        Hotel
      </span>
    </div>
  </div>
);

export default Logo;
