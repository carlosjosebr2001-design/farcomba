import React, { useState } from 'react';
import { Shield, Radio, Users, Award, Handshake, MapPin, Search, CheckCircle, FileText, ExternalLink } from 'lucide-react';
import { EmissoraFiliada } from '../types';

interface FarcomBaSectionProps {
  emissoras: EmissoraFiliada[];
  onOpenBroadcasterRegister: () => void;
}

export const FarcomBaSection: React.FC<FarcomBaSectionProps> = ({
  emissoras,
  onOpenBroadcasterRegister,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegiao, setSelectedRegiao] = useState('todas');
  const [parceriaFormSubmitted, setParceriaFormSubmitted] = useState(false);

  // Filter emissoras
  const filteredEmissoras = emissoras.filter((em) => {
    const matchesSearch =
      em.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      em.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      em.frequencia.includes(searchTerm);
    const matchesRegiao = selectedRegiao === 'todas' || em.regiao === selectedRegiao;
    return matchesSearch && matchesRegiao;
  });

  const regioes = ['todas', ...Array.from(new Set(emissoras.map((e) => e.regiao)))];

  const handleParceriaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setParceriaFormSubmitted(true);
    setTimeout(() => setParceriaFormSubmitted(false), 4000);
  };

  return (
    <div className="space-y-16 py-8">
      {/* 1. QUEM SOMOS */}
      <section id="quem-somos" className="scroll-mt-20">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2.5 py-1 rounded">
              História e Missão
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Quem Somos: A Voz Comunitária da Bahia
            </h2>
            <p className="text-slate-700 text-sm sm:text-base mt-4 leading-relaxed">
              A <strong>FARCOM-BA (Federação das Associações de Rádio e Comunicação Comunitária do Estado da Bahia)</strong> é a entidade representativa máxima das emissoras comunitárias de rádio em frequência modulada (FM) outorgadas pelo Ministério das Comunicações em território baiano.
            </p>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Nascida da luta popular pela democratização da comunicação, a federação congrega associações de moradores, sindicatos de trabalhadores rurais, entidades culturais, quilombolas e coletivos da sociedade civil. Nossa missão é defender a radiodifusão livre, combater perseguições arbitrárias, garantir assessoria jurídica de qualidade e capacitar tecnicamente comunicadores em todos os 417 municípios do estado da Bahia.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  180+
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Emissoras Unidas</div>
                  <div className="text-[11px] text-slate-500">Em toda a Bahia</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  25+
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Anos de Atuação</div>
                  <div className="text-[11px] text-slate-500">Pela comunicação livre</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                  100%
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Legalidade MCom</div>
                  <div className="text-[11px] text-slate-500">Defesa técnica e ética</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RÁDIOS FILIADAS */}
      <section id="radios-filiadas" className="scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
              Rede de Emissoras
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Rádios Filiadas à FARCOM-BA
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Consulte as emissoras comunitárias outorgadas e regularizadas no estado da Bahia
            </p>
          </div>

          <button
            onClick={onOpenBroadcasterRegister}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition shadow-sm cursor-pointer whitespace-nowrap shrink-0"
          >
            Cadastrar Minha Emissora
          </button>
        </div>

        {/* Filtros e Busca de Emissoras */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar rádio por nome, município ou frequência..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
          </div>

          <div className="w-full md:w-60">
            <select
              value={selectedRegiao}
              onChange={(e) => setSelectedRegiao(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white"
            >
              {regioes.map((reg) => (
                <option key={reg} value={reg}>
                  {reg === 'todas' ? 'Todas as Regiões da Bahia' : reg}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grade de Emissoras */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmissoras.map((radio) => (
            <div
              key={radio.id}
              className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-blue-400 transition"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold text-xs rounded border border-blue-100">
                  {radio.frequencia}
                </span>
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Outorga Ativa</span>
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{radio.nome}</h4>
              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{radio.associacao}</p>

              <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="font-medium text-slate-800">{radio.cidade}</span>
                  <span className="text-slate-400">({radio.regiao})</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Prefixo: {radio.prefixo}</span>
                  <span>Filiada desde {radio.anoFiliacao}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BENEFÍCIOS */}
      <section id="beneficios" className="scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
            Vantagens Exclusivas
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            Benefícios para a Emissora Filiada
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Por apenas R$ 50,00 mensais sua emissora conta com respaldo profissional completo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 bg-white border border-slate-200 rounded-xl hover:shadow-md transition">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Suporte Jurídico MCom</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Acompanhamento de processos de renovação de outorga, defesas administrativas contra autos de infração e pareceres legais.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-xl hover:shadow-md transition">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
              <Radio className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Banco de Áudios Diário</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Downloads livres de programas jornalísticos, spots de conscientização, vinhetas personalizadas e identificadores musicais em alta fidelidade.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-xl hover:shadow-md transition">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Engenharia e Laudos Técnicos</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Orientação com engenheiros credenciados para montagem de parque transmissor, cálculo de EIRP e diagramas de irradiação.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-xl hover:shadow-md transition">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
              <Handshake className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Rede de Apoio Cultural</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Facilitação no credenciamento junto a órgãos governamentais e empresas para veiculação legítima de apoio cultural.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SEJA NOSSO PARCEIRO */}
      <section id="seja-parceiro" className="scroll-mt-20">
        <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/20 border border-amber-400/30 px-2.5 py-1 rounded">
                Parcerias Estratégicas
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Seja Nosso Parceiro Institucional
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Empresas de telecomunicações, prefeituras, órgãos estaduais, universidades e cooperativas podem firmar convênios com a FARCOM-BA para difusão de campanhas educativas, fornecimento de tecnologias e patrocínio das assembleias.
              </p>
              <div className="pt-2 text-xs text-blue-200 space-y-1">
                <div>✓ Parcerias para veiculação de campanhas institucionais em 180 rádios</div>
                <div>✓ Descontos especiais para compra coletiva de transmissores e antenas</div>
                <div>✓ Oficinas conjuntas de formação com universidades baianas</div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white text-slate-900 rounded-xl p-5 shadow-xl">
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Proponha uma Parceria
              </h4>
              <p className="text-[11px] text-slate-500 mb-3">
                Preencha os dados e nossa diretoria retornará em até 24 horas.
              </p>

              {parceriaFormSubmitted ? (
                <div className="py-6 text-center">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <div className="text-sm font-bold text-slate-900">Proposta Enviada!</div>
                  <div className="text-xs text-slate-600 mt-1">Entraremos em contato em breve.</div>
                </div>
              ) : (
                <form onSubmit={handleParceriaSubmit} className="space-y-2.5 text-xs">
                  <div>
                    <label className="block text-slate-700 font-medium mb-0.5">Empresa / Instituição</label>
                    <input
                      type="text"
                      placeholder="Ex: Prefeitura Municipal / Empresa de Tecnologia"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-0.5">Responsável / Cargo</label>
                    <input
                      type="text"
                      placeholder="Ex: Diretor de Comunicação"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-700 font-medium mb-0.5">WhatsApp / Fone</label>
                      <input
                        type="text"
                        placeholder="(71) 99999-9999"
                        className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium mb-0.5">E-mail</label>
                      <input
                        type="email"
                        placeholder="contato@empresa.com"
                        className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-0.5">Mensagem / Proposta</label>
                    <textarea
                      rows={2}
                      placeholder="Descreva brevemente a intenção da parceria..."
                      className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded transition cursor-pointer"
                  >
                    Enviar Proposta de Parceria
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
