import { useEffect, useState } from "react";
import { getWorkoutLogs } from "../services/workout";

function LineGraph({ data, labels, color }) {
  const max = Math.max(...data, 1);
  const width = 560;
  const height = 220;
  const padding = 40;
  const points = data.map((value, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
    const y = height - padding - (value / max) * (height - padding * 1.5);
    return { x, y };
  });

  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const areaPath = `${path} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="rounded-3xl bg-[#0f0f0f] p-4 border border-white/5">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#areaGradient)" />
        <path d={path} fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        {points.map((point, index) => (
          <circle key={index} cx={point.x} cy={point.y} r="4" fill={color} />
        ))}
        {labels.map((label, index) => {
          const x = padding + (index * (width - padding * 2)) / Math.max(labels.length - 1, 1);
          return (
            <text key={index} x={x} y={height - 12} textAnchor="middle" fill="#ccc" fontSize="10">
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function StatBadge({ title, value, caption }) {
  return (
    <div className="rounded-[2rem] bg-[#111] p-6 border border-white/5 shadow-sm">
      <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-3">{title}</p>
      <p className="text-4xl font-bold text-white">{value}</p>
      <p className="text-sm text-white/50 mt-2">{caption}</p>
    </div>
  );
}

export default function Evolution() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getWorkoutLogs();
        setLogs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setLogs([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const sortedLogs = [...logs].sort((a, b) => new Date(a.date) - new Date(b.date));
  const labels = sortedLogs.map((log) => new Date(log.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }));
  const totalVolumes = sortedLogs.map((log) => log.total_volume || 0);
  const prValues = sortedLogs.map((log) => (log.exercise_logs || []).reduce((max, exercise) => Math.max(max, exercise.weight_used || 0), 0));
  const averageVolume = sortedLogs.length ? Math.round(totalVolumes.reduce((sum, value) => sum + value, 0) / sortedLogs.length) : 0;
  const highestPR = prValues.length ? Math.max(...prValues) : 0;
  const lastSession = sortedLogs[sortedLogs.length - 1];
  const consistency = sortedLogs.reduce((acc, current, index, array) => {
    if (index === 0) return 1;
    const currentDate = new Date(current.date);
    const prevDate = new Date(array[index - 1].date);
    const diffDays = Math.round((currentDate - prevDate) / (1000 * 60 * 60 * 24));
    return diffDays <= 7 ? acc + 1 : 1;
  }, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#ff301d] mb-2">Base de progresso</p>
            <h1 className="text-4xl font-bold">Sua evolução em treinos</h1>
            <p className="text-white/50 mt-3 max-w-2xl">
              Visualize a progressão de carga, o recorde pessoal e a consistência em treinos recentes.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatBadge title="Sessões" value={sortedLogs.length} caption="Registros de treino" />
            <StatBadge title="PR Máximo" value={`${highestPR} kg`} caption="Maior carga registrada" />
            <StatBadge title="Volume médio" value={`${averageVolume} kg`} caption="Por sessão" />
          </div>
        </div>

        {loading ? (
          <div className="rounded-[2rem] bg-[#111] p-12 text-center text-white/30">Carregando evolução...</div>
        ) : (
          <>
            <div className="grid gap-6 xl:grid-cols-2">
              <div className="rounded-[2.5rem] bg-[#111] border border-white/5 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-white/40">Volume por sessão</p>
                    <h2 className="text-2xl font-bold mt-2">Carga total</h2>
                  </div>
                  <span className="text-sm text-white/40">Últimos {sortedLogs.length} dias</span>
                </div>
                <LineGraph data={totalVolumes} labels={labels} color="#ff301d" />
              </div>

              <div className="rounded-[2.5rem] bg-[#111] border border-white/5 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-white/40">Recorde pessoal</p>
                    <h2 className="text-2xl font-bold mt-2">PR ao longo do tempo</h2>
                  </div>
                  <span className="text-sm text-white/40">Consistência: {consistency}x</span>
                </div>
                <LineGraph data={prValues} labels={labels} color="#5dd9ff" />
              </div>
            </div>

            <section className="rounded-[2.5rem] bg-[#111] border border-white/5 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-white/40">Último treino</p>
                  <h2 className="text-2xl font-bold mt-2">{lastSession?.workout_protocol || 'Sem sessões'}</h2>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/40">Data</p>
                  <p className="font-bold">{lastSession ? new Date(lastSession.date).toLocaleDateString('pt-BR') : '—'}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-3xl bg-[#0d0d0d] p-5">
                  <p className="text-sm text-white/40">Volume</p>
                  <p className="text-2xl font-bold mt-3">{lastSession?.total_volume || 0} kg</p>
                </div>
                <div className="rounded-3xl bg-[#0d0d0d] p-5">
                  <p className="text-sm text-white/40">Duração</p>
                  <p className="text-2xl font-bold mt-3">{lastSession?.duration_minutes || 0} min</p>
                </div>
                <div className="rounded-3xl bg-[#0d0d0d] p-5">
                  <p className="text-sm text-white/40">Sessões consecutivas</p>
                  <p className="text-2xl font-bold mt-3">{consistency}</p>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
