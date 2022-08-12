export const useNameValidation = (
  inputValue,
  validationState,
  validationSetter
) => {
  const temp = { ...validationState };
  if (inputValue !== "") {
    if (inputValue.length >= 3) {
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
