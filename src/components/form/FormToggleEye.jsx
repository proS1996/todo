import { Tooltip, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'components/@common';

const FormToggleEye = ({ handleChange, tooltipText, disabled, name, id, checked, className = '' }) => {
  const { palette } = useTheme();
  const [toggle, setToggle] = useState(checked);
  const [showTooltipText, setShowTooltipText] = useState(false);

  useEffect(() => {
    setToggle(checked);
  }, [checked]);

  const handleToggleVisibility = (event) => {
    setToggle((prev) => !prev);
    handleChange(!toggle, event.target.name, +event.target.id);
  };
  return (
    <Tooltip title={showTooltipText ? tooltipText : ''}>
      <IconButton
        id={id}
        name={name}
        onClick={handleToggleVisibility}
        onMouseEnter={() => setShowTooltipText(true)}
        onMouseLeave={() => setShowTooltipText(false)}
        disabled={disabled}
        className={className}
      >
        {toggle ? <IconEye color={palette.primary.main} stroke={2} /> : <IconEyeOff color={palette.primary.main} stroke={2} />}
      </IconButton>
    </Tooltip>
  );
};

FormToggleEye.propTypes = {
  handleChange: PropTypes.func,
  tooltipText: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  checked: PropTypes.bool,
  id: PropTypes.oneOf[(PropTypes.number, PropTypes.string)],
  className: PropTypes.string
};

export default FormToggleEye;
