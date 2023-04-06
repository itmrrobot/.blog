export function validate(value) {
  const msg = {};
  const regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  if (!value.name) {
    msg.name = "The name is required";
  }
  if (!value.email) {
    msg.email = "The email is required";
  } else if (!regex.test(value.email)) {
    msg.email = "The email is invalid";
  }
  if (!value.password) {
    msg.password = "The password is required";
  } else if (value.password.length < 6) {
    msg.password = "The password must have least 6 character";
  }
  return msg;
}

export function validateNewPassword(value) {
  const msg = {};
  if (!value) {
    msg.password = "The password is required";
  } else if (value.length < 6) {
    msg.password = "The password must have least 6 characters";
  }
  return msg;
}

export function capitalFirstLetter(value) {
  const firstLetter = value.charAt(0).toUpperCase();
  return value.replace(value.charAt(0),firstLetter);
}
