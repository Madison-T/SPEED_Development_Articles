// src/api/articles/article.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';

@Controller('api/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // Test endpoint
  @Get('/test')
  test() {
    return this.articleService.test();
  }

  // Get all articles, with optional filter by SE practice
  @Get('/')
  async findAll(@Query('sePractice') sePractice?: string) {
    try {
      if (sePractice) {
        return await this.articleService.findBySePractice(sePractice);
      }
      return await this.articleService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No articles found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  // Get one article by id
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.articleService.findOne(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No article found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  // Create/add an article
  @Post('/')
  async addArticle(@Body() createArticleDto: CreateArticleDto) {
    try {
      await this.articleService.create(createArticleDto);
      return { message: 'Article added successfully' };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to add this article',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  // Update an article
  @Put('/:id')
  async updateArticle(
    @Param('id') id: string,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    try {
      await this.articleService.update(id, createArticleDto);
      return { message: 'Article updated successfully' };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to update this article',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  // Delete an article by id
  @Delete('/:id')
  async deleteArticle(@Param('id') id: string) {
    try {
      return await this.articleService.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No such article found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }
}
