import React from 'react';
import { Radio, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Coluna 1: FARCOM-BA Brand */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <span className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                BA
              </span>
              <span>FARCOM-BA</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Federação das Associações de Rádio e Comunicação Comunitária da Bahia. Defendendo o direito humano à comunicação livre, democrática e popular em todas as regiões do estado.
            </p>
            <div className="text-[11px] text-slate-500">
              CNPJ: 08.412.395/0001-84 · Filiada à ABRAÇO Brasil
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div>
            <div className="text-white font-semibold text-xs uppercase tracking-wider mb-2.5">
              FARCOM-BA
            </div>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#quem-somos" className="hover:text-white transition">Quem Somos</a></li>
              <li><a href="#radios-filiadas" className="hover:text-white transition">Rádios Filiadas</a></li>
              <li><a href="#beneficios" className="hover:text-white transition">Benefícios da Filiação</a></li>
              <li><a href="#seja-parceiro" className="hover:text-white transition">Seja Nosso Parceiro</a></li>
              <li><a href="#banner-filiacao" className="text-amber-400 hover:text-amber-300 font-semibold transition">Filiar-se por R$ 50/mês</a></li>
            </ul>
          </div>

          {/* Coluna 3: Fala Bahia & Conteúdos */}
          <div>
            <div className="text-white font-semibold text-xs uppercase tracking-wider mb-2.5">
              Conteúdos de Áudio
            </div>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#fala-bahia-hoje" className="hover:text-white transition">Programa Fala Bahia</a></li>
              <li><a href="#vinhetas" className="hover:text-white transition">Vinhetas Institucionais</a></li>
              <li><a href="#spots" className="hover:text-white transition">Spots de Utilidade Pública</a></li>
              <li><a href="#jingles" className="hover:text-white transition">Jingles & Músicas</a></li>
              <li><a href="#noticias" className="hover:text-white transition">Notícias da Radiodifusão</a></li>
            </ul>
          </div>

          {/* Coluna 4: Classificados & Eventos */}
          <div>
            <div className="text-white font-semibold text-xs uppercase tracking-wider mb-2.5">
              Ofertas & Serviços
            </div>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#ofertas" className="hover:text-white transition">Classificados Automóveis</a></li>
              <li><a href="#ofertas" className="hover:text-white transition">Classificados Imóveis</a></li>
              <li><a href="#eventos" className="hover:text-white transition">Cursos e Congressos</a></li>
              <li><a href="#servicos-juridico" className="hover:text-white transition">Assessoria Jurídica</a></li>
              <li><a href="#contato" className="hover:text-white transition">Fale Conosco</a></li>
            </ul>
          </div>
        </div>

        {/* Linha Inferior com Copyright e Menção Legal */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} FARCOM-BA. Todos os direitos reservados. Em conformidade com a Lei Federal nº 9.612/1998.
          </div>
          <div className="flex items-center gap-1">
            <span>Radiodifusão Comunitária · A Voz Popular da Bahia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
