import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import * as S from './styles';

export default function Button({
  type, isLoading, disabled, children,
}) {
  return (
    <S.StyledButton type={type} disabled={disabled || isLoading}>
      {!isLoading ? children : <Spinner size={16} />}
    </S.StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false,
};
