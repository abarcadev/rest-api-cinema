import { Request, Response } from "express";
import { resError } from "../utils/response-errors";
import { 
    BodySaveBillboardI, 
    ParamsGetAllBillboardsI, 
    ResponseGetAllBillboardsI 
} from "../interfaces/billboard.interface";
import { 
    BillboardService, 
    MovieService, 
    RoomService 
} from "../services/typeorm";
import { CustomError } from "../config/custom-error";
import { REG_DELETED, REG_NOT_FOUND } from "../utils/messages";
import { BillboardEntity } from "../entities/typeorm";
import { StatusCodeEnum } from "../enums/status-code.enum";

export class BillboardController {

    constructor(
        private readonly billboardService: BillboardService,
        private readonly movieService: MovieService,
        private readonly roomService: RoomService,
    ) {}

    async getAll(req: Request, res: Response) {
        try {
            const query = req.query as unknown as ParamsGetAllBillboardsI;

            const billboardsData = await this.billboardService.getAll(query);

            let data: ResponseGetAllBillboardsI[] = [];

            if (billboardsData.length > 0)
                data = billboardsData;

            const [ quantity ] = await this.billboardService.getAllCount(query);

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

            let [ data ] = await this.billboardService.getById(id);

            if (!data)
                throw CustomError.notFound(REG_NOT_FOUND(`Billboad id '${ id }'`));

            return res.status(StatusCodeEnum.Ok).json(data);
        } catch (error) {
            resError(error, res);
        }
    }

    async insert(req: Request, res: Response) {
        try {
            const payload = req.body as BodySaveBillboardI;

            const { movieId, roomId } = payload;
            await this.validIds(movieId, roomId);
            
            const billboard = payload as BillboardEntity;

            const { id } = await this.billboardService.insert(billboard);

            return res.status(StatusCodeEnum.Created).json({ id });
        } catch (error) {
            resError(error, res);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id      = Number(req.params.id);
            const payload = req.body as BodySaveBillboardI;

            const [ billboardData ] = await this.billboardService.getById(id);

            if (!billboardData)
                throw CustomError.notFound(REG_NOT_FOUND(`Billboard id '${ id }'`));

            const { movieId, roomId } = payload;
            await this.validIds(movieId, roomId);

            const billboard = payload as BillboardEntity;

            await this.billboardService.update(id, billboard);

            return res.status(StatusCodeEnum.Ok).json({ id });
        } catch (error) {
            resError(error, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            
            const [ billboardData ] = await this.billboardService.getById(id);

            if (!billboardData)
                throw CustomError.notFound(REG_NOT_FOUND(`Billboard id '${ id }'`));

            await this.billboardService.delete(id);

            return res.status(StatusCodeEnum.Ok).json({ message: REG_DELETED });
        } catch (error) {
            resError(error, res);
        }
    }

    private async validIds(movieId: number, roomId: number) {
        try {
            const [ movieData ] = await this.movieService.getById(movieId);

            if (!movieData)
                throw CustomError.notFound(REG_NOT_FOUND(`Movie id '${ movieId }'`));
            
            const [ roomData ] = await this.roomService.getById(roomId);

            if (!roomData)
                throw CustomError.notFound(REG_NOT_FOUND(`Room id '${ roomId }'`));
        } catch (error) {
            throw error;
        }
    }

}