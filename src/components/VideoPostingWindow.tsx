import React, { useState } from 'react';
import { Video, PlusCircle, Play, Eye, Share2, MapPin, Radio, Check, ExternalLink } from 'lucide-react';
import { VideoItem } from '../types';

interface VideoPostingWindowProps {
  initialVideos: VideoItem[];
}

export const VideoPostingWindow: React.FC<VideoPostingWindowProps> = ({ initialVideos }) => {
  const [videos, setVideos] = useState<VideoItem[]>(initialVideos);
  const [activeVideo, setActiveVideo] = useState<VideoItem>(initialVideos[0]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  // Form states for posting video
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [emissora, setEmissora] = useState('');
  const [cidade, setCidade] = useState('');
  const [categoria, setCategoria] = useState<'assembleia' | 'fala_bahia_tv' | 'tutorial' | 'evento_comunitario'>('fala_bahia_tv');

  const handlePostVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !videoUrl) return;

    // Extract YouTube ID if applicable
    let embedUrl = videoUrl;
    let ytId = '';
    const ytMatch = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      ytId = ytMatch[1];
      embedUrl = `https://www.youtube.com/embed/${ytId}`;
    }

    const newVideo: VideoItem = {
      id: `vid-${Date.now()}`,
      title,
      emissora: emissora || 'Emissora Comunitária Parceira',
      cidade: cidade || 'Bahia',
      videoUrl: embedUrl,
      youtubeId: ytId,
      thumbnailUrl: ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
      data: 'Publicado agora',
      categoria,
    };

    setVideos([newVideo, ...videos]);
    setActiveVideo(newVideo);
    setPostSuccess(true);
    setTimeout(() => {
      setPostSuccess(false);
      setIsFormOpen(false);
      setTitle('');
      setVideoUrl('');
      setEmissora('');
      setCidade('');
    }, 1800);
  };

  return (
    <section className="w-full bg-slate-950 text-white py-6 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar of the video window */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-600 rounded text-white shadow-sm">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  TV FARCOM-BA & Transmissões Comunitárias
                </h2>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded">
                  Ao Vivo & Vídeos
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Canal audiovisual das rádios da Bahia: programas, tutoriais técnicos e assembleias
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded transition shadow-sm cursor-pointer whitespace-nowrap shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isFormOpen ? 'Fechar Janela de Postagem' : 'Postar Vídeo da Sua Emissora'}</span>
          </button>
        </div>

        {/* Formulário Interativo para Postar Vídeos da Emissora (Abaixo do menu) */}
        {isFormOpen && (
          <div className="mb-6 p-4 bg-slate-900 border border-blue-500/40 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <div className="font-semibold text-sm text-blue-300 flex items-center gap-2">
                <Video className="w-4 h-4" />
                <span>Formulário de Postagem de Vídeo - Rede FARCOM-BA</span>
              </div>
              <span className="text-xs text-slate-400">Publicação imediata no portal</span>
            </div>

            {postSuccess ? (
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <Check className="w-10 h-10 text-emerald-400 mb-2" />
                <div className="text-base font-semibold text-white">Vídeo Publicado com Sucesso!</div>
                <div className="text-xs text-slate-400 mt-1">Já carregado na janela de exibição abaixo.</div>
              </div>
            ) : (
              <form onSubmit={handlePostVideo} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="lg:col-span-2">
                  <label className="block text-slate-300 font-medium mb-1">Título do Vídeo *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Entrevista com Prefeito sobre Rádio Comunitária"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-slate-300 font-medium mb-1">Link do Vídeo (YouTube / Vimeo / MP4) *</label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Nome da Emissora</label>
                  <input
                    type="text"
                    value={emissora}
                    onChange={(e) => setEmissora(e.target.value)}
                    placeholder="Ex: Rádio Bahia Livre FM 87.9"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Município da Bahia</label>
                  <input
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    placeholder="Ex: Salvador, Feira de Santana..."
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Categoria do Conteúdo</label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="fala_bahia_tv">Fala Bahia TV</option>
                    <option value="assembleia">Assembleia / Encontro</option>
                    <option value="tutorial">Tutorial Técnico FM</option>
                    <option value="evento_comunitario">Evento Comunitário Local</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Publicar Vídeo Agora</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Janela Principal de Exibição de Vídeo (Player + Lista lateral) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden p-3 sm:p-4">
          {/* Coluna do Player Ativo (8 colunas) */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="relative aspect-video w-full bg-black rounded-lg overflow-hidden border border-slate-800 shadow-inner group">
              {activeVideo.videoUrl && activeVideo.videoUrl.includes('youtube.com/embed') ? (
                <iframe
                  src={activeVideo.videoUrl}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full relative flex items-center justify-center bg-slate-900">
                  <img
                    src={activeVideo.thumbnailUrl}
                    alt={activeVideo.title}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-between p-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-red-600 text-white text-[10px] font-bold uppercase rounded">
                        Em Exibição
                      </span>
                      <span className="text-xs text-slate-300 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        {activeVideo.cidade}
                      </span>
                    </div>

                    <div>
                      <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition cursor-pointer">
                        <Play className="w-6 h-6 fill-white ml-1" />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white line-clamp-2 text-center">
                        {activeVideo.title}
                      </h3>
                      <p className="text-xs text-slate-300 text-center mt-1">
                        Transmissão gerada por: <strong className="text-amber-400">{activeVideo.emissora}</strong>
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>FARCOM-BA Vídeo Streaming</span>
                      <span>{activeVideo.data}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Metadados do vídeo em exibição */}
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white line-clamp-1">
                  {activeVideo.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span className="text-amber-400 font-medium">{activeVideo.emissora}</span>
                  <span>·</span>
                  <span>{activeVideo.cidade}</span>
                  <span>·</span>
                  <span>{activeVideo.data}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => alert(`Link de compartilhamento copiado para o vídeo: ${activeVideo.title}`)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded transition flex items-center gap-1 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Compartilhar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Coluna de Playlist / Vídeos Recentes da Rede (4 colunas) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Vídeos da Radiodifusão Baiana</span>
              <span className="text-blue-400 font-normal">{videos.length} disponíveis</span>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[340px] pr-1">
              {videos.map((vid) => {
                const isSelected = vid.id === activeVideo.id;
                return (
                  <div
                    key={vid.id}
                    onClick={() => setActiveVideo(vid)}
                    className={`flex gap-2.5 p-2 rounded cursor-pointer transition border ${
                      isSelected
                        ? 'bg-blue-950/60 border-blue-500/80 text-white'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="relative w-24 h-16 shrink-0 bg-slate-950 rounded overflow-hidden">
                      <img
                        src={vid.thumbnailUrl}
                        alt={vid.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold line-clamp-2 leading-tight">
                        {vid.title}
                      </h4>
                      <div className="text-[10px] text-slate-400 mt-1 truncate">
                        {vid.emissora}
                      </div>
                      <div className="text-[10px] text-amber-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-2.5 h-2.5" />
                        <span>{vid.cidade}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
