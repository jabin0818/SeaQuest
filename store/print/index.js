import {
  setUserInfo,
  getUserInfo,
  clearUserInfo,
  getUser,
  setUser,
  clearUserSignIn,
  clearUserCollect,
  clearuserCourse,
} from "../../common/localStorage";
import { aes_encrypt, aes_decrypt } from "@/common/aes_endecrypt.js";
const state = {
  all: {
    id: "",
    username: "",
    password: "",
  },
  userInfo: getUserInfo() || {},
  isLogin: false,
};

const mutations = {
  setPrint(state, all) {
    state.all.id = all.id == "" || all.id ? all.id : state.all.id;
    state.all.username =
      all.username == "" || all.username ? all.username : state.all.username;
    state.all.password =
      all.password == "" || all.password ? all.password : state.all.password;
  },
  //存储用户信息
  SAVEUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
    state.isLogin = true;
    setUserInfo(userInfo);
  },
  // 退出登录
  USERLOGOUT(state) {
    state.userInfo = {};
    state.isLogin = false;
    clearUserInfo();
    clearUserSignIn();
    clearUserCollect();
    clearuserCourse();
  },
};

const actions = {
  //用户登录
  async userLogin({ commit }, { username, password }) {
    let isExist = getUser(username);
    try {
      let primaryPassword = aes_decrypt(isExist);

      if (isExist) {
        if (password === primaryPassword) {
          commit("SAVEUSERINFO", {
            username: username,
          });
          return "ok";
        }
      } else {
        return "not";
      }
    } catch (e) {
      return "not";
    }
  },

  //用户退出登录
  async userLogout({ commit }) {
    commit("USERLOGOUT");
    return "ok";
  },

  userRegister({ commit }, { username, password }) {
    let isExist = getUser(username);
    if (!isExist) {
      let encryptPassword = aes_encrypt(password);
      setUser(username, encryptPassword);
      return "ok";
    } else {
      return "not";
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
