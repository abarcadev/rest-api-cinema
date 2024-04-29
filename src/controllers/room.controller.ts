import { Request, Response } from "express";
import { RoomService } from "../services/typeorm";
import { resError } from "../utils/response-errors";
import { 
    BodySaveRoomI, 
    ParamsGetAllRoomsI, 
    ResponseGetAllRoomsI 
} from "../interfaces/room.interface";
import { RoomEntity } from "../entities/typeorm";
import { StatusCodeEnum } from "../enums/status-code.enum";
import { REG_DELETED, REG_NOT_FOUND } from "../utils/messages";
import { CustomError } from "../config/custom-error";

export class RoomController {

    constructor(
        private readonly roomService: RoomService,
    ) {}

    async getAll(req: Request, res: Response) {
        try {
            const query = req.query as unknown as ParamsGetAllRoomsI;

            const roomsData = await this.roomService.getAll(query);

            let data: ResponseGetAllRoomsI[] = [];

            if (roomsData.length > 0)
                data = roomsData;

            const [ quantity ] = await this.roomService.getAllCount(query);

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

            let [ data ] = await this.roomService.getById(id);

            if (!data)
                throw CustomError.notFound(REG_NOT_FOUND(`Room id '${ id }'`));

            return res.status(StatusCodeEnum.Ok).json(data);
        } catch (error) {
            resError(error, res);
        }
    }

    async insert(req: Request, res: Response) {
        try {
            const payload = req.body as BodySaveRoomI;

            const room = payload as RoomEntity;

            const { id } = await this.roomService.insert(room);

            return res.status(StatusCodeEnum.Created).json({ id });
        } catch (error) {
            resError(error, res);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id      = Number(req.params.id);
            const payload = req.body as BodySaveRoomI;

            let [ roomData ] = await this.roomService.getById(id);

            if (!roomData)
                throw CustomError.notFound(REG_NOT_FOUND(`Room id '${ id }'`));

            const room = payload as RoomEntity;
            
            await this.roomService.update(id, room);

            return res.status(StatusCodeEnum.Ok).json({ id });
        } catch (error) {
            resError(error, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            let [ roomData ] = await this.roomService.getById(id);

            if (!roomData)
                throw CustomError.notFound(REG_NOT_FOUND(`Room id '${ id }'`));
            
            await this.roomService.delete(id);

            return res.status(StatusCodeEnum.Ok).json({ message: REG_DELETED });
        } catch (error) {
            resError(error, res);
        }
    }

}