import axios, { AxiosResponse } from "axios";
import { MessageBox } from "../Utils/Controls";

export class Service {

    private static url: string = "http://localhost:4000/api/";

    static Post = async (path: string, data: any): Promise<AxiosResponse|undefined> => {

        //try {

            let config = {};

            let Session = JSON.parse(localStorage.getItem("Session") || "null");

            if (Session) {
                config = {
                    headers: {
                        'Authorization': `${Session?.id}`
                    },
                }
            }

            var r = await axios.post(this.url + path, data, config);

            if (Session) {
                Session.lastAcess = r.headers["last-acess"];
                Session.expiresIn = parseInt(r.headers["expires-in"]);
                localStorage.setItem("Session", JSON.stringify(Session));
            }
            
            return r;
            
        /*} catch (err: any) {

            if (err.code == "ERR_NETWORK") {
                throw new Error(`POST ${err.config.url} net::ERR_CONNECTION_REFUSED`);
            }

            //Session expired
            if ((err?.request?.status || false) == 401) {
                localStorage.removeItem("Session");
                window.location.replace("/login");
                return;
            }
            
            throw new Error(err);

        }
        */
    }

}