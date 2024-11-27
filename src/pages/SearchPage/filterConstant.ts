export interface RatingRange {
  gte: number;
  lte: number;
}

export interface FilterState {
  rating: RatingRange;
  genre: (typeof GENRES)[number];
  language: (typeof LANGUAGES)[number];
  searchTerm: string;
}

export const LANGUAGES = ["영어", "한국어"] as const;

export const GENRES = [
  "장르 (전체)",
  "액션",
  "모험",
  "코미디",
  "드라마",
  "판타지",
  "호러",
  "로맨스",
  "공상 과학",
  "스릴러",
] as const;

export const LanguageCode = {
  영어: "en",
  한국어: "ko",
} as const;

export const GenreCode = {
  "장르 (전체)": null, // 전체일 경우 null
  액션: 28,
  모험: 12,
  코미디: 35,
  드라마: 18,
  판타지: 14,
  호러: 27,
  로맨스: 10749,
  "공상 과학": 878,
  스릴러: 53,
};

export const voteCode = {
  "평점 (전체)": [0, 10],
  "9-10": [9, 10],
  "8-9": [8, 9],
  "7-8": [7, 8],
  "6-7": [6, 7],
  "5-6": [5, 6],
  "4-5": [4, 5],
  "4점 이하": [0, 4],
};
