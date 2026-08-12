# AniMovies

An anime movie database built with React, Vite, Bootstrap, and the TMDB API.

## Requirements

- Node.js (current LTS version recommended)
- A [TMDB API key](https://www.themoviedb.org/settings/api)

## Run the project

Clone the repository, open a terminal in this folder, and run:

```bash
npm install
```

Copy `.env.example` to a new file named `.env`, then replace the placeholder with your TMDB API key:

```env
VITE_MOVIEDB_API_KEY=your_api_key_here
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite in your browser.

Bootstrap is already listed in `package.json`, so teammates do not need to install it separately. Do not commit `.env` or `node_modules`.

## Other commands

```bash
npm run build
npm run lint
npm run preview
```
