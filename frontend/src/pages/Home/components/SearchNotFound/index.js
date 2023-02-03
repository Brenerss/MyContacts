import PropTypes from 'prop-types';
import * as S from './styles';

import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';

export default function SearchNotFound({ searchTerm }) {
  return (
    <S.Container>
      <img src={magnifierQuestion} alt="magnifier" />

      <span>
        Nenhum resultado foi encontrado para ”
        <strong>
          {searchTerm}
        </strong>
        ”.
      </span>
    </S.Container>
  );
}

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
