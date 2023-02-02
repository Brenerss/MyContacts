import {
  useEffect, useState, useImperativeHandle,
} from 'react';

import isEmailValid from '../../utils/isEmailValid';

import useErrors from '../../hooks/useErrors';
import formatPhone from '../../utils/formatPhone';
import CategoriesService from '../../services/CategoriesService';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

export default function useContactForm(onSubmit, ref) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [categoriesIsLoading, setCategoriesIsLoading] = useSafeAsyncState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const {
    errors, setError, removeError, getErrorMessageByFieldMessage,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  function handleChangeName(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome eh obrigatorio' });
    } else {
      removeError('name');
    }
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail invalido' });
    } else {
      removeError('email');
    }
  }

  function handleformatPhone(event) {
    setPhone(formatPhone(event.target.value));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmiting(true);

    const contact = {
      name, email, phone, categoryId,
    };

    await onSubmit(contact);

    setIsSubmiting(false);
  }

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();

        setCategories(categoriesList);
      } catch {} finally {
        setCategoriesIsLoading(false);
      }
    }

    loadCategories();
  }, [setCategories, setCategoriesIsLoading]);

  useImperativeHandle(ref, () => ({
    setFieldValues: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone) ?? '');
      setCategoryId(contact.category.id ?? '');
    },

    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), []);

  return {
    handleSubmit,
    getErrorMessageByFieldMessage,
    name,
    isSubmiting,
    handleChangeName,
    email,
    handleChangeEmail,
    phone,
    handleformatPhone,
    categoriesIsLoading,
    categoryId,
    setCategoryId,
    categories,
    isFormValid,
  };
}
