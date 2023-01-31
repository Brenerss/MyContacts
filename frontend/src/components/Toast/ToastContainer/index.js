import { useCallback, useEffect, useState } from 'react';

import ToastMessage from '../ToastMessage';
import { toastEventManager } from '../../../utils/toast';
import * as S from './styles';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(), type, text, duration,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => toastEventManager.off('addtoast', handleAddToast);
  }, []);

  const handleRemoveMessage = useCallback((id) => {
    setMessages((prevState) => prevState.filter(
      (message) => message.id !== id,
    ));
  }, []);

  return (
    <S.Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          onRemoveMessage={handleRemoveMessage}
          message={message}
        />
      ))}
    </S.Container>
  );
}
