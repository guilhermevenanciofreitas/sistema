import React, { useState, useCallback } from 'react';

//import { TextInputProps } from 'react-native';

import './styles.css';

//interface InputProps extends TextInputProps {
//  name?: string;
//}

const SearchInput: React.FC = ({ value = '', ...rest }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!value);
  }, [value]);

  return (
    <div className='Container'>
      <div className='Icon'
        //name="search"
        //size={20}
        color={isFocused || isFilled ? '#C72828' : '#B7B7CC'}
      >
        
      </div>

      <div className='TextInput'
        placeholderTextColor="#B7B7CC"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value}
        testID="search-input"
        {...rest}
      >
        <input style={{fontSize: 26, width: '100%', height: '50px', border: 'none', backgroundColor: '#f0f0f5'}}></input>
      </div>
    </div>
  );
};

export default SearchInput;
