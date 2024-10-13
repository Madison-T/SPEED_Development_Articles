// src/api/articles/create-article.dto.ts
export class CreateArticleDto {
  title: string;
  authors: string[];
  journal: string;
  pubYear: number;
  doi: string;
  volume: string;
  page: string;
  claim: string;
  evidenceStrength: string;
  sePractice: string; // Added SE Practice field
}
