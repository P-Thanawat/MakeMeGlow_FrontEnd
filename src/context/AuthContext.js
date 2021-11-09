import jwtDecode from 'jwt-decode';
import { useContext } from 'react';
import { useReducer } from 'react';
import { createContext } from 'react';
import { user, getToken, removeToken, setToken } from '../service/localStorage';

const AuthContext = createContext();

const INIT_STATE = {
  user,
  token: getToken(),
};

const REDUCER_FN = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const token = action.payload.token;
      setToken(token);
      const user = jwtDecode(token);
      return { user, token };
    }
    case 'LOGOUT': {
      removeToken();
      return { ...INIT_STATE };
    }
    default: {
      return state;
    }
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(REDUCER_FN, INIT_STATE);
  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must use in AuthContextProvider!!');
  }
  return context;
};

export { useAuthContext, AuthContextProvider };
