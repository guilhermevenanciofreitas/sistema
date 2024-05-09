import React from 'react';
import { ResultContext } from '../../Utils/Controls/Form/AutoComplete/index.base';

export class MesoRegionTemplate extends React.Component {

    render() {
        return (
            <ResultContext.Consumer>
                {({ args }: any) => (
                    <span>{args.description} - {args.state?.acronym}</span>
                )}
            </ResultContext.Consumer>
        );
    }

}