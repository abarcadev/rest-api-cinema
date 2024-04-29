import { 
    createSchema, 
    validEmptyText, 
    validNumberMinMax, 
    validTextMinMax 
} from "data-validator-joi";
import { regExp } from "../../utils/valid-regexp";

const getAll = createSchema({
    name         : validEmptyText(regExp.paragraph, 100),
    genre        : validEmptyText(regExp.name, 15),
    allowedAge   : validEmptyText(regExp.number, 2),
    lengthMinutes: validEmptyText(regExp.number, 3),
    status       : validEmptyText(regExp.number, 1),
    limit        : validNumberMinMax(1, 9999),
    skip         : validNumberMinMax(0, 9999), 
});

const getById = createSchema({
    id: validNumberMinMax(1, 9999)
});

const movie = {
    name: validTextMinMax(
        regExp.paragraph, 
        2, 
        100
    ),
    genre: validTextMinMax(
        regExp.name,
        2,
        15
    ),
    allowedAge   : validNumberMinMax(0, 99),
    lengthMinutes: validNumberMinMax(1, 240),
    status       : validNumberMinMax(0, 1),
};

const insert = createSchema({
    ...movie
});

const update = createSchema({
    ...movie
});

export const movieSchema = {
    getAll,
    getById,
    insert,
    update,
};