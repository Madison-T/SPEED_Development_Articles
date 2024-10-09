import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authors: string[];  // Changed to array for multiple authors

  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  pubYear: number;

  @Prop({ required: true })
  doi: string;

  @Prop()
  volume: string;  // Optional, no required constraint

  @Prop()
  page: string;   

  @Prop()
  claim: string;

  @Prop()
  evidence: string;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
