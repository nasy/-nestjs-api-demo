import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../profiles/entities/profile.entity';
import { ProfileService } from '../profiles/services/profile.service';
import { ProfilesController } from '../profiles/controllers/profiles.controller';
import { StorageService } from '../profiles/services/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  providers: [ProfileService, StorageService],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
