import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';

import styled from 'styled-components';

import { fetchOpenAIResponse } from './common/api';
import { is_mobile } from './common/constants';
import { ChatDetail, LNB } from './components';
import { Chat } from './types/chat';

const ChatApp: React.FC = () => {
  const nav = useNavigate();
  const { chatId } = useParams();

  const [isLnbOpen, setIsLnbOpen] = useState<boolean>(!is_mobile);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [chatInfo, setChatInfo] = useState<Chat>({
    id: -1,
    messages: [],
  });

  const toggleLnb = () => {
    setIsLnbOpen(!isLnbOpen);
  };

  const handleFetchResponse = async (message: string, messageList: Chat[]) => {
    const currentChat = messageList.find(v => v.id === Number(chatId));
    if (!currentChat) return;

    try {
      setIsLoading(true);
      const response = await fetchOpenAIResponse(message);
      currentChat.messages.push({ contents: response });
      setChatInfo(currentChat);
      setChatList(messageList);
      localStorage.setItem('messageList', JSON.stringify(messageList));
    } catch (error) {
      currentChat.messages.push({
        contents: '응답을 받아오는 중 에러가 발생했습니다. 다시 요청해주세요.',
      });
    } finally {
      setIsLoading(false);
    }
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
    handleFetchResponse(message, messageList);
  };

  useEffect(() => {
    // 초기 세팅
    const data = localStorage.getItem('messageList');
    const messageList: Chat[] = data ? JSON.parse(data) : [];
    setChatList(messageList);

    const chat = messageList.find(v => v.id === Number(chatId));
    if (chat) setChatInfo(chat);
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
      <ChatDetail isLoading={isLoading} chatInfo={chatInfo} onMessageSend={handleSendMessage} />
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
  @media (max-width: 675px) {
    position: fixed;
  }
`;
