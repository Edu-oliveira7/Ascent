import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";
import api from "../services/api"; 

export default function CreateWorkout({ onCreated, initialWorkout, onDeleted }) {
  const navigate = useNavigate();
  const { notify } = useContext(NotificationContext);

  const [name, setName] = useState("");
  const [day, setDay] = useState("SEG");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exercises, setExercises] = useState([{ name: "", sets: "", reps: "", weight: "" }]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (initialWorkout) {
      setIsEditing(true);
      setName(initialWorkout.name || "");
      setDay(initialWorkout.day || "SEG");
      setExercises(
        (initialWorkout.exercises || []).map((ex) => ({
          id: ex.id,
          name: ex.name || "",
          sets: ex.sets || "",
          reps: ex.reps || "",
          weight: ex.weight || "",
        }))
      );
    }
  }, [initialWorkout]);

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "", weight: "" }]);
  };

  const removeExercise = (index) => {
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
    setLoading(true);
    setError("");

    const payload = {
      name,
      day,
      exercises: exercises.map((ex) => ({
        id: ex.id,
        name: ex.name,
        sets: parseInt(ex.sets, 10) || 0,
        reps: parseInt(ex.reps, 10) || 0,
        weight: parseFloat(ex.weight) || 0,
      })),
    };

    try {
      if (isEditing && initialWorkout?.id) {
        await api.put(`workouts/${initialWorkout.id}/`, payload);
        notify("Protocolo atualizado com sucesso.", "success");
      } else {
        await api.post("workouts/", payload);
        notify("Protocolo criado com sucesso.", "success");
      }

      if (onCreated) {
        onCreated();
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      const message = err.response?.data?.detail || "Falha ao salvar o protocolo. Verifique os campos.";
      setError(message);
      notify(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!isEditing || !initialWorkout?.id) return;
    if (!confirm("Deseja realmente excluir este protocolo?")) return;
    setLoading(true);
    try {
      await api.delete(`workouts/${initialWorkout.id}/`);
      notify("Protocolo excluído com sucesso.", "success");
      if (onDeleted) onDeleted();
      else navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.detail || "Falha ao deletar o protocolo.";
      setError(message);
      notify(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Barlow'] pt-20 pb-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-12">
          <button onClick={() => navigate("/dashboard")} className="text-[#555] hover:text-[#ff301d] transition-colors text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
            ← Voltar ao Painel
          </button>
          <h1 className="font-['Bebas_Neue'] text-4xl md:text-6xl tracking-tight leading-none">
            {isEditing ? 'Editar' : 'Novo'} <span className="text-[#ff301d]">Protocolo</span>
          </h1>
          <p className="text-[#666] mt-3 text-lg font-light">
            {isEditing ? 'Ajuste as séries e cargas do treino.' : 'Estrutura base do treinamento.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          <section className="bg-[#111] border border-white/5 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#ff301d]" />
            <h2 className="text-[#ff301d] font-bold tracking-[0.2em] text-[10px] uppercase mb-8">Configuração Geral</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase tracking-widest text-[#444] mb-3">Identificação (Ex: Treino A)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#222] rounded-lg px-4 py-4 text-sm focus:border-[#ff301d] outline-none transition-all"
                  placeholder="Nome do treino..."
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#444] mb-3">Dia Sugerido</label>
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#222] rounded-lg px-4 py-4 text-sm focus:border-[#ff301d] outline-none cursor-pointer"
                >
                  <option value="SEG">Segunda-feira</option>
                  <option value="TER">Terça-feira</option>
                  <option value="QUA">Quarta-feira</option>
                  <option value="QUI">Quinta-feira</option>
                  <option value="SEX">Sexta-feira</option>
                  <option value="SAB">Sábado</option>
                  <option value="DOM">Domingo</option>
                </select>
              </div>
            </div>
          </section>

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="text-[#ff301d] font-bold tracking-[0.2em] text-[10px] uppercase">Exercícios</h2>
              <span className="text-[10px] text-[#444] uppercase tracking-widest">{exercises.length} Movimentos</span>
            </div>

            <div className="grid gap-4">
              {exercises.map((exercise, index) => (
                <div key={index} className="bg-[#111] border border-white/5 p-6 rounded-xl flex flex-col lg:flex-row gap-6 items-end group hover:border-white/10 transition-all relative">
                  <div className="flex-1 w-full">
                    <label className="block text-[9px] uppercase tracking-widest text-[#444] mb-2 font-bold">Nome</label>
                    <input
                      type="text"
                      placeholder="Ex: Supino"
                      value={exercise.name}
                      onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#222] rounded-md px-4 py-3 text-sm focus:border-[#ff301d] outline-none"
                      required
                    />
                  </div>

                  <div className="w-full lg:w-24">
                    <label className="block text-[9px] uppercase tracking-widest text-[#444] mb-2 font-bold text-center">Séries</label>
                    <input
                      type="number"
                      value={exercise.sets}
                      onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#222] rounded-md px-4 py-3 text-sm text-center focus:border-[#ff301d] outline-none"
                      required
                    />
                  </div>

                  <div className="w-full lg:w-24">
                    <label className="block text-[9px] uppercase tracking-widest text-[#444] mb-2 font-bold text-center">Reps</label>
                    <input
                      type="number"
                      value={exercise.reps}
                      onChange={(e) => handleExerciseChange(index, "reps", e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#222] rounded-md px-4 py-3 text-sm text-center focus:border-[#ff301d] outline-none"
                      required
                    />
                  </div>

                  <div className="w-full lg:w-32">
                    <label className="block text-[9px] uppercase tracking-widest text-[#444] mb-2 font-bold text-center">Carga (kg)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={exercise.weight}
                      onChange={(e) => handleExerciseChange(index, "weight", e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#222] rounded-md px-4 py-3 text-sm text-center text-[#ff301d] font-bold focus:border-[#ff301d] outline-none"
                    />
                  </div>

                  {exercises.length > 1 && (
                    <button type="button" onClick={() => removeExercise(index)} className="lg:mb-3 text-[#333] hover:text-[#ff301d] p-2">
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addExercise}
              className="w-full py-5 border border-dashed border-[#222] rounded-xl text-[#555] text-xs uppercase tracking-[0.3em] font-bold hover:border-[#ff301d] hover:text-[#ff301d] transition-all bg-white/[0.01]"
            >
              + Adicionar Movimento
            </button>
          </div>

          {error && <div className="bg-[#ff301d]/10 border border-[#ff301d]/20 text-[#ff301d] p-5 rounded-xl text-sm text-center">{error}</div>}

          <div className="pt-10 grid gap-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ff301d] py-6 rounded-2xl text-white font-black uppercase tracking-[0.4em] text-sm hover:bg-[#d4281a] transition-all shadow-lg"
            >
              {loading ? "Sincronizando..." : isEditing ? "Salvar Alterações" : "Finalizar Protocolo"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="w-full bg-red-600/10 border border-red-600/20 text-red-500 py-4 rounded-2xl font-bold"
              >
                Excluir Protocolo
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}