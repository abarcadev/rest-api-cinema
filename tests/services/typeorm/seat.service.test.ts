import { dbConnection } from "../../../src/database/typeorm.connection";
import { SeatService } from "../../../src/services/typeorm";
import { server } from "../../test-server";

describe('seat service', () => {

    beforeAll(async () => {
        await server.start();
    });

    afterAll(async () => {
        await dbConnection.destroy();
        await server.close();
    });

    test('getAllByBillboardDate service should return an array of seats group by rooms and movies', async () => {
        const seatService = new SeatService();

        const date = '2024-04-26';

        const data = await seatService.getAllByBillboardDate(date);

        expect(data).toBeInstanceOf(Array);
    });

});