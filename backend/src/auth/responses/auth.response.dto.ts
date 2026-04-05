import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {

  @ApiProperty({
    example: 1
  })
  id!: number;

  @ApiProperty({
    example: 'test@test.com'
  })
  email!: string;

  @ApiProperty({
    example: 'Test User'
  })
  fullName!: string;

  @ApiProperty({
    example: true
  })
  isActive!: boolean;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  token!: string;
}
