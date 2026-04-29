import PropTypes from 'prop-types';

export default function Loader({ message }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader-ring" aria-hidden="true" />
      <p className="loader-text">{message}</p>
    </div>
  );
}

Loader.propTypes = {
  /** Mensaje mostrado debajo del spinner */
  message: PropTypes.string,
};

Loader.defaultProps = {
  message: 'Cargando...',
};
