import { 
    Column, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { SeatEntity } from "./seat.entity";
import { BillboardEntity } from "./billboard.entity";

@Entity("rooms")
export class RoomEntity {
    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;

    @Column({
        type: "varchar",
        name: "name",
        length: 20
    })
    name: string;

    @Column({
        type: "smallint",
        name: "number"
    })
    number: number;

    @Column({
        type: "boolean",
        name: "status",
        default: true
    })
    status: boolean;

    @OneToMany(() => SeatEntity, (seat) => seat.room)
    seats: SeatEntity[];

    @OneToMany(() => BillboardEntity, (billboard) => billboard.room)
    billboards: BillboardEntity[];
}