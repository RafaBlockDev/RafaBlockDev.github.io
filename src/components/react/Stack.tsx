import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $lang } from '../../stores/language';
import { t } from '../../i18n/translations';

interface StackItem {
  name: string;
  icon: string | null;
  abbr: string;
  color: string;
}

interface Category {
  name: string;
  nameEs: string;
  items: StackItem[];
}

const si = (slug: string, color: string) =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

const CATEGORIES: Category[] = [
  {
    name: 'Languages',
    nameEs: 'Lenguajes',
    items: [
      { name: 'TypeScript', icon: si('typescript', '3178C6'), abbr: 'TS', color: '#3178C6' },
      { name: 'Python', icon: si('python', '3776AB'), abbr: 'PY', color: '#3776AB' },
      { name: 'Go', icon: si('go', '00ADD8'), abbr: 'GO', color: '#00ADD8' },
      { name: 'Rust', icon: si('rust', 'F74C00'), abbr: 'RS', color: '#F74C00' },
      { name: 'Solidity', icon: si('solidity', 'AAAAAA'), abbr: 'SOL', color: '#AAAAAA' },
      { name: 'JavaScript', icon: si('javascript', 'F7DF1E'), abbr: 'JS', color: '#F7DF1E' },
    ],
  },
  {
    name: 'Frameworks',
    nameEs: 'Frameworks',
    items: [
      { name: 'React', icon: si('react', '61DAFB'), abbr: 'Re', color: '#61DAFB' },
      { name: 'Next.js', icon: si('nextdotjs', 'EDEDED'), abbr: 'NX', color: '#EDEDED' },
      { name: 'Vue', icon: si('vuedotjs', '4FC08D'), abbr: 'V', color: '#4FC08D' },
      { name: 'NestJS', icon: si('nestjs', 'E0234E'), abbr: 'NJ', color: '#E0234E' },
      { name: 'FastAPI', icon: si('fastapi', '009688'), abbr: 'FA', color: '#009688' },
      { name: 'Flask', icon: si('flask', 'EDEDED'), abbr: 'Fl', color: '#EDEDED' },
    ],
  },
  {
    name: 'AI & LLM',
    nameEs: 'IA & LLM',
    items: [
      { name: 'LangGraph', icon: si('langchain', '1C3C3C'), abbr: 'LG', color: '#22c55e' },
      { name: 'Claude API', icon: si('anthropic', 'D4A27F'), abbr: 'CL', color: '#D4A27F' },
      { name: 'AWS Bedrock', icon: si('amazon', 'FF9900'), abbr: 'BR', color: '#FF9900' },
      { name: 'Langfuse', icon: null, abbr: 'LF', color: '#7C3AED' },
    ],
  },
  {
    name: 'Infrastructure',
    nameEs: 'Infraestructura',
    items: [
      { name: 'AWS', icon: si('amazon', 'FF9900'), abbr: 'AWS', color: '#FF9900' },
      { name: 'Terraform', icon: si('terraform', '844FBA'), abbr: 'TF', color: '#844FBA' },
      { name: 'Docker', icon: si('docker', '2496ED'), abbr: 'DK', color: '#2496ED' },
      { name: 'Supabase', icon: si('supabase', '3FCF8E'), abbr: 'SB', color: '#3FCF8E' },
      { name: 'PostgreSQL', icon: si('postgresql', '4169E1'), abbr: 'PG', color: '#4169E1' },
      { name: 'Redis', icon: si('redis', 'FF4438'), abbr: 'RD', color: '#FF4438' },
    ],
  },
  {
    name: 'Blockchain',
    nameEs: 'Blockchain',
    items: [
      { name: 'Ethereum', icon: si('ethereum', '627EEA'), abbr: 'ETH', color: '#627EEA' },
      { name: 'Hardhat', icon: null, abbr: 'HH', color: '#FFF100' },
      { name: 'Foundry', icon: null, abbr: 'FY', color: '#EDEDED' },
      { name: 'The Graph', icon: si('thegraph', '6747ED'), abbr: 'GR', color: '#6747ED' },
    ],
  },
  {
    name: 'Tools',
    nameEs: 'Herramientas',
    items: [
      { name: 'Git', icon: si('git', 'F05032'), abbr: 'G', color: '#F05032' },
      { name: 'GitHub Actions', icon: si('githubactions', '2088FF'), abbr: 'GA', color: '#2088FF' },
      { name: 'Vercel', icon: si('vercel', 'EDEDED'), abbr: '▲', color: '#EDEDED' },
      { name: 'Google Cloud', icon: si('googlecloud', '4285F4'), abbr: 'GC', color: '#4285F4' },
    ],
  },
];

function StackIcon({ item }: { item: StackItem }) {
  const [imgFailed, setImgFailed] = useState(!item.icon);

  return (
    <div className="w-5 h-5 flex items-center justify-center shrink-0">
      {!imgFailed && item.icon ? (
        <img
          src={item.icon}
          alt={item.name}
          width={18}
          height={18}
          className="opacity-90 group-hover:opacity-100 transition-opacity"
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span
          className="font-mono text-[10px] font-bold leading-none"
          style={{ color: item.color }}
        >
          {item.abbr}
        </span>
      )}
    </div>
  );
}

export default function Stack() {
  const lang = useStore($lang);
  const text = t[lang].stack;

  return (
    <section id="stack" className="py-24 sm:py-32 px-6 border-t border-white/[0.06]">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-accent mb-3"
        >
          03 — {text.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-white/45 mb-12"
        >
          {text.subtitle}
        </motion.p>

        <div className="space-y-10">
          {CATEGORIES.map((category, ci) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.03, duration: 0.3 }}
            >
              <p className="text-xs text-white/35 mb-4 uppercase tracking-wider">
                {lang === 'es' ? category.nameEs : category.name}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="group flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-white/[0.06] hover:border-white/[0.14] transition-colors cursor-default"
                  >
                    <StackIcon item={item} />
                    <span className="text-[13px] text-white/55 group-hover:text-white/85 transition-colors truncate">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
