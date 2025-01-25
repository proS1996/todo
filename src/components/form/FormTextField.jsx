import {
  FormHelperText,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useState, cloneElement, memo } from "react";
import PropTypes from "prop-types";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const FormTextField = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  errorMsg,
  helperText,
  label,
  isFullWidth = true,
  onBlur,
  startIcon,
  endIcon,
  defaultValue,
  type = "text",
  focused = true,
  disabled = false,
  variant = "outlined",
  onKeyDown = () => {},
  autoFocus = false,
  multiline = false,
  inputSx,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  inputRef,
  inputProps,
  readOnly,
  maxLength,
  showCharacterCount = false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const customInputProps = {
    ...inputProps,
    ...(type === "number" && {
      inputMode: "numeric",
      pattern: "[0-9]*",
      sx: {
        "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
          WebkitAppearance: "none",
          margin: 0
        },
        "&[type=number]": {
          MozAppearance: "textfield"
        }
      }
    })
  };
  // custom handleChange for the type number so filter out negative values
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    if (type === "number" && Number(inputValue) < 0 && inputValue !== "") {
      return;
    }
    onChange(e);
  };

  return (
    <Grid item xs={12} sx={{ position: "relative", my: "0.3rem" }} spacing={2}>
      <Stack spacing={1}>
        <TextField
          ref={inputRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          variant={variant}
          id={id}
          type={showPassword ? "text" : type}
          label={label}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          fullWidth={isFullWidth}
          value={value}
          onChange={handleChange}
          error={!!errorMsg}
          helperText={helperText}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          focused={focused}
          autoFocus={autoFocus}
          inputProps={customInputProps}
          InputProps={{
            spellCheck: true,
            readOnly: readOnly,
            startAdornment: !disabled && startIcon && (
              <InputAdornment position="start">{startIcon}</InputAdornment>
            ),
            endAdornment: !disabled && endIcon && (
              <InputAdornment position="end">
                {type === "password"
                  ? cloneElement(
                      endIcon,
                      { onClick: () => setShowPassword(!showPassword) },
                      name.toLowerCase().includes("password") ? (
                        showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )
                      ) : (
                        endIcon
                      )
                    )
                  : endIcon}
              </InputAdornment>
            ),
            disabled
          }}
          disabled={disabled}
          sx={() => ({
            ...inputSx,
            "& .MuiOutlinedInput-notchedOutline legend": {
              fontSize: "0.75rem"
            },
            "& .MuiInputLabel-root": {
              color: "black !important",
              fontSize: "16px"
            },
            "& .Mui-disabled, & .MuiInputBase-readOnly": {
              // Apply disabled styling for readOnly
              backgroundColor: "#f0f0f0",
              color: "rgba(0, 0, 0, 0.6)",
              cursor: "not-allowed"
            }
          })}
          multiline={multiline}
        />
        {showCharacterCount && maxLength && (
          <Typography
            variant="caption"
            color={value?.length >= maxLength ? "error" : "textSecondary"}
            sx={{
              textAlign: "right",
              position: "absolute",
              bottom: "-1.7em",
              right: 0
            }}
          >
            {`${value?.length || 0} / ${maxLength}`}
          </Typography>
        )}
        <FormHelperText
          error={!!errorMsg}
          sx={{ position: "absolute", bottom: "-1.7em" }}
        >
          {errorMsg}
        </FormHelperText>
      </Stack>
    </Grid>
  );
};

export default memo(FormTextField);

FormTextField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  placeholder: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  errorMsg: PropTypes.string,
  isFullWidth: PropTypes.bool,
  helperText: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  type: PropTypes.string,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  onKeyDown: PropTypes.func,
  autoFocus: PropTypes.bool,
  multiline: PropTypes.bool,
  inputSx: PropTypes.object,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  inputRef: PropTypes.any,
  inputProps: PropTypes.object,
  readOnly: PropTypes.bool,
  maxLength: PropTypes.number,
  showCharacterCount: PropTypes.bool
};
