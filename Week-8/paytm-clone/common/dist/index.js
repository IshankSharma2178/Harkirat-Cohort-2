"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    userName: zod_1.z.string().optional(),
    password: zod_1.z.string().optional(),
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
});
