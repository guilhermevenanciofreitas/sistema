import React, { ComponentClass } from "react";

import { ViewProduct } from "../../../../views/registrations/products/View";
import { ViewProductCategory } from "../../../../views/registrations/productCategories/View";
import { ViewNotaFiscal } from "../../../../views/fiscal/nfes/View";
import { ViewPartner } from "../../../../views/registrations/partners/View";
import { ViewVehicle } from "../../../../views/registrations/vehicles/View";
import { ViewLocation } from "../../../../views/stock/locations/View";
import { ViewBankAccount } from "../../../../views/financial/bankAccounts/View";
import { ViewCombination } from "../../../../views/registrations/combinations/View";
import { ViewProductSubCategory } from "../../../../views/registrations/productSubCategories/View";
import { ViewShippingOrder } from "../../../../views/logistics/shippingOrders/View";

export const ResultContext = React.createContext({
    args: undefined,
});

class New {
    public Values?: any;
}

class Edit {
    public Id?: string;
}

class Action {
    public Type?: string = '';
    public New?: New;
    public Edit?: Edit;

}

export class AutoCompleteBase extends React.Component<Readonly<{Action?: Action, Label?: string, Value?: any, Pesquisa?: Function, Text?: Function, OnChange?: Function, ReadOnly?: boolean, children?: any}>> {

    protected ViewCombination = React.createRef<ViewCombination>();
    protected ViewProduct = React.createRef<ViewProduct>();
    protected ViewProductCategory = React.createRef<ViewProductCategory>();
    protected ViewProductSubCategory = React.createRef<ViewProductSubCategory>();
    protected ViewStockLocation = React.createRef<ViewLocation>();
    protected ViewNotaFiscal = React.createRef<ViewNotaFiscal>();
    protected ViewCustomer = React.createRef<ViewPartner>();
    protected ViewSupplier = React.createRef<ViewPartner>();
    protected ViewEmployee = React.createRef<ViewPartner>();
    protected ViewVehicle = React.createRef<ViewVehicle>();
    protected ViewBankAccount = React.createRef<ViewBankAccount>();
    protected ViewShippingOrder = React.createRef<ViewShippingOrder>();
    
    static defaultProps = {
        Value: null,
    };

    state = {
        Loading: false,
        Result: []
    }

    protected Search = async (Text: string) =>
    {
        this.setState({Loading: true, Result: []});
        let Result = await this.props.Pesquisa?.call(null, Text);
        this.setState(({Loading: false, Result: Result}));
    }

}