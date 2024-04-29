const ROUTE_NOT_FOUND = 'Route not found';

const REG_NOT_SAVED = 'Register not saved';
const REG_NOT_FOUND = (data: string) => `${ data } not found`;
const REG_DELETED = 'Register deleted';
const DATA_ALREADY_EXIST = (data: string) => `${ data } already exists`;
const CANCEL_BILLBOARD_DATE = (date: string) => `You cannot cancel billboard with a date prior (${ date }) to the current one`;

export {
    ROUTE_NOT_FOUND,
    REG_NOT_SAVED,
    REG_NOT_FOUND,
    REG_DELETED,
    DATA_ALREADY_EXIST,
    CANCEL_BILLBOARD_DATE,
};