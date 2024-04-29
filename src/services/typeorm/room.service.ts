import { DeleteResult, UpdateResult } from "typeorm";
import { dbConnection } from "../../database/typeorm.connection";
import { RoomEntity } from "../../entities/typeorm";
import { 
    ParamsGetAllRoomsI, 
    ResponseGetAllRoomsI, 
    ResponseGetByIdRoomI 
} from "../../interfaces/room.interface";

export class RoomService {

    private readonly roomRepository = dbConnection.getRepository(RoomEntity);

    getAll(params: ParamsGetAllRoomsI): Promise<ResponseGetAllRoomsI[]> {
        return this.roomRepository.query(
            `
            SELECT 
                id,
                name,
                number,
                status
            FROM 
                rooms
            WHERE
                name LIKE ?
            AND number LIKE ?
            AND status LIKE ?
            ORDER BY id
            LIMIT ${ params.limit } OFFSET ${ params.skip };  
            `,
            [
                `%${ params.name }%`,
                `%${ params.number }%`,
                `%${ params.status }%`,
            ]
        );
    }

    getAllCount(params: ParamsGetAllRoomsI): Promise<any[]> {
        return this.roomRepository.query(
            `
            SELECT 
                COUNT(*) AS regs
            FROM 
                rooms
            WHERE
                name LIKE ?
            AND number LIKE ?
            AND status LIKE ?;
            `,
            [
                `%${ params.name }%`,
                `%${ params.number }%`,
                `%${ params.status }%`,
            ]
        );
    }

    getById(id: number): Promise<ResponseGetByIdRoomI[]> {
        return this.roomRepository.query(
            `
            SELECT 
                id,
                name,
                number,
                status
            FROM 
                rooms
            WHERE
                id = ?;
            `,
            [ id ]
        );
    }

    insert(room: RoomEntity): Promise<RoomEntity> {
        return this.roomRepository.save(room);
    }

    update(id: number, room: RoomEntity): Promise<UpdateResult> {
        return this.roomRepository.update({ id }, room);
    }

    delete(id: number): Promise<DeleteResult> {
        return this.roomRepository.delete({ id });
    }

}