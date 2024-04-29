interface ParamsGetAllSeatsI {
    number   : number;
    rowNumber: number;
    roomName : string;
    status   : number;
    limit    : number;
    skip     : number;
}

interface ResponseGetAllSeatsI {
    id       : number;
    number   : number;
    rowNumber: number;
    roomId   : number;
    roomName : string;
    status   : number;
}

interface ResponseGetAllSeatsByBillboardDateI {
    roomId         : number;
    roomName       : string;
    movieId        : number;
    movieName      : string;
    totalSeats     : number;
    occupiedSeats  : number;
    disponibleSeats: number;
}

interface ResponseGetByIdSeatI extends ResponseGetAllSeatsI {}

interface BodySaveSeatI {
    number   : number;
    rowNumber: number;
    roomId   : number;
    status   : number | boolean;
}

export {
    ParamsGetAllSeatsI,
    ResponseGetAllSeatsI,
    ResponseGetAllSeatsByBillboardDateI,
    ResponseGetByIdSeatI,
    BodySaveSeatI,
};