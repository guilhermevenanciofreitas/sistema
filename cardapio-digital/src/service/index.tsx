import axios, { AxiosResponse } from "axios";

export class Service {

    private static url: string = "http://localhost:4000/api/";
    //private static url: string = "http://10.0.0.130:4000/api/";

    static Post = async (path: string, data: any): Promise<AxiosResponse|undefined> => {

        let config = {
            headers: {
                'Authorization': `${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJlMGNjNmQ3LTI1NzEtNGFjNy1iMzU0LWZlZGU2NzJmYTU2OCJ9.PtjjIR8G2zTQC5acLnxBIz38HP_KfJk7ic1qYnzfods"}`
            },
        }

        var r = await axios.post(this.url + path, data, config);

        return r;
            
    }

}