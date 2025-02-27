import {
  getuserCourse,
  setuserCourse,
  getUserCollect,
  setUserCollect,
  getUserSignIn,
  setUserSignIn,
} from "../../common/localStorage";
export default {
  namespaced: true,
  state: () => ({
    userCourse: getuserCourse() || {},
    userCollect: getUserCollect() || {},
    userSingIn: getUserSignIn() || {},
  }),

  mutations: {
    saveUserCourse(state, userCourse) {
      state.userCourse = userCourse;
      setuserCourse(userCourse);
    },
    saveUserCollect(state, userCollect) {
      state.userCollect = userCollect;
      setUserCollect(userCollect);
    },
    saveUserSingIn(state, userSingIn) {
      state.userSingIn = userSingIn;
      setUserSignIn(userSingIn);
    },
  },

  actions: {
    addUserCourse(context, userCourse) {
      context.commit("saveUserCourse", userCourse);
      return "ok";
    },
    addUserCollect(context, userCollect) {
      context.commit("saveUserCollect", userCollect);
      return "ok";
    },
    addUserSingIn(context, userSingIn) {
      context.commit("saveUserSingIn", userSingIn);
      return "ok";
    },
  },
};
