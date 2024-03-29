import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { Container } from './styles';

export default function FormGroup({ children, error, isLoading }) {
  return (
    <Container>
      <div className="form-item">
        {children}

        {isLoading && <Spinner className="loader" size={14} />}
      </div>
      {error && <small>{error}</small>}
    </Container>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};

FormGroup.defaultProps = {
  error: null,
  isLoading: false,
};
