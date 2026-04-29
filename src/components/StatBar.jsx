import PropTypes from 'prop-types';

export default function StatBar({ label, value, max }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="stat-bar">
      <div className="stat-bar-header">
        <span className="stat-bar-label">{label}</span>
        <span className="stat-bar-value">{value}/{max}</span>
      </div>
      <div className="stat-bar-track">
        <div className="stat-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

StatBar.propTypes = {
  /** Etiqueta visible para la estadística (ej. "Ataque") */
  label: PropTypes.string.isRequired,
  /** Valor numérico actual de la estadística */
  value: PropTypes.number.isRequired,
  /** Valor máximo de referencia para calcular el porcentaje del fill */
  max: PropTypes.number,
};

StatBar.defaultProps = {
  max: 10,
};
