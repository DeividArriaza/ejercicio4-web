import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/useFavorites';
import { getChampions } from '../data/api';
import ChampionCard from '../components/ChampionCard';
import Loader from '../components/Loader';

export default function Favorites() {
  const { favorites, clearFavorites } = useFavorites();
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getChampions()
      .then((c) => active && setChampions(c))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  if (loading) return <Loader message="Cargando favoritos..." />;

  const favs = champions.filter((c) => favorites.includes(c.id));

  if (favs.length === 0) {
    return (
      <section className="favorites-page empty-page">
        <h1>Sin favoritos todavía</h1>
        <p className="muted">Marca campeones con la estrella ☆ para guardarlos aquí.</p>
        <Link to="/champions" className="btn btn-primary">Explorar campeones</Link>
      </section>
    );
  }

  return (
    <section className="favorites-page">
      <header className="page-header">
        <h1>Tus favoritos</h1>
        <button type="button" className="btn btn-ghost" onClick={clearFavorites}>
          Vaciar lista
        </button>
      </header>
      <div className="champion-grid">
        {favs.map((c) => (
          <ChampionCard key={c.id} champion={c} />
        ))}
      </div>
    </section>
  );
}
