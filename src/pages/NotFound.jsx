import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="not-found">
      <h1 className="nf-code">404</h1>
      <p className="nf-text">Esta ruta fue Annie-quilada.</p>
      <p className="muted">La página que buscas no existe en el Rift.</p>
      <Link to="/" className="btn btn-primary">← Volver al inicio</Link>
    </section>
  );
}
