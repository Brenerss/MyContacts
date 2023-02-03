import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function Header({
  hasError,
  qtyOfContacts,
  qtyOfFilteredContacts,
}) {
  function getAlignment() {
    if (hasError) return 'flex-end';

    if (qtyOfContacts > 0) {
      return 'space-between';
    }

    return 'center';
  }

  return (
    <S.Container justifyContent={getAlignment()}>
      {!!(!hasError && qtyOfContacts > 0) && (
        <strong>
          {qtyOfFilteredContacts}
          {qtyOfFilteredContacts === 1 ? ' contato' : ' contatos'}
        </strong>
      )}
      <Link to="/new">Novo contato</Link>
    </S.Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyOfFilteredContacts: PropTypes.number.isRequired,
  qtyOfContacts: PropTypes.number.isRequired,
};
