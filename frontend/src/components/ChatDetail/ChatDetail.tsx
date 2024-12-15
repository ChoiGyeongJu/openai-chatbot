import React, { useState, useEffect, useRef } from 'react';

import Spinner from '@mui/material/CircularProgress';

import styled from 'styled-components';

import { is_mobile } from '../../common/constants';
import { Chat } from '../../types/chat';

interface Props {
  isLoading: boolean;
  chatInfo: Chat;
  onMessageSend: (message: string) => void;
}

const ChatDetail: React.FC<Props> = ({ isLoading, chatInfo, onMessageSend }) => {
  const [message, setMessage] = useState('');
  const ref = useRef<HTMLUListElement>(null);

  // 채팅방 변경 시 입력값 초기화 및 스크롤 아래로 이동
  useEffect(() => {
    setMessage('');
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [chatInfo.id]);

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
    if (!message.trim()) return;
    onMessageSend(message);
    setMessage('');
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight + 50;
  };

  return (
    <Wrapper>
      <MessageList ref={ref}>
        {chatInfo.messages.length === 0 && <EmptyList>무엇을 도와드릴까요?</EmptyList>}
        {chatInfo.messages.map((v, i) => (
          <div key={i}>
            {i % 2 === 0 ? (
              <UserMessage>{v.contents}</UserMessage>
            ) : (
              <BotMessage>
                {v.contents.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </BotMessage>
            )}
          </div>
        ))}
        {isLoading && (
          <Loading>
            <Spinner />
          </Loading>
        )}
      </MessageList>
      <InputWrapper>
        <StyledInput
          placeholder={is_mobile ? '' : '메시지를 입력하세요.'}
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
        />
        <SendButton onClick={handleSendMessage}>전송</SendButton>
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
  width: 100%;
  height: calc(100vh - 135px);
  overflow-y: auto;
  padding: 12px 36px;
  place-content: end;
  & div {
    margin: 8px auto;
    width: min(70%, 768px);
  }
  @media (min-width: 675px) {
    &::-webkit-scrollbar {
      width: 12px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-clip: padding-box;
      border: 2px solid transparent;
      border-radius: 4px;
      opacity: 1;
      background-color: #bdbdbd;
    }
  }

  @media (max-width: 675px) {
    width: 90%;
    & div {
      width: 90%;
    }
  }
`;

const EmptyList = styled.h2`
  display: flex;
  justify-content: center;
  margin: 0;
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px !important;
  & span {
    width: 24px !important;
    height: 24px !important;
  }
`;

const UserMessage = styled.li`
  width: fit-content;
  max-width: 80%;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 12px;
  margin-left: auto;
`;

const BotMessage = styled.li`
  width: fit-content;
  max-width: 80%;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 12px;
  & p {
    margin: 0;
  }
`;

const InputWrapper = styled.div`
  width: min(70%, 768px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  @media (max-width: 675px) {
    width: 90%;
  }
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
  margin: 0 auto;
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
