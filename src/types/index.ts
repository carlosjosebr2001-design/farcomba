export interface AudioTrack {
  id: string;
  title: string;
  category: 'fala_bahia' | 'vinhetas' | 'spots' | 'jingles' | 'boletins';
  duration: string;
  durationSeconds: number;
  date: string;
  description: string;
  speakerOrVoice: string;
  isMembersOnly: boolean;
  downloadsCount: number;
  waveformPattern?: number[];
  audioSampleType?: 'jingle' | 'spot' | 'voice' | 'vinheta';
}

export interface EmissoraFiliada {
  id: string;
  nome: string;
  associacao: string;
  cidade: string;
  frequencia: string;
  prefixo: string;
  regiao: string;
  responsavel: string;
  anoFiliacao: number;
  status: 'ativa' | 'em_regularizacao';
}

export interface VideoItem {
  id: string;
  title: string;
  emissora: string;
  cidade: string;
  youtubeId?: string;
  videoUrl?: string;
  thumbnailUrl: string;
  data: string;
  categoria: 'assembleia' | 'fala_bahia_tv' | 'tutorial' | 'evento_comunitario';
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'estadual' | 'nacional';
  date: string;
  summary: string;
  author: string;
  readTime: string;
  image?: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'sociais' | 'cursos' | 'congressos' | 'agenda';
  date: string;
  time: string;
  location: string;
  cidade: string;
  description: string;
  vagas?: string;
}

export type AutoSubcategory = 'carros' | 'caminhonetes' | 'maquinas' | 'implementos';
export type ImovelSubcategory = 'casas' | 'apartamentos' | 'kinets' | 'fazendas' | 'chacaras_sitios' | 'lotes_urbanos' | 'lotes_rurais';

export interface ClassifiedOffer {
  id: string;
  title: string;
  type: 'automovel' | 'imovel';
  subcategory: AutoSubcategory | ImovelSubcategory;
  preco: string;
  localizacao: string;
  descricao: string;
  detalhes: string[];
  anunciante: string;
  telefone: string;
  whatsapp: string;
  destaque?: boolean;
}

export interface UserSession {
  isLoggedIn: boolean;
  userType: 'emissora' | 'comunicador' | 'visitante';
  nomeEmissora: string;
  cidade: string;
  email: string;
  frequencia: string;
  numeroFiliacao: string;
  planoAtivo: boolean;
}
