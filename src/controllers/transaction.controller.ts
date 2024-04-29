import { Request, Response } from "express";
import { 
    BillboardService, 
    BookingService, 
    CustomerService, 
    SeatService 
} from "../services/typeorm";
import { resError } from "../utils/response-errors";
import { dbConnection } from "../database/typeorm.connection";
import { EntityManager } from "typeorm";
import { BodyUpdateBillboardBookingsI, BodyUpdateSeatBookingsI } from "../interfaces/transaction.interface";
import { CustomError } from "../config/custom-error";
import { CANCEL_BILLBOARD_DATE, REG_NOT_FOUND } from "../utils/messages";
import { 
    BillboardEntity, 
    BookingEntity, 
    SeatEntity 
} from "../entities/typeorm";
import { StatusCodeEnum } from "../enums/status-code.enum";
import { ResponseGetAllCustomersI } from "../interfaces/customer.interface";
import { getCurrentDate } from "../utils/functions";

export class TransactionController {

    constructor(
        private readonly seatService: SeatService,
        private readonly bookingService: BookingService,
        private readonly billboardService: BillboardService,
        private readonly customerService: CustomerService,
    ) {}

    async updateSeatBookings(req: Request, res: Response) {
        try {
            return await dbConnection.transaction(async (cnxTr: EntityManager) => {
                const { seatId } = req.body as BodyUpdateSeatBookingsI;

                const [ seatData ] = await this.seatService.getById(seatId);

                if (!seatData)
                    throw CustomError.notFound(REG_NOT_FOUND(`Seat id '${ seatId }'`));

                const seat  = new SeatEntity();
                seat.status = false;

                await this.seatService.updateTr(
                    cnxTr, 
                    seatId, 
                    seat
                );

                const bookingsData = await this.bookingService.getAllBySeatId(seatId);

                for (const reg of bookingsData) {
                    const booking  = new BookingEntity();
                    booking.status = false;

                    await this.bookingService.updateTr(
                        cnxTr,
                        reg.id,
                        booking
                    );
                }

                return res.status(StatusCodeEnum.Ok).json({ id: seatId });
            });
        } catch (error) {
            resError(error, res);
        }
    }

    async updateBillboardBookings(req: Request, res: Response) {
        try {
            return await dbConnection.transaction(async (cnxTr: EntityManager) => {
                const { billboardId } = req.body as BodyUpdateBillboardBookingsI;

                const [ billboardData ] = await this.billboardService.getById(billboardId);

                if (!billboardData)
                    throw CustomError.notFound(REG_NOT_FOUND(`Billboard id '${ billboardId }'`));

                const { date } = billboardData;

                if (date < getCurrentDate())
                    throw CustomError.badRequest(CANCEL_BILLBOARD_DATE(date));

                const billboard  = new BillboardEntity();
                billboard.status = false;

                await this.billboardService.updateTr(
                    cnxTr,
                    billboardId,
                    billboard
                );

                const bookingsData = await this.bookingService.getAllByBillboardId(billboardId);

                const arrAffectedCustomers: ResponseGetAllCustomersI[] = [];

                for (const reg of bookingsData) {
                    const booking  = new BookingEntity();
                    booking.status = false;

                    await this.bookingService.updateTr(
                        cnxTr,
                        reg.id,
                        booking
                    );

                    const seat  = new SeatEntity();
                    seat.status = true;
                    
                    await this.seatService.updateTr(
                        cnxTr, 
                        reg.seatId, 
                        seat
                    );
                    
                    const [ customerData ] = await this.customerService.getById(reg.customerId);

                    const customerFound = arrAffectedCustomers.find((elem) => elem.id === customerData.id);

                    if (!customerFound)
                        arrAffectedCustomers.push(customerData);
                }

                return res.status(StatusCodeEnum.Ok).json({ arrAffectedCustomers });
            });
        } catch (error) {
            resError(error, res);
        }
    }

}