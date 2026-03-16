"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleCard, GlobalSpotlight } from "@/components/MagicBento";
import { useRef } from "react";

import {
  MessageSquare,
  MessagesSquare,
  Zap,
  FolderKanban,
  Contact,
  CalendarDays,
  Tags,
  LayoutDashboard,
  BarChart3,
  FileStack,
  Building2,
  Users,
  Settings,
  Layers,
  Plug,
  Brain,
  Megaphone,
  ClipboardList,
  Sparkles,
  Lightbulb,
  TrendingUp,
  HeadphonesIcon,
  ShoppingCart,
  DollarSign,
  Calculator,
  Scale,
  UserSearch,
  Cpu,
  ShieldCheck,
  Truck,
  Smartphone,
  BarChart,
  Building,
  Wrench,
  Star,
  LifeBuoy,
  Rocket,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SubTopico {
  titulo: string;
  itens: { nome: string; icon: LucideIcon }[];
}

interface Modulo {
  titulo: string;
  descricao: string;
  icon: LucideIcon;
  gradient: string;
  badge?: string;
  subTopicos: SubTopico[];
}

const modulos: Modulo[] = [
  {
    titulo: "Atendimento",
    descricao:
      "Central de comunicação e organização para gerenciar todos os pontos de contato com o cliente.",
    icon: MessageSquare,
    gradient: "from-blue-600 to-blue-400",
    subTopicos: [
      {
        titulo: "Comunicação",
        itens: [
          { nome: "Atendimentos", icon: HeadphonesIcon },
          { nome: "Chat Interno", icon: MessagesSquare },
          { nome: "Respostas Rápidas", icon: Zap },
        ],
      },
      {
        titulo: "Organização",
        itens: [
          { nome: "Gestão de Controle", icon: FolderKanban },
          { nome: "Contatos", icon: Contact },
          { nome: "Agendamentos", icon: CalendarDays },
          { nome: "Etiquetas", icon: Tags },
        ],
      },
    ],
  },
  {
    titulo: "Gestão",
    descricao:
      "Ferramentas completas de análise, gerenciamento e administração da plataforma.",
    icon: LayoutDashboard,
    gradient: "from-blue-500 to-cyan-500",
    subTopicos: [
      {
        titulo: "Análise",
        itens: [
          { nome: "Dashboard", icon: LayoutDashboard },
          { nome: "Relatórios", icon: BarChart3 },
        ],
      },
      {
        titulo: "Gerenciamento",
        itens: [
          { nome: "Etiquetas", icon: Tags },
          { nome: "Lista de Arquivos", icon: FileStack },
          { nome: "Departamentos", icon: Building2 },
        ],
      },
      {
        titulo: "Administração",
        itens: [
          { nome: "Usuários", icon: Users },
          { nome: "Config. Adicionais", icon: Settings },
          { nome: "Operações em Massa", icon: Layers },
          { nome: "Conexões", icon: Plug },
          { nome: "Integrações", icon: Plug },
        ],
      },
    ],
  },
  {
    titulo: "Inteligência Artificial",
    descricao:
      "Recursos avançados de I.A para campanhas, relatórios e equipes especializadas por área.",
    icon: Brain,
    gradient: "from-cyan-500 to-sky-500",
    subTopicos: [
      {
        titulo: "Serviços com I.A",
        itens: [
          { nome: "I.A Campanhas", icon: Megaphone },
          { nome: "I.A Relatórios", icon: ClipboardList },
          { nome: "Personalização da I.A", icon: Sparkles },
        ],
      },
      {
        titulo: "Equipes de I.A",
        itens: [
          { nome: "Ideias & Novos Negócios", icon: Lightbulb },
          { nome: "Marketing", icon: TrendingUp },
          { nome: "Atendimento ao Cliente", icon: HeadphonesIcon },
          { nome: "Vendas e Comercial", icon: ShoppingCart },
          { nome: "Financeira", icon: DollarSign },
          { nome: "Contábil & Fiscal", icon: Calculator },
          { nome: "Jurídica", icon: Scale },
          { nome: "RH & Recrutamento", icon: UserSearch },
          { nome: "TI", icon: Cpu },
          { nome: "Qualidade & Compliance", icon: ShieldCheck },
          { nome: "Logística & Operações", icon: Truck },
        ],
      },
    ],
  },
  {
    titulo: "Serviços",
    descricao:
      "Em desenvolvimento - Módulos de campanhas SMS e captação de leads para potencializar sua estratégia comercial.",
    icon: Smartphone,
    gradient: "from-indigo-500 to-blue-500",
    badge: "Em Desenvolvimento",
    subTopicos: [
      {
        titulo: "Serviços",
        itens: [
          { nome: "SMS Campanhas", icon: Megaphone },
          { nome: "SMS Relatórios", icon: BarChart },
          { nome: "Leads Empresas", icon: Building },
        ],
      },
    ],
  },
  {
    titulo: "Suporte",
    descricao:
      "Projetos especiais fora dos planos padrão e novidades que estão por vir na plataforma.",
    icon: Wrench,
    gradient: "from-sky-500 to-blue-600",
    subTopicos: [
      {
        titulo: "Recursos Especiais",
        itens: [
          { nome: "Projetos Especial", icon: Star },
          { nome: "Suporte", icon: LifeBuoy },
        ],
      },
      {
        titulo: "Próximas Atualizações",
        itens: [{ nome: "Novidades", icon: Rocket }],
      },
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function PlataformaPage() {
   const [openIndex, setOpenIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
       <GlobalSpotlight
        gridRef={gridRef}
        enabled={true}
        spotlightRadius={400}
        glowColor="29, 78, 216"
      />
      <motion.div
        ref={gridRef}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bento-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <h1 className="text-4xl text-white md:text-5xl font-bold mb-4">
            <span className="text-foreground/120">A Plataforma</span>
        </h1>
        <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
          Conheça todos os módulos e funcionalidades disponíveis na MultiOne.
        </p>
      </motion.div>

           <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {modulos.map((modulo, index) => (
          <motion.div
            key={modulo.titulo}
            variants={itemVariant}
          >
            <ParticleCard
              className="bento-card card p-8 h-full cursor-pointer hover:border-primary/30 transition-all duration-300 rounded-xl"
              style={{ backgroundColor: "#0a1628" }}
              particleCount={12}
              glowColor="29, 78, 216"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect
              onClick={() => setOpenIndex(index)}
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-foreground">
                  {modulo.titulo}
                </h2>
                {modulo.badge && (
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20 font-medium">
                    {modulo.badge}
                  </span>
                )}
              </div>
              <p className="text-muted text-sm mb-5">{modulo.descricao}</p>
              <div
                className={`h-0.5 w-full rounded-full bg-gradient-to-r ${modulo.gradient} opacity-40`}
              />
              <p className="text-xs text-muted/50 text-center mt-6">
                Clique para ver detalhes
              </p>
            </ParticleCard>
          </motion.div>
        ))}
      </motion.div>


      {/* Modal com fundo borrado */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setOpenIndex(null)}
          >
            {/* Fundo borrado */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

            {/* Card do modal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto card p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão fechar */}
              <button
                onClick={() => setOpenIndex(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-card border border-card-border hover:bg-primary/20 hover:border-primary/40 transition-colors"
              >
                <X className="w-5 h-5 text-muted" />
              </button>

              {/* Cabeçalho do modal */}
              <div className="mb-6 pr-10">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    {modulos[openIndex].titulo}
                  </h2>
                  {modulos[openIndex].badge && (
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20 font-medium">
                      {modulos[openIndex].badge}
                    </span>
                  )}
                </div>
                <p className="text-muted text-sm">
                  {modulos[openIndex].descricao}
                </p>
                <div
                  className={`h-0.5 w-full rounded-full bg-gradient-to-r ${modulos[openIndex].gradient} opacity-40 mt-4`}
                />
              </div>

              {/* Sub-tópicos */}
              <div
                className={`grid gap-5 ${
                  modulos[openIndex].subTopicos.length >= 2
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {modulos[openIndex].subTopicos.map((sub) => (
                  <div
                    key={sub.titulo}
                    className="rounded-xl bg-surface/80 border border-card-border/40 p-5"
                  >
                    <h3 className="text-sm font-semibold text-primary-light uppercase tracking-wider mb-4">
                      {sub.titulo}
                    </h3>
                    <ul className="space-y-2.5">
                      {sub.itens.map((item) => (
                        <li
                          key={item.nome}
                          className="flex items-center gap-3 text-sm text-foreground/80"
                        >
                          <item.icon className="w-4 h-4 text-secondary shrink-0" />
                          {item.nome}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
