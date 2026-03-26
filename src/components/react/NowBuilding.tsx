import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $lang } from '../../stores/language';
import { t } from '../../i18n/translations';

export default function NowBuilding() {
  const lang = useStore($lang);
  const text = t[lang].now;

  return (
    <section id="now" className="py-24 sm:py-32 px-6 border-t border-white/[0.06]">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-accent mb-12"
        >
          05 — {text.title}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="font-mono text-xs text-accent font-medium">
              {text.status}
            </span>
          </div>

          <p className="text-white/70 text-lg leading-relaxed mb-2">
            {text.description}
          </p>

          <p className="font-mono text-sm text-white/50 mb-6">
            {text.codename}
          </p>

          <p className="font-mono text-xs text-white/30">
            {text.update}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
