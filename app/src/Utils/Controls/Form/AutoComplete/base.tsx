import React from "react";

export const ResultContext = React.createContext({
    args: undefined,
});

class Parameter {

    public Label?: string;

    public Value?: any;

    public Pesquisa?: Function;

    public Text?: Function | undefined;

    public Enable?: boolean;

    public OnChange?: Function;

    public children?: any;

}

export abstract class AutoCompleteBase extends React.Component<Parameter> {

    static defaultProps = {
        Enable: true,
        Value: null,
    };

    state = {
        Loading: false,
        Result: []
    }

}