import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/all')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers('authorization') token?: string) {
    return this.userService.findOne(+id, token);
  }

  @Get()
  getUser(@Headers('authorization') token: string) {
    return this.userService.getUser(token);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Headers('authorization') token: string) {
    return this.userService.update(+id, updateUserDto, token);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('/save-recipe/:id')
  saveRecipe(@Param('id') id: number, @Headers('authorization') token: string) {
    return this.userService.saveRecipe(+id, token);
  }

  @Delete('/unsave-recipe/:id')
  unsaveRecipe(@Param('id') id: number, @Headers('authorization') token: string) {
    return this.userService.unsaveRecipe(+id, token);
  }
}
