import { Service } from "../Service"

export const Search = {

    Cliente: async (Search: string) =>
    {
        return (await Service.Post("search/cliente", {Search}))?.data;
    },

    TabelaPreco: async (Search: string) =>
    {
        return (await Service.Post("search/tabelasPreco", {Search}))?.data;
    },
    
    
}