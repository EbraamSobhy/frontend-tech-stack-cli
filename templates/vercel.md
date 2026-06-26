# Vercel Config

## React (Vite)

`vercel.json`

```json
{
  "buildCommand":"npm run build",
  "outputDirectory":"dist",
  "rewrites": [
    {
      "source":"/(.*)",
      "destination":"/index.html"
    }
  ]
}
```

`package.json`

```json
{
  "scripts": {
    "build":"vite build"
  }
}
```

---

## Vue (Vue CLI)

`vercel.json`

```json
{
  "buildCommand":"npm run build",
  "outputDirectory":"dist",
  "rewrites": [
    {
      "source":"/(.*)",
      "destination":"/index.html"
    }
  ]
}
```

`package.json`

```json
{
  "scripts": {
    "build":"vue-cli-service build"
  }
}
```
---

## SvelteKit

### Recommended (SSR)

No `vercel.json` required.

Install adapter:

```
npm install-D @sveltejs/adapter-vercel
```

`svelte.config.js`

```
importadapterfrom'@sveltejs/adapter-vercel';

exportdefault {
  kit: {
    adapter:adapter()
  }
};
```

Vercel automatically detects SvelteKit.

---

## Static SvelteKit

Install:

```bash
npm install-D @sveltejs/adapter-static
```

`svelte.config.js`

```js
importadapterfrom'@sveltejs/adapter-static';

exportdefault {
  kit: {
    adapter:adapter()
  }
};
```

`vercel.json`

```json
{
  "buildCommand":"npm run build",
  "outputDirectory":"build",
  "rewrites": [
    {
      "source":"/(.*)",
      "destination":"/index.html"
    }
  ]
}
```
---

## Next.js

### Recommended

No `vercel.json` required.

Vercel was created by Vercel and natively supports Next.js.

Just deploy:

```
vercel
```

or connect your Git repository.

---

## Nuxt 3

Install the Vercel preset if needed:

```
npm install
```

`nuxt.config.ts`

```
exportdefaultdefineNuxtConfig({})
```

No `vercel.json` is usually needed. Vercel automatically detects Nuxt 3.

---

### Static Nuxt

`nuxt.config.ts`

```
exportdefaultdefineNuxtConfig({
  ssr:false
})
```

`vercel.json`

```
{
  "buildCommand":"npm run generate",
  "outputDirectory":".output/public",
  "rewrites": [
    {
      "source":"/(.*)",
      "destination":"/index.html"
    }
  ]
}
```
---

## SPA Vercel Confg

For any framework that generates a static SPA:

```
{
  "buildCommand":"npm run build",
  "outputDirectory":"dist",
  "rewrites": [
    {
      "source":"/(.*)",
      "destination":"/index.html"
    }
  ]
}
```

Just change `outputDirectory`
