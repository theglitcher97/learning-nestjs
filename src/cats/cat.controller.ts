import {
  All,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CatsService } from './cats.service';

// only request coming from this host can get to this Controller
@Controller({ host: 'localhost', path: 'cats' })
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll(@Res() response: Response) {
    return response.status(200).json({ data: this.catsService.findAll() });
  }

  @Get('/:id')
  findById(
    @Res() response: Response,
    @Req() request: Request,
    @Param('id') catId: string,
  ) {
    const cat = this.catsService.findCat(catId);
    if (cat) return response.status(200).json({ data: cat });
    return response
      .status(404)
      .json({ data: `Cat with name '${catId}' not found` });
  }

  @Post()
  addCat(@Res() response: Response, @Body('cat') cat: string) {
    const wasCatStored = this.catsService.addCat(cat);
    if (wasCatStored) return response.status(201).json({ data: cat });
    return response
      .status(400)
      .json({ data: `A cat with the name '${cat}' already exists` });
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
