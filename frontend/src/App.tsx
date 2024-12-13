import React, { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';

import styled from 'styled-components';

import { ChatDetail, LNB } from './components';

const ChatApp: React.FC = () => {
  const [isLnbOpen, setIsLnbOpen] = useState(true);

  const toggleLnb = () => {
    setIsLnbOpen(!isLnbOpen);
  };

  return (
    <Wrapper>
      <LNB isLnbOpen={isLnbOpen} toggleLnb={toggleLnb} />
      {!isLnbOpen && (
        <ToggleButton onClick={toggleLnb}>
          <MenuIcon />
        </ToggleButton>
      )}
      <ChatDetail />
    </Wrapper>
  );
};

export default ChatApp;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
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
