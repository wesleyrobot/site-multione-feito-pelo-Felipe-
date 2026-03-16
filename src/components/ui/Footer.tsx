import { Zap } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-surface/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-lg font-bold gradient-text">MultiOne</span>
            </div>
            <p className="text-sm text-muted">
              Plataforma de implantação e treinamento para o time MultiOne.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Navegação
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/treinamentos", label: "Treinamentos" },
                { href: "/duvidas", label: "Dúvidas Frequentes" },
                { href: "/plataforma", label: "Plataforma" },
                { href: "/questionario", label: "Questionário" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Suporte
            </h3>
            <p className="text-sm text-muted">
              Dúvidas sobre a implantação? Entre em contato com o time de suporte.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} MultiOne. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
