import { Injectable } from '@nestjs/common';
import { Article } from './article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}

  // Test route
  test(): string {
    return 'article route testing';
  }

  // Get all articles
  async findAll(): Promise<Article[]> {
    return await this.articleModel.find().exec();
  }

  // Get one article by ID
  async findOne(id: string): Promise<Article> {
    return await this.articleModel.findById(id).exec();
  }

  // Create a new article
  async create(createArticleDto: CreateArticleDto) {
    return await this.articleModel.create(createArticleDto);
  }

  // Update an article
  async update(id: string, createArticleDto: CreateArticleDto) {
    return await this.articleModel.findByIdAndUpdate(id, createArticleDto).exec();
  }

  // Delete an article by ID
  async delete(id: string) {
    const deletedArticle = await this.articleModel.findByIdAndDelete(id).exec();
    return deletedArticle;
  }
}
