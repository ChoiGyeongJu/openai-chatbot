import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

interface Props {
  chatId?: number;
  chatInfo?: any;
  onMessageSend?: (message: string) => void;
}

const Mockdata = {
  id: 1,
  title: 'Chat with GPT',
  messages: [
    { contents: 'Hello!' },
    { contents: 'Hi, how can I help you today?' },
    { contents: 'Tell me a joke!' },
  ],
};

const ChatDetail: React.FC<Props> = ({ chatId, chatInfo, onMessageSend }) => {
  const [message, setMessage] = useState('');

  // 채팅방 변경 시 입력값 초기화
  useEffect(() => {
    setMessage('');
  }, [chatId]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && message.trim()) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      onMessageSend?.(message);
      setMessage('');
    }
  };

  return (
    <Wrapper>
      <MessageList>
        {Mockdata.messages.map((v, i) => (
          <div key={i}>
            {i % 2 === 0 ? (
              <UserMessage>{v.contents}</UserMessage>
            ) : (
              <BotMessage>{v.contents}</BotMessage>
            )}
          </div>
        ))}
      </MessageList>
      <InputWrapper>
        <StyledInput value={message} onChange={handleMessageChange} onKeyDown={handleKeyDown} />
        <SendButton onClick={handleSendMessage}>보내기</SendButton>
      </InputWrapper>
    </Wrapper>
  );
};

export default ChatDetail;

const Wrapper = styled.div`
  width: 100%;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MessageList = styled.ul`
  width: 70%;
  height: calc(100vh - 135px);
  overflow-y: auto;
  padding: 12px 36px;
  place-content: end;
`;

const UserMessage = styled.li`
  width: fit-content;
  max-width: 70%;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 12px;
  margin-left: auto;
`;

const BotMessage = styled.li`
  width: fit-content;
  max-width: 70%;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 12px;
`;

const InputWrapper = styled.div`
  width: calc(70% + 48px);
  display: flex;
  align-items: center;
  margin-top: 12px;
  justify-content: space-between;
`;

const StyledInput = styled.textarea`
  background: #f4f4f4;
  border-radius: 16px;
  width: calc(100% - 120px);
  height: 32px;
  resize: none;
  font-size: 16px;
  padding: 6px 12px;
  line-height: 28px;
`;

const SendButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 16px;
  cursor: pointer;
  flex-shrink: 0;
  &:hover {
    filter: brightness(90%);
  }
`;
