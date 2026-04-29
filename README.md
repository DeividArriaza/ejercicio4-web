# LoL Blog — Mini blog de League of Legends

Mini-blog construido con **Vite + React + React Router v6** que consume la
**Data Dragon API** (CDN público de Riot Games) para mostrar todos los
campeones de League of Legends con sus habilidades, estadísticas, lore y
aspectos.

## 🎯 Nivel declarado: **Senior (100 pts)**

Este proyecto cumple los tres niveles del enunciado:

### Base — Junior (70 pts)
- ✅ Proyecto generado con `npm create vite@latest`
- ✅ `react-router-dom` v6 (v6.30.3)
- ✅ 3+ rutas: `/`, `/champions`, `/champions/:id`
- ✅ Datos en módulo separado (`src/data/api.js`), nada hardcodeado en componentes
- ✅ `useParams` en la página de detalle (`src/pages/ChampionDetail.jsx`)
- ✅ Navegación con `<Link>` / `<NavLink>`, sin `<a>` para rutas internas
- ✅ Repo público en GitHub con `README.md` ejecutable
- ✅ Video demo en `/demo`

### Mid — los 4 extras
- ✅ **Página 404** para rutas no encontradas (`src/pages/NotFound.jsx`)
- ✅ **Búsqueda y filtro** en el listado: input por nombre/título + chips por rol (Asesino, Mago, Tirador, Soporte, Tanque, Luchador)
- ✅ **Botón "Campeón aleatorio"** usando `useNavigate` (en Home, en Champions y en Detalle)
- ✅ **Componentes reutilizables** con props documentadas (ver tabla más abajo)

### Senior — los 3 obligatorios
1. ✅ **Estado global con Context API**:
   - `ThemeContext` — tema claro/oscuro persistido en `localStorage`
   - `FavoritesContext` — lista de campeones favoritos persistida en `localStorage`
2. ✅ **PropTypes** definidos en 5 componentes:
   `ChampionCard`, `SearchBar`, `Loader`, `StatBar`, y los providers `ThemeProvider` / `FavoritesProvider`.
3. ✅ **Consumo de API real**: la Data Dragon API de Riot Games (`https://ddragon.leagueoflegends.com`).

---

## 🚀 Cómo correr el proyecto

### Requisitos
- Node.js ≥ 18 (probado con Node 24)
- npm ≥ 9

### Pasos
```bash
git clone <url-del-repo>
cd ejercicio4-web
npm install
npm run dev
```

Abre el navegador en `http://localhost:5180` (puerto fijo configurado en `vite.config.js`).

### Otros scripts
```bash
npm run build      # build de producción a /dist
npm run preview    # sirve el build para verificarlo localmente
npm run lint       # ESLint
```

---

## 🗺 Rutas

| Ruta              | Componente        | Descripción                                           |
| ----------------- | ----------------- | ----------------------------------------------------- |
| `/`               | `Home`            | Landing con hero, destacados y botón aleatorio        |
| `/champions`      | `Champions`       | Listado con búsqueda + filtro por rol + aleatorio     |
| `/champions/:id`  | `ChampionDetail`  | Detalle con `useParams`: lore, stats, habilidades, skins |
| `/favorites`      | `Favorites`       | Lista de favoritos guardados en localStorage          |
| `*`               | `NotFound`        | Página 404                                            |

---

## 🧩 Componentes reutilizables (documentación de props)

### `<ChampionCard champion showFavoriteButton />`
Card de campeón con imagen, nombre, título, tags por rol y botón de favorito.
| Prop                  | Tipo     | Requerido | Default | Descripción |
| --------------------- | -------- | --------- | ------- | ----------- |
| `champion`            | object   | sí        | —       | Objeto con `{ id, name, title, image, tags }` |
| `showFavoriteButton`  | boolean  | no        | `true`  | Muestra/oculta el botón estrella de favorito |

### `<SearchBar value onChange placeholder />`
Input de búsqueda controlado con icono e ícono de limpiar.
| Prop          | Tipo     | Requerido | Default        | Descripción |
| ------------- | -------- | --------- | -------------- | ----------- |
| `value`       | string   | sí        | —              | Valor actual del input (controlado) |
| `onChange`    | function | sí        | —              | Callback `(newValue: string) => void` |
| `placeholder` | string   | no        | `'Buscar...'`  | Placeholder del input |

### `<Loader message />`
Spinner animado con mensaje de carga.
| Prop      | Tipo   | Requerido | Default          | Descripción |
| --------- | ------ | --------- | ---------------- | ----------- |
| `message` | string | no        | `'Cargando...'`  | Texto bajo el spinner |

### `<StatBar label value max />`
Barra de progreso para una estadística numérica.
| Prop    | Tipo   | Requerido | Default | Descripción |
| ------- | ------ | --------- | ------- | ----------- |
| `label` | string | sí        | —       | Etiqueta visible (ej. "Ataque") |
| `value` | number | sí        | —       | Valor actual |
| `max`   | number | no        | `10`    | Valor máximo de referencia |

### `<ThemeToggle />`
Botón sin props que alterna tema claro/oscuro vía `useTheme()`.

### `<Navbar />`
Barra de navegación con `<Link>`/`<NavLink>`. Lee favoritos del context para mostrar contador.

---

## 🌐 API consumida

**Data Dragon** — CDN oficial de Riot Games, sin API key.
- `GET /api/versions.json` — última versión del parche
- `GET /cdn/{version}/data/es_MX/champion.json` — listado completo
- `GET /cdn/{version}/data/es_MX/champion/{id}.json` — detalle por campeón

Toda la integración vive en `src/data/api.js` con cache en memoria.

---

## 🗂 Estructura

```
src/
├── components/
│   ├── ChampionCard.jsx   (PropTypes)
│   ├── Loader.jsx         (PropTypes)
│   ├── Navbar.jsx
│   ├── SearchBar.jsx      (PropTypes)
│   ├── StatBar.jsx        (PropTypes)
│   └── ThemeToggle.jsx
├── context/
│   ├── FavoritesContext.jsx
│   └── ThemeContext.jsx
├── data/
│   └── api.js             ← consumo de la API, datos NO hardcodeados
├── pages/
│   ├── Home.jsx
│   ├── Champions.jsx
│   ├── ChampionDetail.jsx (useParams)
│   ├── Favorites.jsx
│   └── NotFound.jsx
├── App.jsx                ← Routes
├── main.jsx               ← BrowserRouter + Providers
├── App.css
└── index.css
demo/                       ← video de demostración
```

---

## 🎬 Demo

El video del proyecto se encuentra en la carpeta [`/demo`](./demo).

---

## 📝 Notas

- Los datos provienen de la Data Dragon API; este sitio no está afiliado a Riot Games.
- League of Legends y todos los nombres de campeones son propiedad de Riot Games, Inc.
