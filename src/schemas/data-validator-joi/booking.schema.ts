import { 
    createSchema, 
    validDate, 
    validEmptyDate, 
    validEmptyText, 
    validNumberMinMax 
} from "data-validator-joi";
import { regExp } from "../../utils/valid-regexp";

const getAll = createSchema({
    date         : validEmptyDate(),
    customerName : validEmptyText(regExp.name, 60),
    seatNumber   : validEmptyText(regExp.number, 9999),
    billboardDate: validEmptyDate(),
    status       : validEmptyText(regExp.number, 1),
    limit        : validNumberMinMax(1, 9999),
    skip         : validNumberMinMax(0, 9999),
});

const getAllByDateRange = createSchema({
    fromDate : validDate(),
    untilDate: validDate()
});

const getById = createSchema({
    id: validNumberMinMax(1, 9999)
});

const booking = {
    date       : validDate(),
    customerId : validNumberMinMax(1, 9999),
    seatId     : validNumberMinMax(1, 9999),
    billboardId: validNumberMinMax(1, 9999),
    status     : validNumberMinMax(0, 1),
};

const insert = createSchema({
    ...booking
});

const update = createSchema({
    ...booking
});

export const bookingSchema = {
    getAll,
    getAllByDateRange,
    getById,
    insert,
    update,
};