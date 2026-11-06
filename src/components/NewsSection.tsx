import React, { useState } from 'react';
import { Newspaper, Calendar, Clock, ArrowRight, Bookmark, Share2 } from 'lucide-react';
import { NewsArticle } from '../types';

interface NewsSectionProps {
  news: NewsArticle[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  const [activeCategory, setActiveCategory] = useState<'todas' | 'nacional' | 'estadual'>('todas');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const filteredNews = activeCategory === 'todas'
    ? news
    : news.filter((n) => n.category === activeCategory);

  return (
    <section id="noticias" className="py-10 bg-slate-50 border-t border-slate-200">
      {/* Anchor targets */}
      <div id="noticias-nacional" />
      <div id="noticias-estadual" />

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2.5 py-1 rounded">
              Jornalismo & Informação
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Notícias da Radiodifusão
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Cobertura jornalística sobre legislação, telecomunicações, cultura popular e políticas públicas
            </p>
          </div>

          {/* Filtro Nacional / Estadual */}
          <div className="flex p-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveCategory('todas')}
              className={`px-3.5 py-1.5 rounded-md transition cursor-pointer ${
                activeCategory === 'todas' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas as Notícias
            </button>
            <button
              onClick={() => setActiveCategory('estadual')}
              className={`px-3.5 py-1.5 rounded-md transition cursor-pointer ${
                activeCategory === 'estadual' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Estadual (Bahia)
            </button>
            <button
              onClick={() => setActiveCategory('nacional')}
              className={`px-3.5 py-1.5 rounded-md transition cursor-pointer ${
                activeCategory === 'nacional' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Nacional (MCom/Anatel)
            </button>
          </div>
        </div>

        {/* Grade de Notícias */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNews.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-blue-400 hover:shadow-sm transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span
                    className={`px-2 py-0.5 rounded font-semibold text-[11px] uppercase tracking-wider ${
                      article.category === 'estadual'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {article.category === 'estadual' ? 'Bahia Estadual' : 'Brasília Nacional'}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                    <Calendar className="w-3 h-3" />
                    <span>{article.date}</span>
                  </span>
                </div>

                <h3
                  onClick={() => setSelectedArticle(article)}
                  className="text-base sm:text-lg font-bold text-slate-900 leading-snug hover:text-blue-600 transition cursor-pointer"
                >
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-slate-700">{article.author}</span>
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Ler Matéria Completa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Modal de Leitura do Artigo */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded">
                  {selectedArticle.category === 'estadual' ? 'Notícia da Bahia' : 'Notícia Nacional'}
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-semibold cursor-pointer"
                >
                  Fechar ✕
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-slate-500 my-3 pb-3 border-b border-slate-100">
                <span>Por: <strong>{selectedArticle.author}</strong></span>
                <span>·</span>
                <span>{selectedArticle.date}</span>
                <span>·</span>
                <span>Tempo de leitura: {selectedArticle.readTime}</span>
              </div>

              <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
                <p className="font-medium text-slate-800 text-base">
                  {selectedArticle.summary}
                </p>
                <p>
                  As emissoras de rádio comunitária desempenham papel de utilidade pública insubstituível na democratização da comunicação em todo o interior baiano. A FARCOM-BA reitera a necessidade contínua de ampliação das políticas de incentivo e garantia de que nenhum município fique desassistido de vozes populares e autênticas.
                </p>
                <p>
                  Representantes de emissoras filiadas podem contatar nossa assessoria de imprensa e departamento jurídico para obter esclarecimentos técnicos detalhados e notas explicativas para veiculação nos seus respectivos programas jornalísticos diários.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition cursor-pointer"
                >
                  Voltar às Notícias
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
