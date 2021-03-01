import React from "react";
import { useMemo, useState, useCallback } from "react";
import styled from "styled-components";
import ChatNavBar from "./ChatNavbar";
import { History } from "history";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";

const Container = styled.div`
  background: url(/assets/chat_background_2.jpg);
  background-size: cover;
  display: flex;
  flex-flow: column;
  height: 100vh;
`;

const getChatQuery = `
    query GetChat($chatId: ID!) {
        chat(chatId: $chatId) {
            id
            name
            picture
            messages {
                id
                content
                createdAt
            }
        }
    }
`;

interface ChatRoomScreenParams {
  chatId: string;
  history: History;
}

export interface ChatQueryMessage {
  id: string;
  content: string;
  createdAt: Date;
}

export interface ChatQueryResult {
  id: string;
  name: string;
  picture: string;
  messages: Array<ChatQueryMessage>;
}

type OptionalChatQueryResult = ChatQueryResult | null;

const ChatRoomScreen: React.FC<ChatRoomScreenParams> = ({
  chatId,
  history,
}) => {
  const [chat, setChat] = useState<OptionalChatQueryResult>(null);

  useMemo(async () => {
    const body = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: getChatQuery,
        variables: { chatId },
      }),
    });
    const {
      data: { chat },
    } = await body.json();
    setChat(chat);
  }, [chatId]);

  const onSendMessage = useCallback(
    (content: string) => {
      if (!chat) return null;

      const message = {
        id: (chat.messages.length + 10).toString(),
        createdAt: new Date(),
        content,
      };

      setChat({
        ...chat,
        messages: chat.messages.concat(message),
      });
    },
    [chat]
  );

  if (!chat) return null;

  return (
    <Container>
      <ChatNavBar chat={chat} history={history} />
      {chat.messages && <MessagesList messages={chat.messages} />}
      <MessageInput onSendMessage={onSendMessage} />
    </Container>
  );
};

export default ChatRoomScreen;
