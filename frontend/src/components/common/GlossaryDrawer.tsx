import React, { useState, useEffect } from 'react';
import { GlossaryTerm } from '../../types';
import { api } from '../../services/api';
import { X, BookOpen, Search, Tag } from 'lucide-react';

interface GlossaryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryDrawer: React.FC<GlossaryDrawerProps> = ({ isOpen, onClose }) => {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      api.getGlossary().then(setTerms).catch(console.error);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'conceptos', label: 'Conceptos' },
    { id: 'actores', label: 'Actores' },
    { id: 'principios', label: 'Principios' },
    { id: 'derechos', label: 'Derechos' },
  ];

  const filtered = terms.filter((t) => {
    const matchCat = selectedCategory === 'all' || t.category === selectedCategory;
    const matchQuery =
      t.term.toLowerCase().includes(filterQuery.toLowerCase()) ||
      t.definition.toLowerCase().includes(filterQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Glosario Legal</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories */}
        <div className="p-4 border-b border-slate-800 space-y-3 bg-slate-950/40">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Buscar término o definición..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === c.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Terms List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {filtered.map((term) => (
            <div
              key={term.id}
              className="p-3.5 bg-slate-950/80 border border-slate-800/80 rounded-xl hover:border-slate-700 transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">{term.term}</h4>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-emerald-400 border border-emerald-500/20 font-medium">
                  {term.legalReference}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{term.definition}</p>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-8 text-xs text-slate-500">
              No se encontraron términos para esta búsqueda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
