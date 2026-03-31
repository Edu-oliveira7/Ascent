import React, { useState } from 'react';
import { createWorkout } from '../services/workout';
import { Plus, Trash2, Dumbbell, Save, Loader2 } from 'lucide-react'; // Instale lucide-react

export default function CreateWorkout({ onCreated = () => {} }) {
  const [name, setName] = useState('');
  const [day, setDay] = useState('SEG');
  const [exercises, setExercises] = useState([{ name: '', sets: '', reps: '', weight: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addExerciseField = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '', weight: '' }]);
  };

  const removeExerciseField = (index) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((_, i) => i !== index));
    }
  };

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedExercises = exercises
      .filter(ex => ex.name.trim() !== "")
      .map(ex => ({
        name: ex.name,
        sets: parseInt(ex.sets) || 0,
        reps: parseInt(ex.reps) || 0,
        weight: parseFloat(ex.weight) || 0
      }));

    if (formattedExercises.length === 0) {
      alert("Adicione pelo menos um exercício válido.");
      setIsSubmitting(false);
      return;
    }

    try {
      await createWorkout({ name, day, exercises: formattedExercises });
      setName('');
      setDay('SEG');
      setExercises([{ name: '', sets: '', reps: '', weight: '' }]);
      onCreated();
    } catch (error) {
      console.error("Erro detalhado:", error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form 
        onSubmit={handleSubmit} 
        className="bg-[#111] border border-white/5 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-sm"
      >
        <header className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-[#ff301d]/10 rounded-xl">
            <Dumbbell className="text-[#ff301d]" size={24} />
          </div>
          <div>
            <h3 className="font-['Bebas_Neue'] text-3xl text-white tracking-wide">Configurar Protocolo</h3>
            <p className="text-white/40 text-xs uppercase tracking-[0.2em]">Defina sua rotina de alta performance</p>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-1">Nome do Treino</label>
            <input 
              className="w-full bg-[#161616] border border-white/5 p-4 rounded-xl focus:border-[#ff301d]/50 focus:ring-1 focus:ring-[#ff301d]/50 outline-none transition-all text-white placeholder:text-white/10"
              placeholder="Ex: Upper Body - Hypertrophy"
              value={name} onChange={(e) => setName(e.target.value)} required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/30 ml-1">Dia da Semana</label>
            <select 
              className="w-full bg-[#161616] border border-white/5 p-4 rounded-xl text-white outline-none cursor-pointer focus:border-[#ff301d]/50 transition-all appearance-none"
              value={day} onChange={(e) => setDay(e.target.value)}
            >
              {['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center px-1">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/60 font-bold">Exercícios</h4>
            <div className="h-px flex-1 mx-4 bg-white/5"></div>
          </div>

          {exercises.map((ex, i) => (
            <div 
              key={i} 
              className="group grid grid-cols-12 gap-3 items-center bg-white/[0.02] hover:bg-white/[0.04] p-3 rounded-2xl transition-all border border-transparent hover:border-white/5"
            >
              <div className="col-span-5">
                <input 
                  placeholder="Nome do exercício" 
                  className="w-full bg-transparent p-2 text-sm outline-none text-white placeholder:text-white/10 border-b border-white/5 focus:border-[#ff301d]/50 transition-all"
                  value={ex.name} onChange={(e) => handleExerciseChange(i, 'name', e.target.value)} 
                />
              </div>
              <div className="col-span-2">
                <input type="number" placeholder="Sets" className="w-full bg-[#0a0a0a] p-2 text-center rounded-lg text-sm text-white border border-white/5"
                  value={ex.sets} onChange={(e) => handleExerciseChange(i, 'sets', e.target.value)} />
              </div>
              <div className="col-span-2">
                <input type="number" placeholder="Reps" className="w-full bg-[#0a0a0a] p-2 text-center rounded-lg text-sm text-white border border-white/5"
                  value={ex.reps} onChange={(e) => handleExerciseChange(i, 'reps', e.target.value)} />
              </div>
              <div className="col-span-2">
                <input type="number" placeholder="Kg" className="w-full bg-[#0a0a0a] p-2 text-center rounded-lg text-sm text-white border border-white/5"
                  value={ex.weight} onChange={(e) => handleExerciseChange(i, 'weight', e.target.value)} />
              </div>
              <div className="col-span-1 flex justify-center">
                <button 
                  type="button" 
                  onClick={() => removeExerciseField(i)}
                  className="text-white/10 hover:text-[#ff301d] transition-colors p-2"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-t border-white/5 pt-8">
          <button 
            type="button" 
            onClick={addExerciseField} 
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all group"
          >
            <div className="p-1 rounded-full border border-white/10 group-hover:border-white/40">
              <Plus size={12} />
            </div>
            Adicionar Exercício
          </button>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#ff301d] hover:bg-[#ff301d]/80 disabled:opacity-50 disabled:cursor-not-allowed px-10 py-4 rounded-xl font-bold text-sm transition-all shadow-[0_10px_30px_rgba(255,48,29,0.2)] text-white group"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                <Save size={18} className="group-hover:scale-110 transition-transform" />
                FINALIZAR TREINO
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}