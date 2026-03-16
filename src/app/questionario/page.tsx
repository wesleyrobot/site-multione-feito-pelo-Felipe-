"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck,
  ArrowRight,
  ArrowLeft,
  Trophy,
  RotateCcw,
  User,
  Mail,
} from "lucide-react";
import { quizQuestions, calcularNivel } from "@/lib/quiz-levels";

type Etapa = "dados" | "quiz" | "resultado";

export default function QuestionarioPage() {
  const [etapa, setEtapa] = useState<Etapa>("dados");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [pontuacao, setPontuacao] = useState(0);

  const progresso = ((perguntaAtual + 1) / quizQuestions.length) * 100;

  function iniciarQuiz() {
    if (!nome.trim() || !email.trim()) return;
    setEtapa("quiz");
  }

  function selecionarResposta(opcaoIndex: number) {
    setRespostas((prev) => ({ ...prev, [perguntaAtual]: opcaoIndex }));
  }

  function proximaPergunta() {
    if (respostas[perguntaAtual] === undefined) return;

    if (perguntaAtual < quizQuestions.length - 1) {
      setPerguntaAtual((prev) => prev + 1);
    } else {
      finalizarQuiz();
    }
  }

  function perguntaAnterior() {
    if (perguntaAtual > 0) {
      setPerguntaAtual((prev) => prev - 1);
    }
  }

  function finalizarQuiz() {
    let acertos = 0;
    quizQuestions.forEach((q, index) => {
      if (respostas[index] === q.respostaCorreta) {
        acertos++;
      }
    });

    setPontuacao(acertos);
    setEtapa("resultado");
  }

  function reiniciar() {
    setEtapa("dados");
    setNome("");
    setEmail("");
    setPerguntaAtual(0);
    setRespostas({});
    setPontuacao(0);
  }

  const resultado = calcularNivel(pontuacao);
  const pergunta = quizQuestions[perguntaAtual];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-foreground/120">Questionário</span>
        </h1>
        <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
          Teste seu conhecimento e descubra seu nível como implantador.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Etapa: Dados */}
        {etapa === "dados" && (
          <motion.div
            key="dados"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="card p-8"
          >
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Antes de começar, preencha seus dados:
            </h2>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm text-muted mb-2">
                  <User className="w-4 h-4" /> Nome completo
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-card-border text-foreground placeholder:text-muted focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-muted mb-2">
                  <Mail className="w-4 h-4" /> E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-card-border text-foreground placeholder:text-muted focus:outline-none transition-colors"
                />
              </div>
              <button
                onClick={iniciarQuiz}
                disabled={!nome.trim() || !email.trim()}
                className="w-full mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Iniciar Questionário <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Etapa: Quiz */}
        {etapa === "quiz" && pergunta && (
          <motion.div
            key={`quiz-${perguntaAtual}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Barra de progresso */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted">
                  Pergunta {perguntaAtual + 1} de {quizQuestions.length}
                </span>
                <span className="text-sm text-primary-light font-medium">
                  {Math.round(progresso)}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-card overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progresso}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Pergunta */}
            <div className="card p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                {pergunta.pergunta}
              </h2>

              <div className="space-y-3 mb-8">
                {pergunta.opcoes.map((opcao, index) => (
                  <button
                    key={index}
                    onClick={() => selecionarResposta(index)}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                      respostas[perguntaAtual] === index
                        ? "border-primary bg-primary/10 text-foreground shadow-md"
                        : "border-card-border bg-surface/80 text-muted hover:border-primary/30 hover:text-foreground"
                    }`}
                    style={
                      respostas[perguntaAtual] === index
                        ? { boxShadow: "0 0 15px rgba(29, 78, 216, 0.15)" }
                        : {}
                    }
                  >
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium mr-3 ${
                        respostas[perguntaAtual] === index
                          ? "bg-primary text-white"
                          : "bg-card-border text-muted"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    {opcao}
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={perguntaAnterior}
                  disabled={perguntaAtual === 0}
                  className="px-5 py-3 rounded-xl border border-card-border text-muted hover:text-foreground hover:bg-white/[0.02] hover:border-primary/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Anterior
                </button>
                <button
                  onClick={proximaPergunta}
                  disabled={respostas[perguntaAtual] === undefined}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {perguntaAtual === quizQuestions.length - 1
                    ? "Finalizar"
                    : "Próxima"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Etapa: Resultado */}
        {etapa === "resultado" && (
          <motion.div
            key="resultado"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex p-4 rounded-full mb-6"
              style={{ backgroundColor: `${resultado.cor}20` }}
            >
              <Trophy className="w-12 h-12" style={{ color: resultado.cor }} />
            </motion.div>

            <h2 className="text-2xl font-bold text-foreground mb-2">
              {nome}, seu nível é:
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold mb-4"
              style={{ color: resultado.cor }}
            >
              {resultado.nivel}
            </motion.p>

            <p className="text-muted mb-6 max-w-md mx-auto">
              {resultado.descricao}
            </p>

            <div className="rounded-xl bg-surface/80 border border-card-border/40 p-6 mb-8 inline-block">
              <div className="flex items-center gap-8 justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary-light">{pontuacao}</p>
                  <p className="text-sm text-muted">Acertos</p>
                </div>
                <div className="w-px h-12 bg-card-border" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-foreground">
                    {quizQuestions.length}
                  </p>
                  <p className="text-sm text-muted">Total</p>
                </div>
                <div className="w-px h-12 bg-card-border" />
                <div className="text-center">
                  <p className="text-3xl font-bold" style={{ color: resultado.cor }}>
                    {Math.round((pontuacao / quizQuestions.length) * 100)}%
                  </p>
                  <p className="text-sm text-muted">Aproveitamento</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={reiniciar}
                className="px-6 py-3 rounded-xl border border-card-border text-muted hover:text-foreground hover:bg-white/[0.02] hover:border-primary/30 transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Fazer Novamente
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
