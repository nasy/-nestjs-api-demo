import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { default: null })
  sessionId: string;

  @Column('varchar', { default: null })
  firstName: string;

  @Column('varchar', { default: null })
  lastName: string;

  @Column('varchar', { default: null })
  jobTitle: string;

  @Column('varchar', { default: null })
  notes: string;

  @Column('varchar', { default: null })
  cvPath: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
