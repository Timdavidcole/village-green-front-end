export default (state = {}, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case 'SETTINGS_SAVED':
        return {
          ...state,
          inProgress: false,
          errors: action.error ? action.payload.errors : null
        };
      case 'ASYNC_START':
        return {
          ...state,
          inProgress: true
        };
    }
  
    return state;
  };