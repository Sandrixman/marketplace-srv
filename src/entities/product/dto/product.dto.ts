import { IsString, MinLength, IsNumber } from "class-validator"

export class ProductDto {
    @IsString()
    @MinLength(1)
    title: string

    @IsString()
    description: string

    @IsNumber()
    price: number

    @IsNumber()
    priceDiscounted: number

    @IsString()
    image: string
}
