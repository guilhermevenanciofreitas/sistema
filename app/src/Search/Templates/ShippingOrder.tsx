import React from 'react';
import { ResultContext } from '../../Utils/Controls/Form/AutoComplete/index.base';

export class ShippingOrderTemplate extends React.Component {

    render() {
        return <>
            <ResultContext.Consumer>
                {({ args }: any) => (
                    <span>{args.sender?.surname} / {args.sender?.cpfCnpj}</span>
                )}
            </ResultContext.Consumer>
        </>
    }

}