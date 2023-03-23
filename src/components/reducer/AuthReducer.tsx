type initialStateType = {
  isAuthenticated: boolean;
  token: string;
  user: string;
};

const initialState: initialStateType = {
  isAuthenticated: false,
  token: "",
  user: "",
};

export default function AuthReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_TOKEN":
      return {
        ...state,
        isAuthenticated: true,
        token: action.payloadToken,
        user: action.payloadUser,
      };
    case "REMOVE_TOKEN":
      return {
        ...state,
        isAuthenticated: false,
        token: "",
        user: "",
      };
    case "RE_RENDER":
      return {
        ...state,
        isAuthenticated: action.payloadIsAuthenticated,
        token: action.payloadToken,
        user: action.payloadUser,
      };
    default:
      return state;
  }
}
