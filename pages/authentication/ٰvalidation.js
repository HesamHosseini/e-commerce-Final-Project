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

export const SignUpUserNameValidation = (
  inputValue,
  validationSetter,
  validationStatus
) => {
  const temp = { ...validationStatus };
  if (inputValue !== "") {
    if (inputValue.length >= 3) {
      temp.username = 2;
      validationSetter(temp);
    } else {
      temp.username = 1;
      validationSetter(temp);
    }
  } else validationSetter(temp);
};

export const SignUpPasswordValidation = (
  inputValue,
  validationSetter,
  validationStatus
) => {
  const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
  const temp = { ...validationStatus };
  if (inputValue !== "") {
    if (regex.test(inputValue)) {
      temp.password = 2;
      validationSetter(temp);
    } else {
      temp.password = 1;
      validationSetter(temp);
    }
  }
};
