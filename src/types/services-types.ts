export type EpisodeRating = {
  episode: number;
  rating: number;
};

export type SeasonGrid = {
  season: number;
  episodes: EpisodeRating[];
};