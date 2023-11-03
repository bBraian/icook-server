import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt"
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    login(user: User) {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name
        }

        const jwtToken = this.jwtService.sign(payload)

        return {
            access_token: jwtToken
        }
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findUserByEmail(email)

        if(!user) {
            throw new Error('User not found.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) {
            throw new Error('Wrong password.');
        }

        return { ...user, password: undefined }
    }
}
