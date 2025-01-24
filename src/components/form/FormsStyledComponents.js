import { LoadingButton } from '@mui/lab';
import { Grid, Stack, styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const ModalContent = styled(Grid)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(7.5, 0),
  alignContent: 'center',
  background: theme.palette.background.default,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 0)
  }
}));

export const LogoContainer = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    '& img': {
      height: '45px',
      width: '168.362px'
    }
  }
}));
export const SecondImageContainer = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('msm')]: {
    '& img': {
      height: '200px',
      width: '200px'
    }
  }
}));

export const ImageContainer = styled(Grid)(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(3.5)
  }
}));
export const FormContainer = styled(Grid)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  background: theme.palette.background.default,
  padding: '40px',
  [theme.breakpoints.down('md')]: {
    padding: '20px'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px'
  }
}));
export const FormBg = styled(Grid)(({ theme }) => ({
  borderRadius: '15px',
  padding: theme.spacing(8, 6),
  justifyContent: 'center',
  alignItems: 'center',
  background: theme.palette.secondary.A400,
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(6)
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(0),
    padding: theme.spacing(2.2)
  }
}));

export const FormContent = styled(Grid)(({ theme }) => ({
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main
  }
}));

export const SubmitButton = styled(LoadingButton)(({ theme }) => ({
  borderRadius: '8px',
  background: theme.palette.primary.main,
  color: 'white',
  width: '50%',
  height: '32px',
  textAlign: 'center',
  textLeadingTrim: 'both',
  textEdge: 'cap',
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 400,
  textTransform: 'capitalize',
  border: '1px solid #0A0A1F',
  '&:hover': {
    border: '1px solid black',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.grey[300]
  },
  [theme.breakpoints.down('msm')]: {
    fontSize: '12px'
  }
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary[600],
  cursor: 'pointer',
  fontSize: '14px',
  [theme.breakpoints.down('msm')]: {
    fontSize: '10px'
  }
}));
