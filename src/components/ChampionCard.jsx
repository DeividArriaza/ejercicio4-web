import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/useFavorites';
import { TAG_LABELS_ES } from '../data/api';

export default function ChampionCard({ champion, showFavoriteButton }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(champion.id);

  return (
    <article className="champion-card">
      <Link to={`/champions/${champion.id}`} className="champion-card-link">
        <div className="champion-card-image-wrap">
          <img
            src={champion.image}
            alt={`Ícono de ${champion.name}`}
            loading="lazy"
            className="champion-card-image"
          />
        </div>
        <div className="champion-card-body">
          <h3 className="champion-card-name">{champion.name}</h3>
          <p className="champion-card-title">{champion.title}</p>
          <div className="champion-card-tags">
            {champion.tags.map((tag) => (
              <span key={tag} className={`tag tag-${tag.toLowerCase()}`}>
                {TAG_LABELS_ES[tag] ?? tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
      {showFavoriteButton && (
        <button
          type="button"
          className={`fav-btn ${fav ? 'is-fav' : ''}`}
          onClick={() => toggleFavorite(champion.id)}
          aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          title={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {fav ? '★' : '☆'}
        </button>
      )}
    </article>
  );
}

ChampionCard.propTypes = {
  /** Objeto campeón con datos resumidos provenientes de Data Dragon */
  champion: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  /** Si se muestra el botón estrella para marcar/desmarcar favorito */
  showFavoriteButton: PropTypes.bool,
};

ChampionCard.defaultProps = {
  showFavoriteButton: true,
};
