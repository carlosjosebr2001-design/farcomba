import React, { useState } from 'react';
import { Megaphone, ExternalLink, Mail, Phone, ChevronRight, ShieldCheck } from 'lucide-react';

export const AdvertisingSidebar: React.FC = () => {
  const [adContactModal, setAdContactModal] = useState(false);

  return (
    <aside className="w-full lg:w-[420px] shrink-0 space-y-6">
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-500 font-semibold uppercase tracking-wider">
        <span className="flex items-center gap-1.5 text-slate-600">
          <Megaphone className="w-3.5 h-3.5 text-blue-600" />
          <span>Publicidade & Apoio Cultural</span>
        </span>
        <span>Formatos 400x400</span>
      </div>

      {/* 1. Banner Publicitário 1 - 400x400 pixels */}
      <div className="flex flex-col items-center">
        <div
          className="w-[400px] h-[400px] max-w-full bg-slate-900 rounded-xl overflow-hidden shadow-md border border-slate-200 relative group"
          style={{ width: '400px', height: '400px' }}
        >
          <img
            src="/src/assets/images/ad_transmissores_fm_1794004163803.jpg"
            alt="Publicidade: Equipamentos e Transmissores FM Profissionais - Banner 400x400"
            className="w-[400px] h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
            width={400}
            height={400}
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider rounded font-medium">
            Patrocinador Oficial
          </div>
          <a
            href="https://wa.me/5571998124040?text=Olá,%20vi%20o%20banner%20de%20transmissores%20FM%20no%20portal%20da%20FARCOM-BA"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 bg-blue-900/0 hover:bg-blue-900/20 transition flex items-end p-4"
          >
            <span className="w-full py-2 bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-bold rounded text-center backdrop-blur-sm shadow flex items-center justify-center gap-1">
              <span>Falar com o Fabricante de Transmissores</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>
        <span className="text-[11px] text-slate-400 mt-1">Anúncio Certificado MCom/Anatel (400x400 px)</span>
      </div>

      {/* 2. Banner Publicitário 2 - 400x400 pixels */}
      <div className="flex flex-col items-center">
        <div
          className="w-[400px] h-[400px] max-w-full bg-slate-900 rounded-xl overflow-hidden shadow-md border border-slate-200 relative group"
          style={{ width: '400px', height: '400px' }}
        >
          <img
            src="/src/assets/images/ad_software_radio_1794004163755.jpg"
            alt="Publicidade: WaveForge Software de Automação de Rádio - Banner 400x400"
            className="w-[400px] h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
            width={400}
            height={400}
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider rounded font-medium">
            Tecnologia de Estúdio
          </div>
          <a
            href="https://wa.me/5571998124040?text=Olá,%20gostaria%20de%20testar%20o%20software%20de%20automação%20para%20minha%20rádio"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 bg-blue-900/0 hover:bg-blue-900/20 transition flex items-end p-4"
          >
            <span className="w-full py-2 bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold rounded text-center backdrop-blur-sm shadow flex items-center justify-center gap-1">
              <span>Testar Software Grátis por 30 Dias</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>
        <span className="text-[11px] text-slate-400 mt-1">Automação de Rádio Comunitária (400x400 px)</span>
      </div>

      {/* 3. Banner Institucional "Anuncie Aqui 400x400" */}
      <div className="flex flex-col items-center">
        <div
          className="w-[400px] h-[400px] max-w-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-xl overflow-hidden shadow-md border border-slate-700 p-6 flex flex-col justify-between text-center relative"
          style={{ width: '400px', height: '400px' }}
        >
          <div className="space-y-2">
            <span className="px-2.5 py-1 bg-amber-400 text-slate-950 text-[10px] font-black uppercase rounded tracking-wider inline-block">
              Espaço Disponível 400x400
            </span>
            <h4 className="text-xl font-bold text-white leading-tight">
              Anuncie na Maior Rede de Rádios Comunitárias da Bahia
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Alcance ouvintes em mais de 180 cidades baianas. Fortaleça sua marca junto às comunidades do interior e capital.
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-3 text-left space-y-1 text-xs">
            <div className="text-amber-300 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Vantagens do Apoio Cultural:</span>
            </div>
            <div className="text-slate-300 text-[11px]">· Audiência qualificada e fiel no interior</div>
            <div className="text-slate-300 text-[11px]">· Banners no portal + spots de 30s nas emissoras</div>
            <div className="text-slate-300 text-[11px]">· Relatório de veiculação e comprovação fiscal</div>
          </div>

          <button
            onClick={() => setAdContactModal(true)}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <Mail className="w-4 h-4" />
            <span>Solicitar Mídia Kit & Anunciar</span>
          </button>
        </div>
        <span className="text-[11px] text-slate-400 mt-1">Comercial FARCOM-BA (400x400 px)</span>
      </div>

      {/* Modal Mídia Kit */}
      {adContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white text-slate-900 rounded-xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Departamento Comercial FARCOM-BA</h3>
            <p className="text-xs text-slate-600 mb-4">
              Entre em contato direto com nossa equipe de captação institucional para reservar seu banner lateral ou veiculação estadual.
            </p>
            <div className="space-y-2 text-xs bg-slate-50 p-3 rounded border border-slate-200 mb-4">
              <div><strong>Telefone Salvador:</strong> (71) 3241-8900</div>
              <div><strong>WhatsApp Comercial:</strong> (75) 99812-4040</div>
              <div><strong>E-mail:</strong> comercial@farcomba.org.br</div>
              <div><strong>Atendimento:</strong> Segunda a Sexta, das 08h às 18h</div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setAdContactModal(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded cursor-pointer"
              >
                Fechar
              </button>
              <a
                href="https://wa.me/5575998124040?text=Olá,%20gostaria%20de%20receber%20a%20tabela%20de%20preços%20e%20Mídia%20Kit%20da%20FARCOM-BA"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Chamar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
