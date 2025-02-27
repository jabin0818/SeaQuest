//本地存储持久化存储

//token
export const getToken = () => {
  return localStorage.getItem("sea-token");
};
export const setToken = token => {
  localStorage.setItem("sea-token", token);
};
export const clearToken = () => {
  localStorage.removeItem("sea-token");
};

//userInfo
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem("sea-userInfo"));
};
export const setUserInfo = userInfo => {
  localStorage.setItem("sea-userInfo", JSON.stringify(userInfo));
};
export const clearUserInfo = () => {
  localStorage.removeItem("sea-userInfo");
};

//userId
export const getUserId = () => {
  return localStorage.getItem("sea-userId");
};
export const setUserId = userId => {
  localStorage.setItem("sea-userId", userId);
};
export const clearUserId = () => {
  localStorage.removeItem("sea-userId");
};

//register
export const getUser = key => {
  // return JSON.parse(localStorage.getItem(key))
  return localStorage.getItem(key);
};
export const setUser = (key, value) => {
  // localStorage.setItem(key, JSON.stringify(value));
  localStorage.setItem(key, value);
};
export const clearUser = key => {
  localStorage.removeItem(key);
};

//buy course ,用户学习课程进度
export const getuserCourse = () => {
  return JSON.parse(localStorage.getItem("sea-userCourse"));
};
export const setuserCourse = userCourse => {
  localStorage.setItem("sea-userCourse", JSON.stringify(userCourse));
};
export const clearuserCourse = () => {
  localStorage.removeItem("sea-userCourse");
};

//user collect course
export const getUserCollect = () => {
  return JSON.parse(localStorage.getItem("sea-userCollect"));
};
export const setUserCollect = userCollect => {
  localStorage.setItem("sea-userCollect", JSON.stringify(userCollect));
};
export const clearUserCollect = () => {
  localStorage.removeItem("sea-userCollect");
};

//user 打卡
export const getUserSignIn = () => {
  return JSON.parse(localStorage.getItem("sea-userSignIn"));
};
export const setUserSignIn = userSignIn => {
  localStorage.setItem("sea-userSignIn", JSON.stringify(userSignIn));
};
export const clearUserSignIn = () => {
  localStorage.removeItem("sea-userSignIn");
};
