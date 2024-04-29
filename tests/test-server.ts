import { dbConnection, startDbConnection } from "../src/database/typeorm.connection";
import Server from "../src/server";

export const server = new Server({
    async startDbConnection() {
        return startDbConnection(dbConnection)
    }
});