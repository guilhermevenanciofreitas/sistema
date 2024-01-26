import { Service } from "../Service"

export const Search = {

    TabelaPreco: async (Search: string) =>
    {
        return (await Service.Post("search/tabelasPreco", {Search}))?.data;
    },
    
}