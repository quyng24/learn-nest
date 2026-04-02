import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
