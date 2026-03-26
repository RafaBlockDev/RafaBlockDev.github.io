import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $lang } from '../../stores/language';
import { t } from '../../i18n/translations';

interface Project {
  id: string;
  title: string;
  role: string;
  roleEs: string;
  year: string;
  description: string;
  descriptionEs: string;
  tech: string[];
}

const PROJECTS: Project[] = [
  // — AI —
  {
    id: 'ai-stock-agent',
    title: 'AI Stock Agent',
    role: 'Personal Project',
    roleEs: 'Proyecto Personal',
    year: '2025',
    description:
      'AI-powered stock analysis agent using AWS AgentCore, LangGraph ReAct pattern, Cognito auth, and Langfuse observability with RAG over financial PDFs. FastAPI SSE streaming backend with real-time AI responses.',
    descriptionEs:
      'Agente de análisis bursátil con IA usando AWS AgentCore, patrón LangGraph ReAct, auth con Cognito, y observabilidad con Langfuse con RAG sobre PDFs financieros. Backend FastAPI con streaming SSE y respuestas de IA en tiempo real.',
    tech: ['AWS Bedrock', 'LangGraph', 'FastAPI', 'Langfuse', 'RAG'],
  },
  {
    id: 'polymarket',
    title: 'Polymarket Trading Backend',
    role: 'Personal Project',
    roleEs: 'Proyecto Personal',
    year: '2025 – Present',
    description:
      'Prediction market trading engine implementing LMSR pricing, Bayesian updates, and Kelly Criterion for optimal bet sizing. Deployed on AWS ECS Fargate via Terraform with full infrastructure-as-code.',
    descriptionEs:
      'Motor de trading para mercados de predicción implementando pricing LMSR, actualizaciones Bayesianas y Kelly Criterion para sizing óptimo. Desplegado en AWS ECS Fargate via Terraform con infraestructura como código.',
    tech: ['FastAPI', 'Supabase', 'AWS ECS', 'Terraform', 'Python'],
  },
  {
    id: 'cortex',
    title: 'Cortex — Multi-Agent Research System',
    role: 'Personal Project',
    roleEs: 'Proyecto Personal',
    year: '2026',
    description:
      'Autonomous research agent network where specialized LLM agents collaborate through hierarchical task decomposition. Agents crawl, extract, reason, and synthesize across sources with shared vector memory, self-evaluation loops, and inter-agent communication protocols.',
    descriptionEs:
      'Red autónoma de agentes de investigación donde agentes LLM especializados colaboran mediante descomposición jerárquica de tareas. Los agentes rastrean, extraen, razonan y sintetizan entre fuentes con memoria vectorial compartida, loops de auto-evaluación y protocolos de comunicación inter-agente.',
    tech: ['LangGraph', 'Claude API', 'FastAPI', 'Redis', 'PostgreSQL', 'AWS Bedrock'],
  },
  // — Blockchain —
  {
    id: 'stakeforge',
    title: 'StakeForge — Liquid Staking Protocol',
    role: 'Personal Project',
    roleEs: 'Proyecto Personal',
    year: '2026',
    description:
      'Non-custodial liquid staking protocol that issues yield-bearing receipt tokens. Features auto-compounding vaults, slashing insurance pool, and a governance module with time-weighted voting power. Deployed on Ethereum with full Foundry test suite.',
    descriptionEs:
      'Protocolo de liquid staking no-custodial que emite tokens de recibo con rendimiento. Incluye vaults auto-compounding, pool de seguro contra slashing y módulo de gobernanza con poder de voto ponderado por tiempo. Desplegado en Ethereum con suite completa de tests en Foundry.',
    tech: ['Solidity', 'Foundry', 'ERC-4626', 'Ethereum', 'React', 'The Graph'],
  },
  {
    id: 'sentinel',
    title: 'Sentinel — On-Chain Threat Detection',
    role: 'Personal Project',
    roleEs: 'Proyecto Personal',
    year: '2026',
    description:
      'Real-time blockchain monitoring system that detects rug pulls, wash trading, and suspicious wallet clusters using graph analysis and heuristic scoring. Indexes events via The Graph, flags anomalies, and pushes alerts through Telegram and webhooks.',
    descriptionEs:
      'Sistema de monitoreo blockchain en tiempo real que detecta rug pulls, wash trading y clusters de wallets sospechosos usando análisis de grafos y scoring heurístico. Indexa eventos via The Graph, flaggea anomalías y envía alertas por Telegram y webhooks.',
    tech: ['The Graph', 'TypeScript', 'PostgreSQL', 'Redis', 'Ethereum', 'Foundry'],
  },
  {
    id: 'veridex',
    title: 'VeriDEX — Verifiable DEX Protocol',
    role: 'Personal Project',
    roleEs: 'Proyecto Personal',
    year: '2026',
    description:
      'Decentralized exchange protocol with on-chain order book, MEV-resistant execution, and verifiable settlement proofs. Custom AMM curve optimized for concentrated liquidity with dynamic fee tiers based on volatility.',
    descriptionEs:
      'Protocolo de exchange descentralizado con order book on-chain, ejecución resistente a MEV y pruebas de liquidación verificables. Curva AMM custom optimizada para liquidez concentrada con fee tiers dinámicos basados en volatilidad.',
    tech: ['Solidity', 'Foundry', 'Rust', 'ERC-20', 'DeFi', 'The Graph'],
  },
];

export default function Projects() {
  const lang = useStore($lang);
  const text = t[lang].projects;

  return (
    <section id="projects" className="py-24 sm:py-32 px-6 border-t border-white/[0.06]">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-accent mb-3"
        >
          02 — {text.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-white/45 mb-12"
        >
          {text.subtitle}
        </motion.p>

        <div className="space-y-1">
          {PROJECTS.map((project, i) => {
            const desc = lang === 'es' ? project.descriptionEs : project.description;
            const role = lang === 'es' ? project.roleEs : project.role;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="group py-6 border-b border-white/[0.06] last:border-b-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                  <h3 className="text-lg font-semibold tracking-tight text-white/90 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-white/30 shrink-0">
                    {project.year}
                  </span>
                </div>

                <p className="font-mono text-xs text-white/35 mb-3">{role}</p>

                <p className="text-sm text-white/50 leading-relaxed mb-4 max-w-2xl">
                  {desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] text-white/35 px-2 py-0.5 rounded bg-white/[0.04]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
