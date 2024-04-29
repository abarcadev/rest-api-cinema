interface ParamsGetAllBookingsI {
    date         : string;
    customerName : string;
    seatNumber   : string;
    billboardDate: string;
    status       : number;
    limit        : number;
    skip         : number;
}

interface ParamsGetAllBookingsByDateRangeI {
    fromDate : string;
    untilDate: string;
}

interface ResponseGetAllBookingsI {
    id           : number;
    date         : string;
    customerId   : number;
    customerName : string;
    seatId       : number;
    seatNumber   : number;
    rowNumber    : number;
    billboardId  : number;
    billboardDate: string;
    startTime    : string;
    endTime      : string;
    movieName    : string;
    roomName     : string;
    status       : number;    
}

interface ResponseGetAllBookingsByDateRangeI {
    id          : string;
    date        : string;
    customerId  : string;
    customerName: string;
    movieId     : string;
    movieName   : string;
    status      : string;
}

interface ResponseGetByIdBookingI extends ResponseGetAllBookingsI {}

interface BodySaveBookingI {
    date       : string | Date;
    customerId : number;
    seatId     : number;
    billboardId: number;
    status     : number | boolean;
}

export {
    ParamsGetAllBookingsI,
    ParamsGetAllBookingsByDateRangeI,
    ResponseGetAllBookingsI,
    ResponseGetAllBookingsByDateRangeI,
    ResponseGetByIdBookingI,
    BodySaveBookingI,
};