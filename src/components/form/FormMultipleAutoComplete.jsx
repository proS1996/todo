import React, { memo, useCallback, useMemo } from 'react';
import {
  Autocomplete,
  Chip,
  FormControl,
  FormHelperText as MuiFormHelperText,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: 'black',
    fontSize: '16px',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px'
    }
  },
  '& .MuiAutocomplete-clearIndicator': {
    display: 'none'
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
    fontSize: '2rem'
  },
  '& legend > span': {
    padding: '0 0.625rem'
  }
}));

const StyledFormHelperText = styled(MuiFormHelperText)({
  position: 'absolute',
  bottom: '-1.7em',
  left: '-1em'
});

const StyledListTag = styled('li')(({ theme }) => ({
  background: theme.palette.secondary.A400,
  borderBottom: `1px solid ${theme.palette.primary.light}`,
  borderRight: `1px solid ${theme.palette.primary.light}`,
  borderLeft: `1px solid ${theme.palette.primary.light}`,
  '&:first-of-type': {
    borderTop: `1px solid ${theme.palette.primary.light}`
  },
  '&:last-child': {
    borderBottom: `1px solid ${theme.palette.primary.light}`
  }
}));

const StyledStackContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  [theme.breakpoints.down('lmmd')]: {
    alignItems: 'start'
  }
}));
const StyledOptionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 1,
  [theme.breakpoints.down('lmmd')]: {
    fontSize: '12px'
  }
}));
const StyledOptionDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 300,
  [theme.breakpoints.down('lmmd')]: {
    fontSize: '8px'
  }
}));
const chipStyles = {
  fontSize: '0.8rem',
  m: '0.2rem',
  borderRadius: '6px',
  maxLines: 1,
  bgcolor: 'secondary.cardBackground',
  fontWeight: 500,
  color: 'primary.main',
  height: 'auto',
  p: '3px 5px',
  width: 'max-content'
};

const textFieldStyles = {
  '& .MuiOutlinedInput-notchedOutline legend': {
    fontSize: '0.65rem'
  },
  '& .MuiInputLabel-root': {
    color: 'black !important',
    fontSize: '16px'
  }
};

const MultipleAutocompleteWithError = ({
  label,
  placeholder,
  name,
  options,
  onChange,
  onBlur,
  error,
  onFocus,
  freeSolo,
  disabled,
  customFilteredOption,
  listComponent,
  onInputChange,
  showDescription = true,
  value = []
}) => {
  const filterOption = useMemo(
    () =>
      value
        ? [
            ...value,
            ...options.filter(
              (option) => !value.map((val) => val.uuid || val.title || val?.role)?.includes(option?.uuid || option.title || option.role)
            )
          ]
        : options,
    [value, options]
  );
  const { palette } = useTheme();

  const renderOption = useCallback(
    (props, option) => (
      <StyledListTag {...props}>
        <StyledStackContainer>
          <StyledOptionTitle>
            {option.addOption || option.title || option.role || `${option.firstName} ${option.lastName}` || option}
          </StyledOptionTitle>
          {showDescription && <StyledOptionDescription>{option.description}</StyledOptionDescription>}
        </StyledStackContainer>
      </StyledListTag>
    ),
    [showDescription]
  );

  const renderTags = useCallback(
    (val, getTagProps) =>
      val.map((option, index) => (
        <Chip
          sx={chipStyles}
          key={option?.id}
          label={option.title || option.firstName || option.role || option}
          color="secondary"
          deleteIcon={<IconSquareRoundedX color={palette.primary.main} size={18} />}
          {...getTagProps({ index })}
        />
      )),
    [palette]
  );

  return (
    <FormControl fullWidth sx={{ position: 'relative', m: '8px 0 18px' }}>
      <StyledAutocomplete
        multiple
        freeSolo={freeSolo}
        options={filterOption}
        value={value}
        getOptionLabel={(option) =>
          option.addOption || option?.title || option?.firstName + ' ' + option?.lastName || option?.role || option
        }
        onChange={onChange}
        onInputChange={onInputChange}
        ListboxComponent={listComponent}
        renderInput={(params) => (
          <TextField
            error={error}
            name={name}
            onBlur={onBlur}
            focused
            {...params}
            label={label}
            placeholder={placeholder}
            sx={textFieldStyles}
          />
        )}
        onFocus={onFocus}
        name={name}
        filterSelectedOptions
        filterOptions={customFilteredOption}
        renderOption={renderOption}
        renderTags={renderTags}
        disabled={disabled}
      />
      <StyledFormHelperText error={error}>{error && error}</StyledFormHelperText>
    </FormControl>
  );
};

MultipleAutocompleteWithError.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onFocus: PropTypes.func,
  freeSolo: PropTypes.bool,
  disabled: PropTypes.bool,
  customFilteredOption: PropTypes.func,
  listComponent: PropTypes.func,
  onInputChange: PropTypes.func,
  showDescription: PropTypes.bool,
  value: PropTypes.array
};
export default memo(MultipleAutocompleteWithError);
