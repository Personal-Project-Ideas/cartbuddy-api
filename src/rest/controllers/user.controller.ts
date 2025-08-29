import { Controller, Get, NotImplementedException, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor() {
    // empty
  }
  @Post('/')
  async createUser() {
    throw new NotImplementedException('Not implemented');
  }

  @Get('/:username')
  async getUser() {
    throw new NotImplementedException('Not implemented');
  }
}
