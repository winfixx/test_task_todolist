import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { UsePipes } from '@nestjs/common/decorators'
import { ApiOperation } from '@nestjs/swagger'
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.model'
import { UsersService } from './users.service'

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService
    ) { }

    @Post()
    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 200, type: User })
    @UsePipes(ValidationPipe)
    public create(
        @Body() userDto: CreateUserDto
    ) {
        return this.usersService.createUser(userDto)
    }
}
