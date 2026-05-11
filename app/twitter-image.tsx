// Twitter image — reusa el mismo render que el Open Graph.
// La mayoría de Twitter Large Image Cards usan exactamente el mismo aspect-ratio
// y diseño que el OG, así que duplicar JSX sería ruido. Re-exportamos:
//   - `default` → la función generadora.
//   - `alt`, `size`, `contentType` → metadata estática que Next inyecta en <meta twitter:image:*>.
//
// Si en el futuro Twitter Card necesita una variante (logo distinto, copy más corto),
// se sustituye este re-export por su propia implementación.
export { default, alt, size, contentType } from "./opengraph-image";
