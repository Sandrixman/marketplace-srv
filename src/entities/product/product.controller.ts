import {
    Controller,
    Get,
    Post,
    Res,
    Put,
    Delete,
    Param,
    ParseIntPipe,
    Body,
    HttpStatus,
    UseInterceptors,
    UploadedFile,
} from "@nestjs/common"
import { Response } from "express"
import { FileInterceptor } from "@nestjs/platform-express"

import { ProductService } from "./product.service"
import { ProductDto } from "./dto/product.dto"
import { getMulterOptions, renameUploadedFile } from "@helpers/fileUploader"
import { PRODUCTS_IMAGES_FOLDER_PATH } from "src/consts/storagePaths"

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
    @UseInterceptors(FileInterceptor("image", getMulterOptions("images/products")))
    async createProduct(
        @Body() body: any,
        @UploadedFile() image: Express.Multer.File,
        @Res() res: Response
    ) {
        const renamedFilename = renameUploadedFile(image.filename, PRODUCTS_IMAGES_FOLDER_PATH)

        const productData = await this.productService.createProduct({
            ...body,
            image: renamedFilename,
        })

        return res.status(HttpStatus.CREATED).send({
            data: productData,
        })
    }

    @Put("/:id")
    async updateProduct(
        @Param("id", ParseIntPipe) id: number,
        @Body() body: ProductDto,
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
