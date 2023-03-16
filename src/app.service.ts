import { CatsService } from './cats/cats.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private catsService: CatsService){}

  getHello() {
    return this.catsService.findAll();
  }
}
