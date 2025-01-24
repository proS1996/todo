import { FormHelperText, FormControl, Box, InputAdornment } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/system';

export default function PhoneNumberInputWithCountryCode({ label, name, touched, placeholder, error, value, ...props }) {
  const theme = useTheme();

  return (
    <FormControl
      fullWidth
      sx={{
        position: 'relative',
        m: '8px 0 18px',
        '& .form-control:focus': { boxShadow: touched[name] && error && 'none !important' }
      }}
    >
      <Box position="relative" width="100%">
        <PhoneInput
          country="ch"
          specialLabel={label}
          onBlur={(event, data) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            touched[name];
            props.onBlur(event, data);
          }}
          onChange={(phone, _, __, formattedValue) => {
            props.onChange(formattedValue);
          }}
          inputStyle={{
            width: '100%',
            borderRadius: '4px',
            padding: '12.5px 56px',
            border: `1px solid ${touched[name] && error ? theme.palette.error.main : theme.palette.primary.main}`
          }}
          InputProps={{
            spellCheck: true,
            name,
            placeholder
          }}
          value={value}
        />
        <Box position="absolute" top="50%" transform="translateY(-50%)" right="10px">
          <InputAdornment position="end">
            <IconPhoneCall color={theme.palette.primary.main} />
          </InputAdornment>
        </Box>
      </Box>
      <FormHelperText error={touched[name] && error} sx={{ position: 'absolute', bottom: '-1.7em', left: '-1em' }}>
        {touched[name] && error}
      </FormHelperText>
    </FormControl>
  );
}

PhoneNumberInputWithCountryCode.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.string
};
