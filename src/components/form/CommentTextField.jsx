import { FormHelperText, TextField, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import Picker from '@emoji-mart/react';
import { Data } from 'emoji-mart';
import IconButton from 'components/@common/IconButton';
import { textMaxLength } from '@constants/globalConstant';
import useElementWidth from 'hooks/useElementWidth';

const StyledInputContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  '.MuiInputBase-root': {
    background: `${theme.palette.background.default}`
  },
  'emoji-picker': {
    position: 'absolute',
    top: ' 100%',
    left: ' 0',
    width: ' 100%'
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    '.EmojiPickerReact': {
      width: '100% !important'
    }
  }
}));

const StyledPickerContainer = styled(Stack)(({ theme, inputHeight, inputPosition }) => ({
  zIndex: 1,
  position: 'absolute',
  [inputPosition]: inputHeight || 0,
  right: 0,
  borderColor: theme.palette.primary.main
}));

const CommentTextField = ({
  label = '',
  message = '',
  placeholder = '',
  handleSendClick = () => {},
  setMessage = () => {},
  onKeyDown = () => {},
  onChange = () => {},
  isLoading,
  disable = false,
  inputPosition = 'top',
  selectedUser,
  disableSendButton = false,
  multiline = false,
  maxLength = textMaxLength.DEFAULT_COMMENT_MAX_LENGTH,
  showCharacterCount = false
}) => {
  const theme = useTheme();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const { elementHeight: inputHeight, elementRef: inputRef } = useElementWidth();

  const handleEmojiClick = () => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };

  const handleEmojiSelect = ({ native }) => {
    setMessage((prev) => prev + native);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.autoFocus = true;
    }
  }, [inputRef, selectedUser]);

  return (
    <StyledInputContainer position={'relative'} mb={2}>
      <TextField
        ref={inputRef}
        multiline={multiline}
        label={label}
        value={message}
        onFocus={() => setIsEmojiPickerOpen(false)}
        placeholder={placeholder}
        variant="outlined"
        onKeyDown={(e) => e.key === 'Enter' && onKeyDown(setIsEmojiPickerOpen)}
        onChange={onChange}
        InputProps={{
          spellCheck: true,
          endAdornment: (
            <Stack direction="row" gap={0.5} alignItems="center">
              <IconButton disable={disable} onClick={handleEmojiClick} sx={{ padding: 0 }}>
                <IconMoodHappy
                  style={{
                    cursor: 'pointer',
                    width: 20,
                    height: 20,
                    color: disable ? theme.palette.grey[550] : theme.palette.primary.mainLight
                  }}
                  stroke={1.5}
                />
              </IconButton>
              <LoadingButton
                loading={isLoading}
                sx={{
                  cursor: 'pointer',
                  background: message?.length > maxLength || disableSendButton ? theme.palette.grey[550] : theme.palette.primary.main,
                  color: theme.palette.grey[300],
                  borderRadius: 1,
                  padding: 0,
                  minWidth: 'auto',
                  '&:hover': {
                    background: message?.length > maxLength || disableSendButton ? theme.palette.grey[550] : theme.palette.primary.main,
                    color: theme.palette.grey[300]
                  }
                }}
                onClick={() => handleSendClick(setIsEmojiPickerOpen)}
                disabled={message?.length > maxLength || disableSendButton}
              >
                <IconSend2 stroke={1.5} />
              </LoadingButton>
            </Stack>
          )
        }}
        disabled={disable}
        sx={{
          '& .MuiInputBase-multiline': {
            padding: '8px 14px',
            alignItems: 'flex-start'
          }
        }}
        error={message?.length > maxLength}
      />
      {isEmojiPickerOpen && (
        <StyledPickerContainer inputHeight={inputHeight} inputPosition={inputPosition}>
          <Picker
            data={Data}
            onEmojiSelect={handleEmojiSelect}
            theme="light"
            emojiTooltip
            showSkinTones={false}
            emojiSize={19}
            emojiButtonSize={27}
          />
        </StyledPickerContainer>
      )}
      <Stack direction={'row'}>
        {message?.length > maxLength && (
          <FormHelperText error={message?.length > maxLength} sx={{ fontSize: '10px', position: 'absolute', bottom: '-1.7em' }}>
            maximum {maxLength} characters allowed.
          </FormHelperText>
        )}
        {showCharacterCount && maxLength && (
          <Typography
            variant="caption"
            color={message?.length > maxLength ? 'error' : 'textSecondary'}
            sx={{ fontSize: '10px', textAlign: 'right', position: 'absolute', bottom: '-1.7em', right: 0 }}
          >
            {`${message?.length || 0} / ${maxLength}`}
          </Typography>
        )}
      </Stack>
    </StyledInputContainer>
  );
};

export default memo(CommentTextField);

CommentTextField.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  message: PropTypes.string,
  placeholder: PropTypes.string,
  handleSendClick: PropTypes.func,
  setMessage: PropTypes.func,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
  disable: PropTypes.bool,
  inputPosition: PropTypes.string,
  selectedUser: PropTypes.object,
  disableSendButton: PropTypes.bool,
  multiline: PropTypes.bool,
  maxLength: PropTypes.number,
  showCharacterCount: PropTypes.bool
};
