import { useReducer } from "react";
import GuitarContext from "./GuitarContext";
import GuitarReducer from "./GuitarReducer";
import axiosClient from "../../config/axios";

const GuitarState = (props) => {
  const initialState = {
    guitars: [],
    currentGuitar: {
      _id: null,
      idProd: '',
      name: '',
      img: '',
      price: '',
      description: '',
      slug: ''
    }
  };

  const [globalState, dispatch] = useReducer(GuitarReducer, initialState);

  const getGuitars = async () => {
    try {
      const response = await axiosClient.get('/guitars'); // http://localhost:3000/api/v1/guitars
      console.log('coleccion de guitarras ', response);
      dispatch({
        type: 'OBTENER_GUITARRAS',
        payload: response.data.guitars
      })
    } catch (error) {
      console.error(error);
    }
  }

  const setCurrentGuitar = (guitarData) => {
    dispatch({
      type: "OBTENER_GUITARRA",
      payload: guitarData
    })
  }

  return (
    <GuitarContext.Provider
      value={{
        guitars: globalState.guitars,
        currentGuitar: globalState.currentGuitar,
        getGuitars,
        setCurrentGuitar
      }}
    >
      {props.children}
    </GuitarContext.Provider>
  );
};

export default GuitarState;
