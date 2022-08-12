export const emailValidation = (
  inputValue,
  validationState,
  validationSetter
) => {
  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  const temp = { ...validationState };
  if (inputValue !== "") {
    if (regex.test(inputValue)) {
      temp.email = 2;
      validationSetter(temp);
    } else {
      temp.email = 1;
      validationSetter(temp);
    }
  }
};

export const passwordValidation = (
  inputValue,
  validationState,
  validationSetter
) => {
  const temp = { ...validationState };
  if (inputValue !== "") {
    if (inputValue.length >= 8) {
      temp.password = 2;
      validationSetter(temp);
    } else {
      temp.password = 1;
      validationSetter(temp);
    }
  }
};
