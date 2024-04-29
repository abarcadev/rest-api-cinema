import { dbConnection } from "../../src/database/typeorm.connection";
import { BodyUpdateBillboardBookingsI } from "../../src/interfaces/transaction.interface";
import { server } from "../test-server";
import request from "supertest";

describe('transaction routes', () => {

    beforeAll(async () => {
        await server.start();
    });

    afterAll(async () => {
        await dbConnection.destroy();
        await server.close();
    });

    test('/PATCH update-billboard-bookings should return 400 when the billboard date is prior to the current one', async () => {
        const billboardId = 3;
            
        const payload: BodyUpdateBillboardBookingsI = {
            billboardId
        };

        const { body } = await request(server.app)
            .patch('/api/transactions/update-billboard-bookings')
            .send(payload)
            .expect(400);

        expect(body).toEqual({ message: expect.any(String) });
    });

    test('/PATCH update-billboard-bookings should return an array of affected customers by billboard cancellation', async () => {
        const billboardId = 4;
        
        const payload: BodyUpdateBillboardBookingsI = {
            billboardId
        };

        const { body } = await request(server.app)
            .patch('/api/transactions/update-billboard-bookings')
            .send(payload)
            .expect(200);

        expect(body.arrAffectedCustomers).toBeInstanceOf(Array);
    });

});