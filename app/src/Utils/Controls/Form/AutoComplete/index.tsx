import React from "react";
import { Autocomplete, Box, CircularProgress, FormGroup, IconButton, TextField, autocompleteClasses } from "@mui/material";
import Search from '@mui/icons-material/Search';
import { AutoCompleteBase, ResultContext } from "./base";

export class ControlAutoComplete extends AutoCompleteBase {

  private AutoComplete = React.createRef<HTMLDivElement>();
  private TextBox = React.createRef<HTMLInputElement>();

  private Search = (Text: string) =>
  {

    this.setState({Loading: true});

    const Result = this.props.Pesquisa?.call(null, Text);

    this.setState(({Loading: false, Result: Result}));

  }

  public Focus = (): void =>
  {
    this.TextBox.current?.focus();
  }

  render(): React.ReactNode {
    return (
        <Autocomplete

          ref={this.AutoComplete}

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

          isOptionEqualToValue={(option, value) => option['sigla'] === value['sigla']}
          getOptionLabel={(option) => this.props.Text?.call(null, option)}
          
          options={this.state.Result}

          openText={"Pesquisar"}
          clearText={'Limpar'}
      
          popupIcon={<Search />}
          sx={{
            [`& .${autocompleteClasses.popupIndicator}`]: {
              marginLeft: '5px',
              transform: "none"
            }
          }}

          readOnly={!this.props.Enable}

          renderInput={(params) => (
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
                    {this.state.Loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </div>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <ResultContext.Provider value={{ args: option }}>
                {this.props.children}
              </ResultContext.Provider>
            </Box>
          )}
        />
    )
  }

}