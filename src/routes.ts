import { Application } from "express";
import { createRoomRoutes } from "./routes/room.routes";
import { createSeatRoutes } from "./routes/seat.routes";
import { createMovieRoutes } from "./routes/movie.routes";
import { createBillboardRoutes } from "./routes/billboard.routes";
import { createCustomerRoutes } from "./routes/customer.routes";
import { createBookingRoutes } from "./routes/booking.routes";
import { createTransactionRoutes } from "./routes/transaction.routes";

export const registerRoutes = (app: Application) => {
    app.use('/api/rooms', createRoomRoutes());
    app.use('/api/seats', createSeatRoutes());
    app.use('/api/movies', createMovieRoutes());
    app.use('/api/billboards', createBillboardRoutes());
    app.use('/api/customers', createCustomerRoutes());
    app.use('/api/bookings', createBookingRoutes());
    app.use('/api/transactions', createTransactionRoutes());
};