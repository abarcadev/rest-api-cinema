import { 
    createSchema,
    validEmptyText,
    validNullText, 
    validNumberMinMax, 
    validTextMinMax 
} from "data-validator-joi";
import { regExp } from "../../utils/valid-regexp";

const getAll = createSchema({
    documentNumber: validEmptyText(regExp.number, 20),
    name          : validEmptyText(regExp.name, 30),
    lastName      : validEmptyText(regExp.name, 30),
    age           : validEmptyText(regExp.number, 2),
    phoneNumber   : validEmptyText(regExp.number, 20),
    email         : validEmptyText(regExp.paragraph, 100),
    status        : validEmptyText(regExp.number, 1),
    limit         : validNumberMinMax(1, 9999),
    skip          : validNumberMinMax(0, 9999),
});

const getById = createSchema({
    id: validNumberMinMax(1, 9999)
});

const customer = {
    documentNumber: validTextMinMax(
        regExp.number,
        10,
        20
    ),
    name: validTextMinMax(
        regExp.name,
        2,
        30
    ),
    lastName: validTextMinMax(
        regExp.name,
        2,
        30
    ),
    age        : validNumberMinMax(1, 99),
    phoneNumber: validNullText(regExp.number, 20),
    email      : validNullText(regExp.email, 100),
    status     : validNumberMinMax(0, 1),
};

const insert = createSchema({
    ...customer
});

const update = createSchema({
    ...customer
});

export const customerSchema = {
    getAll,
    getById,
    insert,
    update,
};