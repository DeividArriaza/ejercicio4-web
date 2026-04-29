import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_TAGS, TAG_LABELS_ES, getChampions } from '../data/api';
import ChampionCard from '../components/ChampionCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';

export default function Champions() {
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    getChampions()
      .then((c) => active && setChampions(c))
      .catch((e) => active && setError(e.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return champions.filter((c) => {
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q);
      const matchesTag = tagFilter === 'all' || c.tags.includes(tagFilter);
      return matchesQuery && matchesTag;
    });
  }, [champions, query, tagFilter]);

  const handleRandom = () => {
    const pool = filtered.length ? filtered : champions;
    if (!pool.length) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    navigate(`/champions/${pick.id}`);
  };

  if (loading) return <Loader message="Cargando campeones..." />;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <section className="champions-page">
      <header className="page-header">
        <h1>Campeones</h1>
        <p className="muted">
          {filtered.length} de {champions.length} campeones
        </p>
      </header>

      <div className="filters">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Buscar por nombre o título..."
        />
        <div className="tag-filters">
          <button
            type="button"
            className={`chip ${tagFilter === 'all' ? 'active' : ''}`}
            onClick={() => setTagFilter('all')}
          >
            Todos
          </button>
          {ALL_TAGS.map((t) => (
            <button
              key={t}
              type="button"
              className={`chip ${tagFilter === t ? 'active' : ''}`}
              onClick={() => setTagFilter(t)}
            >
              {TAG_LABELS_ES[t]}
            </button>
          ))}
        </div>
        <button type="button" onClick={handleRandom} className="btn btn-secondary btn-random">
          🎲 Aleatorio
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="empty">No se encontraron campeones con esos criterios.</p>
      ) : (
        <div className="champion-grid">
          {filtered.map((c) => (
            <ChampionCard key={c.id} champion={c} />
          ))}
        </div>
      )}
    </section>
  );
}
