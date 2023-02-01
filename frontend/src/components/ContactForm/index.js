import {
  forwardRef, useEffect, useState, useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';

import isEmailValid from '../../utils/isEmailValid';

import { Form, ButtonContainer } from './styles';
import FormGroup from '../FormGroup';

import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import useErrors from '../../hooks/useErrors';
import formatPhone from '../../utils/formatPhone';
import CategoriesService from '../../services/CategoriesService';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
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
      setCategoryId(contact.category_id ?? '');
    },

    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), []);

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldMessage('name')}>
        <Input
          error={getErrorMessageByFieldMessage('name')}
          placeholder="Nome *"
          value={name}
          disabled={!!isSubmiting}
          onChange={handleChangeName}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldMessage('email')}>
        <Input
          disabled={isSubmiting}
          error={getErrorMessageByFieldMessage('email')}
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={handleChangeEmail}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          disabled={isSubmiting}
          onChange={handleformatPhone}
          maxLength="15"
        />
      </FormGroup>

      <FormGroup isLoading={categoriesIsLoading}>
        <Select
          value={categoryId}
          onChange={(event) => {
            setCategoryId(event.target.value);
          }}
          disabled={categoriesIsLoading || isSubmiting}
        >
          <option value="">Sem categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmiting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
