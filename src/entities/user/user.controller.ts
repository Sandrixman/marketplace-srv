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

import { UserService } from "./user.service"
import { UpdateUserDto } from "./dto/updateUser.dto"

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/")
    async getAllUsers(@Res() res: Response) {
        const users = await this.userService.getAllUsers()

        return res.status(HttpStatus.OK).send({
            data: users,
        })
    }

    @Get("/:id")
    async getUser(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
        const userData = await this.userService.getUserData(id)

        return res.status(HttpStatus.OK).send({
            data: userData,
        })
    }

    @Post("/")
    async createUser(@Req() req: Request, @Res() res: Response) {
        const userData = await this.userService.createUser(req.body)
        return res.status(HttpStatus.CREATED).send({
            data: userData,
        })
    }

    @Put("/:id")
    async updateUser(
        @Param("id", ParseIntPipe) id: number,
        @Body() body: UpdateUserDto,
        @Res() res: Response
    ) {
        const userData = this.userService.updateUserData(id, body)
        return res.status(HttpStatus.OK).send({ data: userData })
    }

    @Delete("/:id")
    async deleteUser(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
        this.userService.deleteUser(id)
        return res.status(HttpStatus.NO_CONTENT).send()
    }
}
