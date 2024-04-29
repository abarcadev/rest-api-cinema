import { createSchema, validNumberMinMax } from "data-validator-joi";

const updateSeatBookings = createSchema({
    seatId: validNumberMinMax(1, 9999)
});

const updateBillboardBookings = createSchema({
    billboardId: validNumberMinMax(1, 9999)
});

export const transactionSchema = {
    updateSeatBookings,
    updateBillboardBookings,
};