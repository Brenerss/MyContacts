import PropTypes from 'prop-types';
import * as S from './styles';

export default function InputSearch({ value, onChange }) {
  return (
    <S.Container>
      <input
        type="text"
        placeholder="Pesquisar contato"
        value={value}
        onChange={onChange}
      />
    </S.Container>
  );
}

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
