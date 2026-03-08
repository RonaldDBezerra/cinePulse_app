import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY_TMDB;
const BASE_URL = "https://api.themoviedb.org/3"
export const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_BASE = "https://image.tmdb.org/t/p/w780";

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: "pt-BR"
    }
});

export const getImage = (path: string) => {
    return `${IMAGE_BASE}${path}`
}

export const getTrending = (page = 1) =>
    api.get("/trending/movie/week", { params: { page } });

export const getTrendingSeries = (page = 1) =>
    api.get("/trending/tv/week", { params: { page } });

export const getTopRated = (page = 1) =>
    api.get("/movie/top_rated", { params: { page } });

export const getMovieDetails = (id: number) =>
    api.get(`/movie/${id}`);
