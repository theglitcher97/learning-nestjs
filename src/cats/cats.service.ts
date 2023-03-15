import { Injectable } from '@nestjs/common';
import { CatDto } from './domain/cat.dto';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private static catsCounter = 0;
  private cats: CatDto[] = [];

  findAll(query?: { breed: string }) {
    if (query) return this.cats.filter((cat) => cat.breed === query.breed);
    return this.cats;
  }

  findCat(catID: number) {
    return this.cats.find((cat) => cat.id === catID);
  }

  addCat(cat: CreateCatDto) {
    const newCat: CatDto = { ...cat, id: CatsService.catsCounter++ };
    this.cats.push(newCat);
    return true;
  }
}
