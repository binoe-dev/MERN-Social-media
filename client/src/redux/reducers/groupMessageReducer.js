const initialState = {
  groupName: "",
  data: [],
};

const groupMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_GROUP":
      // state.groupName = action.payload.groupName;
      // state.data = action.payload.groupMessage;
      return {
        ...state,
        groupName: action.payload.groupName,
        data: action.payload.groupMessage,
      };
    case "REMOVE_GROUP":
      // state.data = [];
      // state.groupName = "";
      return { ...state, data: [], groupName: "" };
    case "ADD_GROUP_MESSAGE":
      // state.data = state.data.concat(action.payload);
      return {
        ...state,
        data: state.data.concat(action.payload),
      };
    default:
      return state;
  }
};

export default groupMessageReducer;
