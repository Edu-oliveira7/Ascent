import { useEffect, useState } from "react";
import { getWorkoutLogs } from "../services/workout";

function SummaryCard({ title, value, caption }) {
  return (
    <div className="rounded-[2rem] bg-[#111] border border-white/5 p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-sm text-white/50 mt-2">{caption}</p>
    </div>
  );
}

export default function History({ title = "Histórico de Treinos" }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getWorkoutLogs();
        setLogs(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const sessions = logs.length;
  const totalVolume = logs.reduce((sum, log) => sum + (log.total_volume || 0), 0);
  const avgVolume = sessions ? Math.round(totalVolume / sessions) : 0;
  const lastSession = logs[0];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-white/50 mt-2 max-w-2xl">Veja o histórico de sessões, volume total e como seus treinos evoluíram ao longo do tempo.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <SummaryCard title="Sessões" value={sessions} caption="Totais registrados" />
            <SummaryCard title="Volume" value={`${totalVolume} kg`} caption="Volume total" />
            <SummaryCard title="Média" value={`${avgVolume} kg`} caption="Por sessão" />
          </div>
        </div>

        {loading ? (
          <div className="rounded-[2rem] bg-[#111] p-12 text-center text-white/30">Carregando histórico...</div>
        ) : logs.length === 0 ? (
          <div className="rounded-[2rem] bg-[#111] p-12 text-center text-white/30">Nenhuma sessão registrada.</div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
              <div className="rounded-3xl bg-[#111] p-6">
                <p className="text-sm text-white/40 uppercase tracking-[0.2em] mb-3">Último treino</p>
                <p className="text-xl font-bold text-white">{lastSession?.workout_protocol || 'Sem protocolo'}</p>
                <p className="text-white/50 mt-2">{lastSession ? lastSession.date_display : '-'}</p>
              </div>
              <div className="rounded-3xl bg-[#111] p-6">
                <p className="text-sm text-white/40 uppercase tracking-[0.2em] mb-3">Maior volume</p>
                <p className="text-xl font-bold text-white">{Math.max(...logs.map((log) => log.total_volume || 0))} kg</p>
              </div>
              <div className="rounded-3xl bg-[#111] p-6">
                <p className="text-sm text-white/40 uppercase tracking-[0.2em] mb-3">Última duração</p>
                <p className="text-xl font-bold text-white">{lastSession?.duration_minutes || 0} min</p>
              </div>
            </div>

            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="bg-[#111] rounded-[2rem] p-6 border border-white/5">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <div className="text-sm text-white/40">{log.date_display}</div>
                      <h2 className="text-2xl font-bold">{log.workout_protocol || 'Sessão'}</h2>
                    </div>
                    <div className="text-right">
                      <p className="text-white/40 text-sm">Volume</p>
                      <p className="text-xl font-bold">{log.total_volume} kg</p>
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {(log.exercise_logs || []).map((e) => (
                      <div key={e.id} className="rounded-3xl bg-[#0a0a0a] p-4">
                        <div className="flex items-center justify-between text-sm text-white/40 mb-2">
                          <span>{e.name}</span>
                          <span>{e.weight_used} kg</span>
                        </div>
                        <p className="text-white/70 text-sm">{e.sets_completed}x{e.reps_completed}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
