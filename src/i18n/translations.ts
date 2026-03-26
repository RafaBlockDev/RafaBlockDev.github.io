export const t = {
  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      stack: 'Stack',
      writing: 'Writing',
      now: 'Now',
      contact: 'Contact',
    },
    hero: {
      name: 'Rafael Fuentes',
      subtitle: 'AI & Software Engineer from Mexico City 🇲🇽 — building intelligent systems that think, trade, and scale.',
      tagline: '6+ years shipping production code. From multi-agent AI systems to DeFi protocols.',
      cta1: 'See my work',
      cta2: "Let's build something",
    },
    about: {
      title: 'About me',
      bio: "Software engineer with 6+ years building production systems across AI/LLM, full-stack, and blockchain. Currently specializing in LLM-driven agent orchestration, multi-agent reasoning pipelines, and retrieval-augmented generation. I've led engineering teams as VP of Engineering, shipped DeFi protocols, built NFT platforms, and now I architect AI agent systems that run in production.",
      bio2: "Self-taught engineer from CDMX. I learn fast, ship faster, and I'm most dangerous with a terminal, coffee, and a hard problem at 3 AM.",
      stats: {
        years: 'Years shipping',
        projects: 'Projects shipped',
        companies: 'Companies',
        languages: 'Languages',
      },
    },
    projects: {
      title: 'Notable Projects',
      subtitle: 'Personal projects & key work — built, shipped, and running.',
    },
    stack: {
      title: 'Stack',
      subtitle: 'What I work with daily',
    },
    threads: {
      title: 'Latest from the Streets',
      subtitle: 'Thoughts, threads & takes on AI × Blockchain',
      readMore: 'Read thread →',
    },
    now: {
      title: 'Currently Building',
      status: 'LIVE',
      description: 'Polymarket Trading Backend — a prediction market engine with LMSR pricing, Bayesian updates, and Kelly Criterion for optimal bet sizing.',
      codename: 'FastAPI · Supabase · AWS ECS Fargate · Terraform',
      update: 'Last updated: March 2026',
    },
    contact: {
      title: "Let's talk",
      subtitle: "Serious inquiries only. I'm open to AI/LLM engineering roles and high-impact collaborations.",
      cta: 'Book a call',
      or: 'or find me on',
    },
    footer: {
      made: 'Made with blood, sweat, tacos & Grok',
      rights: '© 2026 Rafael Fuentes. Mexico City.',
    },
  },
  es: {
    nav: {
      about: 'Sobre mí',
      projects: 'Proyectos',
      stack: 'Stack',
      writing: 'Escritos',
      now: 'Ahora',
      contact: 'Contacto',
    },
    hero: {
      name: 'Rafael Fuentes',
      subtitle: 'AI & Software Engineer desde la Ciudad de México 🇲🇽 — construyendo sistemas inteligentes que piensan, tradean y escalan.',
      tagline: '6+ años shippeando código a producción. De sistemas multi-agente a protocolos DeFi.',
      cta1: 'Ver mi trabajo',
      cta2: 'Construyamos algo',
    },
    about: {
      title: 'Sobre mí',
      bio: 'Ingeniero de software con 6+ años construyendo sistemas en producción en AI/LLM, full-stack y blockchain. Actualmente especializado en orquestación de agentes LLM, pipelines de razonamiento multi-agente y generación aumentada por recuperación (RAG). He liderado equipos de ingeniería como VP de Engineering, desplegado protocolos DeFi, construido plataformas NFT, y ahora arquitecto sistemas de agentes IA que corren en producción.',
      bio2: 'Ingeniero autodidacta de la CDMX. Aprendo rápido, shippeo más rápido, y soy más peligroso con una terminal, café, y un problema difícil a las 3 AM.',
      stats: {
        years: 'Años shippeando',
        projects: 'Proyectos enviados',
        companies: 'Empresas',
        languages: 'Lenguajes',
      },
    },
    projects: {
      title: 'Proyectos Destacados',
      subtitle: 'Proyectos personales y trabajo clave — construidos, enviados y corriendo.',
    },
    stack: {
      title: 'Stack',
      subtitle: 'Con lo que trabajo a diario',
    },
    threads: {
      title: 'Lo Último de las Calles',
      subtitle: 'Pensamientos, hilos y takes sobre IA × Blockchain',
      readMore: 'Leer hilo →',
    },
    now: {
      title: 'Construyendo Ahora',
      status: 'EN VIVO',
      description: 'Polymarket Trading Backend — un motor de mercado de predicción con pricing LMSR, actualizaciones Bayesianas y Kelly Criterion para sizing óptimo de apuestas.',
      codename: 'FastAPI · Supabase · AWS ECS Fargate · Terraform',
      update: 'Última actualización: Marzo 2026',
    },
    contact: {
      title: 'Hablemos',
      subtitle: 'Solo consultas serias. Estoy abierto a roles de ingeniería AI/LLM y colaboraciones de alto impacto.',
      cta: 'Agenda una llamada',
      or: 'o encuéntrame en',
    },
    footer: {
      made: 'Hecho con sangre, sudor, tacos y Grok',
      rights: '© 2026 Rafael Fuentes. Ciudad de México.',
    },
  },
} as const;

export type Translations = typeof t.en;
