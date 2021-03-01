import React from "react";
import styled from "styled-components";
import moment from "moment";
import { ChatQueryMessage } from "./index";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Container = styled.div`
  display: block;
  flex: 2;
  overflow-y: overlay;
  padding: 0 15px;

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(13deg, #03a3ff 10%, #da47ff 35%);
    border-radius: 15px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(13deg, #da47ff 14%, #03a3ff 64%);
  }
  ::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 10px;
  }
`;

const MessageItem = styled.div`
  float: right;
  background-color: #e9c6f8;
  display: inline-block;
  position: relative;
  max-width: 100%;
  border-radius: 7px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  margin-top: 10px;
  margin-bottom: 10px;
  clear: both;

  &::after {
    content: "";
    display: table;
    clear: both;
  }

  &::before {
    background-image: url(/assets/message-mine.png);
    content: "";
    position: absolute;
    bottom: 3px;
    width: 12px;
    height: 19px;
    right: -11px;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: contain;
  }
`;

const Contents = styled.div`
  padding: 5px 7px;
  word-wrap: break-word;

  &::after {
    content: " \\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0";
    display: inline;
  }
`;

const Timestamp = styled.div`
  position: absolute;
  bottom: 2px;
  right: 7px;
  color: gray;
  font-size: 12px;
`;

interface MessagesListProps {
  messages: Array<ChatQueryMessage>;
}

const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  const selfRef = useRef(null);

  useEffect(() => {
    if (!selfRef.current) return;

    const selfDOMNode = ReactDOM.findDOMNode(selfRef.current) as HTMLElement;
    selfDOMNode.scrollTop = Number.MAX_SAFE_INTEGER;
  }, [messages.length]);

  return (
    <Container ref={selfRef}>
      {messages.map((message: any) => (
        <MessageItem key={message.id}>
          <Contents>{message.content}</Contents>
          <Timestamp>{moment(message.createdAt).format("HH:mm")}</Timestamp>
        </MessageItem>
      ))}
    </Container>
  );
};

export default MessagesList;
