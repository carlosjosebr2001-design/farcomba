import React, { useState } from 'react';
import { User, Lock, Radio, LogIn, LogOut, FileText, CheckCircle2, ShieldCheck, Phone, ChevronDown } from 'lucide-react';
import { UserSession } from '../types';

interface TopHeaderProps {
  userSession: UserSession;
  onLogin: (username: string, pass: string) => boolean;
  onLogout: () => void;
  onOpenBroadcasterModal: () => void;
  onOpenClientArea: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  userSession,
  onLogin,
  onLogout,
  onOpenBroadcasterModal,
  onOpenClientArea,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  const handleQuickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setLoginError('Informe usuário e senha.');
      return;
    }
    const ok = onLogin(username, password);
    if (!ok) {
      setLoginError('Credenciais inválidas.');
    } else {
      setLoginError('');
      setShowLoginDropdown(false);
    }
  };

  const handleDemoLogin = () => {
    onLogin('emissora@farcomba.org.br', '123456');
    setShowLoginDropdown(false);
  };

  return (
    <header className="w-full bg-white border-b border-slate-200">
      {/* 1. Barra Superior Exclusiva de Acesso e Cadastro (Topo do Site) */}
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Informações Institucionais no topo */}
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 font-medium text-slate-200">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Portal Oficial FARCOM-BA</span>
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>Central: (71) 3241-8900 / (75) 99812-4040</span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-300">Salvador - Bahia</span>
          </div>

          {/* Menus Exclusivos de Topo: Login (Usuário e Senha) & Cadastro de Emissoras */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Cadastro de Emissoras (Aparece só no topo do site) */}
            <button
              onClick={onOpenBroadcasterModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors shadow-sm cursor-pointer whitespace-nowrap shrink-0"
              title="Abrir formulário de cadastro de emissora comunitária"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Cadastro de Emissoras</span>
            </button>

            {/* Menu Login e Submenus Usuário / Senha (Aparece só no topo do site) */}
            {userSession.isLoggedIn ? (
              <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded px-2.5 py-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[130px] sm:max-w-[180px]">{userSession.nomeEmissora}</span>
                </div>
                <button
                  onClick={onOpenClientArea}
                  className="px-2 py-0.5 bg-blue-600/80 hover:bg-blue-600 text-white rounded text-[11px] font-medium transition cursor-pointer"
                >
                  Área do Cliente
                </button>
                <button
                  onClick={onLogout}
                  className="text-slate-400 hover:text-red-400 p-0.5 transition cursor-pointer"
                  title="Sair da conta"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>Área do Cliente / Login</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showLoginDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Submenu Dropdown com Usuário e Senha */}
                {showLoginDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white text-slate-900 border border-slate-200 shadow-2xl rounded-lg p-4 z-50">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                      <div className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
                        <LogIn className="w-4 h-4 text-blue-600" />
                        <span>Acesso do Filiado</span>
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Login / Senha</span>
                    </div>

                    <form onSubmit={handleQuickLogin} className="space-y-3">
                      {loginError && (
                        <div className="p-2 bg-red-50 text-red-700 text-[11px] rounded border border-red-200">
                          {loginError}
                        </div>
                      )}
                      <div>
                        <label className="block text-slate-600 font-medium text-[11px] mb-1">
                          Usuário / E-mail da Rádio
                        </label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="ex: radiofm ou email@emissora.com"
                            className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-600 font-medium text-[11px] mb-1">
                          Senha de Acesso
                        </label>
                        <div className="relative">
                          <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                            required
                          />
                        </div>
                      </div>

                      <div className="pt-1 flex items-center justify-between gap-2">
                        <button
                          type="submit"
                          className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <LogIn className="w-3.5 h-3.5" />
                          <span>Entrar</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleDemoLogin}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[11px] rounded transition cursor-pointer"
                          title="Acesso de teste rápido com credencial demonstrativa"
                        >
                          Demo 1-Clique
                        </button>
                      </div>
                    </form>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Não tem cadastro?</span>
                      <button
                        type="button"
                        onClick={() => {
                          setShowLoginDropdown(false);
                          onOpenBroadcasterModal();
                        }}
                        className="text-blue-600 hover:underline font-semibold cursor-pointer"
                      >
                        Cadastre sua Rádio
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Logotipo FARCOM-BA no Título com Exatamente 300px x 200px */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Logotipo da FARCOM-BA medindo 300 pixels de largura e 200 pixels de altura */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div
              className="w-[300px] h-[200px] shrink-0 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex items-center justify-center p-2 relative group"
              style={{ width: '300px', height: '200px' }}
            >
              <img
                src="/src/assets/images/farcomba_logo_1794004161724.jpg"
                alt="Logo Oficial FARCOM-BA - Federação das Associações de Rádio e Comunicação Comunitária da Bahia"
                className="w-[300px] h-[200px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                width={300}
                height={200}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Título Institucional e Descrição Oficial */}
            <div className="text-center sm:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded inline-block mb-2">
                Radiodifusão Comunitária Legal da Bahia
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
                FARCOM-BA
              </h1>
              <p className="text-sm sm:text-base font-medium text-slate-700 mt-1 max-w-xl">
                Federação das Associações de Rádio e Comunicação Comunitária do Estado da Bahia
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-lg">
                Filiada à ABRAÇO Brasil · Defesa técnica, jurídica e difusão de conteúdos de áudio de utilidade pública para as emissoras baianas.
              </p>
            </div>
          </div>

          {/* Destaque rápido de credibilidade no cabeçalho */}
          <div className="hidden xl:flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase">Rede Estadual de Comunicação</div>
              <div className="text-lg font-bold text-slate-900">+180 Emissoras Comunitárias</div>
              <div className="text-xs text-slate-600">Presente em todas as regiões da Bahia</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
