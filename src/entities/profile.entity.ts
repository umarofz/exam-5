import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
}
