import { 
    DeleteResult, 
    EntityManager, 
    UpdateResult 
} from "typeorm";
import { dbConnection } from "../../database/typeorm.connection";
import { BookingEntity } from "../../entities/typeorm";
import { 
    ParamsGetAllBookingsByDateRangeI,
    ParamsGetAllBookingsI, 
    ResponseGetAllBookingsByDateRangeI, 
    ResponseGetAllBookingsI, 
    ResponseGetByIdBookingI 
} from "../../interfaces/booking.interface";

export class BookingService {

    private readonly bookingRepository = dbConnection.getRepository(BookingEntity);

    getAll(params: ParamsGetAllBookingsI): Promise<ResponseGetAllBookingsI[]> {
        return this.bookingRepository.query(
            `
            SELECT
                bookings.id,
                DATE_FORMAT(bookings.date, '%Y-%m-%d') AS date,
                bookings.customer_id AS customerId,
                CONCAT(customers.name, ' ', customers.last_name) AS customerName,
                bookings.seat_id AS seatId,
                seats.number AS seatNumber,
                seats.row_number AS rowNumber,
                bookings.billboard_id AS billboardId,
                DATE_FORMAT(billboards.date, '%Y-%m-%d') AS billboardDate,
                billboards.start_time AS startTime,
                billboards.end_time AS endTime,
                movies.name AS movieName, 
                rooms.name AS roomName,
                bookings.status
            FROM
                bookings
            INNER JOIN customers ON bookings.customer_id = customers.id
            INNER JOIN seats ON bookings.seat_id = seats.id
            INNER JOIN billboards ON bookings.billboard_id = billboards.id
            INNER JOIN movies ON billboards.movie_id = movies.id
            INNER JOIN rooms ON billboards.room_id = rooms.id
            WHERE
                bookings.date LIKE ?
            AND CONCAT(customers.name, ' ', customers.last_name) LIKE ?
            AND seats.number LIKE ?
            AND billboards.date LIKE ?
            AND bookings.status LIKE ?
            ORDER BY bookings.id
            LIMIT ${ params.limit } OFFSET ${ params.skip };
            `,
            [
                `%${ params.date }%`,
                `%${ params.customerName }%`,
                `%${ params.seatNumber }%`,
                `%${ params.billboardDate }%`,
                `%${ params.status }%`,
            ]
        );
    }

    getAllCount(params: ParamsGetAllBookingsI): Promise<any[]> {
        return this.bookingRepository.query(
            `
            SELECT
                COUNT(*) AS regs
            FROM
                bookings
            INNER JOIN customers ON bookings.customer_id = customers.id
            INNER JOIN seats ON bookings.seat_id = seats.id
            INNER JOIN billboards ON bookings.billboard_id = billboards.id
            INNER JOIN movies ON billboards.movie_id = movies.id
            INNER JOIN rooms ON billboards.room_id = rooms.id
            WHERE
                bookings.date LIKE ?
            AND CONCAT(customers.name, ' ', customers.last_name) LIKE ?
            AND seats.number LIKE ?
            AND billboards.date LIKE ?
            AND bookings.status LIKE ?;
            `,
            [
                `%${ params.date }%`,
                `%${ params.customerName }%`,
                `%${ params.seatNumber }%`,
                `%${ params.billboardDate }%`,
                `%${ params.status }%`,
            ]
        );
    }

    getAllBySeatId(seatId: number): Promise<any[]> {
        return this.bookingRepository.query(
            `
            SELECT
                id
            FROM
                bookings
            WHERE
                seat_id = ?;
            `,
            [ seatId ]
        );
    }

    getAllByBillboardId(billboardId: number): Promise<any[]> {
        return this.bookingRepository.query(
            `
            SELECT
                id,
                customer_id AS customerId,
                seat_id AS seatId
            FROM
                bookings
            WHERE
                billboard_id = ?;
            `,
            [ billboardId ]
        );
    }

    getAllByDateRange(params: ParamsGetAllBookingsByDateRangeI): Promise<ResponseGetAllBookingsByDateRangeI[]> {
        return this.bookingRepository.query(
            `
            SELECT
                bookings.id,
                DATE_FORMAT(bookings.date, '%Y-%m-%d') AS date,
                bookings.customer_id AS customerId,
                CONCAT(customers.name, ' ', customers.last_name) AS customerName,
                billboards.movie_id AS movieId,
                movies.name AS movieName,
                bookings.status
            FROM
                bookings
            INNER JOIN customers ON bookings.customer_id = customers.id
            INNER JOIN billboards ON bookings.billboard_id = billboards.id
            INNER JOIN movies ON billboards.movie_id = movies.id 
            WHERE
                movies.genre = 'HORROR'
            AND bookings.status = 1
            AND bookings.date BETWEEN ? AND ?;
            `,
            [
                params.fromDate,
                params.untilDate,
            ]
        );
    }


    getById(id: number): Promise<ResponseGetByIdBookingI[]> {
        return this.bookingRepository.query(
            `
            SELECT
                bookings.id,
                DATE_FORMAT(bookings.date, '%Y-%m-%d') AS date,
                bookings.customer_id AS customerId,
                CONCAT(customers.name, ' ', customers.last_name) AS customerName,
                bookings.seat_id AS seatId,
                seats.number AS seatNumber,
                seats.row_number AS rowNumber,
                bookings.billboard_id AS billboardId,
                DATE_FORMAT(billboards.date, '%Y-%m-%d') AS billboardDate,
                billboards.start_time AS startTime,
                billboards.end_time AS endTime,
                movies.name AS movieName, 
                rooms.name AS roomName
            FROM
                bookings
            INNER JOIN customers ON bookings.customer_id = customers.id
            INNER JOIN seats ON bookings.seat_id = seats.id
            INNER JOIN billboards ON bookings.billboard_id = billboards.id
            INNER JOIN movies ON billboards.movie_id = movies.id
            INNER JOIN rooms ON billboards.room_id = rooms.id
            WHERE
                bookings.id = ?;
            `,
            [ id ]
        );
    }

    insert(booking: BookingEntity): Promise<BookingEntity> {
        return this.bookingRepository.save(booking);
    }

    update(id: number, booking: BookingEntity): Promise<UpdateResult> {
        return this.bookingRepository.update({ id }, booking);
    }

    updateTr(
        cnxTr: EntityManager,
        id: number,
        booking: BookingEntity
    ): Promise<UpdateResult> {
        return cnxTr.update(
            BookingEntity, 
            { id }, 
            booking
        );
    }

    delete(id: number): Promise<DeleteResult> {
        return this.bookingRepository.delete({ id });
    }

}