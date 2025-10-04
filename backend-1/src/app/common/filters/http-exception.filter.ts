import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.error({ exception });

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let messageError = 'Internal server error';
    let typeError: null | string = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseError = exception.getResponse();
      messageError =
        typeof responseError === 'string'
          ? responseError
          : (responseError as any).message || JSON.stringify(responseError);
      typeError =
        typeof responseError === 'object' && responseError !== null
          ? (responseError as any).typeError || null
          : null;
    } else if (exception instanceof Error) messageError = exception.message;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: messageError,
      typeError,
    });
  }
}
