import { dbConnection } from "../../../src/database/typeorm.connection";
import { ParamsGetAllBookingsByDateRangeI } from "../../../src/interfaces/booking.interface";
import { BookingService } from "../../../src/services/typeorm";
import { server } from "../../test-server";

describe('booking service', () => {

    beforeAll(async () => {
        await server.start();
    });

    afterAll(async () => {
        await dbConnection.destroy();
        await server.close();
    });

    test('getAllByDateRange service should return an array of horror movies in a date range', async () => {
        const bookingService = new BookingService();

        const params: ParamsGetAllBookingsByDateRangeI = {
            fromDate : '2024-04-26',
            untilDate: '2024-04-26',
        };

        const data = await bookingService.getAllByDateRange(params);

        expect(data).toBeInstanceOf(Array);
    });

});