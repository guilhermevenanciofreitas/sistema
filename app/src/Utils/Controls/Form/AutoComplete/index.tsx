import React from "react";
import { Autocomplete, AutocompleteOption, CircularProgress, FormLabel, IconButton } from "@mui/joy";
import { AutoCompleteBase, ResultContext } from "./index.base";
import { Search, AddCircleRounded, EditNoteOutlined } from '@mui/icons-material';
import { ViewProduct } from "../../../../views/registrations/products/View";
import { ViewServico } from "../../../../views/registrations/services/View";
import { ViewNotaFiscal } from "../../../../views/fiscal/nfes/View";
import { ViewPartner } from "../../../../views/registrations/partners/View";
import { ViewVehicle } from "../../../../views/registrations/vehicles/View";
import { ViewProductCategory } from "../../../../views/registrations/productCategories/View";
import { ViewLocation } from "../../../../views/stock/locations/View";
import { ViewBankAccount } from "../../../../views/financial/bankAccounts/View";
import { ViewCombination } from "../../../../views/registrations/combinations/View";

export class ControlAutoComplete extends AutoCompleteBase {

  render(): React.ReactNode {
    return (
      <>

        {this.props.Action?.Type == 'Combination' && <ViewCombination ref={this.ViewCombination} Title='Combinação' />}
        {this.props.Action?.Type == 'Product' && <ViewProduct ref={this.ViewProduct} Title='Produto' />}
        {this.props.Action?.Type == 'ProductCategory' && <ViewProductCategory ref={this.ViewProductCategory} Title='Categoria' />}

        {this.props.Action?.Type == 'StockLocation' && <ViewLocation ref={this.ViewStockLocation} Title='Localização' />}

        {this.props.Action?.Type == 'Nfe' && <ViewNotaFiscal ref={this.ViewNotaFiscal} Title='Nota Fiscal' />}

        {this.props.Action?.Type == 'Customer' && <ViewPartner ref={this.ViewCustomer} Type='customer' Title='Cliente' />}
        {this.props.Action?.Type == 'Supplier' && <ViewPartner ref={this.ViewSupplier} Type='supplier' Title='Fornecedor' />}
        {this.props.Action?.Type == 'Employee' && <ViewPartner ref={this.ViewEmployee} Type='employee' Title='Funcionário' />}
        
        {this.props.Action?.Type == 'Vehicle' && <ViewVehicle ref={this.ViewVehicle} Title='Veículo' />}

        {this.props.Action?.Type == 'BankAccount' && <ViewBankAccount ref={this.ViewBankAccount} Title='Conta bancária' />}

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

          startDecorator={this.props.Action && <IconButton onClick={async() => {

            const Values = this.props.Action?.New?.Values;
            const Id = this.props.Action?.Edit?.Id;

            let value = null;

            switch (this.props.Action?.Type || '')
            {
              case 'Combination':
                value = this.props.Value ? await this.ViewCombination.current?.Edit(Id) : await this.ViewCombination.current?.New(Values);
                break;
              case 'Product':
                value = this.props.Value ? await this.ViewProduct.current?.Edit(Id) : await this.ViewProduct.current?.New(Values);
                break;
              case 'ProductCategory':
                value = this.props.Value ? await this.ViewProductCategory.current?.Edit(Id) : await this.ViewProductCategory.current?.New(Values);
                break;
              case 'StockLocation':
                value = this.props.Value ? await this.ViewStockLocation.current?.Edit(Id) : await this.ViewStockLocation.current?.New(Values);
                break;
              case 'Nfe':
                value = this.props.Value ? await this.ViewNotaFiscal.current?.Edit(Id) : await this.ViewNotaFiscal.current?.New(Values);
                break;
              case 'Customer':
                value = this.props.Value ? await this.ViewCustomer.current?.Edit(Id) : await this.ViewCustomer.current?.New(Values);
                break;
              case 'Supplier':
                value = this.props.Value ? await this.ViewSupplier.current?.Edit(Id) : await this.ViewSupplier.current?.New(Values);
                break;
              case 'Employee':
                value = this.props.Value ? await this.ViewEmployee.current?.Edit(Id) : await this.ViewEmployee.current?.New(Values);
                break;
              case 'Vehicle':
                value = this.props.Value ? await this.ViewVehicle.current?.Edit(Id) : await this.ViewVehicle.current?.New(Values);
                break;
              case 'BankAccount':
                value = this.props.Value ? await this.ViewBankAccount.current?.Edit(Id) : await this.ViewBankAccount.current?.New(Values);
                break;
            }

            if (value) {
              this.props.OnChange?.call(null, value);
            }

          }}>{this.props.Value ? <EditNoteOutlined style={{color: '#e38e00'}} /> : <AddCircleRounded style={{color: '#93bf85'}} />}
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