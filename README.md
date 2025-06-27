This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

src/
├── app/ # Next.js App Router
│ ├── layout.tsx
│ ├── page.tsx
│ └── globals.css
│
├── common/ # Componentes compartidos globalmente
│ └── components/
│ ├── atoms/ # Elementos básicos: Button, Input, Spinner
│ ├── molecules/ # Combos de átomos: SearchBar, ModalHeader
│ └── organisms/ # Secciones: Navbar, Sidebar
│
├── features/ # Módulos funcionales (1 carpeta por feature)
│ └── map/ # Ej: visualización de mapas
│ ├── components/ # UI específica de la feature
│ ├── containers/ # Lógica visual + conectores
│ ├── hooks/ # Hooks propios del dominio
│ └── store/ # Zustand slices o lógica de estado local
│
├── core/ # "Cerebro del negocio"
│ ├── domain/ # Tipos, entidades y reglas de negocio puras
│ │ └── map.ts # Ej: interfaces de un mapa
│ ├── services/ # Llamadas HTTP, acceso a API externa
│ │ └── map.service.ts
│ └── repositories/ # Adaptadores entre services y dominio
│ └── map.repository.ts
│
├── lib/ # Utilidades, helpers, validaciones genéricas
│ ├── validators/ # Esquemas Zod, validaciones
│ └── utils/ # formatDate, getCoordsFromAddress, etc
│
├── types/ # Tipos globales (si no encajan en dominio)
│ └── index.d.ts
