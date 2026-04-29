// Capa de datos: consumo de la Data Dragon API (CDN público de Riot Games)
// https://developer.riotgames.com/docs/lol#data-dragon
//
// API_BASE pasa por el proxy de Vite (/ddragon → https://ddragon.leagueoflegends.com)
// para evitar problemas de CORS / TLS interception en redes corporativas.
// IMG_BASE apunta directo al CDN porque las imágenes se cargan vía <img src="...">
// y el navegador las resuelve fuera del contexto de fetch.
const API_BASE = '/ddragon';
const IMG_BASE = 'https://ddragon.leagueoflegends.com';
const LOCALE = 'es_MX';

async function fetchJson(url) {
  let res;
  try {
    res = await fetch(url);
  } catch (e) {
    throw new Error(
      `No se pudo conectar a Data Dragon (${url}). ` +
      `Verifica tu conexión a internet. Detalle: ${e.message}`,
    );
  }
  if (!res.ok) throw new Error(`Respuesta ${res.status} desde ${url}`);
  return res.json();
}

let cachedVersion = null;
let cachedChampions = null;
const detailCache = new Map();

export async function getLatestVersion() {
  if (cachedVersion) return cachedVersion;
  const versions = await fetchJson(`${API_BASE}/api/versions.json`);
  cachedVersion = versions[0];
  return cachedVersion;
}

export async function getChampions() {
  if (cachedChampions) return cachedChampions;
  const version = await getLatestVersion();
  const json = await fetchJson(
    `${API_BASE}/cdn/${version}/data/${LOCALE}/champion.json`,
  );
  cachedChampions = Object.values(json.data).map((c) => ({
    id: c.id,
    key: c.key,
    name: c.name,
    title: c.title,
    blurb: c.blurb,
    tags: c.tags,
    info: c.info,
    image: `${IMG_BASE}/cdn/${version}/img/champion/${c.image.full}`,
    splash: `${IMG_BASE}/cdn/img/champion/splash/${c.id}_0.jpg`,
    loading: `${IMG_BASE}/cdn/img/champion/loading/${c.id}_0.jpg`,
  }));
  return cachedChampions;
}

export async function getChampionById(id) {
  if (detailCache.has(id)) return detailCache.get(id);
  const version = await getLatestVersion();
  let json;
  try {
    json = await fetchJson(
      `${API_BASE}/cdn/${version}/data/${LOCALE}/champion/${id}.json`,
    );
  } catch {
    return null;
  }
  const raw = json.data[id];
  if (!raw) return null;
  const detail = {
    id: raw.id,
    name: raw.name,
    title: raw.title,
    lore: raw.lore,
    blurb: raw.blurb,
    tags: raw.tags,
    info: raw.info,
    stats: raw.stats,
    partype: raw.partype,
    allytips: raw.allytips,
    enemytips: raw.enemytips,
    spells: raw.spells.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      image: `${IMG_BASE}/cdn/${version}/img/spell/${s.image.full}`,
    })),
    passive: {
      name: raw.passive.name,
      description: raw.passive.description,
      image: `${IMG_BASE}/cdn/${version}/img/passive/${raw.passive.image.full}`,
    },
    splash: `${IMG_BASE}/cdn/img/champion/splash/${raw.id}_0.jpg`,
    loading: `${IMG_BASE}/cdn/img/champion/loading/${raw.id}_0.jpg`,
    skins: raw.skins.map((s) => ({
      num: s.num,
      name: s.name === 'default' ? raw.name : s.name,
      splash: `${IMG_BASE}/cdn/img/champion/splash/${raw.id}_${s.num}.jpg`,
    })),
  };
  detailCache.set(id, detail);
  return detail;
}

export const ALL_TAGS = ['Assassin', 'Fighter', 'Mage', 'Marksman', 'Support', 'Tank'];

export const TAG_LABELS_ES = {
  Assassin: 'Asesino',
  Fighter: 'Luchador',
  Mage: 'Mago',
  Marksman: 'Tirador',
  Support: 'Soporte',
  Tank: 'Tanque',
};
