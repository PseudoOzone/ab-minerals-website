"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeNames, localeShortNames, type Locale } from "@/i18n/config";
import { useState, useRef, useEffect, useCallback } from "react";
import { Globe, ChevronDown } from "lucide-react";

export function LanguageSwitcher({ dropUp = false }: { dropUp?: boolean }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  function switchLocale(nextLocale: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div ref={ref} className="relative" onKeyDown={handleKeyDown}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all duration-200"
        style={{
          color: 'rgba(245, 245, 240, 0.8)',
          backgroundColor: open ? 'rgba(201, 169, 98, 0.1)' : 'transparent',
          border: '1px solid',
          borderColor: open ? 'rgba(201, 169, 98, 0.3)' : 'rgba(245, 245, 240, 0.1)',
        }}
        onMouseEnter={(e) => {
          if (!open) e.currentTarget.style.borderColor = 'rgba(201, 169, 98, 0.2)';
        }}
        onMouseLeave={(e) => {
          if (!open) e.currentTarget.style.borderColor = 'rgba(245, 245, 240, 0.1)';
        }}
        aria-label="Switch language"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4" style={{ color: '#C9A962' }} />
        <span className="font-medium">{localeShortNames[locale]}</span>
        <ChevronDown
          className="w-3.5 h-3.5 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {open && (
        <div
          className={`absolute right-0 rounded-xl overflow-hidden shadow-2xl z-50 min-w-[180px] ${dropUp ? 'bottom-full mb-2' : 'top-full mt-2'}`}
          style={{
            backgroundColor: '#141414',
            border: '1px solid rgba(201, 169, 98, 0.15)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
          }}
          role="listbox"
          aria-label="Select language"
        >
          <div
            className="px-3 py-2 text-xs uppercase tracking-widest"
            style={{ color: 'rgba(201, 169, 98, 0.6)', borderBottom: '1px solid rgba(245, 245, 240, 0.05)' }}
          >
            Language
          </div>
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className="w-full text-left px-3 py-2.5 text-sm transition-colors flex items-center gap-3"
              style={{
                color: l === locale ? '#C9A962' : 'rgba(245, 245, 240, 0.8)',
                backgroundColor: l === locale ? 'rgba(201, 169, 98, 0.1)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (l !== locale) e.currentTarget.style.backgroundColor = 'rgba(245, 245, 240, 0.05)';
              }}
              onMouseLeave={(e) => {
                if (l !== locale) e.currentTarget.style.backgroundColor = 'transparent';
              }}
              role="option"
              aria-selected={l === locale}
            >
              <span
                className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-semibold flex-shrink-0"
                style={{
                  backgroundColor: l === locale ? 'rgba(201, 169, 98, 0.2)' : 'rgba(245, 245, 240, 0.05)',
                  color: l === locale ? '#C9A962' : 'rgba(245, 245, 240, 0.6)',
                }}
              >
                {localeShortNames[l]}
              </span>
              <span className="flex-1">{localeNames[l]}</span>
              {l === locale && (
                <span style={{ color: '#C9A962' }} className="text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
