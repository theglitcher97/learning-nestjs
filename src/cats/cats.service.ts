import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private cats: string[] = [];

  findAll() {
    return this.cats;
  }

  findCat(catName) {
    return this.cats.find((cat) => cat === catName);
  }

  addCat(cat: string) {
    if (this.cats.includes(cat)) return false;
    this.cats.push(cat);
    return true;
  }
}
