import { Controller, Get, } from '@nestjs/common';

import { SeedService } from './seed.service';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @ApiOperation({ summary: 'Run SEED' })
    @ApiResponse({
      status: 201,
      description: 'SEED executed'
    })
  @Get()
  executeSeed() {
    return this.seedService.runSeed()
  }
}
