import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
        console.log(exception)
        const ctx = host.switchToHttp();
        const response = ctx.getResponse()

        if(exception.code === 'P2025') {
            return response.status(404).json({
                statusCode: 404,
                message: exception.message,
                exception: exception
            })
        }

        return response.status(500).json({
            statusCode: 500,
            message: 'Internal server error',
            exception: exception
        })
    }
}