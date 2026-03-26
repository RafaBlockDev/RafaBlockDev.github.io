import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $lang, toggleLang } from '../../stores/language';
import { t } from '../../i18n/translations';

const NAV_ITEMS = ['about', 'projects', 'stack', 'writing', 'now', 'contact'] as const;

export default function Navbar() {
  const lang = useStore($lang);
  const text = t[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-md border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
          <a href="#" className="font-mono text-sm text-white/90 hover:text-white transition-colors">
            rafa<span className="text-accent">.</span>dev
          </a>

          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                {text[item]}
              </a>
            ))}

            <button
              onClick={toggleLang}
              className="flex items-center gap-1 font-mono text-xs ml-2 text-white/40 hover:text-white/70 transition-colors"
            >
              <span className={lang === 'en' ? 'text-white/90' : ''}>EN</span>
              <span>/</span>
              <span className={lang === 'es' ? 'text-white/90' : ''}>ES</span>
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1">
              <span className={`block w-4 h-px bg-white/70 transition-all ${mobileOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
              <span className={`block w-4 h-px bg-white/70 transition-all ${mobileOpen ? '-rotate-45 -translate-y-[2px]' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setMobileOpen(false)}
                className="text-lg text-white/60 hover:text-white transition-colors"
              >
                {text[item]}
              </a>
            ))}
            <button
              onClick={toggleLang}
              className="font-mono text-sm mt-4 text-white/40 hover:text-white/70 transition-colors"
            >
              <span className={lang === 'en' ? 'text-white/90' : ''}>EN</span>
              {' / '}
              <span className={lang === 'es' ? 'text-white/90' : ''}>ES</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
