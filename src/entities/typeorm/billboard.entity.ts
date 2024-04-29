import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { MovieEntity } from "./movie.entity";
import { RoomEntity } from "./room.entity";
import { BookingEntity } from "./booking.entity";

@Entity("billboards")
export class BillboardEntity {
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
        type: "time",
        name: "start_time"
    })
    startTime: string;

    @Column({
        type: "time",
        name: "end_time"
    })
    endTime: string;

    @Column({
        type: "int",
        name: "movie_id"
    })
    movieId: number;

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

    @ManyToOne(() => MovieEntity, (movie) => movie.billboards)
    @JoinColumn([
        { name: "movie_id", referencedColumnName: "id" }
    ])
    movie: MovieEntity;

    @ManyToOne(() => RoomEntity, (room) => room.billboards)
    @JoinColumn([
        { name: "room_id", referencedColumnName: "id" }
    ])
    room: RoomEntity;

    @OneToMany(() => BookingEntity, (booking) => booking.billboard)
    bookings: BookingEntity[];
}