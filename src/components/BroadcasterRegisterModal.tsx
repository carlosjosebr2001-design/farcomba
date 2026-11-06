import React, { useState } from 'react';
import { X, Radio, Building2, CheckCircle2, ShieldCheck, FileText, Send, MapPin, Phone, Mail } from 'lucide-react';

interface BroadcasterRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (emissoraName: string, cidade: string) => void;
}

export const BroadcasterRegisterModal: React.FC<BroadcasterRegisterModalProps> = ({
  isOpen,
  onClose,
  onRegisterSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [nomeEmissora, setNomeEmissora] = useState('');
  const [associacao, setAssociacao] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [frequencia, setFrequencia] = useState('87.9 MHz');
  const [prefixo, setPrefixo] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [presidente, setPresidente] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [potencia, setPotencia] = useState('25 Watts ERP');
  const [alturaTorre, setAlturaTorre] = useState('30 metros');
  const [aceitoTermos, setAceitoTermos] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeEmissora || !cidade || !whatsapp) return;
    setStep('success');
    setTimeout(() => {
      onRegisterSuccess(nomeEmissora, cidade);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-700 rounded-lg">
              <Radio className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                Federação das Rádios Comunitárias da Bahia
              </div>
              <h3 className="text-lg font-bold">Cadastro Oficial de Emissora Comunitária</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'success' ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Emissora Cadastrada com Sucesso!</h4>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  A <strong>{nomeEmissora}</strong> ({cidade}/BA) foi pré-cadastrada no sistema central da FARCOM-BA. Seu protocolo de filiação é <strong>#BA-{Math.floor(1000 + Math.random() * 9000)}</strong>.
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-left text-xs text-slate-700 max-w-md mx-auto space-y-1.5">
                <div>✓ Cadastro liberado no sistema de login do topo do site</div>
                <div>✓ Chave de acesso aos downloads de áudio ativada</div>
                <div>✓ Mensalidade associativa: R$ 50,00 (Sem taxa de inscrição)</div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition cursor-pointer"
                >
                  Concluir e Acessar o Portal
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 text-xs">
                <strong>Importante:</strong> Este formulário é destinado a Associações Comunitárias outorgadas ou em processo de autorização perante o Ministério das Comunicações na Bahia.
              </div>

              {/* Seção 1: Dados da Emissora e Associação */}
              <div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-1 mb-2 border-b border-slate-200">
                  1. Dados da Emissora e Entidade Mantenedora
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Nome Fantasia da Rádio *</label>
                    <input
                      type="text"
                      value={nomeEmissora}
                      onChange={(e) => setNomeEmissora(e.target.value)}
                      placeholder="Ex: Rádio Comunitária Voz do Povo FM"
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Razão Social da Associação *</label>
                    <input
                      type="text"
                      value={associacao}
                      onChange={(e) => setAssociacao(e.target.value)}
                      placeholder="Ex: Associação de Moradores e Amigos..."
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">CNPJ da Associação</label>
                    <input
                      type="text"
                      value={cnpj}
                      onChange={(e) => setCnpj(e.target.value)}
                      placeholder="00.000.000/0001-00"
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Frequência FM</label>
                      <input
                        type="text"
                        value={frequencia}
                        onChange={(e) => setFrequencia(e.target.value)}
                        placeholder="87.9 MHz"
                        className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Prefixo / ZYS</label>
                      <input
                        type="text"
                        value={prefixo}
                        onChange={(e) => setPrefixo(e.target.value)}
                        placeholder="ZYS 800"
                        className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Seção 2: Localização e Responsável */}
              <div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-1 mb-2 border-b border-slate-200">
                  2. Município e Contatos
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Município da Bahia *</label>
                    <input
                      type="text"
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      placeholder="Ex: Feira de Santana, Ilhéus, Salvador..."
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none font-semibold text-blue-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Endereço do Estúdio / Sede</label>
                    <input
                      type="text"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      placeholder="Rua, Número, Bairro"
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Nome do Diretor / Presidente *</label>
                    <input
                      type="text"
                      value={presidente}
                      onChange={(e) => setPresidente(e.target.value)}
                      placeholder="Nome completo do responsável legal"
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">WhatsApp *</label>
                      <input
                        type="text"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="(71) 99999-9999"
                        className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">E-mail Oficial</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contato@radio.com.br"
                        className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Seção 3: Dados Técnicos de Irradiação */}
              <div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-1 mb-2 border-b border-slate-200">
                  3. Parque Transmissor
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Potência de Transmissão</label>
                    <input
                      type="text"
                      value={potencia}
                      onChange={(e) => setPotencia(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Altura da Torre de Irradiação</label>
                    <input
                      type="text"
                      value={alturaTorre}
                      onChange={(e) => setAlturaTorre(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Termo de Adesão */}
              <div className="pt-2">
                <label className="flex items-start gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aceitoTermos}
                    onChange={(e) => setAceitoTermos(e.target.checked)}
                    className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <span>
                    Declaro sob as penas da lei que as informações prestadas são verídicas e solicito a filiação da emissora aos quadros da FARCOM-BA, comprometendo-me com a mensalidade de R$ 50,00 após aprovação.
                  </span>
                </label>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded shadow transition cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Cadastro da Emissora</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
