import { useReducer } from "react";
import UserReducer from "./UserReducer";
import UserContext from './UserContext';
import axiosClient from '../../config/axios';

const UserState = (props) => {
    const initialState = {
        currentUser: {
            username: '',
            email: '',
            country: '',
            address: '',
            zipcode: 0
        },
        cart: [],
        authState: false,
        sessionURL: null,
        globalLoading: false
    };

    const [globalState, dispatch] = useReducer(UserReducer, initialState);

    const registerUser = async (form) => {
        try {
            const response = await axiosClient.post('/users/register', form);
            console.log(response);

            dispatch({
                type: 'REGISTRO_EXITOSO',
                payload: response.data
            })

            return true;
        } catch (error) {
            return false;
        }
    }

    const loginUser = async (form) => {
        try {
            const response = await axiosClient.post('/users/login', form, {
                withCredentials: true
            })
            console.log(response);
            dispatch({
                type: 'LOGIN_EXITOSO'
            })
            return;
        } catch (error) {
            return error.response.data.message;
        }
    }

    const verifyUser = async () => {
        try {
            const response = await axiosClient.get('/users/verify-user', {
                withCredentials: true
            })
            console.log(response);
            const userData = response.data.usuario;
            dispatch({
                type: 'GET_USER_DATA',
                payload: userData
            })
        } catch (error) {
            console.error(error);
            return;
        }
    }

    const updateUser = async (form) => {
        await axiosClient.put('/users/update-user', form, {
            withCredentials: true
        })
    };

    const logoutUser = async (navigate) => {
        try {
            await axiosClient.post('/users/logout', {}, {
                withCredentials: true
            })
            dispatch({
                type: 'LOGOUT_EXITOSO',
                payload: 'Sesion cerrada correctamente'
            })
            navigate('iniciar-sesion');
        } catch (error) {
            console.error('Error al cerrar la sesion', error);
        }
    }

    const editCart = async(data) => {
        try {
            const response = await axiosClient.put('/carts/edit-cart', { products: data }, { withCredentials: true });

            await getCart();
            return response.data.message;
        } catch (error) {
            console.error(error);
            return;
        }
    }

    const getCart = async () => {
        try {
            const response = await axiosClient.get('/carts/get-cart', { withCredentials: true });
            dispatch({
                type: "GET_CART",
                payload: response.data.cart.products
            })
        } catch (error) {
            console.error(error);
            return;
        }
    }

    const getCheckoutSession = async () => {
        try {
            const response = await axiosClient.get('/carts/create-checkout-session', { withCredentials: true });

            dispatch({
                type: "GET_CHECKOUT_SESSION",
                payload: response.data.session_url
            })
        } catch (error) {
            console.error(error);
            return;
        }
    }

    const setLoading = (status) => {
        dispatch({
            type: "CHANGE_STATUS_LOADING",
            payload: status
        })
    }

    return (
        <UserContext.Provider
            value={{
                currentUser: globalState.currentUser,
                cart: globalState.cart,
                authState: globalState.authState,
                globalLoading: globalState.globalLoading,
                sessionURL: globalState.sessionURL,
                registerUser,
                loginUser,
                verifyUser,
                updateUser,
                logoutUser,
                editCart,
                getCart,
                getCheckoutSession,
                setLoading
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;