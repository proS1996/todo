/* eslint-disable react/prop-types */
import React from 'react';
import { Box, styled } from '@mui/material';
import { colors } from 'utils/constants/colors';

const SpecialLabel = styled(Box)(({ theme }) => ({
  background: 'transparent',
  '.red-asterisk': {
    color: theme.palette.error.main // or your desired color
  },
  gap: theme.spacing(1),
  color: 'black !important',
  span: {
    '&:first-of-type': {
      fontFamily: `'Poppins', sans-serif`
    }
  }
}));

export const LabelWithAsterisk = ({ label }) => (
  <SpecialLabel>
    <span>{label}</span>
    <span className="red-asterisk"> * </span>
  </SpecialLabel>
);

export const StyledLabelComponent = ({ label, disabled = false }) => (
  <Box sx={{ color: disabled && colors.gray[500] }}>
    {label}
    {!disabled && <span style={{ color: disabled ? colors.gray[500] : 'red' }}> *</span>}
  </Box>
);
