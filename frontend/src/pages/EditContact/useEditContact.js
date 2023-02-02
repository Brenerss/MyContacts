import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

import ContactService from '../../services/ContactService';
import toast from '../../utils/toast';

export default function useEditContact() {
  const { id } = useParams();
  const history = useHistory();
  const contactFormRef = useRef(null);

  const safeAsyncAction = useSafeAsyncAction();

  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  useEffect(() => {
    async function loadContacts() {
      try {
        const contact = await ContactService.getContactById(
          id,
        );

        safeAsyncAction(() => {
          contactFormRef.current.setFieldValues(contact);
          setContactName(contact.name);
          setIsLoading(false);
        });
      } catch {
        safeAsyncAction(() => {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          });
        });
      }
    }

    loadContacts();
  }, [id, history, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      const updatedContact = await ContactService.updateContact(
        id,
        contact,
      );

      setContactName(updatedContact.name);

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
      });
    }
  }

  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
