import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Institute } from './institution.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  full_name: string;
  @Column()
  email: string;
  @Column()
  mobile_number: string;
  @Column({
    default: 'admin',
  })
  role: string;
  @Column()
  password: string;
  @ManyToOne(() => Institute, (institute) => institute.users)
  institute: Institute;
}
