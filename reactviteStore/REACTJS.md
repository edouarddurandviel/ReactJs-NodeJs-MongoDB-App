Here’s a **complete modern setup for React + Vite with Node 24, TypeScript, and Babel**—clean, production-ready, and actually useful (not over-engineered).

---

# ⚡ 1. Prerequisites

Install:

* Node.js **v24+**
* npm / pnpm / yarn

Check:

```bash
node -v
```

---

# 🚀 2. Create Vite + React + TypeScript App

```bash
npm create vite@latest my-app
```

Choose:

```
Framework: React
Variant: TypeScript
```

Then:

```bash
cd my-app
npm install
```

---

# ▶️ 3. Install Babel (for advanced transpilation)

By default, Vite uses **esbuild** (fast), not Babel.

We add Babel **only when needed** (decorators, advanced plugins, etc.).

Install Babel:

```bash
npm install -D @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript
```

---

# ⚙️ 4. Create Babel Config

Create a file:

```bash
babel.config.json
```

```json
{
  "presets": [
    ["@babel/preset-env", { "targets": "defaults" }],
    ["@babel/preset-react", { "runtime": "automatic" }],
    "@babel/preset-typescript"
  ]
}
```

---

# 🔌 5. Integrate Babel with Vite

Install plugin:

```bash
npm install -D vite-plugin-babel
```

Update `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babel from 'vite-plugin-babel'

export default defineConfig({
  plugins: [
    react(),
    babel({
      babelConfig: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript"
        ]
      }
    })
  ]
})
```

---

# 🧠 6. TypeScript Setup (Important)

Vite already creates `tsconfig.json`, but improve it:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

---

# 🧪 7. Run Project

```bash
npm run dev
```

---

# 📁 8. Clean Folder Structure (Recommended)

```
src/
├── components/
├── pages/
├── hooks/
├── services/
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

---

# 🔥 9. Optional: Enable Decorators (Babel use-case)

Install:

```bash
npm install -D @babel/plugin-proposal-decorators
```

Update `babel.config.json`:

```json
{
  "presets": [...],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "version": "2023-01" }]
  ]
}
```

---

# 📦 10. Build & Preview

```bash
npm run build
npm run preview
```

---

# ⚡ 11. Why This Setup?

* React → UI
* TypeScript → type safety
* Babel → advanced transforms
* Vite → blazing fast dev/build

👉 Important insight:

* **Vite + esbuild is already enough for 95% of apps**
* Babel is only needed for:

  * decorators
  * experimental JS features
  * custom transforms

---

# ✅ Final Result

You now have:

* Node 24 runtime
* React + TypeScript
* Optional Babel pipeline
* Fast Vite dev/build

---

If you want, I can next:

* add **ESLint + Prettier (pro setup)**
* configure **absolute imports + aliases**
* set up **testing (Vitest + React Testing Library)**
* or build a **real production architecture (auth, API, etc.)**
