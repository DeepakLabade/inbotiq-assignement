declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload | string | { [key: string]: any };
        }
    }
}

export {};

// interface User {
//     userId: String
// }