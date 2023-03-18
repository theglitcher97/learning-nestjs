import { CreateCatDto } from './dto/create-cat.dto';
import {
  All,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res, UseFilters,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CatsService } from './cats.service';
import { ForbiddenException } from '../exceptions/ForbiddenException';
import {HttpExceptionFilter} from "../exception-filters/http-exception.filter";

@UseFilters(HttpExceptionFilter) // controller scope filter
// only request coming from this host can get to this Controller
@Controller({ host: 'localhost', path: 'cats' })
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  @UseFilters(HttpExceptionFilter) // method scope filter
  findAll(@Res() response: Response, @Query() query) {
    if (Math.round(Math.random() * 5) > 2.5)
      return response
        .status(200)
        .json({ data: this.catsService.findAll(query) });
    throw new ForbiddenException();
  }

  @Get('/:id')
  @UseFilters(HttpExceptionFilter)
  findById(
    @Res() response: Response,
    @Req() request: Request,
    @Param('id') catId: string,
  ) {
    const cat = this.catsService.findCat(Number(catId));
    if (cat) return response.status(HttpStatus.OK).json({ data: cat });
    throw new NotFoundException(`Cat with ID ${catId} not found`);
  }

  @Post()
  // event though we stablish which object-structure we want to receive, we'll still receive
  // any property outside our object-structure
  addCat(@Res() response: Response, @Body() cat: CreateCatDto) {
    const catStored = this.catsService.addCat(cat);
    return response.status(HttpStatus.CREATED).json({ data: catStored });
  }

  @All('*')
  @Redirect('http://localhost:3000/cats', 301)
  redirection() {
    // * this method takes any path that doesn't match any path above and
    // * redirect to the one specify in @Redirect(path_to_redirect)
    // * in case we want to redirect based on a condition
    // * we can return an object that overwrites the redirect path
    //*  return { url: 'path_to_redirect' }
  }
}
