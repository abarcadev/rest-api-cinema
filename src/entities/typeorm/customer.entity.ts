import { 
    Column, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { BookingEntity } from "./booking.entity";

@Entity("customers")
export class CustomerEntity {
    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;

    @Column({
        type: "varchar",
        name: "document_number",
        length: 20,
        unique: true
    })
    documentNumber: string;

    @Column({
        type: "varchar",
        name: "name",
        length: 30
    })
    name: string;

    @Column({
        type: "varchar",
        name: "last_name",
        length: 30
    })
    lastName: string;

    @Column({
        type: "smallint",
        name: "age"
    })
    age: number;

    @Column({
        type: "varchar",
        name: "phone_number",
        length: 20,
        nullable: true
    })
    phoneNumber: string;
    
    @Column({
        type: "varchar",
        name: "email",
        length: 100,
        nullable: true
    })
    email: string;

    @Column({
        type: "boolean",
        name: "status",
        default: true
    })
    status: boolean;

    @OneToMany(() => BookingEntity, (booking) => booking.customer)
    bookings: BookingEntity[];
}