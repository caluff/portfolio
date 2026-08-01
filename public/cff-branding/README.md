# CFF branding

Incluye un logotipo vectorial adaptable, favicon e iconos PNG para el portfolio.

## Colores y uso

- La marca (`logo.svg`) usa `currentColor` para `<CFF>` y los brackets. Define `color` desde CSS: negro en modo claro y
  blanco en modo oscuro.
- El slash usa `--cff-accent`, con púrpura predeterminado `#7C3AED`. Puedes cambiarlo sin editar el SVG:
  `--cff-accent: #8B5CF6`.
- Los PNG e ICO tienen fondo transparente y están optimizados para su uso habitual sobre fondo claro. Para fondos
  oscuros, usa `favicon.svg`, que responde a `prefers-color-scheme`, o produce una variante raster clara desde el SVG.

## Next.js App Router

1. Copia `favicon.svg`, `../../app/favicon.ico`, `apple-touch-icon.png` y los PNG que necesites a `app/` (o a
   `public/`).
2. Si los dejas en `app/`, Next.js detecta automáticamente `app/favicon.ico`, `app/icon.svg` y `app/apple-icon.png`.
   Renombra `apple-touch-icon.png` a `apple-icon.png` y `favicon.svg` a `icon.svg` para la detección automática.
3. Para definirlos explícitamente desde `app/layout.tsx`:

```ts
export const metadata = {
  icons: {
    icon: [{url: '/favicon.svg', type: 'image/svg+xml'}, {url: '/favicon.ico'}],
    apple: [{url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png'}],
  },
}
```

4. Muestra el logotipo con `<img src="/logo.svg" alt="CFF" />` y aplica `color` al contenedor. Para cambiar el acento,
   define `--cff-accent` en ese contenedor.
