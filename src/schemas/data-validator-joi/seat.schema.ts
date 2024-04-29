import { 
    createSchema, 
    validDate, 
    validEmptyText, 
    validNumberMinMax 
} from "data-validator-joi";
import { regExp } from "../../utils/valid-regexp";

const getAll = createSchema({
    number   : validEmptyText(regExp.number, 4),
    rowNumber: validEmptyText(regExp.number, 4),
    roomName : validEmptyText(regExp.paragraph, 20),
    status   : validEmptyText(regExp.number, 1),
    limit    : validNumberMinMax(1, 9999),
    skip     : validNumberMinMax(0, 9999),
});

const getAllByBillboardDate = createSchema({
    date: validDate()
});

const getById = createSchema({
    id: validNumberMinMax(1, 9999)
});

const seat = {
    number   : validNumberMinMax(1, 9999),
    rowNumber: validNumberMinMax(1, 9999),
    roomId   : validNumberMinMax(1, 9999),
    status   : validNumberMinMax(0, 1),
};

const insert = createSchema({
    ...seat
});

const update = createSchema({
    ...seat
});

export const seatSchema = {
    getAll,
    getAllByBillboardDate,
    getById,
    insert,
    update,
};