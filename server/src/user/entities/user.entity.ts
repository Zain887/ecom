import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 64 })
    firstName: string

    @Column({ type: 'varchar', length: 64 })
    lastName: string

    @Column({ type: 'varchar', length: 64, unique: true })
    email: string

    @Column({ type: 'varchar', length: 256 })
    password: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
