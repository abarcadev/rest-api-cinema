interface ParamsGetAllMoviesI {
    name         : string;
    genre        : string;
    allowedAge   : number;
    lengthMinutes: number;
    status       : number;
    limit        : number;
    skip         : number;   
}

interface ResponseGetAllMoviesI {
    id           : number;
    name         : string;
    genre        : string;
    allowedAge   : number;
    lengthMinutes: number;
    status       : number;
}

interface ResponseGetByIdMovieI extends ResponseGetAllMoviesI {}

interface BodySaveMovieI {
    name         : string;
    genre        : string;
    allowedAge   : number;
    lengthMinutes: number;
    status       : number | boolean;
}

export {
    ParamsGetAllMoviesI,
    ResponseGetAllMoviesI,
    ResponseGetByIdMovieI,
    BodySaveMovieI,
};