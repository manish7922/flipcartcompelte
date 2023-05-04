// const keyName = "user";
// function login(obj) {
//   let str = JSON.stringify(obj);
//   localStorage.setItem(keyName, str);
// }
// function logout() {
//   localStorage.removeItem(keyName);
// }
// function getUser() {
//   let str = localStorage.getItem(keyName);
//   let obj = str ? JSON.parse(str) : null;
//   return obj;
// }
// export default {
//   login,
//   logout,
//   getUser,
// };

const keyName = "jwttoken";

function getToken(){
  let str=localStorage.getItem(keyName);
  let obj = str ? JSON.parse(str) : null;

  return obj;
}

function storeToken(obj) {
  let str = JSON.stringify(obj);
  localStorage.setItem(keyName, str);
}
function removeToken() {
  localStorage.removeItem(keyName);
}


export default {
  getToken,
  storeToken,
  removeToken,

};