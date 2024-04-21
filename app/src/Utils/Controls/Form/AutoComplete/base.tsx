import React from "react";

export const ResultContext = React.createContext({
    args: undefined,
});

class Parameter {

    public Label?: string;

    public Value?: any;

    public Pesquisa?: Function;

    public Text?: Function | undefined;

    public OnChange?: Function;

    public ReadOnly?: boolean;

    public children?: any;

}

export abstract class AutoCompleteBase extends React.Component<Parameter> {

    static defaultProps = {
        Value: null,
    };

    state = {
        Loading: false,
        Result: []
    }

}