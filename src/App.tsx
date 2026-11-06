import React, { useState } from 'react';
import { TopHeader } from './components/TopHeader';
import { Navbar } from './components/Navbar';
import { VideoPostingWindow } from './components/VideoPostingWindow';
import { CentralBanner } from './components/CentralBanner';
import { AudioContentHub } from './components/AudioContentHub';
import { FarcomBaSection } from './components/FarcomBaSection';
import { EventsSection } from './components/EventsSection';
import { ServicesSection } from './components/ServicesSection';
import { NewsSection } from './components/NewsSection';
import { OffersSection } from './components/OffersSection';
import { AdvertisingSidebar } from './components/AdvertisingSidebar';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BroadcasterRegisterModal } from './components/BroadcasterRegisterModal';
import { ClientAreaModal } from './components/ClientAreaModal';
import { mockAudioTracks, mockEmissoras, mockVideos, mockNews, mockEvents, mockClassifieds } from './data/mockData';
import { UserSession } from './types';

export default function App() {
  // Global user state with demo default
  const [userSession, setUserSession] = useState<UserSession>({
    isLoggedIn: false,
    userType: 'visitante',
    nomeEmissora: 'Rádio Cidade Nova FM',
    cidade: 'Feira de Santana - BA',
    email: 'contato@radiocidadenova.com.br',
    frequencia: '87.9 MHz',
    numeroFiliacao: 'BA-418',
    planoAtivo: true,
  });

  // Modal visibility states
  const [isBroadcasterModalOpen, setIsBroadcasterModalOpen] = useState(false);
  const [isClientAreaModalOpen, setIsClientAreaModalOpen] = useState(false);

  // Audio category filter state controlled via navbar or in-page
  const [activeAudioCategory, setActiveAudioCategory] = useState<'fala_bahia' | 'vinhetas' | 'spots' | 'jingles' | 'boletins'>('fala_bahia');

  // Offers subcategory filter state controlled via navbar or in-page
  const [activeOfferSubcategory, setActiveOfferSubcategory] = useState<string>('todos');

  // Login handler
  const handleLogin = (username: string, pass: string): boolean => {
    if (username && pass) {
      setUserSession((prev) => ({
        ...prev,
        isLoggedIn: true,
        userType: 'emissora',
      }));
      return true;
    }
    return false;
  };

  // Logout handler
  const handleLogout = () => {
    setUserSession((prev) => ({
      ...prev,
      isLoggedIn: false,
      userType: 'visitante',
    }));
  };

  const handleRegisterSuccess = (nomeEmissora: string, cidade: string) => {
    setUserSession((prev) => ({
      ...prev,
      isLoggedIn: true,
      nomeEmissora,
      cidade,
      numeroFiliacao: `BA-${Math.floor(500 + Math.random() * 400)}`,
    }));
    setIsBroadcasterModalOpen(false);
  };

  const handleNavbarAudioSelect = (cat: 'fala_bahia' | 'vinhetas' | 'spots' | 'jingles' | 'boletins') => {
    setActiveAudioCategory(cat);
    const elem = document.getElementById(cat === 'fala_bahia' ? 'fala-bahia-hoje' : cat);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavbarOffersSelect = (subcategory: string) => {
    setActiveOfferSubcategory(subcategory);
    const elem = document.getElementById('ofertas');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Âncora Topo */}
      <div id="topo" />

      {/* 1. TopHeader: Logo Oficial da FARCOM-BA 300x200, Login/Senha e Cadastro de Emissoras exclusivos no Topo */}
      <TopHeader
        userSession={userSession}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onOpenBroadcasterModal={() => setIsBroadcasterModalOpen(true)}
        onOpenClientArea={() => setIsClientAreaModalOpen(true)}
      />

      {/* 2. Barra de Menus com Links Âncora e Submenus */}
      <Navbar
        onSelectAudioCategory={handleNavbarAudioSelect}
        onSelectOffersCategory={handleNavbarOffersSelect}
      />

      {/* 3. Janela para Postar e Assistir Vídeos (Inserida Abaixo da Barra de Menus) */}
      <VideoPostingWindow initialVideos={mockVideos} />

      {/* 4. Banner Central: Filie-se à FARCOM-BA por apenas R$ 50,00 mensais com link de pagamento (PIX, Cartão, Depósito) */}
      <CentralBanner
        onOpenBroadcasterRegister={() => setIsBroadcasterModalOpen(true)}
        onPaymentConfirmed={() => {
          setUserSession((prev) => ({
            ...prev,
            isLoggedIn: true,
            planoAtivo: true,
          }));
        }}
      />

      {/* 5. Corpo Principal do Portal com Layout de 2 Colunas: Conteúdo Principal + Banners Publicitários 400x400 na Lateral Direita */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Coluna da Esquerda / Principal: Conteúdos de Áudio, FARCOM-BA, Eventos, Serviços, Notícias, Ofertas */}
          <div className="flex-1 w-full min-w-0 space-y-12">
            {/* Landing Page de Conteúdos de Áudio (Fala Bahia, Vinhetas, Spots, Jingles, Boletins) */}
            <AudioContentHub
              tracks={mockAudioTracks}
              activeCategory={activeAudioCategory}
              onSelectCategory={setActiveAudioCategory}
              userSession={userSession}
              onOpenLogin={() => setIsClientAreaModalOpen(true)}
              onOpenBroadcasterRegister={() => setIsBroadcasterModalOpen(true)}
            />

            {/* Seções FARCOM-BA: Quem Somos, Rádios Filiadas na Bahia, Benefícios, Seja Nosso Parceiro */}
            <FarcomBaSection
              emissoras={mockEmissoras}
              onOpenBroadcasterRegister={() => setIsBroadcasterModalOpen(true)}
            />

            {/* Menu Eventos: Sociais, Cursos, Congressos e Agenda */}
            <EventsSection events={mockEvents} />

            {/* Menu Serviços: Consulta Jurídica, Consulta Técnica, Rede de Convênios */}
            <ServicesSection />

            {/* Menu Notícias: Nacional e Estadual */}
            <NewsSection news={mockNews} />

            {/* Menu Ofertas: Automóveis (Carros, Caminhonetes, Máquinas, Implementos) e Imóveis (Casas, Apartamentos, Kinets, Fazendas, Chácaras, Lotes) */}
            <OffersSection
              offers={mockClassifieds}
              initialSubcategory={activeOfferSubcategory}
            />
          </div>

          {/* Coluna da Direita: Banners de Publicidade medindo exatamente 400x400 pixels na Lateral Direita do Site */}
          <div className="w-full lg:w-[420px] flex justify-center lg:justify-end">
            <div className="sticky top-20">
              <AdvertisingSidebar />
            </div>
          </div>
        </div>
      </main>

      {/* 6. Menu Contato */}
      <ContactSection />

      {/* 7. Rodapé Institucional */}
      <Footer />

      {/* Modais Globais */}
      {/* Formulário de Cadastro de Emissoras (Aparece no topo do site) */}
      <BroadcasterRegisterModal
        isOpen={isBroadcasterModalOpen}
        onClose={() => setIsBroadcasterModalOpen(false)}
        onRegisterSuccess={handleRegisterSuccess}
      />

      {/* Área do Cliente: Login e Senha em HTML + Dashboard de Downloads Exclusivos */}
      <ClientAreaModal
        isOpen={isClientAreaModalOpen}
        onClose={() => setIsClientAreaModalOpen(false)}
        userSession={userSession}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onOpenRegister={() => {
          setIsClientAreaModalOpen(false);
          setIsBroadcasterModalOpen(true);
        }}
      />
    </div>
  );
}
