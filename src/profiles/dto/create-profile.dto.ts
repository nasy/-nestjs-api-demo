import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  sessionId: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsString()
  notes: string;

  @IsString()
  jobTitle: string;

  @IsNotEmpty()
  cvPath: string;
}
