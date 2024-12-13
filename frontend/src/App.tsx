import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';

import styled from 'styled-components';

import { ChatDetail, LNB } from './components';
import { Chat } from './types/chat';

const ChatApp: React.FC = () => {
  const nav = useNavigate();
  const { chatId } = useParams();

  const [isLnbOpen, setIsLnbOpen] = useState<boolean>(true);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [chatInfo, setChatInfo] = useState<Chat>({
    id: -1,
    messages: [],
  });

  const toggleLnb = () => {
    setIsLnbOpen(!isLnbOpen);
  };

  const handleSendMessage = (message: string) => {
    const data = localStorage.getItem('messageList');
    const messageList: Chat[] = data ? JSON.parse(data) : [];

    if (!chatId) {
      // 새 채팅 시작
      nav(`/chat/${messageList.length}`);
      messageList.push({
        id: messageList.length,
        messages: [{ contents: message }],
      });
    } else {
      // 기존 채팅방에 메시지 추가
      const currentChat = messageList.find(v => v.id === Number(chatId));
      if (currentChat) {
        currentChat.messages.push({ contents: message });
        setChatInfo(currentChat);
      }
    }

    setChatList(messageList);
    localStorage.setItem('messageList', JSON.stringify(messageList));
  };

  useEffect(() => {
    // 초기 chatList 세팅
    const data = localStorage.getItem('messageList');
    const messageList: Chat[] = data ? JSON.parse(data) : [];
    setChatList(messageList);
  }, []);

  useEffect(() => {
    if (!chatId) {
      setChatInfo({
        id: -1,
        messages: [],
      });
    } else {
      const chat = chatList.find(v => v.id === Number(chatId));
      if (chat) setChatInfo(chat);
    }
  }, [chatId]);

  return (
    <Wrapper>
      <LNB isLnbOpen={isLnbOpen} chatList={chatList} toggleLnb={toggleLnb} />
      {!isLnbOpen && (
        <ToggleButton onClick={toggleLnb}>
          <MenuIcon />
        </ToggleButton>
      )}
      <ChatDetail chatInfo={chatInfo} onMessageSend={handleSendMessage} />
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
