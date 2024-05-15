import React from 'react';
import { ResultContext } from '../../Utils/Controls/Form/AutoComplete/index.base';

export class LegalNatureTemplate extends React.Component {

    render() {
        return <>
            <ResultContext.Consumer>
                {({ args }: any) => (
                    <span>{args.code} - {args.name}</span>
                )}
            </ResultContext.Consumer>
        </>
    }

}