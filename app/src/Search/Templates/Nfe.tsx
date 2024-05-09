import React from 'react';
import { ResultContext } from '../../Utils/Controls/Form/AutoComplete/index.base';

export class NfeTemplate extends React.Component {

    render() {
        return <>
            <ResultContext.Consumer>
                {({ args }: any) => (
                    <>
                        <span>
                            <b>Número:</b> {args.NFe?.infNFe?.ide?.nNF} - <b>Série:</b> {args.NFe?.infNFe?.ide?.serie} - {args.NFe?.infNFe?.emit?.xFant}
                            <br />
                            {args.protNFe?.infProt?.chNFe}
                        </span>
                    </>
                )}
            </ResultContext.Consumer>
        </>
    }

}