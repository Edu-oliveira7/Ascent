import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getWorkouts, getWorkoutStats } from "../services/workout";
import { logoutUser } from "../services/auth";
import { AuthContext } from "../context/AuthContext"; 
import { 
  LayoutDashboard, Dumbbell, Settings, LogOut, 
  Search, Bell, Plus, ChevronRight, TrendingUp, Play
} from "lucide-react";
import { Edit3 } from "lucide-react";

const dedupeWorkouts = (workouts) => {
  const seen = new Set();
  return workouts.filter((workout) => {
    const key = `${String(workout.name || '').trim().toLowerCase()}:${String(workout.day || '').trim()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  async function loadDashboardData() {
    try {
      // Carrega treinos e estatísticas em paralelo
      const [workoutsData, statsData] = await Promise.all([
        getWorkouts(),
        getWorkoutStats()
      ]);
      
      setWorkouts(Array.isArray(workoutsData) ? dedupeWorkouts(workoutsData) : []);
      setStats(statsData);
    } catch (error) {
      console.error(error);
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadDashboardData(); }, []);

  const handleLogout = async () => {
    await logoutUser();
    logout();
    navigate("/login");
  };

  const userInitial = user?.username ? user.username.charAt(0).toUpperCase() : "U";

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#050505] text-[#f5f5f5] font-['Barlow'] overflow-hidden">
      
      <aside className="hidden md:flex w-full md:w-64 max-w-[18rem] bg-[#0a0a0a] border-r border-white/5 flex-col p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-[#ff301d] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,48,29,0.4)]">
            <Dumbbell size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter italic">ASCENT</span>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={location.pathname === '/dashboard'} onClick={() => navigate('/dashboard')} />
          <NavItem icon={<Dumbbell size={20} />} label="Meus Treinos" active={location.pathname === '/workouts'} onClick={() => navigate('/workouts')} />
          <NavItem icon={<TrendingUp size={20} />} label="Evolução" active={location.pathname === '/evolution'} onClick={() => navigate('/evolution')} />
          <NavItem icon={<Bell size={20} />} label="Histórico" active={location.pathname === '/history'} onClick={() => navigate('/history')} />
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-2">
          <NavItem icon={<Settings size={20} />} label="Configurações" />
          <NavItem 
            icon={<LogOut size={20} />} 
            label="Sair" 
            color="text-red-500" 
            onClick={handleLogout}
          />
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-[#050505]/50 backdrop-blur-md">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="text" 
              placeholder="Buscar protocolos..." 
              className="w-full bg-[#111] border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:border-[#ff301d]/50 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-5">
            <button className="p-2 text-white/40 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#ff301d] rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff301d] to-[#ff6b5c] border-2 border-white/10 flex items-center justify-center font-bold text-sm shadow-lg cursor-pointer">
               {userInitial}
            </div>
          </div>
        </header>

          <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight capitalize">Bem-vindo, {user?.username || "Atleta"}</h2>
              <p className="text-white/40 text-sm md:text-base mt-1 font-light">Visão geral da sua performance.</p>
            </div>
            <button 
              onClick={() => navigate("/create-workout")}
              className="min-w-[10rem] bg-[#ff301d] hover:bg-[#d62818] text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Plus size={18} /> NOVO TREINO
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 lg:hidden mb-6">
            {[
              { label: 'Protocolos', to: '/workouts' },
              { label: 'Histórico', to: '/history' },
              { label: 'Evolução', to: '/evolution' },
              { label: 'Meus Treinos', to: '/meus-treinos' },
            ].map((item) => (
              <button
                key={item.to}
                onClick={() => navigate(item.to)}
                className="rounded-2xl border border-white/10 bg-white/5 py-3 text-xs uppercase tracking-[0.2em] text-white/80 hover:bg-white/10 transition"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            <StatCard label="Consistência (7 Dias)" value={`${stats?.weekly_consistency || "0"}`} subValue="+ Em alta" />
            <StatCard label="Carga Total" value={`${stats?.total_volume_kg?.toLocaleString() || "0"} kg`} subValue="+ Volume" />
            <StatCard label="Recorde (PR)" value={`${stats?.personal_record || "0"} kg`} subValue="+ Força" />
            <StatCard label="Sessões Totais" value={`${stats?.workouts_completed || "0"}`} subValue="+ Histórico" />
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Meus Protocolos</h3>
              <button
                onClick={() => navigate('/workouts')}
                className="text-xs text-white/40 hover:text-[#ff301d] uppercase tracking-widest font-bold transition-colors"
              >
                Ver todos
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-20"><p className="animate-pulse text-white/20">Sincronizando...</p></div>
            ) : workouts.length === 0 ? (
              <div className="text-center py-20 bg-white/[0.01] rounded-3xl border border-dashed border-white/5">
                <p className="text-white/20">Crie seu primeiro treino para começar.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {workouts.map((w) => (
                  <WorkoutCard key={w.id} workout={w} navigate={navigate} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, color = "text-white/40", onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all ${
        active ? 'bg-[#ff301d]/10 text-[#ff301d]' : `${color} hover:bg-white/5 hover:text-white`
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 bg-[#ff301d] rounded-full shadow-[0_0_8px_#ff301d]"></div>}
    </div>
  );
}

function StatCard({ label, value, subValue }) {
  return (
    <div className="bg-[#111] border border-white/5 p-5 rounded-[2rem] hover:border-white/10 transition-colors">
      <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <h4 className="text-2xl font-bold">{value}</h4>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${subValue.includes('-') ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
          {subValue}
        </span>
      </div>
    </div>
  );
}

function WorkoutCard({ workout, navigate }) {
  return (
    <div className="group bg-[#050505] border border-white/5 p-6 rounded-[2rem] hover:border-[#ff301d]/30 transition-all hover:bg-[#080808] relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-[10px] font-black text-[#ff301d] uppercase tracking-tighter bg-[#ff301d]/10 px-2 py-1 rounded-md mb-2 block w-fit">
            {workout.day}
          </span>
          <h4 className="text-xl font-bold tracking-tight">{workout.name}</h4>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => navigate("/execute-workout")}
            className="p-2 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 group-hover:bg-[#ff301d] transition-all text-white"
          >
            <Play size={18} />
          </button>
          <button
            onClick={() => navigate(`/edit-workout/${workout.id}`)}
            className="p-2 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 group-hover:bg-[#ff301d] transition-all text-white"
          >
            <Edit3 size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {workout.exercises?.slice(0, 3).map((ex) => (
          <div key={ex.id} className="flex justify-between items-center border-b border-white/[0.03] pb-2 last:border-0">
            <span className="text-sm text-white/40 font-light">{ex.name}</span>
            <span className="text-xs font-mono text-white/20">{ex.sets}x{ex.reps}</span>
          </div>
        ))}
      </div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#ff301d]/5 blur-[50px] rounded-full group-hover:bg-[#ff301d]/10 transition-all"></div>
    </div>
  );
}