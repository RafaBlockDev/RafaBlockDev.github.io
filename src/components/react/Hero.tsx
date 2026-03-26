import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $lang } from '../../stores/language';
import { t } from '../../i18n/translations';

const fade = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.5 },
  }),
};

export default function Hero() {
  const lang = useStore($lang);
  const text = t[lang].hero;

  return (
    <section className="min-h-screen flex items-center px-6">
      <div className="mx-auto max-w-5xl w-full pt-24 pb-32">
        <motion.p
          custom={0}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="font-mono text-sm text-accent mb-8"
        >
          Software Engineer · Blockchain × AI
        </motion.p>

        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-7xl md:text-[5.5rem] font-bold tracking-tight leading-[1.05] mb-8"
        >
          {text.name}<span className="text-accent">.</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="text-lg sm:text-xl text-white/70 max-w-2xl mb-4 leading-relaxed"
        >
          {text.subtitle}
        </motion.p>

        <motion.p
          custom={3}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="font-mono text-sm text-white/40 max-w-lg mb-14"
        >
          {text.tagline}
        </motion.p>

        <motion.div
          custom={4}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-3"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-medium rounded-md hover:bg-white/90 transition-colors"
          >
            {text.cta1}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm text-white/70 border border-white/15 rounded-md hover:border-white/30 hover:text-white transition-all"
          >
            {text.cta2}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
