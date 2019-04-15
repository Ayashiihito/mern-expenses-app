import styled from 'styled-components';
import mButton from '@material-ui/core/Button';

const Button = styled(mButton)`
  && {
    color: #f3f3f3;
    background-color: ${props => props.theme.primary};
  }
`;

export default Button;
