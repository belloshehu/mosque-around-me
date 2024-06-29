export default function onboardingReducer(state, action) {
  console.log(action.type, action.payload);
  switch (action.type) {
    case "PREFERENCE":
      console.log(action.payload);
      return {
        ...state,
        preference: { ...state.preference, value: { ...action.payload } },
      };
    case "LOCATION":
      return {
        ...state,
        location: { ...state.location, value: { ...action.payload } },
      };
    case "ACCOUNT":
      return {
        ...state,
        account: { ...state.account, value: action.payload },
      };
    case "PROGRESS":
      console.log(action.payload);
      return { ...state, progress: action.payload };
    default:
      return state;
  }
}
