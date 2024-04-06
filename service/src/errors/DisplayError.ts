export class DisplayError extends Error {

    public status: number;

    constructor(msg: string, status: number) {
        super(msg);
        this.status = status;
    }

}