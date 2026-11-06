import React, { useState } from 'react';
import { X, User, Lock, Radio, ShieldCheck, Download, Award, FileText, CheckCircle2, LogOut, KeyRound, Sparkles } from 'lucide-react';
import { UserSession } from '../types';

interface ClientAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  userSession: UserSession;
  onLogin: (user: string, pass: string) => boolean;
  onLogout: () => void;
  onOpenRegister: () => void;
}

export const ClientAreaModal: React.FC<ClientAreaModalProps> = ({
  isOpen,
  onClose,
  userSession,
  onLogin,
  onLogout,
  onOpenRegister,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onLogin(username, password);
    if (!ok) {
      setLoginError('Usuário ou senha inválidos.');
    } else {
      setLoginError('');
    }
  };

  const handleDemoLogin = () => {
    onLogin('radiocidadenova@farcomba.org.br', '123456');
    setLoginError('');
  };

  const handleDownloadPack = (name: string) => {
    const dummy = `FARCOM-BA - PACOTE EXCLUSIVO PARA ASSOCIADOS\nItem: ${name}\nBeneficiário: ${userSession.nomeEmissora}\nData de Emissão: ${new Date().toLocaleDateString('pt-BR')}`;
    const blob = new Blob([dummy], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(`Download do "${name}" gerado com sucesso!`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-700/80 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                Portal do Radiodifusor Comunitário
              </div>
              <h3 className="text-lg font-bold">Área do Cliente FARCOM-BA</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {downloadSuccess && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{downloadSuccess}</span>
            </div>
          )}

          {userSession.isLoggedIn ? (
            /* Logged in member view */
            <div className="space-y-5">
              {/* Carteira Digital da Emissora */}
              <div className="p-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-xl border border-slate-700 shadow-md relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded">
                      Emissora Filiada Ativa
                    </span>
                    <h4 className="text-xl font-bold text-white mt-1">
                      {userSession.nomeEmissora}
                    </h4>
                    <div className="text-xs text-blue-200 mt-0.5">
                      Frequência: <strong>{userSession.frequencia}</strong> · Município: <strong>{userSession.cidade}</strong>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Matrícula FARCOM:</span>
                    <span className="font-mono text-xs font-bold text-amber-300">{userSession.numeroFiliacao}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Plano R$ 50,00/mês em dia</span>
                  </span>
                  <span>Validade: 31/12/2026</span>
                </div>
              </div>

              {/* Pacotes para Download Direto */}
              <div>
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Downloads Exclusivos Liberados para sua Rádio:
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Pacote Mensal Completo de Vinhetas (Novembro 2026)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Arquivo ZIP contendo 12 vinhetas em 320kbps + trilhas para locução
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadPack('Pacote_Vinhetas_Novembro_2026')}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded transition flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar ZIP</span>
                    </button>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Programa Fala Bahia - Grade Semanal
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Todos os blocos editados e sem intervalos comerciais
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadPack('Fala_Bahia_Semanal')}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded transition flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar MP3</span>
                    </button>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Certidão de Regularidade Institucional FARCOM-BA
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Documento oficial com código de autenticidade para comprovação jurídica
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadPack('Certidao_FARCOM_2026')}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded transition flex items-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Emitir PDF</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Botão Sair */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">Sessão autenticada</span>
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs rounded transition flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sair da Conta</span>
                </button>
              </div>
            </div>
          ) : (
            /* Login Form view */
            <div>
              <div className="mb-4">
                <h4 className="text-base font-bold text-slate-900">Entrar na Área do Cliente</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Insira o usuário e senha da emissora para acessar todos os downloads de áudio e certificados.
                </p>
              </div>

              {loginError && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs mb-3">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    Usuário ou E-mail da Rádio
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="usuario@emissora.com ou radiocidadenova"
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    Senha de Acesso
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded shadow transition cursor-pointer"
                  >
                    Acessar Área do Cliente
                  </button>
                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded transition cursor-pointer"
                  >
                    Demo 1-Clique
                  </button>
                </div>
              </form>

              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Sua emissora ainda não é filiada?</span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenRegister();
                  }}
                  className="text-blue-700 font-bold hover:underline cursor-pointer"
                >
                  Cadastre sua Rádio
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
