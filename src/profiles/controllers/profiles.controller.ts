import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Profile } from '../entities/profile.entity';
import { ProfileService } from '../services/profile.service';
import { StorageService } from '../services/storage.service';

import { storage } from '../services/storage.config';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { validate } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

@Controller('profiles')
export class ProfilesController {
  constructor(
    private profileService: ProfileService,
    private storageService: StorageService,
  ) {}

  @Get(':sessionId')
  getList(@Param() params) {
    return this.profileService.getList(params.sessionId);
  }

  @Get(':sessionId/total')
  getTotal(@Param() params) {
    return this.profileService.count(params.sessionId);
  }

  @Post()
  create(@Body() profile: CreateProfileDto) {
    validate(profile).then((errors) => {
      if (errors.length == 0) {
        const profileEntity = new Profile();
        profileEntity.sessionId = profile.sessionId;
        profileEntity.firstName = profile.firstName;
        profileEntity.lastName = profile.lastName;
        profileEntity.jobTitle = profile.jobTitle;
        profileEntity.notes = profile.notes;
        profileEntity.cvPath = profile.cvPath;
        return this.profileService.create(profileEntity);
      }
    });
  }

  @Post(':sessionId/file')
  @UseInterceptors(FileInterceptor('file', { storage }))
  upload(@UploadedFile() file: Express.Multer.File) {
    const fileName = uuidv4() + '.pdf';
    return this.storageService
      .create(file.path, fileName)
      .then(() => {
        return {
          // We should define this an env variable. Skipped for this demo
          url: 'https://storage.googleapis.com/visage-demo-v2/' + fileName,
        };
      })
      .catch(() => {
        return {
          error: 'Error uploading the file',
        };
      });
  }
}
