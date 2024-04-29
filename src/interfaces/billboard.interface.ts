interface ParamsGetAllBillboardsI {
    date     : string;
    startTime: string;
    endTime  : string;
    movieName: string;
    roomName : string;
    status   : number;
    limit    : number;
    skip     : number;
}

interface ResponseGetAllBillboardsI {
    id       : number;
    date     : string;
    startTime: string;
    endTime  : string;
    movieId  : number;
    movieName: string;
    roomId   : number;
    roomName : string;
    status   : number;
}

interface ResponseGetByIdBillboardI extends ResponseGetAllBillboardsI {}

interface BodySaveBillboardI {
    date     : string | Date;
    startTime: string;
    endTime  : string;
    movieId  : number;
    roomId   : number;
    status   : number | boolean;
}

export {
    ParamsGetAllBillboardsI,
    ResponseGetAllBillboardsI,
    ResponseGetByIdBillboardI,
    BodySaveBillboardI,
};