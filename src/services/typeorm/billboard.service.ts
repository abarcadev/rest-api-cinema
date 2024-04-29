import { 
    DeleteResult, 
    EntityManager, 
    UpdateResult 
} from "typeorm";
import { dbConnection } from "../../database/typeorm.connection";
import { BillboardEntity } from "../../entities/typeorm";
import { 
    ParamsGetAllBillboardsI, 
    ResponseGetAllBillboardsI, 
    ResponseGetByIdBillboardI 
} from "../../interfaces/billboard.interface";

export class BillboardService {

    private readonly billboardRepository = dbConnection.getRepository(BillboardEntity);

    getAll(params: ParamsGetAllBillboardsI): Promise<ResponseGetAllBillboardsI[]> {
        return this.billboardRepository.query(
            `
            SELECT
                billboards.id,
                DATE_FORMAT(billboards.date, '%Y-%m-%d') AS date,
                billboards.start_time AS startTime,
                billboards.end_time AS endTime,
                billboards.movie_id AS movieId,
                movies.name AS movieName,
                billboards.room_id AS roomId,
                rooms.name AS roomName
            FROM
                billboards
            INNER JOIN movies ON billboards.movie_id = movies.id
            INNER JOIN rooms ON billboards.room_id = rooms.id
            WHERE
                billboards.date LIKE ?
            AND billboards.start_time LIKE ?
            AND billboards.end_time LIKE ?
            AND movies.name LIKE ?
            AND rooms.name LIKE ?
            AND billboards.status LIKE ?
            ORDER BY billboards.id
            LIMIT ${ params.limit } OFFSET ${ params.skip };
            `,
            [
                `%${ params.date }%`,
                `%${ params.startTime }%`,
                `%${ params.endTime }%`,
                `%${ params.movieName }%`,
                `%${ params.roomName }%`,
                `%${ params.status }%`,
            ]
        );
    }

    getAllCount(params: ParamsGetAllBillboardsI): Promise<any[]> {
        return this.billboardRepository.query(
            `
            SELECT
                COUNT(*) AS regs
            FROM
                billboards
            INNER JOIN movies ON billboards.movie_id = movies.id
            INNER JOIN rooms ON billboards.room_id = rooms.id
            WHERE
                billboards.date LIKE ?
            AND billboards.start_time LIKE ?
            AND billboards.end_time LIKE ?
            AND movies.name LIKE ?
            AND rooms.name LIKE ?
            AND billboards.status LIKE ?;
            `,
            [
                `%${ params.date }%`,
                `%${ params.startTime }%`,
                `%${ params.endTime }%`,
                `%${ params.movieName }%`,
                `%${ params.roomName }%`,
                `%${ params.status }%`,
            ]
        );
    }

    getById(id: number): Promise<ResponseGetByIdBillboardI[]> {
        return this.billboardRepository.query(
            `
            SELECT
                billboards.id,
                DATE_FORMAT(billboards.date, '%Y-%m-%d') AS date,
                billboards.start_time AS startTime,
                billboards.end_time AS endTime,
                billboards.movie_id AS movieId,
                movies.name AS movieName,
                billboards.room_id AS roomId,
                rooms.name AS roomName
            FROM
                billboards
            INNER JOIN movies ON billboards.movie_id = movies.id
            INNER JOIN rooms ON billboards.room_id = rooms.id
            WHERE
                billboards.id = ?;  
            `,
            [ id ]
        );
    }

    insert(billboard: BillboardEntity): Promise<BillboardEntity> {
        return this.billboardRepository.save(billboard);
    }

    update(id: number, billboard: BillboardEntity): Promise<UpdateResult> {
        return this.billboardRepository.update({ id }, billboard);
    }

    updateTr(
        cnxTr: EntityManager,
        id: number,
        billboard: BillboardEntity
    ): Promise<UpdateResult> {
        return cnxTr.update(
            BillboardEntity,
            { id },
            billboard
        );
    }

    delete(id: number): Promise<DeleteResult> {
        return this.billboardRepository.delete({ id });
    }

}