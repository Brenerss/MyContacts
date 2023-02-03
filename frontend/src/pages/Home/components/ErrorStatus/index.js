import PropTypes from 'prop-types';

import * as S from './styles';

import sad from '../../../../assets/images/sad.svg';
import Button from '../../../../components/Button';

export default function ErrorStatus({
  onTryAgain,
}) {
  return (
    <S.Container>
      <img src={sad} alt="sad" />
      <div className="details">
        <strong>Ocorreu um erro ao obter os seus contatos!</strong>
        <Button type="button" onClick={onTryAgain}>
          Tentar novamente
        </Button>
      </div>
    </S.Container>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};
