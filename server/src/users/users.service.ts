import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.model'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
    ) { }

    public async createUser(
        dto: CreateUserDto
    ) {
        const user = await this.userRepository.create(dto)
        return user
    }

    public async getUserByEmail(
        email: CreateUserDto['email']
    ) {
        const user = await this.userRepository.findOne({
            where: {
                email
            }
        })

        return user
    }

    public async getUserById(
        id: number
    ) {
        const user = await this.userRepository.findOne({
            where: {
                id
            }
        })

        return user
    }
}
