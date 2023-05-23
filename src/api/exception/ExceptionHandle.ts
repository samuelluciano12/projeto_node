import { HttpException } from "@nestjs/common";

export class ExceptionHandler extends HttpException {

    constructor(mensagem: string, statusCode: number) {
       super(mensagem, statusCode);
    }
    
}