import React from 'react';
import { Autocomplete, FormControl, FormHelperText as MuiFormHelperText, Stack, TextField, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import { colors } from 'utils/constants/colors';

export const StyledAutocomplete = styled(Autocomplete)(({ theme, hideDropDownIcon, inputBackground, disabled }) => ({
  '& .MuiInputLabel-root': {
    color: 'black !important',
    fontSize: '16px',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px'
    }
  },
  '& .MuiInputBase-root': {
    backgroundColor: inputBackground ?? 'inherit'
  },
  '& .MuiAutocomplete-clearIndicator': {
    display: 'none'
  },
  '& .MuiSvgIcon-root': {
    color: disabled ? theme.palette.grey[300] : theme.palette.primary.main,
    display: hideDropDownIcon && 'none',
    fontSize: '2rem'
  },
  '& legend > span': {
    padding: hideDropDownIcon ? 0 : '0 0.625rem'
  },
  '& .MuiButtonBase-root': {
    transform: hideDropDownIcon && 'rotate(0deg)'
  }
}));

const StyledFormHelperText = styled(MuiFormHelperText)({
  position: 'absolute',
  bottom: '-1.7em',
  left: '-1em'
});

const StyledListTag = styled('li')(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  background: theme.palette.secondary.A400,
  '&:first-of-type': {
    borderTop: `2px solid ${theme.palette.primary.main}`
  },
  '&:last-child': {
    borderBottom: `2px solid ${theme.palette.primary.main}`
  }
}));

const StyledStackContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    alignItems: 'start'
  }
}));
const StyledOptionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 1,
  [theme.breakpoints.down('md')]: {
    fontSize: '12px'
  }
}));
const StyledOptionDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 300,
  [theme.breakpoints.down('md')]: {
    fontSize: '8px'
  }
}));

const AutocompleteWithError = ({
  label,
  placeholder,
  name,
  options,
  onChange = () => {},
  onBlur,
  error,
  defaultValue,
  customRenderOption,
  hideDropDownIcon,
  showRenderTags = false,
  filterSelectedOptions = true,
  onFocus = () => {},
  filterOptions,
  disabled,
  inputBackground,
  value,
  onInputChange = () => {},
  loading = false,
  open,
  variant = 'outlined',
  onKeyDown = () => {},
  className = ''
}) => {
  const { palette } = useTheme();
  const filteredOption = defaultValue ? [defaultValue, ...options.filter((option) => option !== defaultValue)] : options;
  const renderOption = (props, option) => {
    return (
      <StyledListTag {...props}>
        {option.icon &&
          React.cloneElement(option.icon, {
            style: { marginRight: '16px', color: colors.default }
          })}
        <StyledStackContainer>
          <StyledOptionTitle>{typeof option === 'object' ? option.name || option.firstName || option.title : option}</StyledOptionTitle>
          <StyledOptionDescription>{option.description}</StyledOptionDescription>
        </StyledStackContainer>
      </StyledListTag>
    );
  };
  return (
    <FormControl fullWidth sx={{ position: 'relative', m: '8px 0 18px' }} className={className}>
      <StyledAutocomplete
        open={open}
        hideDropDownIcon={hideDropDownIcon}
        inputBackground={inputBackground}
        name={name}
        value={value}
        options={filteredOption}
        getOptionLabel={(option) => {
          return showRenderTags ? (typeof option === 'object' ? option.name || option.firstName || option.title : option) : '';
        }}
        loading={loading}
        filterSelectedOptions={filterSelectedOptions}
        onKeyDown={onKeyDown}
        onChange={(event, newValue) => onChange(event, newValue)}
        renderOption={customRenderOption || renderOption}
        defaultValue={defaultValue}
        onFocus={onFocus}
        popupIcon={hideDropDownIcon && <IconSearch color={palette.primary.main} />}
        onInputChange={onInputChange}
        renderInput={(params) => (
          <TextField
            error={error}
            name={name}
            onBlur={onBlur}
            focused
            label={!hideDropDownIcon && label}
            placeholder={placeholder}
            autoComplete="new-password"
            variant={variant}
            {...params}
            sx={{
              '& .MuiOutlinedInput-notchedOutline legend': {
                fontSize: '0.625rem'
              },
              '& .MuiInputLabel-root': {
                color: 'black !important',
                fontSize: '16px'
              }
            }}
          />
        )}
        filterOptions={filterOptions}
        disabled={disabled}
      />
      <StyledFormHelperText error={error}>{error && error}</StyledFormHelperText>
    </FormControl>
  );
};

AutocompleteWithError.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  defaultValue: PropTypes.string,
  customRenderOption: PropTypes.elementType,
  hideDropDownIcon: PropTypes.bool,
  onFocus: PropTypes.func,
  showRenderTags: PropTypes.bool,
  filterOptions: PropTypes.func,
  disabled: PropTypes.bool,
  inputBackground: PropTypes.string,
  filterSelectedOptions: PropTypes.bool,
  value: PropTypes.oneOfType[(PropTypes.string, PropTypes.object, PropTypes.array)],
  open: PropTypes.bool,
  onInputChange: PropTypes.func,
  loading: PropTypes.bool,
  variant: PropTypes.string,
  onKeyDown: PropTypes.func,
  className: PropTypes.string
};
export default AutocompleteWithError;
