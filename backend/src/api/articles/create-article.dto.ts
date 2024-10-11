// src/api/articles/create-article.dto.ts
export class CreateArticleDto {
  title: string;
  authors: string[];
  source: string;
  pubYear: number;
  doi: string;
  volume: string;
  page: string;
  claim: string;
  evidence: string;
  sePractice: string; // Added SE Practice field
}
