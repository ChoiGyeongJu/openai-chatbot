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

  const handleFetchResponse = async (id: number, message: string, messageList: Chat[]) => {
    const currentChat = messageList.find(v => v.id === id);
    if (!currentChat) return;

    try {
      setIsLoading(true);
      const response = await fetchOpenAIResponse(message);
      currentChat.messages.push({ contents: response });
      setChatInfo(currentChat);
      setChatList(messageList);
    } catch (error) {
      currentChat.messages.push({
        contents: '응답을 받아오는 중 에러가 발생했습니다. 다시 요청해주세요.',
      });
    } finally {
      localStorage.setItem('messageList', JSON.stringify(messageList));
      setIsLoading(false);
    }
  };

  const handleSendMessage = (message: string) => {
    const data = localStorage.getItem('messageList');
    const messageList: Chat[] = data ? JSON.parse(data) : [];
    let currentId = Number(chatId);

    if (!chatId) {
      // 새 채팅 시작
      let newId: number;
      if (messageList.length === 0) {
        newId = 0;
      } else {
        newId = messageList[messageList.length - 1].id + 1;
      }
      nav(`/chat/${newId}`);
      currentId = newId;
      messageList.push({
        id: newId,
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
    handleFetchResponse(currentId, message, messageList);
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
      <LNB
        isLnbOpen={isLnbOpen}
        chatList={chatList}
        setChatList={setChatList}
        setIsLnbOpen={setIsLnbOpen}
      />
      {!isLnbOpen && (
        <ToggleButton onClick={() => setIsLnbOpen(true)}>
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
