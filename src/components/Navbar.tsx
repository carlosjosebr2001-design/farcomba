import React, { useState } from 'react';
import { ChevronDown, Menu, X, Radio, Mic, Calendar, Headphones, Briefcase, Newspaper, ShoppingBag, Mail } from 'lucide-react';

interface NavbarProps {
  onSelectAudioCategory?: (cat: 'fala_bahia' | 'vinhetas' | 'spots' | 'jingles' | 'boletins') => void;
  onSelectOffersCategory?: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectAudioCategory,
  onSelectOffersCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownHover = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const handleAudioSubItemClick = (cat: 'vinhetas' | 'spots' | 'jingles') => {
    if (onSelectAudioCategory) {
      onSelectAudioCategory(cat);
    }
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const handleOfferSubItemClick = (sub: string) => {
    if (onSelectOffersCategory) {
      onSelectOffersCategory(sub);
    }
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo compact / Brand Home anchor */}
          <div className="flex items-center gap-2">
            <a
              href="#topo"
              className="flex items-center gap-2 font-bold text-base tracking-tight text-white hover:text-amber-400 transition"
            >
              <span className="w-8 h-8 rounded bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-sm font-black text-sm">
                BA
              </span>
              <span className="hidden sm:inline font-bold">FARCOM-BA</span>
            </a>
          </div>

          {/* Desktop Navigation Links & Dropdowns */}
          <div className="hidden lg:flex items-center space-x-1 text-xs xl:text-sm font-medium">
            {/* 1. Menu FARCOM-BA */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownHover('farcomba')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-slate-200 hover:text-white hover:bg-slate-800/80 rounded transition cursor-pointer"
              >
                <span>FARCOM-BA</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'farcomba' && (
                <div className="absolute left-0 mt-0 w-52 bg-white text-slate-900 border border-slate-200 rounded-md shadow-xl py-1.5 z-50">
                  <a
                    href="#quem-somos"
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition"
                  >
                    Quem Somos
                  </a>
                  <a
                    href="#radios-filiadas"
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition"
                  >
                    Rádios Filiadas
                  </a>
                  <a
                    href="#beneficios"
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition"
                  >
                    Benefícios
                  </a>
                  <a
                    href="#seja-parceiro"
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition font-medium text-blue-700"
                  >
                    Seja Nosso Parceiro
                  </a>
                </div>
              )}
            </div>

            {/* 2. Menu Fala Bahia (com hover para Vinhetas, Spots, Jingles) */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownHover('fala-bahia')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-amber-400 hover:text-amber-300 hover:bg-slate-800/80 rounded transition cursor-pointer font-semibold"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Fala Bahia</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-400/80" />
              </button>

              {activeDropdown === 'fala-bahia' && (
                <div className="absolute left-0 mt-0 w-64 bg-white text-slate-900 border border-slate-200 rounded-md shadow-xl py-1.5 z-50">
                  <a
                    href="#fala-bahia-hoje"
                    onClick={() => {
                      if (onSelectAudioCategory) onSelectAudioCategory('fala_bahia');
                      setActiveDropdown(null);
                    }}
                    className="block px-4 py-2.5 font-semibold text-blue-800 bg-blue-50/50 hover:bg-blue-100/60 transition border-b border-slate-100"
                  >
                    Programa de Hoje
                  </a>

                  {/* Submenu Mais Conteúdos: Vinhetas, Spots, Jingles */}
                  <div className="px-4 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Mais Conteúdos de Áudio
                  </div>
                  <a
                    href="#vinhetas"
                    onClick={() => handleAudioSubItemClick('vinhetas')}
                    className="flex items-center justify-between px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition"
                  >
                    <span className="flex items-center gap-2">
                      <Headphones className="w-3.5 h-3.5 text-blue-600" />
                      <span>Vinhetas</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Identificação & Cortes</span>
                  </a>
                  <a
                    href="#spots"
                    onClick={() => handleAudioSubItemClick('spots')}
                    className="flex items-center justify-between px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition"
                  >
                    <span className="flex items-center gap-2">
                      <Radio className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Spots</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Utilidade & Campanhas</span>
                  </a>
                  <a
                    href="#jingles"
                    onClick={() => handleAudioSubItemClick('jingles')}
                    className="flex items-center justify-between px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition"
                  >
                    <span className="flex items-center gap-2">
                      <Mic className="w-3.5 h-3.5 text-amber-600" />
                      <span>Jingles</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Musicais & Festivos</span>
                  </a>
                </div>
              )}
            </div>

            {/* 3. Menu Eventos */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownHover('eventos')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-slate-200 hover:text-white hover:bg-slate-800/80 rounded transition cursor-pointer"
              >
                <span>Eventos</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'eventos' && (
                <div className="absolute left-0 mt-0 w-52 bg-white text-slate-900 border border-slate-200 rounded-md shadow-xl py-1.5 z-50">
                  <a
                    href="#eventos-sociais"
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition"
                  >
                    Sociais
                  </a>
                  <a
                    href="#eventos-cursos"
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition"
                  >
                    Cursos
                  </a>
                  <a
                    href="#eventos-congressos"
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition"
                  >
                    Congressos
                  </a>
                  <a
                    href="#eventos-agenda"
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition text-amber-700 font-medium"
                  >
                    Agenda
                  </a>
                </div>
              )}
            </div>

            {/* 4. Menu Serviços */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownHover('servicos')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-slate-200 hover:text-white hover:bg-slate-800/80 rounded transition cursor-pointer"
              >
                <span>Serviços</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'servicos' && (
                <div className="absolute left-0 mt-0 w-56 bg-white text-slate-900 border border-slate-200 rounded-md shadow-xl py-1.5 z-50">
                  <a
                    href="#servicos-juridico"
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition"
                  >
                    Consulta Jurídica
                  </a>
                  <a
                    href="#servicos-tecnico"
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition"
                  >
                    Consulta Técnica
                  </a>
                  <a
                    href="#servicos-convenios"
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition"
                  >
                    Rede de Convênios
                  </a>
                </div>
              )}
            </div>

            {/* 5. Menu Notícias */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownHover('noticias')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-slate-200 hover:text-white hover:bg-slate-800/80 rounded transition cursor-pointer"
              >
                <span>Notícias</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'noticias' && (
                <div className="absolute left-0 mt-0 w-48 bg-white text-slate-900 border border-slate-200 rounded-md shadow-xl py-1.5 z-50">
                  <a
                    href="#noticias-nacional"
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition"
                  >
                    Nacional
                  </a>
                  <a
                    href="#noticias-estadual"
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 hover:bg-slate-50 hover:text-blue-600 transition font-medium text-blue-700"
                  >
                    Estadual (Bahia)
                  </a>
                </div>
              )}
            </div>

            {/* 6. Menu Ofertas (Automóveis e Imóveis com seus submenus) */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownHover('ofertas')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-2 text-slate-200 hover:text-amber-400 hover:bg-slate-800/80 rounded transition cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                <span>Ofertas</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'ofertas' && (
                <div className="absolute left-0 mt-0 w-72 bg-white text-slate-900 border border-slate-200 rounded-md shadow-xl p-3 z-50 grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider mb-1.5 pb-1 border-b border-slate-100">
                      Automóveis
                    </div>
                    <div className="space-y-1 text-xs">
                      <a
                        href="#ofertas"
                        onClick={() => handleOfferSubItemClick('carros')}
                        className="block py-1 hover:text-blue-600 transition"
                      >
                        Carros
                      </a>
                      <a
                        href="#ofertas"
                        onClick={() => handleOfferSubItemClick('caminhonetes')}
                        className="block py-1 hover:text-blue-600 transition"
                      >
                        Caminhonetes
                      </a>
                      <a
                        href="#ofertas"
                        onClick={() => handleOfferSubItemClick('maquinas')}
                        className="block py-1 hover:text-blue-600 transition"
                      >
                        Máquinas
                      </a>
                      <a
                        href="#ofertas"
                        onClick={() => handleOfferSubItemClick('implementos')}
                        className="block py-1 hover:text-blue-600 transition"
                      >
                        Implementos
                      </a>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1.5 pb-1 border-b border-slate-100">
                      Imóveis
                    </div>
                    <div className="space-y-1 text-xs">
                      <a
                        href="#ofertas"
                        onClick={() => handleOfferSubItemClick('casas')}
                        className="block py-1 hover:text-emerald-700 transition"
                      >
                        Casas
                      </a>
                      <a
                        href="#ofertas"
                        onClick={() => handleOfferSubItemClick('apartamentos')}
                        className="block py-1 hover:text-emerald-700 transition"
                      >
                        Apartamentos
                      </a>
                      <a
                        href="#ofertas"
                        onClick={() => handleOfferSubItemClick('kinets')}
                        className="block py-1 hover:text-emerald-700 transition"
                      >
                        Kinets (Kitnets)
                      </a>
                      <a
                        href="#ofertas"
                        onClick={() => handleOfferSubItemClick('fazendas')}
                        className="block py-1 hover:text-emerald-700 transition"
                      >
                        Fazendas
                      </a>
                      <a
                        href="#ofertas"
                        onClick={() => handleOfferSubItemClick('chacaras_sitios')}
                        className="block py-1 hover:text-emerald-700 transition"
                      >
                        Chácaras / Sítios
                      </a>
                      <a
                        href="#ofertas"
                        onClick={() => handleOfferSubItemClick('lotes_urbanos')}
                        className="block py-1 hover:text-emerald-700 transition"
                      >
                        Lotes Urbanos
                      </a>
                      <a
                        href="#ofertas"
                        onClick={() => handleOfferSubItemClick('lotes_rurais')}
                        className="block py-1 hover:text-emerald-700 transition"
                      >
                        Lotes Rurais
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 7. Menu Contato */}
            <a
              href="#contato"
              className="flex items-center gap-1 px-3 py-2 text-slate-200 hover:text-white hover:bg-slate-800/80 rounded transition"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>Contato</span>
            </a>
          </div>

          {/* Quick CTA right button on navbar */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#banner-filiacao"
              className="px-3.5 py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              Filie sua Rádio (R$ 50/mês)
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded focus:outline-none"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
          {/* FARCOM-BA */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">FARCOM-BA</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#quem-somos" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-white py-1">Quem Somos</a>
              <a href="#radios-filiadas" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-white py-1">Rádios Filiadas</a>
              <a href="#beneficios" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-white py-1">Benefícios</a>
              <a href="#seja-parceiro" onClick={() => setMobileMenuOpen(false)} className="text-amber-400 hover:text-amber-300 py-1 font-semibold">Seja Nosso Parceiro</a>
            </div>
          </div>

          {/* Fala Bahia */}
          <div className="pt-2 border-t border-slate-800">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Fala Bahia & Conteúdos de Áudio</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#fala-bahia-hoje" onClick={() => { if (onSelectAudioCategory) onSelectAudioCategory('fala_bahia'); setMobileMenuOpen(false); }} className="text-slate-200 hover:text-white py-1">Programa de Hoje</a>
              <a href="#vinhetas" onClick={() => handleAudioSubItemClick('vinhetas')} className="text-slate-200 hover:text-white py-1">Vinhetas</a>
              <a href="#spots" onClick={() => handleAudioSubItemClick('spots')} className="text-slate-200 hover:text-white py-1">Spots</a>
              <a href="#jingles" onClick={() => handleAudioSubItemClick('jingles')} className="text-slate-200 hover:text-white py-1">Jingles</a>
            </div>
          </div>

          {/* Eventos & Serviços */}
          <div className="pt-2 border-t border-slate-800">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Eventos & Serviços</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#eventos-sociais" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-white py-1">Sociais</a>
              <a href="#eventos-cursos" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-white py-1">Cursos</a>
              <a href="#eventos-congressos" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-white py-1">Congressos</a>
              <a href="#eventos-agenda" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-white py-1">Agenda</a>
              <a href="#servicos-juridico" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-white py-1">Consulta Jurídica</a>
              <a href="#servicos-tecnico" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-white py-1">Consulta Técnica</a>
              <a href="#servicos-convenios" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-white py-1">Rede de Convênios</a>
            </div>
          </div>

          {/* Notícias & Ofertas */}
          <div className="pt-2 border-t border-slate-800">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Notícias & Ofertas</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#noticias-nacional" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-white py-1">Notícias Nacional</a>
              <a href="#noticias-estadual" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-white py-1">Notícias Estadual</a>
              <a href="#ofertas" onClick={() => { if (onSelectOffersCategory) onSelectOffersCategory('carros'); setMobileMenuOpen(false); }} className="text-amber-400 hover:text-white py-1">Classificados de Automóveis</a>
              <a href="#ofertas" onClick={() => { if (onSelectOffersCategory) onSelectOffersCategory('casas'); setMobileMenuOpen(false); }} className="text-emerald-400 hover:text-white py-1">Classificados de Imóveis</a>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <a href="#contato" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-xs text-blue-400 font-medium">Contato com a FARCOM-BA</a>
          </div>
        </div>
      )}
    </nav>
  );
};
