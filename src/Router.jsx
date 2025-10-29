import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserState from "./contexts/User/UserState";
import GuitarState from "./contexts/Guitar/GuitarState";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import GuitarList from "./components/Guitar/List";
import SingleGuitar from "./components/Guitar/Single";
import Profile from "./components/Profile";
import Checkout from "./components/Checkout";
import SuccessPage from './components/Success';
import CancelPage from './components/Cancel';
import AuthRoute from "./routes/Auth";
import PrivateRoute from "./routes/Private";

const Router = () => {
  return (
    <>
      <UserState>
        <GuitarState>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="registro" element={<Register />} />
                <Route
                  path="iniciar-sesion"
                  element={<AuthRoute component={Login} />}
                />
                <Route
                  path="perfil"
                  element={<PrivateRoute component={Profile} />}
                />
                <Route
                  path="carrito"
                  element={<PrivateRoute component={Checkout} />}
                />
                <Route path="guitarras" element={<GuitarList />} />
                <Route path="guitarras/:slug" element={<SingleGuitar />} />
                <Route path="pago-exitoso" element={<SuccessPage />} />
                <Route path="pago-cancelado" element={<CancelPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </GuitarState>
      </UserState>
    </>
  );
};

export default Router;
