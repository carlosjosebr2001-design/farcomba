import React, { useState } from 'react';
import { ShieldCheck, Radio, QrCode, CreditCard, Building2, Check, ArrowRight, Zap, Headphones, Award } from 'lucide-react';
import { PaymentModal } from './PaymentModal';

interface CentralBannerProps {
  onOpenBroadcasterRegister: () => void;
  onPaymentConfirmed?: () => void;
}

export const CentralBanner: React.FC<CentralBannerProps> = ({
  onOpenBroadcasterRegister,
  onPaymentConfirmed,
}) => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState<'pix' | 'cartao' | 'deposito'>('pix');

  const openPaymentWithMethod = (method: 'pix' | 'cartao' | 'deposito') => {
    setActivePaymentMethod(method);
    setIsPaymentOpen(true);
  };

  return (
    <section id="banner-filiacao" className="w-full py-8 sm:py-10 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white border-2 border-amber-400/40">
          {/* Subtle background glow & texture */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Proposition and Value */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-md shadow-sm flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Campanha Estadual de Fortalecimento</span>
                  </span>
                  <span className="text-xs text-blue-200">
                    Mais de 180 emissoras comunitárias unidas
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                  Filie-se à <span className="text-amber-400">FARCOM-BA</span> por apenas{' '}
                  <span className="text-emerald-400 underline decoration-amber-400 decoration-wavy">
                    R$ 50,00 mensais
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
                  Garanta segurança jurídica, suporte técnico e programação de alto padrão para sua rádio comunitária.
                  Conteúdos diários do <strong>Programa Fala Bahia</strong>, pacotes de <strong>vinhetas exclusivas</strong>, 
                  <strong>spots de cidadania</strong> e representação legítima em Salvador e Brasília.
                </p>

                {/* 4 Pillars of Affiliation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-lg p-2.5">
                    <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">Assessoria Jurídica MCom & Anatel</div>
                      <div className="text-[11px] text-slate-300">Defesa contra multas e auxílio na renovação de outorga</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-lg p-2.5">
                    <Headphones className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">Download Diário do Fala Bahia</div>
                      <div className="text-[11px] text-slate-300">Programa completo e blocos prontos para sua grade</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-lg p-2.5">
                    <Radio className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">Pacote de Vinhetas, Spots & Jingles</div>
                      <div className="text-[11px] text-slate-300">Produções profissionais com locutores de renome</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-lg p-2.5">
                    <Award className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">Acesso à Rede de Convênios</div>
                      <div className="text-[11px] text-slate-300">Apoio cultural e patrocínios governamentais</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Pricing Card & Payment CTA */}
              <div className="lg:col-span-4 flex flex-col justify-center">
                <div className="bg-white text-slate-900 rounded-xl p-6 shadow-xl border border-slate-200">
                  <div className="text-center pb-4 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
                      Plano Emissora Comunitária
                    </span>
                    <div className="mt-2 flex items-baseline justify-center gap-1">
                      <span className="text-base font-semibold text-slate-600">R$</span>
                      <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">50,00</span>
                      <span className="text-sm font-medium text-slate-500">/mês</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Sem taxa de matrícula · Cancelamento a qualquer momento
                    </p>
                  </div>

                  {/* Primary CTA */}
                  <div className="py-4 space-y-2">
                    <button
                      onClick={() => setIsPaymentOpen(true)}
                      className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-emerald-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Filiar Minha Rádio Agora</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={onOpenBroadcasterRegister}
                      className="w-full py-2 px-3 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded transition cursor-pointer"
                    >
                      Preencher Formulário de Cadastro
                    </button>
                  </div>

                  {/* Links diretos para os Meios de Pagamento */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="text-[11px] font-semibold text-slate-500 text-center uppercase tracking-wider mb-2">
                      Pague com Praticidade via:
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 text-center">
                      <button
                        onClick={() => openPaymentWithMethod('pix')}
                        className="py-1.5 px-2 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded text-xs font-semibold text-slate-700 hover:text-emerald-700 transition flex flex-col items-center justify-center cursor-pointer"
                      >
                        <QrCode className="w-4 h-4 text-emerald-600 mb-0.5" />
                        <span>PIX</span>
                      </button>

                      <button
                        onClick={() => openPaymentWithMethod('cartao')}
                        className="py-1.5 px-2 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 rounded text-xs font-semibold text-slate-700 hover:text-blue-700 transition flex flex-col items-center justify-center cursor-pointer"
                      >
                        <CreditCard className="w-4 h-4 text-blue-600 mb-0.5" />
                        <span>Cartão</span>
                      </button>

                      <button
                        onClick={() => openPaymentWithMethod('deposito')}
                        className="py-1.5 px-2 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 border border-slate-200 rounded text-xs font-semibold text-slate-700 hover:text-amber-700 transition flex flex-col items-center justify-center cursor-pointer"
                      >
                        <Building2 className="w-4 h-4 text-amber-600 mb-0.5" />
                        <span>Depósito</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onPaymentSuccess={(plan) => {
          if (onPaymentConfirmed) onPaymentConfirmed();
        }}
      />
    </section>
  );
};
