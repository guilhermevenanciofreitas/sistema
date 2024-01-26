import React from "react";
import { Autocomplete, Box, CircularProgress, FormLabel, IconButton, TextField, autocompleteClasses } from "@mui/joy";
import Search from '@mui/icons-material/Search';
import { AutoCompleteBase, ResultContext } from "./base";

export class ControlAutoComplete extends AutoCompleteBase {

  private Search = async (Text: string) =>
  {

    this.setState({Loading: true, Result: [{label: 'Carregando'}]});

    const Result = await this.props.Pesquisa?.call(null, Text);

    this.setState(({Loading: false, Result: Result}));

  }

  render(): React.ReactNode {
    return (
      <>
        <FormLabel>{this.props.Label}</FormLabel>
        <Autocomplete

          //ref={this.AutoComplete}

          onOpen={() => {
            this.Search('');
          }}

          value={this.props.Value}
          onChange={(event: any, newValue: string | null) => {
            //this.setState({Value: newValue});
            this.props.OnChange?.call(null, newValue);
          }}

          inputValue={this.state.Text}
          onInputChange={(event: any, newInputValue: string | null) => {
            this.setState({Text: newInputValue});
            this.Search(newInputValue || "");
          }}

          noOptionsText={'Nenhum resultado encontrado!'}

          autoHighlight={true}
          selectOnFocus={true}

          //isOptionEqualToValue={(option, value) => option['sigla'] === value['sigla']}
          getOptionLabel={(option) => this.props.Text?.call(null, option)}
          
          options={this.state.Result}

          openText={"Pesquisar"}
          clearText={'Limpar'}
      
          //popupIcon={<Search />}

          endDecorator={<Search />}

          sx={{
            [`& .${autocompleteClasses.popupIndicator}`]: {
              marginLeft: '5px',
              transform: "none"
            }
          }}

          slotProps={{listbox: {sx: {zIndex: 10000}}}}

          readOnly={!this.props.Enable}


          

          /*renderInput={(params: any) => (
            <TextField
              {...params}
              inputRef={this.TextBox}
              InputLabelProps={{ shrink: true }}
              label={this.props.Label}
              variant="filled"
              autoComplete='off'
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <div style={{marginTop: '-12px', marginRight: '5px'}}>
                    {this.state.Loading ? <CircularProgress color="primary" size="lg" /> : null}
                    {params.InputProps.endAdornment}
                  </div>
                ),
              }}
            />
          )}*/
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <ResultContext.Provider value={{ args: option }}>
                {this.props.children}
              </ResultContext.Provider>
            </Box>
          )}
        />
      </>
    )
  }

}