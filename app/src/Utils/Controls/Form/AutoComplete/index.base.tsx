import React from "react";

import { ViewProduct } from "../../../../views/registrations/products/View";

export const ResultContext = React.createContext({
    args: undefined,
});

export class AutoCompleteBase extends React.Component<Readonly<{Label?: string, Value?: any, Pesquisa?: Function, Text?: Function, OnChange?: Function, ReadOnly?: boolean, Add?: any, children?: any}>> {

    protected ViewProduct = React.createRef<ViewProduct>();
    
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