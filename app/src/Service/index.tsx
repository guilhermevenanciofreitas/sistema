import axios, { AxiosResponse } from "axios";

export class Service {

    private static url: string = "http://localhost:4000/api/";

    static Post = async (path: string, data: any, responseType: string = 'json'): Promise<AxiosResponse|undefined> => {

        let config = {};

        let session = JSON.parse(localStorage.getItem('Session') || 'null');

        if (session) {
            config = {
                responseType,
                headers: {
                    'Authorization': `${session?.id}`
                },
            }
        }

        var response = await axios.post(this.url + path, data, config);

        if (session) {
            session.lastAcess = response.headers['last-acess'];
            session.expiresIn = parseInt(response.headers['expires-in']);
            localStorage.setItem('Session', JSON.stringify(session));
        }
        
        return response;
        
    }

}