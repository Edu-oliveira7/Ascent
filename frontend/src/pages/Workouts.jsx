import React, { useEffect, useState } from "react";
import { getWorkouts } from "../services/workout";
import CreateWorkout from "../components/CreateWorkout";

const dedupeWorkouts = (workouts) => {
  const seen = new Set();
  return workouts.filter((workout) => {
    const key = `${String(workout.name || '').trim().toLowerCase()}:${String(workout.day || '').trim()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadWorkouts() {
    try {
      const data = await getWorkouts();
      setWorkouts(Array.isArray(data) ? dedupeWorkouts(data) : []);
    } catch (error) {
      console.error("Erro ao carregar treinos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadWorkouts(); }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-['Bebas_Neue'] text-5xl mb-8 tracking-wide">MEUS TREINOS</h1>

        {/* O formulário agora recebe a função para atualizar a lista ao salvar */}
        <CreateWorkout onCreated={loadWorkouts} />

        {loading ? (
          <p className="text-[#444]">CARREGANDO PROTOCOLOS...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {workouts.map((w) => (
              <div key={w.id} className="bg-[#111] border border-white/5 p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-['Bebas_Neue'] text-2xl text-[#ff301d]">{w.name}</h2>
                  <span className="text-[10px] text-[#555] uppercase tracking-widest">{w.day_display || w.day}</span>
                </div>
                <div className="space-y-2">
                  {w.exercises?.map((ex) => (
                    <div key={ex.id} className="flex justify-between text-sm border-b border-white/5 pb-1">
                      <span className="text-[#ccc]">{ex.name}</span>
                      <span className="text-[#777] font-mono">{ex.sets}x{ex.reps} — {ex.weight}kg</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}