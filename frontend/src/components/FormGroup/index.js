import PropTypes from 'prop-types';
import { Container } from './styles';

export default function FormGroup({ children, error }) {
  return (
    <Container>
      {children}
      {error && <smal>{error}</smal>}
    </Container>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
};

FormGroup.defaultProps = {
  error: null,
};
