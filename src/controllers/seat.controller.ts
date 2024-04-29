import { Request, Response } from "express";
import { RoomService, SeatService } from "../services/typeorm";
import { resError } from "../utils/response-errors";
import { 
    BodySaveSeatI, 
    ParamsGetAllSeatsI, 
    ResponseGetAllSeatsByBillboardDateI, 
    ResponseGetAllSeatsI 
} from "../interfaces/seat.interface";
import { CustomError } from "../config/custom-error";
import { REG_DELETED, REG_NOT_FOUND } from "../utils/messages";
import { SeatEntity } from "../entities/typeorm";
import { StatusCodeEnum } from "../enums/status-code.enum";

export class SeatController {

    constructor(
        private readonly seatService: SeatService,
        private readonly roomService: RoomService,
    ) {}

    async getAll(req: Request, res: Response) {
        try {
            const query = req.query as unknown as ParamsGetAllSeatsI;

            const seatsData = await this.seatService.getAll(query);

            let data: ResponseGetAllSeatsI[] = [];

            if (seatsData.length > 0)
                data = seatsData;

            const [ quantity ] = await this.seatService.getAllCount(query);

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

            let [ data ] = await this.seatService.getById(id);

            if (!data)
                throw CustomError.notFound(REG_NOT_FOUND(`Seat id '${ id }'`));

            return res.status(StatusCodeEnum.Ok).json(data);
        } catch (error) {
            resError(error, res);
        }
    }

    async getAllByBillboardDate(req: Request, res: Response) {
        try {
            const date = req.params.date;

            const seatsData = await this.seatService.getAllByBillboardDate(date);

            let data: ResponseGetAllSeatsByBillboardDateI[] = [];

            if (seatsData.length > 0)
                data = seatsData;

            return res.status(StatusCodeEnum.Ok).json({ data });
        } catch (error) {
            resError(error, res);
        }
    }

    async insert(req: Request, res: Response) {
        try {
            const payload = req.body as BodySaveSeatI;

            const { roomId } = payload;
            
            const [ roomData ] = await this.roomService.getById(roomId);

            if (!roomData)
                throw CustomError.notFound(REG_NOT_FOUND(`Room id '${ roomId }'`));

            const seat = payload as SeatEntity;

            const { id } = await this.seatService.insert(seat);

            return res.status(StatusCodeEnum.Created).json({ id });
        } catch (error) {
            resError(error, res);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id      = Number(req.params.id);
            const payload = req.body as BodySaveSeatI;

            const [ seatData ] = await this.seatService.getById(id);

            if (!seatData)
                throw CustomError.notFound(REG_NOT_FOUND(`Seat id '${ id }'`));

            const { roomId } = payload;

            const [ roomData ] = await this.roomService.getById(roomId);

            if (!roomData)
                throw CustomError.notFound(REG_NOT_FOUND(`Room id '${ roomId }'`));

            const seat = payload as SeatEntity;

            await this.seatService.update(id, seat);

            return res.status(StatusCodeEnum.Ok).json({ id });
        } catch (error) {
            resError(error, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const [ seatData ] = await this.seatService.getById(id);

            if (!seatData)
                throw CustomError.notFound(REG_NOT_FOUND(`Seat id '${ id }'`));

            await this.seatService.delete(id);

            return res.status(StatusCodeEnum.Ok).json({ message: REG_DELETED });
        } catch (error) {
            resError(error, res);
        }
    }

}