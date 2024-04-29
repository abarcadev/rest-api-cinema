import { 
    createSchema, 
    validEmptyText, 
    validNumberMinMax, 
    validTextMinMax 
} from "data-validator-joi";
import { regExp } from "../../utils/valid-regexp";

const getAll = createSchema({
    name  : validEmptyText(regExp.paragraph, 20),
    number: validEmptyText(regExp.number, 4),
    status: validEmptyText(regExp.number, 1),
    limit : validNumberMinMax(1, 9999),
    skip  : validNumberMinMax(0, 9999),
});

const getById = createSchema({
    id: validNumberMinMax(1, 9999)
});

const room = {
    name: validTextMinMax(
        regExp.paragraph,
        2,
        20
    ),
    number: validNumberMinMax(1, 9999),
    status: validNumberMinMax(0, 1),
};

const insert = createSchema({
    ...room
});

const update = createSchema({
    ...room
});

export const roomSchema = {
    getAll,
    getById,
    insert,
    update,
};