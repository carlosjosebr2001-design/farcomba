import React, { useState } from 'react';
import { ShoppingBag, Car, Home, Tag, MapPin, Phone, MessageCircle, Filter, Search, PlusCircle, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { ClassifiedOffer, AutoSubcategory, ImovelSubcategory } from '../types';

interface OffersSectionProps {
  offers: ClassifiedOffer[];
  initialSubcategory?: string;
}

export const OffersSection: React.FC<OffersSectionProps> = ({
  offers,
  initialSubcategory,
}) => {
  const [mainType, setMainType] = useState<'todos' | 'automovel' | 'imovel'>('todos');
  const [selectedSub, setSelectedSub] = useState<string>(initialSubcategory || 'todos');
  const [searchCity, setSearchCity] = useState('');
  const [activeOffer, setActiveOffer] = useState<ClassifiedOffer | null>(null);
  const [isAnunciarModalOpen, setIsAnunciarModalOpen] = useState(false);
  const [anuncioSuccess, setAnuncioSuccess] = useState(false);

  // Auto and Imovel subcategories definitions
  const autoSubcategories: { id: AutoSubcategory; label: string }[] = [
    { id: 'carros', label: 'Carros' },
    { id: 'caminhonetes', label: 'Caminhonetes' },
    { id: 'maquinas', label: 'Máquinas' },
    { id: 'implementos', label: 'Implementos' },
  ];

  const imovelSubcategories: { id: ImovelSubcategory; label: string }[] = [
    { id: 'casas', label: 'Casas' },
    { id: 'apartamentos', label: 'Apartamentos' },
    { id: 'kinets', label: 'Kinets (Kitnets)' },
    { id: 'fazendas', label: 'Fazendas' },
    { id: 'chacaras_sitios', label: 'Chácaras / Sítios' },
    { id: 'lotes_urbanos', label: 'Lotes Urbanos' },
    { id: 'lotes_rurais', label: 'Lotes Rurais' },
  ];

  // Filtering logic
  const filteredOffers = offers.filter((item) => {
    const matchesType = mainType === 'todos' || item.type === mainType;
    const matchesSub = selectedSub === 'todos' || item.subcategory === selectedSub;
    const matchesSearch =
      searchCity === '' ||
      item.localizacao.toLowerCase().includes(searchCity.toLowerCase()) ||
      item.title.toLowerCase().includes(searchCity.toLowerCase());
    return matchesType && matchesSub && matchesSearch;
  });

  const handleCreateAnuncio = (e: React.FormEvent) => {
    e.preventDefault();
    setAnuncioSuccess(true);
    setTimeout(() => {
      setAnuncioSuccess(false);
      setIsAnunciarModalOpen(false);
    }, 2500);
  };

  return (
    <section id="ofertas" className="py-10 bg-white border-t border-slate-200">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-amber-50 text-amber-700 rounded-lg">
                <ShoppingBag className="w-5 h-5" />
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Classificados Regionais da Bahia
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Ofertas: Automóveis & Imóveis
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Negocie veículos, máquinas agrícolas, casas, terrenos e propriedades rurais com ouvintes e parceiros de todo o estado
            </p>
          </div>

          <button
            onClick={() => setIsAnunciarModalOpen(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Inserir Meu Anúncio</span>
          </button>
        </div>

        {/* Barra de Filtros Principais: Automóveis vs Imóveis */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => {
                  setMainType('todos');
                  setSelectedSub('todos');
                }}
                className={`px-3 py-1.5 rounded transition cursor-pointer ${
                  mainType === 'todos' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todas as Ofertas
              </button>

              <button
                onClick={() => {
                  setMainType('automovel');
                  setSelectedSub('todos');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition cursor-pointer ${
                  mainType === 'automovel' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Automóveis</span>
              </button>

              <button
                onClick={() => {
                  setMainType('imovel');
                  setSelectedSub('todos');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition cursor-pointer ${
                  mainType === 'imovel' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Imóveis</span>
              </button>
            </div>

            {/* Busca por Cidade da Bahia */}
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Buscar por cidade ou item..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
              />
            </div>
          </div>

          {/* Subcategorias Requisitadas */}
          <div className="pt-2 border-t border-slate-200">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Filtrar por Subcategoria Específica:
            </div>

            <div className="flex flex-wrap gap-1.5 text-xs">
              <button
                onClick={() => setSelectedSub('todos')}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                  selectedSub === 'todos'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Todas ({offers.length})
              </button>

              {/* Automóveis Submenus */}
              {(mainType === 'todos' || mainType === 'automovel') && (
                <>
                  <span className="text-slate-300 self-center hidden sm:inline">|</span>
                  {autoSubcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setMainType('automovel');
                        setSelectedSub(sub.id);
                      }}
                      className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                        selectedSub === sub.id
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'bg-white border border-blue-200 text-blue-800 hover:bg-blue-50'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </>
              )}

              {/* Imóveis Submenus */}
              {(mainType === 'todos' || mainType === 'imovel') && (
                <>
                  <span className="text-slate-300 self-center hidden sm:inline">|</span>
                  {imovelSubcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setMainType('imovel');
                        setSelectedSub(sub.id);
                      }}
                      className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                        selectedSub === sub.id
                          ? 'bg-emerald-600 text-white font-semibold'
                          : 'bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-50'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Grade de Anúncios */}
        {filteredOffers.length === 0 ? (
          <div className="py-12 text-center bg-slate-50 border border-slate-200 rounded-xl">
            <Tag className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h4 className="font-bold text-slate-700">Nenhum anúncio encontrado para este filtro</h4>
            <p className="text-xs text-slate-500 mt-1">Tente selecionar outra subcategoria ou limpar o termo de busca.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOffers.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-amber-400 hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span
                      className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                        item.type === 'automovel'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.subcategory.replace('_', ' ')}
                    </span>
                    <span className="text-slate-500 text-xs flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span className="truncate max-w-[150px]">{item.localizacao}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="my-2.5">
                    <span className="text-xl font-black text-emerald-700">
                      {item.preco}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.descricao}
                  </p>

                  {/* Detalhes específicos */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.detalhes.map((det, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                      >
                        {det}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer do Card com Botão de Contato / WhatsApp */}
                <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-500 truncate">
                    Anunciante: <strong>{item.anunciante}</strong>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setActiveOffer(item)}
                      className="px-2.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded cursor-pointer transition"
                    >
                      Detalhes
                    </button>

                    <a
                      href={`https://wa.me/${item.whatsapp}?text=Olá,%20vi%20seu%20anúncio%20"${encodeURIComponent(item.title)}"%20no%20portal%20da%20FARCOM-BA`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded flex items-center gap-1 shadow-sm transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de Detalhes da Oferta */}
        {activeOffer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                <span className="text-xs font-bold text-amber-700 uppercase bg-amber-50 px-2 py-0.5 rounded">
                  Classificados FARCOM-BA · {activeOffer.subcategory.toUpperCase()}
                </span>
                <button
                  onClick={() => setActiveOffer(null)}
                  className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-xl font-bold text-slate-900 leading-tight">
                {activeOffer.title}
              </h2>

              <div className="text-2xl font-black text-emerald-700 my-2">
                {activeOffer.preco}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600 mb-3">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Localização: <strong>{activeOffer.localizacao}</strong></span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200 mb-4">
                {activeOffer.descricao}
              </p>

              <div className="mb-4">
                <div className="text-xs font-bold text-slate-800 mb-1.5">Ficha Técnica:</div>
                <div className="flex flex-wrap gap-2">
                  {activeOffer.detalhes.map((d, i) => (
                    <span key={i} className="text-xs bg-blue-50 text-blue-900 px-2.5 py-1 rounded border border-blue-100 font-medium">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-600 text-center sm:text-left">
                  <div>Anunciante: <strong>{activeOffer.anunciante}</strong></div>
                  <div>Telefone: {activeOffer.telefone}</div>
                </div>

                <a
                  href={`https://wa.me/${activeOffer.whatsapp}?text=Olá,%20tenho%20interesse%20no%20anúncio%20"${encodeURIComponent(activeOffer.title)}"%20do%20portal%20FARCOM-BA`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Conversar no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Inserir Novo Anúncio */}
        {isAnunciarModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <h3 className="text-lg font-bold text-slate-900">Publicar Anúncio nos Classificados</h3>
                <button
                  onClick={() => setIsAnunciarModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {anuncioSuccess ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                  <h4 className="text-base font-bold text-slate-900">Anúncio Enviado para Moderação!</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Sua oferta será veiculada no portal e divulgada na rede de rádios filiadas da sua região.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCreateAnuncio} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Título do Anúncio *</label>
                    <input
                      type="text"
                      placeholder="Ex: Fiat Toro 2022 ou Fazenda 50 ha em Irecê"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Tipo Principal</label>
                      <select className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white">
                        <option value="automovel">Automóvel / Máquina</option>
                        <option value="imovel">Imóvel / Terra</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Subcategoria</label>
                      <select className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white">
                        <option value="carros">Carros</option>
                        <option value="caminhonetes">Caminhonetes</option>
                        <option value="maquinas">Máquinas</option>
                        <option value="implementos">Implementos</option>
                        <option value="casas">Casas</option>
                        <option value="apartamentos">Apartamentos</option>
                        <option value="kinets">Kinets (Kitnets)</option>
                        <option value="fazendas">Fazendas</option>
                        <option value="chacaras_sitios">Chácaras / Sítios</option>
                        <option value="lotes_urbanos">Lotes Urbanos</option>
                        <option value="lotes_rurais">Lotes Rurais</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Preço (R$) *</label>
                      <input
                        type="text"
                        placeholder="Ex: R$ 85.000,00"
                        className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Cidade / Região (Bahia) *</label>
                      <input
                        type="text"
                        placeholder="Ex: Feira de Santana - BA"
                        className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Descrição Detalhada</label>
                    <textarea
                      rows={3}
                      placeholder="Descreva opcionais, estado de conservação, benfeitorias..."
                      className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Seu Nome / Empresa</label>
                      <input
                        type="text"
                        placeholder="Ex: José Carlos"
                        className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-1">WhatsApp com DDD</label>
                      <input
                        type="text"
                        placeholder="(71) 99999-9999"
                        className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded shadow transition cursor-pointer"
                    >
                      Cadastrar Anúncio nos Classificados
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
