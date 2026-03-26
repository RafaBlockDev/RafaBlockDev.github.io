import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $lang } from '../../stores/language';
import { t } from '../../i18n/translations';

const SOCIALS = [
  { name: 'X', url: 'https://x.com/rafablockdev', handle: '@rafablockdev' },
  { name: 'GitHub', url: 'https://github.com/rafablockdev', handle: 'rafablockdev' },
  { name: 'Telegram', url: 'https://t.me/rafablockdev', handle: '@rafablockdev' },
];

export default function Contact() {
  const lang = useStore($lang);
  const text = t[lang].contact;

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 border-t border-white/[0.06]">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-accent mb-12"
        >
          06 — {text.title}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {text.title}<span className="text-accent">.</span>
          </h2>

          <p className="text-white/50 text-lg mb-10 max-w-lg">
            {text.subtitle}
          </p>

          <a
            href="https://cal.com/rafaelfuentes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-medium rounded-md hover:bg-white/90 transition-colors mb-12"
          >
            {text.cta} →
          </a>

          <div className="flex items-center gap-3 text-xs text-white/35 mb-6">
            <span className="h-px flex-1 max-w-[60px] bg-white/[0.08]" />
            <span>{text.or}</span>
          </div>

          <div className="flex flex-wrap gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/50 hover:text-accent transition-colors"
              >
                {social.name} <span className="text-white/30">{social.handle}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
