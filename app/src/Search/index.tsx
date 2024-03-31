import { Service } from "../Service"

export const Search = {

    Cliente: async (Search: string) =>
    {
        return (await Service.Post("search/cliente", {Search}))?.data;
    },

    Funcionario: async (Search: string) =>
    {
        return (await Service.Post("search/funcionario", {Search}))?.data;
    },

    TabelaPreco: async (Search: string) =>
    {
        return (await Service.Post("search/tabelasPreco", {Search}))?.data;
    },

    Produto: async (Search: string) =>
    {
        return (await Service.Post("search/produto", {Search}))?.data;
    },

    Municipio: async (Search: string, estadoId: string) =>
    {
        return (await Service.Post("search/municipio", {Search, estadoId}))?.data;
    },
    
    FormaPagamento: async (Search: string) =>
    {
        return (await Service.Post("search/formaPagamento", {Search}))?.data;
    },

    TipoEntrega: async (Search: string) =>
    {
        return (await Service.Post("search/tipoEntrega", {Search}))?.data;
    },

    ProdutoCategoria: async (Search: string) =>
    {
        return (await Service.Post("search/produtoCategoria", {Search}))?.data;
    },

    ProdutoCombinacaoGrupo: async (Search: string) =>
    {
        return (await Service.Post("search/produtoCombinacaoGrupo", {Search}))?.data;
    },
    
}