import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column()
  password: string;
}
