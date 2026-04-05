import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {

  @ApiProperty({
    example: 1
  })
  id!: number;

  @ApiProperty({
    example: 'test@test.com'
  })
  email!: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  token!: string;
}
