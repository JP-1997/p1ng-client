import React from "react";
import ChatsListScreen from "./components/ChatsListScreen";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import ChatRoomScreen from "./components/ChatRoomScreen";

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/chats" component={ChatsListScreen} />
      <Route exact path="/chats/:chatId" component={ChatRoomScreen} />
    </Switch>
    <Route exact path="/" render={redirectToChats} />
  </BrowserRouter>
);

const redirectToChats = () => <Redirect to="/chats" />;

export default App;
