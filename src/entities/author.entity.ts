import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'authors' })
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '32', nullable: false })
  firstname: string;

  @Column({ type: 'varchar', length: '32', nullable: false })
  lastname: string;

  @Column({ type: 'varchar', length: '20', nullable: false })
  date_of_birth: string;

  @Column({ type: 'varchar', length: '20', nullable: true })
  date_of_death: string;

  @Column({ type: 'varchar', length: '32', nullable: false })
  country: string;

  @Column({ type: 'varchar', nullable: false })
  bio: string;

  @Column({ type: 'varchar', nullable: false })
  image: string;
}
