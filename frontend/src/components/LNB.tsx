import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/MenuOpen';
import WriteIcon from '@mui/icons-material/MessageRounded';

import styled from 'styled-components';

import { is_mobile } from '../common/constants';
import { Chat } from '../types/chat';

interface LNBProps {
  isLnbOpen: boolean;
  chatList: Chat[];
  toggleLnb: () => void;
}

const LNB: React.FC<LNBProps> = ({ isLnbOpen, chatList, toggleLnb }) => {
  const nav = useNavigate();
  const { chatId } = useParams();

  const handleClickNewChat = () => {
    if (!chatId) return;
    nav(`/chat`);
    if (is_mobile) toggleLnb();
  };

  const handleClickChat = (id: number) => {
    if (id === Number(chatId)) return;
    nav(`/chat/${id}`);
    if (is_mobile) toggleLnb();
  };

  return (
    <LnbWrapper isLnbOpen={isLnbOpen}>
      {isLnbOpen && (
        <>
          <ButtonWrapper>
            <div onClick={toggleLnb}>
              <MenuIcon />
            </div>
            <div onClick={handleClickNewChat}>
              <WriteIcon />
            </div>
          </ButtonWrapper>
          <ChatList>
            {chatList.map((v, i) => (
              <ChatItem
                key={i}
                isActive={v.id === Number(chatId)}
                onClick={() => handleClickChat(v.id)}
              >
                {v.messages[0].contents}
              </ChatItem>
            ))}
          </ChatList>
          {chatList.length === 0 && <EmptyList>진행중인 채팅방이 없습니다.</EmptyList>}
        </>
      )}
    </LnbWrapper>
  );
};

export default LNB;

const LnbWrapper = styled.nav<{ isLnbOpen: boolean }>`
  background: #f9f9f9;
  width: ${props => (props.isLnbOpen ? '250px' : '0px')};
  padding: ${props => props.isLnbOpen && '0 18px'};
  height: 100vh;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;

  @media (max-width: 675px) {
    position: fixed;
    width: ${props => (props.isLnbOpen ? '70%' : '0px')};
  }
`;

const ButtonWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  margin-top: 12px;
  & div {
    display: flex;
  }
  :hover {
    border-radius: 4px;
    background: #e3e3e3;
  }
`;

const ChatList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  :hover {
    background: #e3e3e3;
  }
`;

const EmptyList = styled.div`
  margin: auto;
  padding-bottom: 40px;
  font-size: 14px;
  word-break: keep-all;
`;

const ChatItem = styled.li<{ isActive: boolean }>`
  cursor: pointer;
  padding: 12px 4px;
  border-radius: 12px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: ${props => props.isActive && '#e3e3e3'};
`;
