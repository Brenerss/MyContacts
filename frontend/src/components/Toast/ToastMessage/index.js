import { useEffect } from 'react';
import PropTypes from 'prop-types';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import * as S from './styles';

export default function ToastMessage({ message, onRemoveMessage }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 7000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <S.Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {message.type === 'success' && <img src={checkCircleIcon} alt="check" />}
      <strong>{message.text}</strong>
    </S.Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    duration: PropTypes.number,
    type: PropTypes.oneOf(['success', 'danger', 'default']),
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
};
