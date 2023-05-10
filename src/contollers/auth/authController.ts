import { AuthService } from "../../services";
import { User } from "../../types";
import { Route, Post,Body,Query, Controller, Tags } from "tsoa";
@Route('/api/auth')
@Tags("Auth Operation")
export default class AuthController {
    @Post('/login')
    public login(@Body() user: User, @Query() isVerify: string): User | undefined {
        return new AuthService().login(user, isVerify);
    }
}

