"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDb_1 = require("./configs/connectDb");
const mongoose_1 = __importDefault(require("mongoose"));
const root_route_1 = __importDefault(require("./route/root_route"));
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, connectDb_1.connectDB)();
const port = process.env.PORT || 4000;
// CORS Configuration
const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:5173"];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
app.options("*", (0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use('/api/v1', root_route_1.default);
mongoose_1.default.connection.on('connected', () => {
    app.listen(port, () => console.log(`Server connected on ${port}`));
    console.log('DB Connected');
});
