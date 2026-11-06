import React, { useState, useEffect } from 'react';
import { Play, Pause, Download, Lock, CheckCircle2, Volume2, VolumeX, Mic, Headphones, Radio, Sparkles, AlertCircle, FileAudio, Clock, Calendar } from 'lucide-react';
import { AudioTrack, UserSession } from '../types';
import { playSyntheticTrack, stopSyntheticAudio } from '../utils/audioSimulator';

interface AudioContentHubProps {
  tracks: AudioTrack[];
  activeCategory: 'fala_bahia' | 'vinhetas' | 'spots' | 'jingles' | 'boletins';
  onSelectCategory: (cat: 'fala_bahia' | 'vinhetas' | 'spots' | 'jingles' | 'boletins') => void;
  userSession: UserSession;
  onOpenLogin: () => void;
  onOpenBroadcasterRegister: () => void;
}

export const AudioContentHub: React.FC<AudioContentHubProps> = ({
  tracks,
  activeCategory,
  onSelectCategory,
  userSession,
  onOpenLogin,
  onOpenBroadcasterRegister,
}) => {
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);
  const [showMemberOnlyNotice, setShowMemberOnlyNotice] = useState<string | null>(null);

  const currentPlayingTrack = tracks.find((t) => t.id === playingTrackId) || tracks[0];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            stopSyntheticAudio();
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handlePlayToggle = (track: AudioTrack) => {
    if (playingTrackId === track.id && isPlaying) {
      stopSyntheticAudio();
      setIsPlaying(false);
    } else {
      setPlayingTrackId(track.id);
      setIsPlaying(true);
      setProgress(0);
      playSyntheticTrack(track.audioSampleType || 'jingle', isMuted ? 0 : volume);
    }
  };

  const handleDownload = (track: AudioTrack) => {
    if (track.isMembersOnly && !userSession.isLoggedIn) {
      setShowMemberOnlyNotice(`O áudio "${track.title}" é exclusivo para rádios filiadas à FARCOM-BA. Faça login no topo do site para baixar!`);
      setTimeout(() => setShowMemberOnlyNotice(null), 4000);
      return;
    }

    // Trigger synthetic browser download
    const dummyContent = `FARCOM-BA Áudio Oficial\nTítulo: ${track.title}\nCategoria: ${track.category}\nLicença: Uso livre para rádios filiadas na Bahia.\nEmitido em: ${new Date().toLocaleDateString('pt-BR')}`;
    const blob = new Blob([dummyContent], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${track.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccessMessage(`Download do arquivo MP3 "${track.title}" iniciado com sucesso!`);
    setTimeout(() => setDownloadSuccessMessage(null), 3500);
  };

  // Filter tracks by currently selected category
  const filteredTracks = tracks.filter((t) => t.category === activeCategory);

  const categoryTitles: Record<string, { title: string; subtitle: string; icon: React.ReactNode }> = {
    fala_bahia: {
      title: 'Programa Fala Bahia',
      subtitle: 'Edições diárias, blocos jornalísticos e entrevistas especiais sobre a realidade da Bahia',
      icon: <Mic className="w-5 h-5 text-amber-500" />,
    },
    vinhetas: {
      title: 'Banco de Vinhetas Institucionais',
      subtitle: 'Aberturas, identificação de canal/outorga regulamentar e cortes com locução profissional',
      icon: <Headphones className="w-5 h-5 text-blue-500" />,
    },
    spots: {
      title: 'Spots de Utilidade Pública & Cidadania',
      subtitle: 'Campanhas educativas de combate a endemias, apoio ao comércio e preservação ambiental',
      icon: <Radio className="w-5 h-5 text-emerald-500" />,
    },
    jingles: {
      title: 'Jingles Musicais & Datas Festivas',
      subtitle: 'Trilhas comemorativas para São João, 2 de Julho da Bahia e abertura oficial da emissora',
      icon: <Sparkles className="w-5 h-5 text-purple-500" />,
    },
    boletins: {
      title: 'Boletins Rápidos de Notícias em Áudio',
      subtitle: 'Informação condensada de 1 a 3 minutos para a grade rotativa da sua programação',
      icon: <FileAudio className="w-5 h-5 text-red-500" />,
    },
  };

  const activeInfo = categoryTitles[activeCategory] || categoryTitles.fala_bahia;

  return (
    <section id="fala-bahia-hoje" className="w-full py-10 bg-white">
      {/* Anchor targets for smooth scrolling from menus */}
      <div id="vinhetas" />
      <div id="spots" />
      <div id="jingles" />
      <div id="conteudos-audio" />

      <div className="space-y-6">
        {/* Header da Seção de Conteúdos de Áudio */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-blue-50 text-blue-700 rounded-lg">
                {activeInfo.icon}
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                  Landing Page de Áudio & Downloads
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  {activeInfo.title}
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {activeInfo.subtitle}
            </p>
          </div>

          {/* Status do Usuário / Acesso */}
          <div className="flex items-center gap-2 text-xs">
            {userSession.isLoggedIn ? (
              <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Acesso Liberado: {userSession.nomeEmissora}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-slate-500 hidden md:inline">Quer baixar o pacote completo?</span>
                <button
                  onClick={onOpenLogin}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded transition cursor-pointer flex items-center gap-1"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Entrar no Topo</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notifications and Alerts */}
        {showMemberOnlyNotice && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{showMemberOnlyNotice}</span>
            </div>
            <button
              onClick={onOpenLogin}
              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded text-[11px] cursor-pointer"
            >
              Fazer Login
            </button>
          </div>
        )}

        {downloadSuccessMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{downloadSuccessMessage}</span>
          </div>
        )}

        {/* Submenu Seletor de Categorias de Áudio (Abas com botões funcionais) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => onSelectCategory('fala_bahia')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'fala_bahia'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Programa Fala Bahia</span>
          </button>

          <button
            onClick={() => onSelectCategory('vinhetas')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'vinhetas'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Vinhetas</span>
          </button>

          <button
            onClick={() => onSelectCategory('spots')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'spots'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Spots de Cidadania</span>
          </button>

          <button
            onClick={() => onSelectCategory('jingles')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'jingles'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Jingles Musicais</span>
          </button>

          <button
            onClick={() => onSelectCategory('boletins')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'boletins'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileAudio className="w-3.5 h-3.5" />
            <span>Boletins Diários</span>
          </button>
        </div>

        {/* Reprodutor de Áudio Integrado (Web Audio Player) */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-xl p-4 sm:p-5 shadow-lg border border-slate-700">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Informações da faixa em reprodução */}
            <div className="flex items-center gap-3.5 min-w-0">
              <button
                onClick={() => handlePlayToggle(currentPlayingTrack)}
                className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-md transition cursor-pointer"
                title={isPlaying ? 'Pausar áudio' : 'Ouvir áudio agora'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              <div className="min-w-0">
                <div className="text-[11px] text-amber-400 uppercase tracking-wider font-semibold">
                  {isPlaying ? 'Reproduzindo Agora (Web Audio)' : 'Áudio Selecionado'}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white truncate">
                  {currentPlayingTrack.title}
                </h4>
                <p className="text-xs text-slate-300 truncate">
                  {currentPlayingTrack.speakerOrVoice}
                </p>
              </div>
            </div>

            {/* Controles de Volume e Download Rápido */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <div className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700 text-xs">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-slate-400 hover:text-white transition cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-16 sm:w-20 accent-blue-500 cursor-pointer"
                />
              </div>

              <button
                onClick={() => handleDownload(currentPlayingTrack)}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow whitespace-nowrap shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar MP3</span>
              </button>
            </div>
          </div>

          {/* Barra de Progresso e Forma de Onda Sonora */}
          <div className="mt-4 pt-3 border-t border-slate-700/60">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1.5">
              <span>00:{progress < 10 ? `0${Math.floor(progress / 3)}` : Math.floor(progress / 3)}</span>
              <span className="text-blue-300 font-sans text-xs">
                {isPlaying ? 'Transmitindo áudio sintetizado em tempo real' : 'Pressione play para ouvir demonstração'}
              </span>
              <span>{currentPlayingTrack.duration}</span>
            </div>

            {/* Barra de Progresso Interativa */}
            <div
              className="w-full h-2 bg-slate-700 rounded-full overflow-hidden cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                setProgress((clickX / rect.width) * 100);
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-amber-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Lista de Faixas de Áudio Disponíveis na Categoria */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{filteredTracks.length} conteúdos disponíveis nesta seção</span>
            <span>Taxa de bits: 320 kbps Stereo · Padrão Radiodifusão</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {filteredTracks.map((track) => {
              const isSelected = track.id === currentPlayingTrack.id;
              return (
                <div
                  key={track.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-blue-50/50 border-blue-400 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <button
                        onClick={() => handlePlayToggle(track)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition cursor-pointer mt-0.5 ${
                          isSelected && isPlaying
                            ? 'bg-blue-600 text-white shadow'
                            : 'bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white'
                        }`}
                      >
                        {isSelected && isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5" />
                        )}
                      </button>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h4 className="text-sm font-bold text-slate-900">
                            {track.title}
                          </h4>
                          {track.isMembersOnly && (
                            <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
                              Exclusivo Filiados
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {track.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                          <span className="flex items-center gap-1 font-medium text-slate-700">
                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                            <span>{track.duration}</span>
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{track.date}</span>
                          </span>
                          <span>·</span>
                          <span className="text-slate-600 font-medium">
                            {track.speakerOrVoice}
                          </span>
                          <span>·</span>
                          <span>{track.downloadsCount} downloads</span>
                        </div>
                      </div>
                    </div>

                    {/* Botão de Download */}
                    <div className="flex items-center gap-2 sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <button
                        onClick={() => handleDownload(track)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                          track.isMembersOnly && !userSession.isLoggedIn
                            ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                            : 'bg-slate-900 hover:bg-blue-700 text-white shadow-sm'
                        }`}
                        title={
                          track.isMembersOnly && !userSession.isLoggedIn
                            ? 'Conteúdo exclusivo para associados'
                            : 'Baixar arquivo MP3 em alta qualidade'
                        }
                      >
                        {track.isMembersOnly && !userSession.isLoggedIn ? (
                          <>
                            <Lock className="w-3.5 h-3.5 text-amber-700" />
                            <span>Liberar Download</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Baixar MP3</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Box de Vantagem para o Radiodifusor Comunitário */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                Sua emissora precisa de vinhetas com o nome da sua rádio e sua cidade?
              </div>
              <div className="text-xs text-slate-600">
                Associados à FARCOM-BA têm direito a 5 vinhetas personalizadas produzidas por mês em estúdio profissional.
              </div>
            </div>
          </div>

          <button
            onClick={onOpenBroadcasterRegister}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
          >
            Solicitar Gravação Personalizada
          </button>
        </div>
      </div>
    </section>
  );
};
