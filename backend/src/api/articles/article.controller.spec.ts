import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

describe('ArticleController', () => {
  let controller: ArticleController;
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: ArticleService,
          useValue: {
            findAll: jest.fn(() => []), // Mock findAll to return an empty array
            findOne: jest.fn((id: string) => ({})), // Mock findOne
            create: jest.fn((dto) => ({})), // Mock create
            update: jest.fn((id: string, dto) => ({})), // Mock update
            delete: jest.fn((id: string) => ({})), // Mock delete
          },
        },
      ],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
