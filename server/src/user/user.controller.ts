import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of all users.' })
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('email')
  async findByEmail(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @ApiOperation({ summary: 'Retrieve a single user by ID' })
  @ApiResponse({ status: 200, description: 'User found.' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiBadRequestResponse({ description: 'Oops! Bad Request' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
