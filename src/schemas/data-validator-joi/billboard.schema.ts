import { 
    createSchema,
    validDate, 
    validEmptyDate, 
    validEmptyText, 
    validNumberMinMax, 
    validTextMinMax 
} from "data-validator-joi";
import { regExp } from "../../utils/valid-regexp";

const getAll = createSchema({
    date     : validEmptyDate(),
    startTime: validEmptyText(regExp.time, 5),
    endTime  : validEmptyText(regExp.time, 5),
    movieName: validEmptyText(regExp.paragraph, 100),
    roomName : validEmptyText(regExp.paragraph, 20),
    status   : validEmptyText(regExp.number, 1),
    limit    : validNumberMinMax(1, 9999),
    skip     : validNumberMinMax(0, 9999),
});

const getById = createSchema({
    id: validNumberMinMax(1, 9999)
});

const billboard = {
    date: validDate(),
    startTime: validTextMinMax(
        regExp.time,
        5, 
        5
    ),
    endTime: validTextMinMax(
        regExp.time,
        5,
        5,
    ),
    movieId: validNumberMinMax(1, 9999),
    roomId : validNumberMinMax(1, 9999),
    status : validNumberMinMax(0, 1),
};

const insert = createSchema({
    ...billboard
});

const update = createSchema({
    ...billboard
});

export const billboardSchema = {
    getAll,
    getById,
    insert,
    update,
};