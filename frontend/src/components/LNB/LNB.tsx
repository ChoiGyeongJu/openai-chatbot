import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/DeleteOutline';
import MenuIcon from '@mui/icons-material/MenuOpen';
import WriteIcon from '@mui/icons-material/MessageRounded';

import styled from 'styled-components';

import { is_mobile } from '../../common/constants';
import { Chat } from '../../types/chat';
import { ConfirmModal } from './ConfirmModal';

interface LNBProps {
  isLnbOpen: boolean;
  chatList: Chat[];
  setChatList: (chatList: Chat[]) => void;
  setIsLnbOpen: (open: boolean) => void;
}

const LNB: React.FC<LNBProps> = ({ isLnbOpen, chatList, setChatList, setIsLnbOpen }) => {
  const nav = useNavigate();
  const { chatId } = useParams();

  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [hoverIndex, setHoverIndex] = useState<null | number>(null);
  const [deleteId, setDeleteId] = useState<null | number>(null);

  const handleClickNewChat = () => {
    if (chatId) nav(`/chat`);
    if (is_mobile) setIsLnbOpen(false);
  };

  const handleClickChat = (id: number) => {
    if (id !== Number(chatId)) nav(`/chat/${id}`);
    if (is_mobile) setIsLnbOpen(false);
  };

  const handleOpenModal = (id: number) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClickDelete = () => {
    const data = localStorage.getItem('messageList');
    const messageList: Chat[] = data ? JSON.parse(data) : [];
    const updatedList = messageList.filter(v => v.id !== deleteId);
    setChatList(updatedList);
    setDeleteId(null);
    setOpen(false);
    localStorage.setItem('messageList', JSON.stringify(updatedList));
    if (deleteId === Number(chatId)) nav('/chat');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      if (is_mobile) setIsLnbOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <LnbWrapper ref={ref} isLnbOpen={isLnbOpen}>
      {isLnbOpen && (
        <>
          <ButtonWrapper>
            <div onClick={() => setIsLnbOpen(false)}>
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
                onMouseEnter={() => setHoverIndex(v.id)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => handleClickChat(v.id)}
              >
                <span>{v.messages[0].contents}</span>
                {hoverIndex === v.id && (
                  <div onClick={() => handleOpenModal(v.id)}>
                    <DeleteIcon />
                  </div>
                )}
              </ChatItem>
            ))}
          </ChatList>
          {chatList.length === 0 && <EmptyList>진행중인 채팅방이 없습니다.</EmptyList>}
        </>
      )}
      <ConfirmModal open={open} onClose={() => setOpen(false)} onConfirm={handleClickDelete} />
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
  padding: 0;
  overflow: hidden auto;
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
  width: 203px;
  padding: 12px 4px;
  border-radius: 12px;
  margin: 8px 0;
  display: flex;
  background: ${props => props.isActive && '#e3e3e3'};
  & span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & div {
    display: flex;
    margin-left: auto;
  }
  @media (max-width: 675px) {
    width: 92%;
  }
`;
