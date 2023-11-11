// object of the original email and password
const credential = {
  email: "test@gmail.com",
  password: "LambtonCollege@123",
};

// loads the login page
exports.index = (req, res) => {
  if (req.session.user) {
    res.redirect("/welcome");
  } else {
    res.render("login");
  }
};

// display the landing page after the user get successfully logged in
exports.welcome = (req, res) => {
  if (req.session.user) {
    res.render("index", {
      user: req.session.user,
    });
  } else {
    res.send("Unauthorized User");
  }
};

// handle the login request
exports.loginPost = (req, res) => {
  const validation = validator(req);

  if (validation.success) {
    req.session.user = req.body.email;
    res.redirect("/welcome");
  } else {
    res.render("login", {
      username_message: validation.username_message,
      password_message: validation.password_message,
      user_name : req.body.email
    });
  }
};

// route for logout
exports.logout = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.render("login", {
        logout: "logout Successfully...!",
      });
    }
  });
};

// email address and password validation
const validator = (req) => {
  const [email, password] = [req.body.email, req.body.password];

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;

  if (email.match(emailRegex)) {
    if (password.match(passwordRegex)) {
      if (email == credential.email && password == credential.password) {
        return { status: 200, success: true, message: "success" };
      } else {
        return {
          status: 400,
          success: false,
          password_message: "Invalid Email or Password",
        };
      }
    } else {
      return {
        status: 400,
        success: false,
        password_message: "Invalid Password",
      };
    }
  } else {
    return {
      status: 400,
      success: false,
      username_message: "Invalid Email Address",
    };
  }
};
