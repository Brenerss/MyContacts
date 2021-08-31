import styled from 'styled-components';

export default styled.select`
  width: 100%;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  border: 2px solid #fff;
  height: 52px;
  padding: 0 16px;
  outline: 0;
  font-size: 16px;
  transition: border-color 0.2s ease-in;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;
