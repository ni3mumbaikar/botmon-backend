import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { EntityPropertyNotFoundError, QueryFailedError } from 'typeorm';

@Catch(QueryFailedError, EntityPropertyNotFoundError)
export class DatabaseFilter<T> implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response.status(HttpStatus.FORBIDDEN).json({
      statusCode: HttpStatus.FORBIDDEN,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
