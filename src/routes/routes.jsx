import { createBrowserRouter } from "react-router-dom";
import Trophy from "../Pages/Trophy";
import Home from "../Pages/Home";
import Links from "../Pages/Links";
import Login from "../Pages/Login";
import { Private } from "./Private";
import Chat from "../Pages/Chat";
import ChatRodolfo from "../Pages/ChatRodolfo";
import RegisterBonus from "../Pages/Bonus/RegisterBonus";
import ManageBonus from "../Pages/Bonus/ManageBonus";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <Private>
        <Home />
      </Private>
    ),
  },
  {
    path: "/chat",
    element: (
      <Private>
        <Chat />
      </Private>
    ),
  },
  {
    path: "/iarodolfo",
    element: (
      <Private>
        <ChatRodolfo />
      </Private>
    ),
  },
  {
    path: "/painel",
    element: (
      <Private>
        <Trophy />
      </Private>
    ),
  },
  {
    path: "/links",
    element: (
      <Private>
        <Links />
      </Private>
    ),
  },
  {
    path: "/bonus/register",
    element: <RegisterBonus />,
  },
  {
    path: "/bonus/manage",
    element: (
      <Private>
        <ManageBonus />
      </Private>
    ),
  },
]);

export { router };

