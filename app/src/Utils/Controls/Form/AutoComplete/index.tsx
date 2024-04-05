import React from "react";
import { Autocomplete, AutocompleteOption, CircularProgress, FormLabel, autocompleteClasses } from "@mui/joy";
import Search from '@mui/icons-material/Search';
import { AutoCompleteBase, ResultContext } from "./base";

export class ControlAutoComplete extends AutoCompleteBase {

  private Search = async (Text: string) =>
  {
    this.setState({Loading: true});
    let Result = await this.props.Pesquisa?.call(null, Text);
    this.setState(({Loading: false, Result: Result}));
  }

  render(): React.ReactNode {
    return (
      <>
        <FormLabel>{this.props.Label}</FormLabel>
        <Autocomplete
 
          loading={this.state.Loading}

          placeholder="[Selecione]"

          onOpen={async () => {
            await this.Search('');
          }}

          popupIcon={<Search />}

          sx={{
            [`& .css-1o5f876-JoyAutocomplete-popupIndicator.MuiAutocomplete-popupIndicatorOpen`]: {
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
          
          endDecorator={this.state.Loading ? (<CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />) : null}

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