import { IsString, MinLength, IsNumber } from "class-validator"

import { E_Gender } from "../types"

export class UpdateProductDto {
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
