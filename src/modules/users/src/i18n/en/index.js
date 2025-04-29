import users from './users.js';
import login from './login.js';

export default {
  title: "Users",
  menu: {
    label: "Users",
  },
  home: {
    title: "Home",
  },
  buttons: {
    editRoles: { label: "Edit Roles" }
  },        
  users,
  login,
  messages: {
    passwordResetWrongCode: "Your password reset code is wrong",
    passwordResetEmail: "Password reset information has been sent to your e-mail"
  },
  logout: {
    title: "Logout",
    menu: {
      label: "Logout"
    }
  },
  forgotPassword: {
    title: "Forgot Password",
    fields: {
      username: "E-Mail Address",
      newPassword: "New Password",
      newPasswordConfirm: "New Password Confirm",
    },
    buttons: {
      resetMyPassword: "Reset Password",
      changeMyPassword: "Change Password",
      backToLogin: "Back to Login"
    }
  },
  resetPassword: {
    title: "Reset Password"
  },
  myAccount: {
    title: "My Account",
    menu: {
      label: "My Account"
    },
    fields: {
      avatar: {
        set: "Set Avatar",
        del: "Delete"
      }
    }
  },
  changePassword: {
    title: "My Password",
    menu: {
      label: "Change Password"
    },
    fields: {
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password"
    }
  }
};
