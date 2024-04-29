import { 
    DeleteResult, 
    EntityManager, 
    UpdateResult 
} from "typeorm";
import { dbConnection } from "../../database/typeorm.connection";
import { SeatEntity } from "../../entities/typeorm";
import { 
    ParamsGetAllSeatsI, 
    ResponseGetAllSeatsByBillboardDateI, 
    ResponseGetAllSeatsI, 
    ResponseGetByIdSeatI 
} from "../../interfaces/seat.interface";

export class SeatService {

    private readonly seatRepository = dbConnection.getRepository(SeatEntity);

    getAll(params: ParamsGetAllSeatsI): Promise<ResponseGetAllSeatsI[]> {
        return this.seatRepository.query(
            `
            SELECT
                seats.id,
                seats.number,
                seats.row_number AS rowNumber,
                seats.room_id AS roomId,
                rooms.name AS roomName,
                seats.status
            FROM 
                seats
            INNER JOIN rooms ON seats.room_id = rooms.id
            WHERE
                seats.number LIKE ?
            AND seats.row_number LIKE ?
            AND rooms.name LIKE ?
            AND seats.status LIKE ?
            ORDER BY seats.id
            LIMIT ${ params.limit } OFFSET ${ params.skip };
            `,
            [
                `%${ params.number }%`,
                `%${ params.rowNumber }%`,
                `%${ params.roomName }%`,
                `%${ params.status }%`,
            ]
        );
    }

    getAllCount(params: ParamsGetAllSeatsI): Promise<any[]> {
        return this.seatRepository.query(
            `
            SELECT
                COUNT(*) AS regs
            FROM 
                seats
            INNER JOIN rooms ON seats.room_id = rooms.id
            WHERE
                seats.number LIKE ?
            AND seats.row_number LIKE ?
            AND rooms.name LIKE ?
            AND seats.status LIKE ?;
            `,
            [
                `%${ params.number }%`,
                `%${ params.rowNumber }%`,
                `%${ params.roomName }%`,
                `%${ params.status }%`,
            ]
        );
    }

    getAllByBillboardDate(date: string): Promise<ResponseGetAllSeatsByBillboardDateI[]> {
        return this.seatRepository.query(
            `
            SELECT 
                billboards.room_id AS roomId,
                rooms.name AS roomName,
                billboards.movie_id AS movieId,
                movies.name AS movieName,
                (SELECT COUNT(*) FROM seats WHERE seats.room_id = rooms.id AND seats.status = 1) totalSeats,
                COUNT(*) AS occupiedSeats,
                (SELECT COUNT(*) FROM seats WHERE seats.room_id = rooms.id AND seats.status = 1) - COUNT(*) AS disponibleSeats
            FROM
                bookings
            INNER JOIN billboards ON bookings.billboard_id = billboards.id
            INNER JOIN rooms ON billboards.room_id = rooms.id
            INNER JOIN movies ON billboards.movie_id = movies.id
            WHERE
                billboards.date = ?
            AND billboards.status = 1
            GROUP BY billboards.room_id, billboards.movie_id
            `,
            [ date ]
        );
    }

    getById(id: number): Promise<ResponseGetByIdSeatI[]> {
        return this.seatRepository.query(
            `
            SELECT
                seats.id,
                seats.number,
                seats.row_number AS rowNumber,
                seats.room_id AS roomdId,
                rooms.name AS roomName,
                seats.status
            FROM 
                seats
            INNER JOIN rooms ON seats.room_id = rooms.id
            WHERE
                seats.id = ?;  
            `,
            [ id ]
        );
    }
    
    insert(seat: SeatEntity): Promise<SeatEntity> {
        return this.seatRepository.save(seat);
    }

    update(id: number, seat: SeatEntity): Promise<UpdateResult> {
        return this.seatRepository.update({ id }, seat);
    }

    updateTr(
        cnxTr: EntityManager,
        id: number,
        seat: SeatEntity
    ): Promise<UpdateResult> {
        return cnxTr.update(
            SeatEntity, 
            { id }, 
            seat
        );
    }

    delete(id: number): Promise<DeleteResult> {
        return this.seatRepository.delete({ id });
    }

}