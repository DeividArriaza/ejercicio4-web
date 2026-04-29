import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TAG_LABELS_ES, getChampionById, getChampions } from '../data/api';
import Loader from '../components/Loader';
import StatBar from '../components/StatBar';
import { useFavorites } from '../context/useFavorites';

export default function ChampionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState({ id: null, champion: null, notFound: false });
  const [skinSel, setSkinSel] = useState({ id: null, idx: 0 });
  const { isFavorite, toggleFavorite } = useFavorites();
  const loading = result.id !== id;
  const champion = result.champion;
  const notFound = result.notFound;
  const skinIdx = skinSel.id === id ? skinSel.idx : 0;

  useEffect(() => {
    let active = true;
    getChampionById(id).then((c) => {
      if (!active) return;
      setResult({ id, champion: c, notFound: !c });
    });
    return () => {
      active = false;
    };
  }, [id]);

  const handleRandom = async () => {
    const champs = await getChampions();
    let pick;
    do {
      pick = champs[Math.floor(Math.random() * champs.length)];
    } while (pick.id === id && champs.length > 1);
    navigate(`/champions/${pick.id}`);
  };

  if (loading) return <Loader message="Invocando campeón..." />;
  if (notFound) {
    return (
      <section className="detail">
        <p className="error">El campeón &quot;{id}&quot; no existe.</p>
        <Link to="/champions" className="btn btn-primary">← Volver al listado</Link>
      </section>
    );
  }
  if (!champion) return null;

  const fav = isFavorite(champion.id);
  const currentSkin = champion.skins[skinIdx] ?? champion.skins[0];

  return (
    <section className="detail">
      <div
        className="detail-hero"
        style={{ backgroundImage: `url(${currentSkin.splash})` }}
      >
        <div className="detail-hero-overlay" />
        <div className="detail-hero-content">
          <Link to="/champions" className="back-link">← Campeones</Link>
          <h1 className="detail-name">{champion.name}</h1>
          <p className="detail-title">{champion.title}</p>
          <div className="detail-tags">
            {champion.tags.map((t) => (
              <span key={t} className={`tag tag-${t.toLowerCase()}`}>
                {TAG_LABELS_ES[t] ?? t}
              </span>
            ))}
            <span className="tag tag-resource">{champion.partype}</span>
          </div>
          <div className="detail-actions">
            <button
              type="button"
              onClick={() => toggleFavorite(champion.id)}
              className={`btn ${fav ? 'btn-fav-on' : 'btn-fav-off'}`}
            >
              {fav ? '★ En favoritos' : '☆ Agregar a favoritos'}
            </button>
            <button type="button" onClick={handleRandom} className="btn btn-secondary">
              🎲 Otro aleatorio
            </button>
          </div>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-section">
          <h2>Lore</h2>
          <p className="lore">{champion.lore}</p>
        </div>

        <div className="detail-section">
          <h2>Estadísticas base</h2>
          <div className="stats">
            <StatBar label="Ataque" value={champion.info.attack} max={10} />
            <StatBar label="Defensa" value={champion.info.defense} max={10} />
            <StatBar label="Magia" value={champion.info.magic} max={10} />
            <StatBar label="Dificultad" value={champion.info.difficulty} max={10} />
          </div>
          <ul className="raw-stats">
            <li><span>HP</span><strong>{champion.stats.hp}</strong></li>
            <li><span>Armadura</span><strong>{champion.stats.armor}</strong></li>
            <li><span>Resist. Mágica</span><strong>{champion.stats.spellblock}</strong></li>
            <li><span>Daño Ataque</span><strong>{champion.stats.attackdamage}</strong></li>
            <li><span>Vel. Movimiento</span><strong>{champion.stats.movespeed}</strong></li>
            <li><span>Rango Ataque</span><strong>{champion.stats.attackrange}</strong></li>
          </ul>
        </div>

        <div className="detail-section detail-section-wide">
          <h2>Habilidades</h2>
          <div className="abilities">
            <div className="ability">
              <img src={champion.passive.image} alt={champion.passive.name} className="ability-icon" />
              <div className="ability-body">
                <h3><span className="ability-key">Pasiva</span> {champion.passive.name}</h3>
                <p dangerouslySetInnerHTML={{ __html: champion.passive.description }} />
              </div>
            </div>
            {champion.spells.map((s, i) => (
              <div key={s.id} className="ability">
                <img src={s.image} alt={s.name} className="ability-icon" />
                <div className="ability-body">
                  <h3><span className="ability-key">{['Q', 'W', 'E', 'R'][i]}</span> {s.name}</h3>
                  <p dangerouslySetInnerHTML={{ __html: s.description }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {champion.skins.length > 1 && (
          <div className="detail-section detail-section-wide">
            <h2>Aspectos ({champion.skins.length})</h2>
            <div className="skin-thumbs">
              {champion.skins.map((s, i) => (
                <button
                  key={s.num}
                  type="button"
                  className={`skin-thumb ${i === skinIdx ? 'active' : ''}`}
                  onClick={() => setSkinSel({ id, idx: i })}
                  title={s.name}
                >
                  <img src={s.splash} alt={s.name} loading="lazy" />
                  <span>{s.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {(champion.allytips?.length || champion.enemytips?.length) && (
          <div className="detail-section detail-section-wide tips">
            {champion.allytips?.length > 0 && (
              <div>
                <h2>Consejos para aliados</h2>
                <ul>
                  {champion.allytips.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            )}
            {champion.enemytips?.length > 0 && (
              <div>
                <h2>Consejos contra este campeón</h2>
                <ul>
                  {champion.enemytips.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
