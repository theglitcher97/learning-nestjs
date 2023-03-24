import {CreateCatDto, createCatSchema} from './dto/create-cat.dto';
import {
  All,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseFilters, UsePipes,
} from '@nestjs/common';
import {Request, Response} from 'express';
import {CatsService} from './cats.service';
import {ForbiddenException} from '../exceptions/ForbiddenException';
import {HttpExceptionFilter} from "../exception-filters/http-exception.filter";
import {JoiValidationPipe} from "../pipes/joi-validation.pipe";

// @UseFilters(HttpExceptionFilter) // controller scope filter
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
  // @UseFilters(HttpExceptionFilter)
  findById(
    @Res() response: Response,
    @Req() request: Request,
    // @Param('id', ParseIntPipe) catId: string, // ParseIntPipe tries to parse the 'id' to an integer or trows an exception
    @Param(
      'id',
      // This is a transformation pipe (we also have validation pipes)
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    catId: string, // ParseIntPipe tries to parse the 'id' to an integer or trows an exception
  ) {
    const cat = this.catsService.findCat(Number(catId));
    if (cat) return response.status(HttpStatus.OK).json({ data: cat });
    throw new NotFoundException(`Cat with ID ${catId} not found`);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createCatSchema)) // this pipes help us validating that the incoming data is in the correct format
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
