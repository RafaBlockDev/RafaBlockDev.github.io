import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $lang } from '../../stores/language';
import { t } from '../../i18n/translations';

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const steps = 40;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const lang = useStore($lang);
  const text = t[lang].about;

  const stats = [
    { value: 6, suffix: '+', label: text.stats.years },
    { value: 30, suffix: '+', label: text.stats.projects },
    { value: 5, suffix: '', label: text.stats.companies },
    { value: 6, suffix: '', label: text.stats.languages },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 px-6 border-t border-white/[0.06]">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-accent mb-12"
        >
          01 — {text.title}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="aspect-[3/4] w-full rounded-lg overflow-hidden border border-white/[0.08]">
              <img
                src="/photo.jpg"
                alt="Rafael Fuentes"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
              {text.title}<span className="text-accent">.</span>
            </h2>

            <p className="text-white/65 leading-relaxed mb-4">{text.bio}</p>
            <p className="text-white/45 text-sm leading-relaxed mb-10">{text.bio2}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/[0.06]">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold font-mono text-accent">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-white/60 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
