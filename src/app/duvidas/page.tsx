"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { HelpCircle, Search, ChevronDown, Tag } from "lucide-react";
import { ParticleCard } from "@/components/MagicBento";

const categorias = ["Todas"]

const faqItems = [
  {
    id: 1,
    categoria: "Configuração",
    pergunta: "Como que faz a conexão do Qr code, qual é a opção",
    resposta:
      "Acesse o módulo de Gestão > Conexões > Vai aparecer um + no canto superior do lado direito > Clicando nele vai aparecer as opções de conexão disponíveis > Escolha a do WhatsApp > Em seguida de um nome a conexão e clique em Adicionar > Após isso vai aparecer a opção de gerar o Qr Code > Escaneie com o app MultiOne e pronto!",
  }, 
  {
    id: 2,
    categoria: "Configuração",
    pergunta: "Como fazer Upload de arquivos?",
    resposta:
      "Acesse o módulo de Gestão > Lista de Arquivos > Clique no + no canto superior do lado direito > Selecione o nome da lista de arquivos > Detalhes se quiser > Vai aparecer um campo 'Mensagem para enviar com o arquivo' se quiser > Clicando no clipes do lado direito da mensagem, adicone o arquivo desejado > Clique em Salvar e pronto! O arquivo já estará disponível para ser enviado nos atendimentos.",
  },
  {
    id: 3,
    categoria: "Configuração",
    pergunta: "Como que altera a senha, o nome, etc",
    resposta:
      "Acesse o módulo de Gestão > Usuários > Clique no lapiz do lado do nome do usuário > Altere as informações desejadas > Clique em Salvar e pronto! As informações do usuário já estarão atualizadas.",
  },
  {
    id: 4,
    categoria: "Lentidão",
    pergunta: "Minha plataforma apresenta lentidão",
    resposta:
      "Verifique sua conexão de internet e certifique-se de que está utilizando um navegador atualizado (recomendamos Google Chrome, Opera e Brave). Limpar o cache do navegador pelo inspecionar também pode ajudar a melhorar o desempenho. Se o problema persistir, entre em contato com o suporte técnico através do módulo Suporte > Novo Chamado.",
  },
  {
    id: 5,
    categoria: "Configuração",
    pergunta: "Qual a diferença entre Gestor, Supervisor, Relacionamento e Usuário",
    resposta:
      "Gestor perfil master da plataforma com todo acesso a atendimentos e configurações, Supervisor se assemelha muito ao gestor, mas não tem acesso as funções de criar usuários, alterar conexões(números), Relacionamento em um nível hierárquico funciona um atendente, mas consegue visualizar todas as mensagens que ocorrem dentro de um departamento e Usuário perfil mais básico, com acesso aos atendimentos que ele iniciou ou recebeu na plataforma.",
  },
  {
    id: 6,
    categoria: "Integrações",
    pergunta: "Quais as possibilidades de integração a plataforma permite?",
    resposta:
      "1- I.A recepcionista, 2- CHATBOT e 3- CHATBOT simples criado na própria plataforma, ele permite mensagens de boas vindas geral, ou por departamento.",
  },
  {
    id: 7,
    categoria: "Integrações",
    pergunta: " Posso utilizar meu acesso simultâneo em duas maquinas ou maquina e aplicativo?",
    resposta:
      "Não, por acesso a plataforma permite um login online por vez.",
  },
  {
    id: 8,
    categoria: "Geral",
    pergunta: "Qual o navegador recomendado para usar a plataforma?",
    resposta:
      "Recomendamos Google Chrome (versão mais recente) ou Microsoft Edge. A plataforma também funciona no Firefox e Safari, mas pode haver diferenças visuais menores.",
  },
  {
    id: 9,
    categoria: "Geral",
    pergunta: "Como ira funcionar após eu conectar meu Whatsapp a plataforma?",
    resposta:
      "Os atendimentos seguirão por 3 etapas: 'Recepção' (Para atendimentos sem departamentos ou que ainda estão interagindo com alguma integração CHATBOT ou I.A), 'Departamento' (Clientes que já selecionaram algumas das opções da Integração e estão aguardando até que um usuário inicie este atendimento) e 'Conversa' (clientes já ativos em processo de atendimento humano).",
  },
  {
    id: 10,
    categoria: "Relatórios",
    pergunta: "Posso conectar quantos números na plataforma?",
    resposta:
      "Isso depende do plano que foi contratado no processo comercial, mas minimax, apenas 1 conexão, light e os demais permitem mais de uma",
  },
];

export default function DuvidasPage() {
    const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const [busca, setBusca] = useState("");
  const [aberto, setAberto] = useState<number | null>(null);

  const faqFiltrado = faqItems.filter((item) => {
    const matchCategoria =
      categoriaAtiva === "Todas" || item.categoria === categoriaAtiva;
    const matchBusca =
      item.pergunta.toLowerCase().includes(busca.toLowerCase()) ||
      item.resposta.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl text-white md:text-5xl font-bold mb-4">
            <span className="text-foreground/120">Dúvidas Frequentes</span>
        </h1>
        <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
          Encontre respostas para as perguntas mais comuns sobre a plataforma.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="Buscar dúvida..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-card border border-card-border text-foreground placeholder:text-muted focus:outline-none transition-colors text-lg"
          />
        </div>
      </motion.div>

      {/* Categorias */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex items-center gap-2 flex-wrap mb-8"
      >
        <Tag className="w-4 h-4 text-muted" />
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaAtiva(cat)}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              categoriaAtiva === cat
                ? "bg-primary text-white shadow-md"
                : "bg-card border border-card-border text-muted hover:text-foreground hover:border-primary/30"
            }`}
            style={
              categoriaAtiva === cat
                ? { boxShadow: "0 2px 10px rgba(29, 78, 216, 0.3)" }
                : {}
            }
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* FAQ List */}
            
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {faqFiltrado.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
<ParticleCard
              className="card p-5 h-full rounded-xl cursor-pointer"
              style={{ backgroundColor: "#0a1628" }}
              particleCount={12}
              glowColor="29, 78, 216"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect
              onClick={() => setAberto(item.id)}
            >
              <span className="text-xs px-2.5 py-1 rounded-md bg-primary/15 text-primary-light font-medium">
                {item.categoria}
              </span>
              <h3 className="font-medium text-foreground mt-3 mb-3">
                {item.pergunta}
              </h3>
              <p className="text-xs text-muted/50 text-center mt-4">
                Clique para ver resposta
              </p>
            </ParticleCard>


          </motion.div>
        ))}
        </div>

      {/* Modal com fundo borrado */}
      <AnimatePresence>
        {aberto !== null && (() => {
          const item = faqItems.find(f => f.id === aberto);
          if (!item) return null;
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setAberto(null)}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="relative w-full max-w-2xl card p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setAberto(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-card border border-card-border hover:bg-primary/20 hover:border-primary/40 transition-colors"
                >
                  <X className="w-5 h-5 text-muted" />
                </button>
                <span className="text-xs px-2.5 py-1 rounded-md bg-primary/15 text-primary-light font-medium">
                  {item.categoria}
                </span>
                <h2 className="text-xl font-bold text-foreground mt-4 mb-4">
                  {item.pergunta}
                </h2>
                <div className="border-l-2 border-primary/30 pl-4">
                  <p className="text-muted leading-relaxed">
                    {item.resposta}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {faqFiltrado.length === 0 && (
        <div className="text-center py-16">
          <HelpCircle className="w-12 h-12 text-muted/30 mx-auto mb-4" />
          <p className="text-muted">Nenhuma dúvida encontrada.</p>
        </div>
      )}
    </div>
  );
}
