import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profiles/entities/profile.entity';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'XX',
      port: 25060,
      username: 'XX',
      password: 'XX',
      database: 'defaultdb',
      entities: [Profile],
      synchronize: true,
    }),
    ProfilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
