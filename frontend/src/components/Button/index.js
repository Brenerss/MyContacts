import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import * as S from './styles';

export default function Button({
  type, isLoading, disabled, children, danger, onClick,
}) {
  return (
    <S.StyledButton
      type={type}
      disabled={disabled || isLoading}
      danger={danger}
      onClick={onClick}
    >
      {!isLoading ? children : <Spinner size={16} />}
    </S.StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  danger: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  danger: false,
  isLoading: false,
  onClick: undefined,
};
