import { Response } from "express";
import { DisplayError } from "./DisplayError";

export class Error {

    public static Response = (res: Response, error: any) => {
        if (error instanceof DisplayError) {
            res.status(error.status).json({message: error.message});
        } else {
            res.status(500).json({message: error.message});
        }
    }

}