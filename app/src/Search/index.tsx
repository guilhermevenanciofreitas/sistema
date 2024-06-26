import { Service } from "../Service"

export const Search = {

    Company: async (Search: string) =>
    {
        return (await Service.Post("search/company", {Search}))?.data;
    },
    
    Partner: async (Search: string) =>
    {
        return (await Service.Post("search/partner", {Search}))?.data;
    },
    
    Customer: async (Search: string) =>
    {
        return (await Service.Post("search/customer", {Search}))?.data;
    },

    Employee: async (Search: string) =>
    {
        return (await Service.Post("search/employee", {Search}))?.data;
    },

    Supplier: async (Search: string) =>
    {
        return (await Service.Post("search/supplier", {Search}))?.data;
    },

    ShippingCompany: async (Search: string) =>
    {
        return (await Service.Post("search/shipping-company", {Search}))?.data;
    },

    TabelaPreco: async (Search: string) =>
    {
        return (await Service.Post("search/tabelasPreco", {Search}))?.data;
    },

    Product: async (Search: string) =>
    {
        return (await Service.Post("search/product", {Search}))?.data;
    },

    City: async (Search: string, stateId: string) =>
    {
        return (await Service.Post("search/city", {Search, stateId}))?.data;
    },

    State: async (Search: string) =>
    {
        return (await Service.Post("search/state", {Search}))?.data;
    },

    Bank: async (Search: string) =>
    {
        return (await Service.Post("search/bank", {Search}))?.data;
    },

    BankAccount: async (Search: string) =>
    {
        return (await Service.Post("search/bank-account", {Search}))?.data;
    },
    
    PaymentForm: async (Search: string) =>
    {
        return (await Service.Post("search/payment-form", {Search}))?.data;
    },

    ReceivieForm: async (Search: string) =>
    {
        return (await Service.Post("search/receivie-form", {Search}))?.data;
    },

    SaleOrderShippingType: async (Search: string) =>
    {
        return (await Service.Post("search/sale-order-shipping-type", {Search}))?.data;
    },

    ProductCategory: async (Search: string) =>
    {
        return (await Service.Post("search/product-category", {Search}))?.data;
    },

    ProductSubCategory: async (Search: string, categoryId: string) =>
    {
        return (await Service.Post("search/product-subcategory", {Search, categoryId}))?.data;
    },

    Combination: async (Search: string) =>
    {
        return (await Service.Post("search/combination", {Search}))?.data;
    },

    CalledOccurrence: async (Search: string) =>
    {
        return (await Service.Post("search/called-occurrence", {Search}))?.data;
    },

    FreightCalculationType: async (Search: string) =>
    {
        return (await Service.Post("search/freight-calculation-type", {Search}))?.data;
    },

    MesoRegion: async (Search: string) =>
    {
        return (await Service.Post("search/meso-region", {Search}))?.data;
    },

    Vehicle: async (Search: string) =>
    {
        return (await Service.Post("search/vehicle", {Search}))?.data;
    },

    StockLocation: async (Search: string) =>
    {
        return (await Service.Post("search/stock-location", {Search}))?.data;
    },

    Nfe: async (Search: string) =>
    {
        return (await Service.Post("search/nfe", {Search}))?.data;
    },

    EconomicActivity: async (Search: string) =>
    {
        return (await Service.Post("search/economic-activity", {Search}))?.data;
    },

    LegalNature: async (Search: string) =>
    {
        return (await Service.Post("search/legal-nature", {Search}))?.data;
    },
    
    MeasurementUnit: async (Search: string) =>
    {
        return (await Service.Post("search/measurement-unit", {Search}))?.data;
    },

    ShippingOrder: async (Search: string) =>
    {
        return (await Service.Post("search/shipping-order", {Search}))?.data;
    },
    
}