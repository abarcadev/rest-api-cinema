import { Request, Response } from "express";
import { 
    BillboardService, 
    BookingService, 
    CustomerService, 
    SeatService 
} from "../services/typeorm";
import { resError } from "../utils/response-errors";
import { 
    BodySaveBookingI, 
    ParamsGetAllBookingsByDateRangeI, 
    ParamsGetAllBookingsI, 
    ResponseGetAllBookingsByDateRangeI, 
    ResponseGetAllBookingsI 
} from "../interfaces/booking.interface";
import { CustomError } from "../config/custom-error";
import { REG_DELETED, REG_NOT_FOUND } from "../utils/messages";
import { BookingEntity } from "../entities/typeorm";
import { StatusCodeEnum } from "../enums/status-code.enum";

export class BookingController {

    constructor(
        private readonly bookingService: BookingService,
        private readonly customerService: CustomerService,
        private readonly seatService: SeatService,
        private readonly billboardService: BillboardService,
    ) {} 

    async getAll(req: Request, res: Response) {
        try {
            const query = req.query as unknown as ParamsGetAllBookingsI;

            const bookingsData = await this.bookingService.getAll(query);

            let data: ResponseGetAllBookingsI[] = [];
            
            if (bookingsData.length > 0)
                data = bookingsData;

            const [ quantity ] = await this.bookingService.getAllCount(query);

            return res.status(StatusCodeEnum.Ok).json({
                data,
                total: Number(quantity.regs)
            });
        } catch (error) {
            resError(error, res);
        }
    }

    async getAllByDateRange(req: Request,  res: Response) {
        try {
            const query = req.query as unknown as ParamsGetAllBookingsByDateRangeI;

            const billboardsData = await this.bookingService.getAllByDateRange(query);

            let data: ResponseGetAllBookingsByDateRangeI[] = [];

            if (billboardsData.length > 0)
                data = billboardsData;

            return res.status(StatusCodeEnum.Ok).json({ data });
        } catch (error) {
            resError(error, res);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            let [ data ] = await this.bookingService.getById(id);

            if (!data)
                throw CustomError.notFound(REG_NOT_FOUND(`Booking id '${ id }'`));

            return res.status(StatusCodeEnum.Ok).json(data);
        } catch (error) {
            resError(error, res);
        }
    }    

    async insert(req: Request, res: Response) {
        try {
            const payload = req.body as BodySaveBookingI;

            const { 
                customerId,
                seatId,
                billboardId
            } = payload;

            await this.validIds(
                customerId,
                seatId,
                billboardId
            );

            const booking = payload as BookingEntity;

            const { id } = await this.bookingService.insert(booking);

            return res.status(StatusCodeEnum.Created).json({ id });
        } catch (error) {
            resError(error, res);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id      = Number(req.params.id);
            const payload = req.body as BodySaveBookingI;

            const [ bookingData ] = await this.bookingService.getById(id);
            
            if (!bookingData)
                throw CustomError.notFound(REG_NOT_FOUND(`Booking id '${ id }'`));

            const { 
                customerId,
                seatId,
                billboardId
            } = payload;

            await this.validIds(
                customerId,
                seatId,
                billboardId
            );

            const booking = payload as BookingEntity;

            await this.bookingService.update(id, booking);

            return res.status(StatusCodeEnum.Ok).json({ id });
        } catch (error) {
            resError(error, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const [ bookingData ] = await this.bookingService.getById(id);
            
            if (!bookingData)
                throw CustomError.notFound(REG_NOT_FOUND(`Booking id '${ id }'`));

            await this.bookingService.delete(id);

            return res.status(StatusCodeEnum.Ok).json({ message: REG_DELETED });
        } catch (error) {
            resError(error, res);
        }
    }

    private async validIds(
        customerId: number,
        seatId: number,
        billboardId: number
    ) {
        try {
            const [ customerData ] = await this.customerService.getById(customerId);

            if (!customerData)
                throw CustomError.notFound(REG_NOT_FOUND(`Customer id '${ customerId }'`));

            const [ seatData ] = await this.seatService.getById(seatId);

            if (!seatData)
                throw CustomError.notFound(REG_NOT_FOUND(`Seat id '${ seatId }'`));

            const [ billboardData ] = await this.billboardService.getById(billboardId);

            if (!billboardData)
                throw CustomError.notFound(REG_NOT_FOUND(`Billboard id '${ billboardId }'`));
        } catch (error) {
            throw error;
        }
    }

}