import React, { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkouts, deleteWorkout } from "../services/workout";
import CreateWorkout from "../components/CreateWorkout";
import { NotificationContext } from "../context/NotificationContext";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { notify } = useContext(NotificationContext);

  const loadWorkouts = useCallback(async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(Array.isArray(data) ? data : []);
    } catch {
      notify("Não foi possível carregar os treinos.", "error");
    } finally {
      setLoading(false);
    }
  }, [notify]);

  async function handleDeleteWorkout(id) {
    if (!confirm("Tem certeza que deseja excluir este protocolo?")) return;
    try {
      setLoading(true);
      await deleteWorkout(id);
      await loadWorkouts();
      notify("Protocolo excluído com sucesso.", "success");
    } catch {
      notify("Erro ao excluir o protocolo.", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadWorkouts(); }, [loadWorkouts]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 sm:p-6 md:p-12">
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
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h2 className="font-['Bebas_Neue'] text-2xl text-[#ff301d]">{w.name}</h2>
                    <span className="text-[10px] text-[#555] uppercase tracking-widest">{w.day_display || w.day}</span>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => navigate(`/edit-workout/${w.id}`)}
                      className="rounded-2xl bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteWorkout(w.id)}
                      className="rounded-2xl bg-red-500/10 px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 transition"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  {w.exercises?.map((ex) => (
                    <div key={ex.id || ex.name} className="flex justify-between text-sm border-b border-white/5 pb-1">
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