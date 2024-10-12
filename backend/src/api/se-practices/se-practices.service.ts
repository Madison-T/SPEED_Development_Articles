// src/api/se-practices/se-practices.service.ts
import { Injectable } from '@nestjs/common';

// Mocked SE Practices data for demonstration purposes.
// Replace this with your actual database fetching logic if needed.
const sePractices = [
  { id: '1', name: 'Test Driven Development (TDD)' },
  { id: '2', name: 'Agile Development' },
  { id: '3', name: 'Code Review' },
  { id: '4', name: 'Continuous Integration (CI)' },
];

@Injectable()
export class SePracticesService {
  async findAll() {
    // Return all SE practices
    return sePractices;
  }
}
