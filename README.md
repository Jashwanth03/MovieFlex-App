# MovieFlex-App

**MovieFlex-App** is a modern, responsive movie search and trending discovery web application, built with **React**, **Vite**, **TailwindCSS**, and **Appwrite**. It allows users to search for movies, see trending titles based on community searches, and view movie details using **The Movie Database (TMDB) API**.

---

## 🚀 Features

- **Instant Movie Search:** Search for movies by keyword with debounced API calls for better performance.
- **Trending Movies:** View the current top 5 trending movies, tracked by global searches using Appwrite backend.
- **Rich Details:** Movie cards show poster, title, ratings, release year, and language.
- **Responsive UI:** Clean, modern interface using TailwindCSS and Flowbite React.
- **Persistent Data:** Trending data and search statistics stored and updated via Appwrite.
- **Fast Development Stack:** Built with Vite for blazing-fast reloads and production builds.
- **Error Handling & Loading UI:** Graceful error messages and loading indicators for great UX.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite 7, TailwindCSS 4, Flowbite React, react-use
- **Backend/DB:** Appwrite (Cloud backend for data persistence)
- **API:** The Movie Database [TMDB API]
- **Linting/Tooling:** ESLint, ESLint React Hooks, Vite

---

## 🌟 How It Works

1. **Search:** Type your query; after a brief pause (debounce), the app fetches results from TMDB.
2. **Trending:** Each search updates Appwrite's database and increases the count for that search term.
3. **Movie Cards:** Display fetched movies with poster, rating, language, and release year.
4. **Trending Section:** Lists movies with the highest search count, pulled from Appwrite.
5. **Persistent State:** Appwrite cloud database ensures trending movies are tracked for all users.

---

## ⏬ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Jashwanth03/MovieFlex-App.git
cd MovieFlex-App
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_TABLE_ID=your_appwrite_table_id
VITE_APPWRITE_PROJECT_NAME="movie_app"
VITE_APPWRITE_ENDPOINT="your_appwrite_endpoint"
```

*You can get your API keys by signing up at [TMDB](https://www.themoviedb.org/) and [Appwrite Cloud](https://appwrite.io/).*

### 4. Run Locally

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:5173 in your browser.

---

## 📦 Scripts

- `npm run dev`: Start the development server (Vite)
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run the linter

---

## ⚙️ Configuration

- **ESLint:** Configured for React, hooks, and latest JS features.
- **Vite:** Super-fast HMR and optimized build.
- **TailwindCSS:** Utility-first CSS for responsive and modern design.
- **Appwrite:** Handles backend search count/trending storage.

---

## ✨ Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.

---

## 📃 License

MIT License

---

## 📝 Acknowledgements

- [TMDB API](https://www.themoviedb.org/)
- [Appwrite Cloud](https://appwrite.io/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Flowbite React](https://www.flowbite-react.com/)

---

## 👨‍💻 Author

**Jashwanth03**

---

## ❓ FAQ

**How are trending movies decided?**  
Trending movies have the most search counts, tracked and updated using Appwrite.

**Can I deploy this project?**  
Yes! Just set your environment variables, then deploy to Vercel, Netlify, or any static host.

---

Enjoy using MovieFlex-App! 🎬
