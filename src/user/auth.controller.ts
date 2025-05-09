import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './entities/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDTO } from './dto/login.dto';
import { AdminGuard } from 'src/jwt/admin.guard';
import { CurrentUser } from 'src/decorator/currentUser';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: CreateUserDto) {
    return this.authService.register(createAuthDto);
  }
  @Post('login')
  async login(@Body() dto: LoginDTO) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.authService.login(dto);
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.authService.findAll();
  }
 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateUserDto) {
    return this.authService.update(id, updateAuthDto);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)

  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  
}

@Get('me')
@UseGuards(JwtAuthGuard)
getMyProfile(@CurrentUser() user) {
  return user;
}

}