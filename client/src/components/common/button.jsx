import styled from 'styled-components';
import mButton from '@material-ui/core/Button';

const Button = styled(mButton)`
  && {
    color: ${props => props.theme.primaryTextColor};
    background-color: ${props => props.theme.primaryColor};
  }
`;

export default Button;
