export const initState = {
  isLogin: false,
  isPost: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return {
        ...state,
        isLogin: action.isLogin,
      };
    case "SET_POST":
      return {
        ...state,
        isPost: action.isPost,
      };
    default:
      return state;
  }
};

export default reducer;
