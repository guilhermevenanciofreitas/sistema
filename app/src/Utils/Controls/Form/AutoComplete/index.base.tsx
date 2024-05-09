import React, { ComponentClass } from "react";

import { ViewProduct } from "../../../../views/registrations/products/View";
import { ViewNotaFiscal } from "../../../../views/fiscal/nfes/View";
import { ViewPartner } from "../../../../views/registrations/partners/View";

export const ResultContext = React.createContext({
    args: undefined,
});

class New {
    public Type: string = '';
    public Values: any;

}

export class AutoCompleteBase extends React.Component<Readonly<{New?: New, Label?: string, Value?: any, Pesquisa?: Function, Text?: Function, OnChange?: Function, ReadOnly?: boolean, children?: any}>> {

    protected ViewProduct = React.createRef<ViewProduct>();
    protected ViewNotaFiscal = React.createRef<ViewNotaFiscal>();
    protected ViewCustomer = React.createRef<ViewPartner>();
    protected ViewSupplier = React.createRef<ViewPartner>();
    
    defaultProps = {
        Value: null,
    };

    state = {
        Loading: false,
        Result: []
    }

    protected Search = async (Text: string) =>
    {
        this.setState({Loading: true});
        let Result = await this.props.Pesquisa?.call(null, Text);
        this.setState(({Loading: false, Result: Result}));
    }

}