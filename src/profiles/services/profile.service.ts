import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfileService {
  private fields: (keyof Profile)[] = [
    'firstName',
    'lastName',
    'jobTitle',
    'notes',
    'cvPath',
  ];
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
  ) {}

  async getList(sessionId: string): Promise<Profile[]> {
    return await this.profilesRepository.find({
      select: this.fields,
      where: [{ sessionId: sessionId }],
    });
  }
  async count(sessionId: string): Promise<number> {
    return await this.profilesRepository.count({
      where: [{ sessionId: sessionId }],
    });
  }

  async get(_id: number): Promise<Profile[]> {
    return await this.profilesRepository.find({
      select: this.fields,
      where: [{ id: _id }],
    });
  }

  async create(profile: Profile) {
    this.profilesRepository.save(profile);
  }
}
