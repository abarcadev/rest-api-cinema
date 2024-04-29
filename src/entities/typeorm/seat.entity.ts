import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { RoomEntity } from "./room.entity";
import { BookingEntity } from "./booking.entity";

@Entity("seats")
export class SeatEntity {
    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;

    @Column({
        type: "smallint",
        name: "number"
    })
    number: number;

    @Column({
        type: "smallint",
        name: "row_number"
    })
    rowNumber: number;

    @Column({
        type: "int",
        name: "room_id"
    })
    roomId: number;

    @Column({
        type: "boolean",
        name: "status",
        default: true
    })
    status: boolean;

    @ManyToOne(() => RoomEntity, (room) => room.seats)
    @JoinColumn([
        { name: "room_id", referencedColumnName: "id" }
    ])
    room: RoomEntity;

    @OneToMany(() => BookingEntity, (booking) => booking.seat)
    bookings: BookingEntity[];
}