import { CreateCatDto } from '../dto/create-cat.dto';

export class CatDto extends CreateCatDto {
  id!: number;
}
