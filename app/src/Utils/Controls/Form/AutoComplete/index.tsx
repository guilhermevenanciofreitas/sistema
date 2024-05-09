import React from "react";
import { Autocomplete, AutocompleteOption, CircularProgress, FormLabel, IconButton } from "@mui/joy";
import { AutoCompleteBase, ResultContext } from "./index.base";
import { Search, AddCircleRounded } from '@mui/icons-material';
import { ViewProduct } from "../../../../views/registrations/products/View";
import { ViewServico } from "../../../../views/registrations/services/View";

export class ControlAutoComplete extends AutoCompleteBase {

  render(): React.ReactNode {
    return (
      <>

        {React.createElement(ViewProduct, {ref: this.ViewProduct })}

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

          startDecorator={<IconButton onClick={() => null}><AddCircleRounded style={{color: '#93bf85'}} /></IconButton>}

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