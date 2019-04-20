import styled from 'styled-components';
import mButton from '@material-ui/core/Button';

const Button = styled(mButton)`
  && {
    background: ${props => props.theme.primary};
    color: ${props => props.theme.primaryText};
  }
`;

export default Button;
