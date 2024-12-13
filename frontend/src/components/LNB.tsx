import React from 'react';

import MenuIcon from '@mui/icons-material/MenuOpen';

import styled from 'styled-components';

interface LNBProps {
  isLnbOpen: boolean;
  toggleLnb: () => void;
}

const LNB: React.FC<LNBProps> = ({ isLnbOpen, toggleLnb }) => {
  return (
    <LnbWrapper isLnbOpen={isLnbOpen}>
      {isLnbOpen && (
        <ToggleButton onClick={toggleLnb}>
          <MenuIcon />
        </ToggleButton>
      )}
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

const ToggleButton = styled.div`
  cursor: pointer;
  width: auto;
  height: 36px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  margin: 18px 18px 24px 24px;
  :hover {
    border-radius: 4px;
    background: #e3e3e3;
  }
`;
