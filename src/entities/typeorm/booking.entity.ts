import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { CustomerEntity } from "./customer.entity";
import { SeatEntity } from "./seat.entity";
import { BillboardEntity } from "./billboard.entity";

@Entity("bookings")
export class BookingEntity {
    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;

    @Column({
        type: "date",
        name: "date"
    })
    date: Date;

    @Column({
        type: "int",
        name: "customer_id"
    })
    customerId: number;

    @Column({
        type: "int",
        name: "seat_id"
    })
    seatId: number;

    @Column({
        type: "int",
        name: "billboard_id"
    })
    billboardId: number;

    @Column({
        type: "boolean",
        name: "status",
        default: true
    })
    status: boolean;

    @ManyToOne(() => CustomerEntity, (customer) => customer.bookings)
    @JoinColumn([
        { name: "customer_id", referencedColumnName: "id" }
    ])
    customer: CustomerEntity;

    @ManyToOne(() => SeatEntity, (seat) => seat.bookings)
    @JoinColumn([
        { name: "seat_id", referencedColumnName: "id" }
    ])
    seat: SeatEntity;

    @ManyToOne(() => BillboardEntity, (billboard) => billboard.bookings)
    @JoinColumn([
        { name: "billboard_id", referencedColumnName: "id" }
    ])
    billboard: BillboardEntity;
}