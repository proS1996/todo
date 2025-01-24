import { Checkbox, FormControlLabel, styled } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const StyledFormControl = styled(FormControlLabel)(({ theme }) => ({
  '&.MuiFormControlLabel-root': {
    margin: 0
  },
  '& .MuiTypography-root': {
    color: '#575757',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal'
  },
  [theme.breakpoints.down('msm')]: {
    '& .MuiTypography-root': {
      fontSize: '8px'
    }
  }
}));
function FormCheckbox({ handleChange, name, label, value, disabled = false, className = '' }) {
  return (
    <StyledFormControl
      control={<Checkbox onChange={handleChange} name={name} />}
      label={label}
      checked={value}
      disabled={disabled}
      className={className}
    />
  );
}

FormCheckbox.propTypes = {
  handleChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default FormCheckbox;
