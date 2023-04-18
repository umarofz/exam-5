import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  comment: string;

  @ManyToOne(() => Book, (book) => book.comment)
  book: Book;

  @ManyToOne(() => UserEntity, (user) => user.comment)
  user: UserEntity;
}
