"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

const sections = [
  {
    title: "Dúvidas Frequentes",
    description:
      "Encontre respostas para as dúvidas mais comuns dos nossos clientes.",
    href: "/duvidas",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Plataforma",
    description:
      "Informações detalhadas sobre módulos, funcionalidades e recursos.",
    href: "/plataforma",
    gradient: "from-cyan-500 to-sky-500",
  },
  {
    title: "Questionário",
    description:
      "Teste seu conhecimento e descubra seu nível como implantador.",
    href: "/questionario",
    gradient: "from-indigo-500 to-blue-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-foreground/120">
            Bem-vindo ao MultiOne
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-foreground/80">
            Sua central de treinamento e conhecimento para implantação.
            Aprenda, tire dúvidas e avalie seu progresso.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
           
            <Link
              href="/questionario"
              className="px-8 py-3 rounded-xl border border-card-border text-foreground/80 hover:bg-card/50 hover:border-primary/30 transition-all flex items-center gap-2"
            >
              Fazer Questionário
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Sections Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {sections.map((section) => (
            <motion.div key={section.title} variants={item}>
              <Link href={section.href} className="block group">
                <div className="card p-8 h-full">
                  <div className="flex items-end justify-end mb-6">
                    <ArrowRight className="w-5 h-5 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-white transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {section.description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-card-border/50">
                    <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                      Acessar seção
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
