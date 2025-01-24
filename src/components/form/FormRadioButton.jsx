import React from 'react';
import Radio from '@mui/material/Radio';
import PropTypes from 'prop-types';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, Typography, styled } from '@mui/material';

const StyledRadioGroup = styled(RadioGroup)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5)
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  alignItems: 'flex-start',
  '& .MuiRadio-root': {
    color: theme.palette.primary.lighter,
    padding: theme.spacing(0.5, 1.1)
  }
}));

const RadioButton = ({ option, isSelected, radioValue }) => {
  return (
    <StyledFormControlLabel
      key={option.value + option.label}
      value={typeof option.value === 'string' ? option.value : JSON.stringify(option.value)}
      control={<Radio checked={isSelected && JSON.stringify(option.value) === radioValue} />}
      label={
        <Box>
          <Typography>{option.label}</Typography>
          {option.description && <Typography style={{ fontSize: '0.8em', color: 'gray' }}>{option.description}</Typography>}
        </Box>
      }
    />
  );
};

RadioButton.propTypes = {
  option: PropTypes.object,
  isSelected: PropTypes.bool,
  radioValue: PropTypes.string
};

const FormRadioButton = ({ title, options, value, handleChange, isSelected }) => {
  return (
    <FormControl>
      {title && <FormLabel id="demo-controlled-radio-buttons-group">{title}</FormLabel>}
      <StyledRadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value || ''}
        onChange={handleChange}
      >
        {options.map((option) => (
          <RadioButton key={option.id} option={option} isSelected={isSelected} radioValue={value} />
        ))}
      </StyledRadioGroup>
    </FormControl>
  );
};

FormRadioButton.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string,
  handleChange: PropTypes.func,
  isSelected: PropTypes.bool,
  selectedRadio: PropTypes.number
};
export default FormRadioButton;
