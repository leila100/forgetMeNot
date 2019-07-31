const initialState = {
  currentUser: {
    firstName: "Leila",
    lastName: "Berrouayel",
    email: "nb.leila10@gmail.com"
  }
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
