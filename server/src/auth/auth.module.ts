import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        UsersModule,
        JwtModule.register({
            secret: process.env.JWT_PRIVATE_KEY || 'SECRET',
            signOptions: {
                expiresIn: '24h'
            },
            global: true
        })
    ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule { }
