import styled from 'styled-components';
import mButton from '@material-ui/core/Button';

const Button = styled(mButton)`
  && {
    color: #989898;
    background-color: ${props => props.theme.primary};
  }
`;

export default Button;
