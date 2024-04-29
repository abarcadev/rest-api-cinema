interface ParamsGetAllRoomsI {
    name  : string;
    number: number;
    status: number;
    limit : number;
    skip  : number;
}

interface ResponseGetAllRoomsI {
    id    : number;
    name  : string;
    number: number;
    status: number;
}

interface ResponseGetByIdRoomI extends ResponseGetAllRoomsI {}

interface BodySaveRoomI {
    name  : string;
    number: number;
    status: number | boolean;
}

export {
    ParamsGetAllRoomsI,
    ResponseGetAllRoomsI,
    ResponseGetByIdRoomI,
    BodySaveRoomI,
};