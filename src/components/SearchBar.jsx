import PropTypes from 'prop-types';

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        type="search"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      {value && (
        <button
          type="button"
          className="search-clear"
          onClick={() => onChange('')}
          aria-label="Limpiar búsqueda"
        >
          ×
        </button>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  /** Texto actual del campo de búsqueda (controlado) */
  value: PropTypes.string.isRequired,
  /** Callback que recibe el nuevo valor cada vez que el usuario escribe */
  onChange: PropTypes.func.isRequired,
  /** Texto placeholder mostrado cuando el campo está vacío */
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: 'Buscar...',
};
