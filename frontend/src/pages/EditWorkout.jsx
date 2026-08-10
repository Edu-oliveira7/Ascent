import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreateWorkout from "../components/CreateWorkout";
import { getWorkout } from "../services/workout";

export default function EditWorkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getWorkout(id);
        setWorkout(data);
      } catch {
        setError("Falha ao carregar treino.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="p-8">Carregando...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return <CreateWorkout initialWorkout={workout} onCreated={() => navigate('/dashboard')} onDeleted={() => navigate('/dashboard')} />;
}
