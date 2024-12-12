import React from 'react';

import styled from 'styled-components';

interface LNBProps {
  isLnbOpen: boolean;
  toggleLnb: () => void;
}

const LNB: React.FC<LNBProps> = ({ isLnbOpen, toggleLnb }) => {
  return (
    <LnbWrapper isLnbOpen={isLnbOpen}>
      {isLnbOpen && <ToggleButton onClick={toggleLnb}>닫기버튼</ToggleButton>}
    </LnbWrapper>
  );
};

export default LNB;

const LnbWrapper = styled.nav<{ isLnbOpen: boolean }>`
  background: #f9f9f9;
  width: ${props => (props.isLnbOpen ? '250px' : '0px')};
  height: 100vh;
  display: flex;
  transition: width 0.3s;
`;

const ToggleButton = styled.button`
  width: auto;
  height: 36px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  margin: 24px 12px 24px auto;
`;
