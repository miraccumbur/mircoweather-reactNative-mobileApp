const mailValidate = text => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return reg.test(text);
};

module.exports = {
  mailValidate,
};
