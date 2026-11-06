import React, { useState } from 'react';
import { Scale, Wrench, Handshake, CheckCircle2, MessageSquare, Send, ShieldCheck, FileCheck } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'juridico' | 'tecnico' | 'convenios'>('juridico');
  const [formSent, setFormSent] = useState(false);

  // Form states
  const [emissora, setEmissora] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setEmissora('');
      setResponsavel('');
      setTelefone('');
      setMensagem('');
    }, 4000);
  };

  return (
    <section id="servicos" className="py-10 bg-white">
      {/* Anchor targets */}
      <div id="servicos-juridico" />
      <div id="servicos-tecnico" />
      <div id="servicos-convenios" />

      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
            Assessoria Especializada
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Serviços para Rádios Comunitárias
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Corpo técnico e jurídico permanente dedicado a defender e regularizar as emissoras da Bahia
          </p>
        </div>

        {/* Abas dos Serviços */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('juridico')}
            className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition border-b-2 cursor-pointer flex items-center gap-2 ${
              activeTab === 'juridico'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Consulta Jurídica</span>
          </button>

          <button
            onClick={() => setActiveTab('tecnico')}
            className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition border-b-2 cursor-pointer flex items-center gap-2 ${
              activeTab === 'tecnico'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Consulta Técnica</span>
          </button>

          <button
            onClick={() => setActiveTab('convenios')}
            className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition border-b-2 cursor-pointer flex items-center gap-2 ${
              activeTab === 'convenios'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Handshake className="w-4 h-4" />
            <span>Rede de Convênios</span>
          </button>
        </div>

        {/* Conteúdo do Serviço Selecionado + Formulário de Solicitação */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            {activeTab === 'juridico' && (
              <div className="space-y-4 animate-fade-in">
                <div className="p-5 bg-blue-50/60 border border-blue-200 rounded-xl">
                  <h3 className="text-lg font-bold text-blue-950 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-blue-700" />
                    <span>Assessoria Jurídica em Telecomunicações e MCom</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                    A área jurídica da FARCOM-BA é conduzida por advogados especialistas na Lei Federal nº 9.612/1998 e regulamentações do Ministério das Comunicações e Anatel.
                  </p>
                  <ul className="mt-3 space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Renovação de Outorga:</strong> Protocolo completo e peticionamento sem risco de caducidade.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Defesa contra Autos de Infração:</strong> Recursos administrativos junto à Anatel por fiscalizações.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Estatutos e Atas de Eleição:</strong> Revisão estatutária e adequação aos mandatos associativos.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'tecnico' && (
              <div className="space-y-4 animate-fade-in">
                <div className="p-5 bg-amber-50/60 border border-amber-200 rounded-xl">
                  <h3 className="text-lg font-bold text-amber-950 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-amber-700" />
                    <span>Suporte e Engenharia de Radiofrequência</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                    Consultoria direta com engenheiros eletrônicos credenciados no CREA-BA para garantir que sua transmissão opere dentro da potência máxima permitida de 25W ERP e sem espúrios.
                  </p>
                  <ul className="mt-3 space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Laudo de Vistoria Técnica:</strong> Documento exigido pelo MCom e assinado com ART.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Dimensionamento de Antena e Cabo:</strong> Cálculo de perdas de cabo coaxial e altura da torre.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Configuração de Processadores de Áudio e RDS:</strong> Maximize a nitidez e alcance sem distorção.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'convenios' && (
              <div className="space-y-4 animate-fade-in">
                <div className="p-5 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                  <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
                    <Handshake className="w-5 h-5 text-emerald-700" />
                    <span>Rede de Convênios & Apoio Cultural Governamental</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                    A FARCOM-BA articula pontes institucionais para que as emissoras comunitárias recebam fomento por meio do Apoio Cultural previsto no Artigo 18 da Lei 9.612.
                  </p>
                  <ul className="mt-3 space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Campanhas do Governo da Bahia:</strong> Veiculação remunerada de spots educativos de saúde e educação.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Descontos Coletivos com Fabricantes:</strong> Economize até 30% em transmissores homologados e antenas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Capacitação com Universidades:</strong> Bolsas e workshops para comunicadores populares.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Formulário de Consulta / Atendimento */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-xs">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 mb-1">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Abrir Chamado de Atendimento</span>
            </h4>
            <p className="text-[11px] text-slate-500 mb-3">
              Envie sua dúvida jurídica ou técnica para análise preliminar de nossos consultores.
            </p>

            {formSent ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                <h5 className="font-bold text-slate-900 text-sm">Chamado Protocolado!</h5>
                <p className="text-xs text-slate-600 mt-1">
                  Protocolo #{Math.floor(100000 + Math.random() * 900000)}. Nosso setor entrará em contato via WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Nome da Emissora / Associação</label>
                  <input
                    type="text"
                    value={emissora}
                    onChange={(e) => setEmissora(e.target.value)}
                    placeholder="Ex: Rádio Esperança Comunitária FM"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Nome do Solicitante / Diretor</label>
                  <input
                    type="text"
                    value={responsavel}
                    onChange={(e) => setResponsavel(e.target.value)}
                    placeholder="Ex: João Ferreira dos Santos"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">WhatsApp de Contato</label>
                  <input
                    type="text"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(71) 98888-7777"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Detalhamento da Dúvida / Processo</label>
                  <textarea
                    rows={3}
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder="Descreva a notificação da Anatel, prazo de outorga ou dúvida técnica..."
                    className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar para Análise dos Especialistas</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
