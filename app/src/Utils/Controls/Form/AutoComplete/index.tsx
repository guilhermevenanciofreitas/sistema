import React from "react";
import { Autocomplete, AutocompleteOption, CircularProgress, FormLabel, IconButton } from "@mui/joy";
import { AutoCompleteBase, ResultContext } from "./index.base";
import { Search, AddCircleRounded } from '@mui/icons-material';
import { ViewProduct } from "../../../../views/registrations/products/View";
import { ViewServico } from "../../../../views/registrations/services/View";
import { ViewNotaFiscal } from "../../../../views/fiscal/nfes/View";
import { ViewPartner } from "../../../../views/registrations/partners/View";

export class ControlAutoComplete extends AutoCompleteBase {

  render(): React.ReactNode {
    return (
      <>

        {this.props.New?.Type == 'Product' && <ViewProduct ref={this.ViewProduct} Title='Produto' />}

        {this.props.New?.Type == 'Nfe' && <ViewNotaFiscal ref={this.ViewNotaFiscal} Title='Nota Fiscal' />}

        {this.props.New?.Type == 'Customer' && <ViewPartner ref={this.ViewCustomer} Type='customer' Title='Cliente' />}
        {this.props.New?.Type == 'Supplier' && <ViewPartner ref={this.ViewSupplier} Type='supplier' Title='Fornecedor' />}
        

        <FormLabel sx={{fontWeight: 400}}>{this.props.Label}</FormLabel>
        <Autocomplete

          disabled={this.props.ReadOnly}

          isOptionEqualToValue={(option, value) => option.id === value.id}

          size='sm'

          loading={this.state.Loading}

          placeholder="[Selecione]"

          onOpen={async () => {
            await this.Search('');
          }}

          startDecorator={!this.props.Value && <IconButton onClick={async() => {

            switch (this.props.New?.Type || '')
            {
              case 'Product':
                const product = await this.ViewProduct.current?.New(this.props.New?.Values);
                if (product) {
                  this.props.OnChange?.call(null, product);
                }
                break;
              case 'Nfe':
                  const nfe = await this.ViewNotaFiscal.current?.New(this.props.New?.Values);
                  if (nfe) {
                    this.props.OnChange?.call(null, nfe);
                  }
                  break;
              case 'Supplier':
                const supplier = await this.ViewSupplier.current?.New(this.props.New?.Values);
                if (supplier) {
                  this.props.OnChange?.call(null, supplier);
                }
                break;
            }

          }}><AddCircleRounded style={{color: '#93bf85'}} />
          </IconButton>}

          popupIcon={<Search />}

          sx={{
            [`& .css-sxbho7-JoyAutocomplete-popupIndicator.MuiAutocomplete-popupIndicatorOpen`]: {
              transform: "none"
            }
          }}

          value={this.props.Value}
          onChange={(args, option) => this.props.OnChange?.call(null, option)}

          onInputChange={async (event: any, newInputValue: string | null) => {
            if (event?.type != 'change') return; 
            await this.Search(newInputValue || "");
          }}

          loadingText={'Carregando'}
          options={this.state.Result}
          noOptionsText={'Nenhum resultado encontrado!'}
          getOptionLabel={(option) => this.props.Text?.call(null, option)}
          
          endDecorator={this.state.Loading && !this.props.ReadOnly ? (<CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />) : null}

          slotProps={{listbox: {sx: {zIndex: 10000}}, clearIndicator: {sx: {visibility: 'visible'}}}}
          renderOption={(props, option) => (
            <AutocompleteOption {...props}>
              <ResultContext.Provider value={{ args: option }}>
                {this.props.children}
              </ResultContext.Provider>
            </AutocompleteOption>
          )}

        />
      </>
    );
  }

}