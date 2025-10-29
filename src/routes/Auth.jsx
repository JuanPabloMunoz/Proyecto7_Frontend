import { useContext, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import UserContext from '../contexts/User/UserContext'


export default function AuthRoute({ component: Component }) {
    const ctx = useContext(UserContext);
    const { authState, verifyUser } = ctx;

    useEffect(() => {
        verifyUser();
    }, [authState])

    return <>{ authState ? <Navigate replace to='/perfil' /> : <Component /> }</>;
}