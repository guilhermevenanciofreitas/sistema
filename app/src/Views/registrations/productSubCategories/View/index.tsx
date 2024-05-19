
import { ViewProductSubCategoryBase } from './index.base';
import { Button, ViewModal, TextBox, Content, Actions, AutoComplete } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { color } from '../../../../Utils/color';
import { TaskAltOutlined } from '@mui/icons-material';
import { Grid } from '@mui/joy';
import { ProductCategoryTemplate } from '../../../../Search/Templates/ProductCategory';
import _ from 'lodash';
import { Search } from '../../../../Search';

export class ViewProductSubCategory extends ViewProductSubCategoryBase {

    public render(): ReactNode {

        return (
            <ViewModal ref={this.ViewModal} Title={this.props.Title} Width={450}>
                <Content>
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={12}>
                            <AutoComplete Label='Categoria' Action={{Type: 'ProductCategory', New: {Values: {}}, Edit: {Id: _.get(this.state.category, 'id')}}} Pesquisa={async (Text: string) => await Search.ProductCategory(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.category} OnChange={(category: any) => this.setState({category})}>
                                <ProductCategoryTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={12}>
                            <TextBox Label='Descrição' TextTransform='UpperCase' Text={this.state.name} OnChange={(args: EventArgs) => this.setState({name: args.Value})} />
                        </Grid>
                    </Grid>
                </Content>
                <Actions>
                    <Button Text='Salvar' StartIcon={<TaskAltOutlined />} Color='white' BackgroundColor={color.success} OnClick={this.BtnSalvar_Click} />
                </Actions>
            </ViewModal>
        );

    }

}