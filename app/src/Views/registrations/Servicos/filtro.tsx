import { ReactNode } from 'react';
import { Filter, TextBox, ViewFilter } from '../../../Utils/Controls';
import { EventArgs } from '../../../Utils/EventArgs';

export class ViewFiltro extends ViewFilter {

    state = {
        open: false,

        filter: {
            descricao: "",
        }
    }
    
    public Close = () => this.setState({open: false});

    public Clear = () => undefined;

    public Confirm = () => this.state.filter;
   
    public render(): ReactNode {

        return (
            <Filter Open={this.state.open} Title="Filtro" Close={this.Close} Clear={this.Clear} Confirm={this.Confirm}>
                <TextBox Label='Descrição' TextTransform='UpperCase' Text={this.state.filter.descricao} OnChange={(args: EventArgs) => this.setState({filter: {...this.state.filter, descricao: args.Value}})} />
            </Filter>
        );

    }

}