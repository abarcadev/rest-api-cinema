import { DeleteResult, UpdateResult } from "typeorm";
import { dbConnection } from "../../database/typeorm.connection";
import { MovieEntity } from "../../entities/typeorm";
import { 
    ParamsGetAllMoviesI, 
    ResponseGetAllMoviesI, 
    ResponseGetByIdMovieI 
} from "../../interfaces/movie.interface";

export class MovieService {

    private readonly movieRepository = dbConnection.getRepository(MovieEntity);

    getAll(params: ParamsGetAllMoviesI): Promise<ResponseGetAllMoviesI[]> {
        return this.movieRepository.query(
            `
            SELECT 
                id,
                name,
                genre,
                allowed_age AS allowedAge,
                length_minutes AS lengthMinutes,
                status
            FROM 
                movies
            WHERE
                name LIKE ?
            AND genre LIKE ?
            AND allowed_age LIKE ?
            AND length_minutes LIKE ?
            AND status LIKE ?
            ORDER BY id
            LIMIT ${ params.limit } OFFSET ${ params.skip };
            `,
            [
                `%${ params.name }%`,
                `%${ params.genre }%`,
                `%${ params.allowedAge }%`,
                `%${ params.lengthMinutes }%`,
                `%${ params.status }%`,
            ]
        );
    }

    getAllCount(params: ParamsGetAllMoviesI): Promise<any[]> {
        return this.movieRepository.query(
            `
            SELECT 
                COUNT(*) AS regs
            FROM 
                movies
            WHERE
                name LIKE ?
            AND genre LIKE ?
            AND allowed_age LIKE ?
            AND length_minutes LIKE ?
            AND status LIKE ?;
            `,
            [
                `%${ params.name }%`,
                `%${ params.genre }%`,
                `%${ params.allowedAge }%`,
                `%${ params.lengthMinutes }%`,
                `%${ params.status }%`,
            ]
        );
    }

    getById(id: number): Promise<ResponseGetByIdMovieI[]> {
        return this.movieRepository.query(
            `
            SELECT 
                name,
                genre,
                allowed_age AS allowedAge,
                length_minutes AS lengthMinutes,
                status
            FROM 
                movies
            WHERE
                id = ?;
            `,
            [ id ]
        );
    }

    insert(movie: MovieEntity): Promise<MovieEntity> {
        return this.movieRepository.save(movie);
    }

    update(id: number, movie: MovieEntity): Promise<UpdateResult> {
        return this.movieRepository.update({ id }, movie);
    }

    delete(id: number): Promise<DeleteResult> {
        return this.movieRepository.delete({ id });
    }

}