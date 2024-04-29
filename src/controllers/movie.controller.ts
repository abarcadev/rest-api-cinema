import { Request, Response } from "express";
import { MovieService } from "../services/typeorm";
import { resError } from "../utils/response-errors";
import { 
    BodySaveMovieI, 
    ParamsGetAllMoviesI, 
    ResponseGetAllMoviesI 
} from "../interfaces/movie.interface";
import { MovieEntity } from "../entities/typeorm";
import { StatusCodeEnum } from "../enums/status-code.enum";
import { CustomError } from "../config/custom-error";
import { REG_DELETED, REG_NOT_FOUND } from "../utils/messages";

export class MovieController {

    constructor(
        private readonly movieService: MovieService,
    ) {}

    async getAll(req: Request, res: Response) {
        try {
            const query = req.query as unknown as ParamsGetAllMoviesI;

            const moviesData = await this.movieService.getAll(query);

            let data: ResponseGetAllMoviesI[] = [];

            if (moviesData.length > 0)
                data = moviesData;

            const [ quantity ] = await this.movieService.getAllCount(query);

            return res.status(StatusCodeEnum.Ok).json({
                data,
                total: Number(quantity.regs)
            });
        } catch (error) {
            resError(error, res);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            let [ data ] = await this.movieService.getById(id);

            if (!data)
                throw CustomError.notFound(REG_NOT_FOUND(`Movie id '${ id }'`));

            return res.status(StatusCodeEnum.Ok).json(data);
        } catch (error) {
            resError(error, res);
        }
    }

    async insert(req: Request, res: Response) {
        try {
            const payload = req.body as BodySaveMovieI;

            const movie = payload as MovieEntity;

            const { id } = await this.movieService.insert(movie);

            return res.status(StatusCodeEnum.Created).json({ id });
        } catch (error) {
            resError(error, res);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id      = Number(req.params.id);
            const payload = req.body as BodySaveMovieI;

            const [ movieData ]  = await this.movieService.getById(id);

            if (!movieData)
                throw CustomError.notFound(REG_NOT_FOUND(`Movie id '${ id }'`));

            const movie = payload as MovieEntity;

            await this.movieService.update(id, movie);

            return res.status(StatusCodeEnum.Ok).json({ id });
        } catch (error) {
            resError(error, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const [ movieData ] = await this.movieService.getById(id);

            if (!movieData)
                throw CustomError.notFound(REG_NOT_FOUND(`Movie id '${ id }'`));
            
            await this.movieService.delete(id);

            return res.status(StatusCodeEnum.Ok).json({ message: REG_DELETED });
        } catch (error) {
            resError(error, res);
        }
    }    

}