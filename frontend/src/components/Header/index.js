import { Container, InputSearchContainer } from './styles';

import logo from '../../assets/images/logo.svg';

export default function App() {
  return (
    <Container>
      <img src={logo} alt="Logo" loading="lazy" width="201" />

      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato" />
      </InputSearchContainer>
    </Container>
  );
}
