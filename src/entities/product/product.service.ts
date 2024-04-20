import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { FindOptionsSelect, Repository } from "typeorm"

import { Product } from "./product.entity"
import { UpdateProductDto } from "./dto/updateProduct.dto"

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ) {}

    availableFields = ["title", "description", "price", "price_discounted", "image"]

    // Create new product
    public async createProduct(productData: any) {
        const newProduct = this.productRepository.create(productData)

        return await this.productRepository.save(newProduct)
    }

    // Get all products
    public async getAllProducts() {
        return await this.productRepository.find({
            select: this.availableFields as FindOptionsSelect<Product>,
        })
    }

    // Get product data by id
    public async getProductData(id: number) {
        return await this.productRepository.findOne({
            where: { id },
            select: this.availableFields as FindOptionsSelect<Product>,
        })
    }

    // Update product data whole
    public async updateProductData(id: number, body: UpdateProductDto) {
        return await this.productRepository.update({ id }, body)
    }

    // Delete product by id
    public async deleteProduct(id: number) {
        return await this.productRepository.delete(id)
    }
}
