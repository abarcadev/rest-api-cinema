import { 
    Column, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { BillboardEntity } from "./billboard.entity";

@Entity("movies")
export class MovieEntity {
    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;

    @Column({
        type: "varchar",
        name: "name",
        length: 100
    })
    name: string;

    @Column({
        type: "enum",
        enum: ["ACTION", "ADVENTURE", "COMEDY", "DRAMA", "FANTASY", "HORROR", "MUSICALS", "MYSTERY", "ROMANCE", "SCIENCE_FICTION", "SPORTS", "THRILLER", "WESTERN"],
    })
    genre: string;
    
    @Column({
        type: "smallint",
        name: "allowed_age"
    })
    allowedAge: number;

    @Column({
        type: "smallint",
        name: "length_minutes"
    })
    lengthMinutes: number;

    @Column({
        type: "boolean",
        name: "status",
        default: true
    })
    status: boolean;

    @OneToMany(() => BillboardEntity, (billboard) => billboard.movie)
    billboards: BillboardEntity[];
}