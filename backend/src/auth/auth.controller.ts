import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { User } from './entities/user.entity';

import { GetUser } from './decorators/get-user.decorator';
import { Auth } from './decorators/auth.decorator';

import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthResponseDto } from './responses/auth.response.dto';
import { LoginResponseDto } from './responses/login.response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: AuthResponseDto
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request (validation error or duplicate email)'
  })
  create(@Body() createUserDto: CreateUserDto) : Promise<AuthResponseDto> {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: LoginResponseDto
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials'
  })
  loginUser(@Body() loginUserDto: LoginUserDto) : Promise<LoginResponseDto> {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check authentication status' })
  @ApiResponse({
    status: 200,
    description: 'User is authenticated',
    type: AuthResponseDto
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  checkAuthStatus(
    @GetUser() user: User,
  ) : Promise<AuthResponseDto> {
    return this.authService.checkAuthStatus(user);
  }
}
