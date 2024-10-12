// src/api/articles/article.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authors: string[];

  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  pubYear: number;

  @Prop({ required: true })
  doi: string;

  @Prop()
  volume: string;

  @Prop()
  page: string;

  @Prop()
  claim: string;

  @Prop({required: true})
  evidenceStrength: string;

  @Prop({ required: true }) // Added SE Practice field
  sePractice: string;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
