import { CatsController } from './cat.controller';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { LoggerMiddleware } from '../middlewares/LoggerMiddleware';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      // we can pass a list of middlewares separate by comma
      .apply(LoggerMiddleware) // applies this middleware to the following paths
      .exclude({ path: 'cats', method: RequestMethod.POST })
      .forRoutes(...[CatsController]);
    // .forRoutes({path: 'cats', method: RequestMethod.GET})
  }
}
