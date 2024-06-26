import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./components/Navigation";
import { Modal } from "./context/Modal";
import AllPins from "./components/Pins/AllPins";
import Home from "./components/Home/Home";
import SinglePin from "./components/Pins/SinglePin";
import CreatePin from "./components/Pins/CreatePin/CreatePin";
import UserHome from "./components/UserHome/UserHome";
import SingleBoard from "./components/Boards/SingleBoard";
import { useContext } from "react";
import { ThemeContext } from "./context/ToggleBack";
import * as sessionActions from "./store/session";

function Layout() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <div className={`${theme}`}>
      <Navigation isLoaded={isLoaded} />
      <Modal closeTimeoutMS={2000} />
      {isLoaded && <Outlet />}
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "pins",
        element: <AllPins />,
      },
      {
        path: "pins/:pinId",
        element: <SinglePin />,
      },
      {
        path: "pins/new",
        element: <CreatePin />,
      },
      {
        path: "myProfile",
        element: <UserHome />,
      },
      {
        path: "boards/:boardId",
        element: <SingleBoard />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
