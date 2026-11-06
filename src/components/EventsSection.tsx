import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, BookOpen, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { EventItem } from '../types';

interface EventsSectionProps {
  events: EventItem[];
}

export const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'sociais' | 'cursos' | 'congressos' | 'agenda'>('todos');
  const [registeredEventId, setRegisteredEventId] = useState<string | null>(null);

  const filteredEvents = selectedCategory === 'todos'
    ? events
    : events.filter((e) => e.category === selectedCategory);

  const handleInscricao = (ev: EventItem) => {
    setRegisteredEventId(ev.id);
    setTimeout(() => setRegisteredEventId(null), 3000);
  };

  return (
    <section id="eventos" className="py-10 bg-slate-50 border-t border-slate-200">
      {/* Anchor targets */}
      <div id="eventos-sociais" />
      <div id="eventos-cursos" />
      <div id="eventos-congressos" />
      <div id="eventos-agenda" />

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2.5 py-1 rounded">
              Capacitação & Encontros
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Eventos da Radiodifusão Comunitária
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Congressos, encontros sociais, cursos técnicos e a agenda oficial dos comunicadores da Bahia
            </p>
          </div>

          {/* Filtro de categoria de eventos */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-white border border-slate-200 rounded-lg text-xs">
            <button
              onClick={() => setSelectedCategory('todos')}
              className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
                selectedCategory === 'todos' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedCategory('congressos')}
              className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
                selectedCategory === 'congressos' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Congressos
            </button>
            <button
              onClick={() => setSelectedCategory('cursos')}
              className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
                selectedCategory === 'cursos' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cursos
            </button>
            <button
              onClick={() => setSelectedCategory('sociais')}
              className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
                selectedCategory === 'sociais' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sociais
            </button>
            <button
              onClick={() => setSelectedCategory('agenda')}
              className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
                selectedCategory === 'agenda' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Agenda
            </button>
          </div>
        </div>

        {/* Grade de Eventos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map((ev) => {
            const isRegistered = registeredEventId === ev.id;
            return (
              <div
                key={ev.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-blue-400 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded uppercase">
                      {ev.category}
                    </span>
                    <span className="text-xs font-semibold text-amber-700 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{ev.date}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {ev.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {ev.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="space-y-0.5 text-slate-500">
                    <div className="flex items-center gap-1 text-slate-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="line-clamp-1">{ev.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{ev.time}</span>
                      {ev.vagas && <span>· {ev.vagas}</span>}
                    </div>
                  </div>

                  <button
                    onClick={() => handleInscricao(ev)}
                    className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition flex items-center justify-center gap-1 cursor-pointer shrink-0 ${
                      isRegistered
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Inscrito!</span>
                      </>
                    ) : (
                      <>
                        <span>Inscrever-se</span>
                        <ArrowRight className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
