import {
    Controller,
    Get,
    Post,
    Req,
    Res,
    Put,
    Delete,
    Param,
    ParseIntPipe,
    Body,
    HttpStatus,
} from "@nestjs/common"
import { Response, Request } from "express"

import { ProductService } from "./product.service"
import { UpdateProductDto } from "./dto/updateProduct.dto"

@Controller("products")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get("/")
    async getAllProducts(@Res() res: Response) {
        const products = await this.productService.getAllProducts()

        return res.status(HttpStatus.OK).send({
            data: products,
        })
    }

    @Get("/:id")
    async getProduct(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
        const productData = await this.productService.getProductData(id)

        return res.status(HttpStatus.OK).send({
            data: productData,
        })
    }

    @Post("/")
    async createProduct(@Req() req: Request, @Res() res: Response) {
        const productData = await this.productService.createProduct(req.body)
        return res.status(HttpStatus.CREATED).send({
            data: productData,
        })
    }

    @Put("/:id")
    async updateProduct(
        @Param("id", ParseIntPipe) id: number,
        @Body() body: UpdateProductDto,
        @Res() res: Response
    ) {
        const productData = this.productService.updateProductData(id, body)
        return res.status(HttpStatus.OK).send({ data: productData })
    }

    @Delete("/:id")
    async deleteProduct(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
        this.productService.deleteProduct(id)
        return res.status(HttpStatus.NO_CONTENT).send()
    }
}
