import React, { useState } from 'react';

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
      {!isLnbOpen && <div onClick={toggleLnb}>열기 버튼</div>}
      <ChatDetail />
    </Wrapper>
  );
};

export default ChatApp;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;
