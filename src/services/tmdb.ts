import { SeasonGrid } from "@/types/services-types";
import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY_TMDB;

const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE =
  "https://image.tmdb.org/t/p/w500";

export const BACKDROP_BASE =
  "https://image.tmdb.org/t/p/w780";

const api = axios.create({
  baseURL: BASE_URL,

  params: {
    api_key: API_KEY,
    language: "pt-BR"
  }
});

export const getImage = (path: string) => {
  return `${IMAGE_BASE}${path}`;
};

export const getTrending = (page = 1) =>
  api.get("/trending/movie/week", {
    params: { page }
  });

export const getTrendingSeries = (page = 1) =>
  api.get("/trending/tv/week", {
    params: { page }
  });

export const getTopRated = (page = 1) =>
  api.get("/movie/top_rated", {
    params: { page }
  });

export const getTopRatedSeries = (page = 1) =>
  api.get("/tv/top_rated", {
    params: { page }
  });

export const getMovingNowPlaying = (page = 1) =>
  api.get("/movie/now_playing", {
    params: { page }
  });

export const getSeriesNowPlaying = (page = 1) =>
  api.get("/tv/airing_today", {
    params: { page }
  });

export const getMovieDetails = (
  id: number
) => api.get(`/movie/${id}`);

export const getMovieProviders = (
  id: number
) =>
  api.get(
    `/movie/${id}/watch/providers`
  );

export const getSerieDetails = (
  id: number
) => api.get(`/tv/${id}`);

export const getSerieProviders = (
  id: number
) =>
  api.get(
    `/tv/${id}/watch/providers`
  );

export const searchMovies = (
  query: string,
  page = 1
) =>
  api.get("/search/movie", {
    params: { query, page }
  });

export const searchTv = (
  query: string,
  page = 1
) =>
  api.get("/search/tv", {
    params: { query, page }
  });

export const getSerieSeason = (
  id: number,
  seasonNumber: number
) =>
  api.get(
    `/tv/${id}/season/${seasonNumber}`
  );

export async function getSerieRatingsGrid(
  id: number
): Promise<SeasonGrid[]> {

  const { data: serie } =
    await getSerieDetails(id);

  const validSeasons =
    serie.seasons?.filter(
      (s: any) => s.season_number > 0
    ) || [];

  const seasons = await Promise.all(
    validSeasons.map(async (season: any) => {

      const { data } =
        await getSerieSeason(
          id,
          season.season_number
        );

      return {
        season: season.season_number,

        episodes: data.episodes.map(
          (ep: any) => ({
            episode: ep.episode_number,

            rating:
              ep.vote_average || 0
          })
        )
      };
    })
  );

  return seasons;
}