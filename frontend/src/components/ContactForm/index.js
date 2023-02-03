import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Form, ButtonContainer } from './styles';
import FormGroup from '../FormGroup';

import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import useContactForm from './useContactForm';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
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
  } = useContactForm(onSubmit, ref);

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
