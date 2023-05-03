import { Request, Response } from 'express';

class AuthController {
  login(req, res) {
    const { email, name, password } = req.body || {};

    // Insert logic here to store user data in a database, send a verification email, etc.

    res.status(200).json({
      message: 'User created successfully',
      user: {
        email,
        name,
        password,
      },
    });
  }

  getUserByEmail(req, res) {
    const { email } = req.query;
    const isVerify = Number(req.query.is_verify) > 0;

    // For this example, we'll just return a dummy user object.

    if (email === 'test@gmail.com') {
      res.status(200).json({
        email: 'test@gmail.com',
        name: 'muma',
        password: 'mypassword',
        is_verify: isVerify,
      });
    } else {
      res.status(404).json({
        message: "This user doesn't exist",
      });
    }
  }
}


export default AuthController;

//http://localhost:8000/api/auth/login?email=test@gmail.com&is_verify=1