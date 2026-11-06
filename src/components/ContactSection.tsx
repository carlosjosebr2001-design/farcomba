import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setNome('');
      setEmail('');
      setCidade('');
      setMensagem('');
    }, 4000);
  };

  return (
    <section id="contato" className="py-12 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Informações Institucionais da FARCOM-BA */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/20 px-2.5 py-1 rounded inline-block">
              Fale com a Diretoria
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Contato com a FARCOM-BA
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Estamos à disposição de todas as associações de moradores, comunicadores populares, autoridades e apoiadores culturais em toda a Bahia.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start gap-3 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Sede Administrativa Estadual</div>
                  <div className="text-slate-300">Rua da Ajuda, nº 45, Edifício Sulacap, Sala 602 - Centro Histórico</div>
                  <div className="text-slate-400">Salvador - BA · CEP: 40020-030</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Telefones & Atendimento ao Radiodifusor</div>
                  <div className="text-slate-300">PABX Salvador: (71) 3241-8900</div>
                  <div className="text-slate-300">Plantão Feira de Santana / Interior: (75) 99812-4040</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Canais de E-mail Oficiais</div>
                  <div className="text-slate-300">Geral: presidencia@farcomba.org.br</div>
                  <div className="text-slate-300">Jurídico: juridico@farcomba.org.br</div>
                  <div className="text-slate-300">Áudios & Fala Bahia: falabahia@farcomba.org.br</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/5571998124040?text=Olá,%20gostaria%20de%20falar%20com%20a%20diretoria%20da%20FARCOM-BA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition flex items-center justify-center gap-2 shadow cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Atendimento Rápido pelo WhatsApp Institucional</span>
              </a>
            </div>
          </div>

          {/* Formulário de Mensagem Direta */}
          <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-1">
              Envie uma Mensagem para Nossa Equipe
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Dúvidas sobre filiação, outorgas, sugestão de pauta para o Fala Bahia ou denúncias.
            </p>

            {enviado ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-2" />
                <h4 className="text-lg font-bold text-white">Mensagem Enviada com Sucesso!</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Nossa secretaria geral responderá em seu e-mail e WhatsApp em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Seu Nome / Comunicador *</label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Nome completo"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">E-mail de Contato *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@exemplo.com"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Sua Rádio e Município da Bahia *</label>
                  <input
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    placeholder="Ex: Rádio Voz Comunitária FM - Vitória da Conquista"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Mensagem *</label>
                  <textarea
                    rows={4}
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder="Escreva sua solicitação, dúvida sobre os R$ 50/mês ou consulta..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded shadow transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensagem</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
