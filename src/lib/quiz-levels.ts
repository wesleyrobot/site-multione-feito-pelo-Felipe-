export interface QuizQuestion {
  id: number;
  pergunta: string;
  opcoes: string[];
  respostaCorreta: number;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "Posso utilizar mais de uma integração na plataforma? (CHATBOT ou I.A)",
    opcoes: [
      "Sim, desde que sejam a mesma integração não ocorrera conflitos, ou seja uma I.A e um CHATBOT não recomendamos.",
      "não, apenas uma integração pode ser ativa por vez",
      "depende do plano contratado",

    ],
    respostaCorreta: 1,
  },
  {
    id: 2,
    pergunta: "Como funciona o processo de importação de contatos na plataforma?",
    opcoes: [
      "você consegue importar manualmente um contato por vez ou importar um arquivo por CSV seguindo modelo apresentado na plataforma",
      "Via API REST e importação em lote por CSV",
      "Somente por e-mail",
      "Não é possível importar dados",
    ],
    respostaCorreta: 1,
  },
  {
    id: 3,
    pergunta: "Os usuários de atendentes coneseguem desconectar a conexão do Whatsapp da plataforma?",
    opcoes: [
      "Sim, eles tem acesso a essa função",
      "Não, apenas usuários com perfil de gestor ou supervisor tem acesso a essa função",
      "depende da permissão de acesso configurada para cada usuário",

    ],
    respostaCorreta: 2,
  },
  {
    id: 4,
    pergunta:
      "Meu histórico antigo vai subir a plataforma?",
    opcoes: [
      "Não, como é um espelhamento, o histórico será gerado a partir da conexão em diante.",
      "Sim, todo o histórico de mensagens será importado automaticamente.",
      "Depende se o cliente tem mais de 1000 mensagens, nesse caso apenas as últimas 1000 serão importadas.",

    ],
    respostaCorreta: 1,
  },
  {
    id: 5,
    pergunta: "Quais as orientações básicas de conexão?",
    opcoes: [
      "Manter a conexão somente com a plataforma e o celular em uma rede estável, Não utilizar o WhatsApp no celular após a conexão para não perder os históricos e caso utilize WhatsApp Business e tenha mensagens de saudação desabilitar para não conflitar com a plataforma.",
      "Manter a conexão somente com a plataforma e o celular em uma rede estável, Utilizar o WhatsApp no celular normalmente, Não é necessário desabilitar mensagens de saudação do WhatsApp Business.",
      "Manter a conexão somente com a plataforma e o celular em uma rede estável, Utilizar o WhatsApp no celular normalmente, Desabilitar mensagens de saudação do WhatsApp Business para evitar conflitos com as mensagens automáticas da plataforma.",

    ],
    respostaCorreta: 1,
  },
  {
    id: 6,
    pergunta: "Gestor e Supervisor conseguem realizar atendimentos na plataforma?",
    opcoes: [
      "sim, ambos os perfis tem acesso a função de atendimento",
      "Não, apenas o perfil de usuário tem acesso a função de atendimento",
      "Depende da permissão de acesso configurada para cada usuário",

    ],
    respostaCorreta: 1,
  },
  {
    id: 7,
    pergunta: "O que fazer quando um cliente reporta um erro durante a implantação?",
    opcoes: [
      "Ignorar o erro",
      "Reiniciar todo o processo",
      "Documentar o erro, informando ao cliente que o erro foi registrado e será analisado pelo suporte técnico ou desenvolvimento",
      "Pedir para o cliente resolver sozinho",
    ],
    respostaCorreta: 3,
  },
  {
    id: 8,
    pergunta: "As mensagem rapidas criaças no perfil do usuário ficam disponíveis para outros usuários?",
    opcoes: [
      "Não, as mensagens rápidas criadas no perfil do usuário são exclusivas para aquele usuário e não ficam disponíveis para outros usuários na plataforma.",
      "Sim, as mensagens rápidas criadas no perfil do usuário ficam disponíveis para todos os usuários na plataforma.",
      "Apenas o gestor tem acesso as mensagens rápidas criadas por outros usuários",

    ],
    respostaCorreta: 1,
  },
];

export function calcularNivel(pontuacao: number): {
  nivel: string;
  descricao: string;
  cor: string;
} {
  const percentual = (pontuacao / quizQuestions.length) * 100;

  if (percentual >= 90) {
    return {
      nivel: "Expert",
      descricao:
        "Você domina a plataforma! Está pronto para liderar implantações complexas.",
      cor: "#00d4ff",
    };
  } else if (percentual >= 70) {
    return {
      nivel: "Avançado",
      descricao:
        "Ótimo conhecimento! Algumas áreas podem ser aprimoradas, mas você está no caminho certo.",
      cor: "#6c63ff",
    };
  } else if (percentual >= 50) {
    return {
      nivel: "Intermediário",
      descricao:
        "Bom progresso! Revise os módulos onde errou para fortalecer seu conhecimento.",
      cor: "#ff6bcb",
    };
  } else {
    return {
      nivel: "Iniciante",
      descricao:
        "Recomendamos revisar os vídeos de treinamento para melhorar seu entendimento da plataforma.",
      cor: "#ff4444",
    };
  }
}
