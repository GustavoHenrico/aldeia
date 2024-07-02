import { Controller, Get, UseGuards,  } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { ReqUser } from "../auth/decorators/user.decorator";
import { User } from "@prisma/client";

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UsersController {
  constructor() { }

  @Get("me")
  GetMe(@ReqUser() user: User) {
    return user;
  }

}
