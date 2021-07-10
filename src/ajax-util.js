const mkBase64Token = (username, password) => Buffer.from(`${username}:${password}`)
  .toString("base64");

export {
  mkBase64Token
};
