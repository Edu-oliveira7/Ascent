import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkouts, createWorkoutLog } from "../services/workout";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";

export default function ExecuteWorkout() {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [duration, setDuration] = useState("");
  const [exerciseLogs, setExerciseLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadWorkouts();
  }, []);

  async function loadWorkouts() {
    try {
      const data = await getWorkouts();
      setWorkouts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar treinos:", error);
      setError("Falha ao carregar treinos");
    }
  }

  function handleSelectWorkout(workout) {
    setSelectedWorkout(workout);
    // Inicializa exerciseLogs com base nos exercises do workout selecionado
    const logs = (workout.exercises || []).map((ex) => ({
      exercise_template: ex.id,
      name: ex.name,
      sets_completed: ex.sets,
      reps_completed: ex.reps,
      weight_used: ex.weight || 0,
    }));
    setExerciseLogs(logs);
  }

  function updateExerciseLog(index, field, value) {
    const updated = [...exerciseLogs];
    updated[index][field] = value;
    setExerciseLogs(updated);
  }

  function removeExerciseLog(index) {
    setExerciseLogs(exerciseLogs.filter((_, i) => i !== index));
  }

  function addEmptyExerciseLog() {
    setExerciseLogs([
      ...exerciseLogs,
      {
        exercise_template: null,
        name: "",
        sets_completed: 0,
        reps_completed: 0,
        weight_used: 0,
      },
    ]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!selectedWorkout || exerciseLogs.length === 0) {
      setError("Selecione um treino e adicione pelo menos um exercício");
      setLoading(false);
      return;
    }

    const payload = {
      workout_protocol: selectedWorkout.id,
      duration_minutes: parseInt(duration) || 0,
      exercise_logs: exerciseLogs.map((log) => ({
        exercise_template: log.exercise_template,
        name: log.name,
        sets_completed: parseInt(log.sets_completed) || 0,
        reps_completed: parseInt(log.reps_completed) || 0,
        weight_used: parseFloat(log.weight_used) || 0,
      })),
    };

    try {
      await createWorkoutLog(payload);
      navigate("/dashboard");
    } catch (err) {
      setError("Falha ao registrar treino. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 sm:p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-[#555] hover:text-[#ff301d] transition-colors text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-2"
          >
            <ChevronLeft size={16} /> Voltar
          </button>
          <h1 className="font-['Bebas_Neue'] text-6xl tracking-tight leading-none">
            Registrar <span className="text-[#ff301d]">Treino</span>
          </h1>
          <p className="text-[#666] mt-3 text-lg font-light">
            Registre sua execução e acompanhe o progresso.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-6 py-3 rounded-2xl mb-8">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Seleção de Treino */}
          {!selectedWorkout ? (
            <section className="bg-[#111] border border-white/5 p-8 rounded-2xl">
              <h2 className="text-[#ff301d] font-bold tracking-[0.2em] text-[10px] uppercase mb-6">
                Escolha o Treino
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workouts.map((workout) => (
                  <button
                    key={workout.id}
                    type="button"
                    onClick={() => handleSelectWorkout(workout)}
                    className="bg-[#0d0d0d] hover:bg-[#151515] border border-white/5 hover:border-[#ff301d]/30 p-6 rounded-xl transition-all text-left"
                  >
                    <div className="text-[#ff301d] font-bold mb-2">{workout.name}</div>
                    <div className="text-white/40 text-sm">
                      {workout.day_display || workout.day} •{" "}
                      {workout.exercises?.length || 0} exercícios
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ) : (
            <>
              {/* Info do Treino Selecionado */}
              <section className="bg-[#111] border border-white/5 p-6 rounded-2xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-bold text-2xl text-[#ff301d]">{selectedWorkout.name}</h2>
                    <p className="text-white/40 text-sm mt-2">
                      {selectedWorkout.day_display || selectedWorkout.day}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedWorkout(null)}
                    className="text-white/40 hover:text-[#ff301d] transition-colors"
                  >
                    Alterar
                  </button>
                </div>
              </section>

              {/* Duração */}
              <section className="bg-[#111] border border-white/5 p-8 rounded-2xl">
                <h2 className="text-[#ff301d] font-bold tracking-[0.2em] text-[10px] uppercase mb-6">
                  Duração
                </h2>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#444] mb-3">
                    Duração em Minutos
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-[#0d0d0d] border border-[#222] rounded-lg px-4 py-3 text-sm focus:border-[#ff301d] outline-none transition-all"
                    placeholder="Ex: 45"
                  />
                </div>
              </section>

              {/* Exercícios */}
              <section className="bg-[#111] border border-white/5 p-8 rounded-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[#ff301d] font-bold tracking-[0.2em] text-[10px] uppercase">
                    Exercícios Executados
                  </h2>
                  <button
                    type="button"
                    onClick={addEmptyExerciseLog}
                    className="flex items-center gap-2 text-[#ff301d] hover:bg-[#ff301d]/10 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus size={16} /> Adicionar
                  </button>
                </div>

                <div className="space-y-6">
                  {exerciseLogs.map((log, idx) => (
                    <div key={idx} className="bg-[#0d0d0d] border border-white/5 p-6 rounded-xl">
                      <div className="grid grid-cols-12 gap-4 mb-4">
                        <input
                          type="text"
                          value={log.name}
                          onChange={(e) => updateExerciseLog(idx, "name", e.target.value)}
                          placeholder="Nome do exercício"
                          className="col-span-12 md:col-span-4 bg-[#0a0a0a] border border-[#222] rounded-lg px-3 py-2 text-sm focus:border-[#ff301d] outline-none"
                          required
                        />
                        <input
                          type="number"
                          value={log.sets_completed}
                          onChange={(e) =>
                            updateExerciseLog(idx, "sets_completed", e.target.value)
                          }
                          placeholder="Series"
                          className="col-span-4 md:col-span-2 bg-[#0a0a0a] border border-[#222] rounded-lg px-3 py-2 text-sm focus:border-[#ff301d] outline-none"
                          required
                        />
                        <input
                          type="number"
                          value={log.reps_completed}
                          onChange={(e) =>
                            updateExerciseLog(idx, "reps_completed", e.target.value)
                          }
                          placeholder="Reps"
                          className="col-span-4 md:col-span-2 bg-[#0a0a0a] border border-[#222] rounded-lg px-3 py-2 text-sm focus:border-[#ff301d] outline-none"
                          required
                        />
                        <input
                          type="number"
                          step="0.5"
                          value={log.weight_used}
                          onChange={(e) => updateExerciseLog(idx, "weight_used", e.target.value)}
                          placeholder="Peso (kg)"
                          className="col-span-4 md:col-span-2 bg-[#0a0a0a] border border-[#222] rounded-lg px-3 py-2 text-sm focus:border-[#ff301d] outline-none"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => removeExerciseLog(idx)}
                          className="col-span-0 md:col-span-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors flex items-center justify-center"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Submit */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedWorkout(null)}
                  className="flex-1 border border-white/10 hover:border-white/20 text-white px-6 py-4 rounded-2xl font-bold transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#ff301d] hover:bg-[#d62818] disabled:opacity-50 text-white px-6 py-4 rounded-2xl font-bold transition-all"
                >
                  {loading ? "Salvando..." : "Registrar Treino"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
