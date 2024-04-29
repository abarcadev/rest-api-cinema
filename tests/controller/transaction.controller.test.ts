import { server } from "../test-server";
import { TransactionController } from "../../src/controllers/transaction.controller";
import { dbConnection } from "../../src/database/typeorm.connection";
import {
    SeatService,
    BookingService,
    BillboardService,
    CustomerService
} from "../../src/services/typeorm";
import { getMockReq, getMockRes } from "@jest-mock/express";

describe('transaction controller', () => {

    beforeAll(async () => {
        await server.start();
    });

    afterAll(async () => {
        await dbConnection.destroy();
        await server.close();
    });

    test('updateSeatBookings method should return a id', async () => {
        const controller = new TransactionController(
            new SeatService(),
            new BookingService(),
            new BillboardService(),
            new CustomerService(),
        );

        const seatId = 3;

        const req     = getMockReq({ body: { seatId } });
        const { res } = getMockRes();

        await controller.updateSeatBookings(req, res);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id: seatId
            })
        );
    });

});