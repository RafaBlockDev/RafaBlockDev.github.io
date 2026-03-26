import { useStore } from '@nanostores/react';
import { $lang } from '../../stores/language';
import { t } from '../../i18n/translations';

export default function Footer() {
  const lang = useStore($lang);
  const text = t[lang].footer;

  return (
    <footer className="border-t border-white/[0.06] px-6">
      <div className="mx-auto max-w-5xl py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[11px] text-white/30">
          {text.rights}
        </p>

        <p
          className="font-mono text-[11px] text-white/20 hover:text-white/50 transition-colors cursor-default select-none"
          title="🌮"
        >
          {text.made}
        </p>
      </div>

      <div className="pb-4 text-center">
        <span
          className="font-mono text-[9px] text-white/[0.06] hover:text-white/25 transition-colors duration-1000 select-none cursor-default"
          title="nice find"
        >
          v3.14.159 · built at 3:47 AM · tacos: 847
        </span>
      </div>
    </footer>
  );
}
