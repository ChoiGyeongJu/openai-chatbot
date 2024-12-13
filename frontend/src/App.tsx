import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';

import styled from 'styled-components';

import { ChatDetail, LNB } from './components';

const ChatApp: React.FC = () => {
  const { chatId } = useParams();

  const toggleLnb = () => {
    setIsLnbOpen(!isLnbOpen);
  };

  const handleSendMessage = (message: string) => {
    const data = localStorage.getItem('messageList');
    const messageList: Chat[] = data ? JSON.parse(data) : [];

    if (!chatId) {
      // 새 채팅 시작
      messageList.push({
        id: messageList.length,
        messages: [{ contents: message }],
      });
    } else {
      // 기존 채팅방에 메시지 추가
      const currentChat = messageList.find(v => v.id === Number(chatId));
      currentChat?.messages.push({ contents: message });
    }

    setChatList(messageList);
    localStorage.setItem('messageList', JSON.stringify(messageList));
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
