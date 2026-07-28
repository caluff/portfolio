<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Reglas de arquitectura del portfolio

- `app/page.tsx` debe limitarse a componer la página. Cada sección de primer nivel vive en un componente dedicado dentro de `components/portfolio/`.
- El contenido estático y las colecciones que pueblan la interfaz viven en `data/`, con tipos explícitos o `satisfies` y valores inmutables cuando corresponda.
- Ningún componente puede superar las 200 líneas. Antes de alcanzar el límite, extraer una responsabilidad cohesiva a otro componente, utilidad o archivo de datos.
- Usar React Server Components por defecto. Añadir `"use client"` únicamente en la frontera mínima que necesite estado, efectos, eventos o APIs del navegador.
- Importar módulos directamente; evitar archivos barrel que aumenten el trabajo del bundler.

## Reglas de UI, tema y Tailwind

- Usar primero los componentes shadcn ya instalados y respetar su composición y variantes. Consultar la documentación del componente antes de modificarlo o incorporarlo.
- Los componentes solo usan colores semánticos de Tailwind/shadcn (`background`, `foreground`, `muted`, `accent`, `border`, etc.) o tokens semánticos del proyecto.
- No escribir colores crudos (`hex`, `rgb`, `hsl`, `oklch` o paletas como `neutral-500`) en `className`, JSX o estilos inline. Los valores de color se definen únicamente como variables de tema en `app/globals.css`.
- No usar variantes manuales `dark:` para colores. Cada token debe definir su valor claro y oscuro en `:root` y `.dark`.
- Usar `gap-*` en layouts flex/grid en lugar de `space-x-*` o `space-y-*`, `size-*` cuando ancho y alto sean iguales, y `cn()` para clases condicionales.
- `app/globals.css` contiene tokens, estilos base y utilidades verdaderamente globales. Los estilos de layout pertenecen al `className` del componente.

## Validación

- Antes de terminar un cambio, ejecutar `pnpm lint` y `pnpm build`.
- Comprobar que ningún archivo de componente `.tsx` supere las 200 líneas.
