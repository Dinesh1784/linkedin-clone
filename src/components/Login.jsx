import React from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { auth } from "../firebase";
import { login } from "../features/userSlice.js";
import "./Login.css";

const Login = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [photoUrl, setPhotoUrl] = React.useState("");
  const dispatch = useDispatch();

  const register = (e) => {
    e.preventDefault();
    if (!name) {
      return swal("Register UnSuccessful", "Please enter name", "error");
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: photoUrl,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoUrl: photoUrl,
              })
            );
          });
        swal("Successsfull", "Your Registration is Successful", "success");
      })
      .catch((err) => {
        console.log(err);
        swal("Error", "Something went wrong", "error");
      });
  };

  const loginFunc = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoUrl: userAuth.user.photoURL,
          })
        );
        swal("Successsfull", "You are logged in now", "success");
      })
      .catch((err) => {
        console.log(err);
        swal("Error", "Something went wrong", "error");
      });
  };

  return (
    <div className="login">
      <img
        src="https://cdn.worldvectorlogo.com/logos/linkedin.svg"
        alt="linkedin"
      />
      <form>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Full Name"
          required
        />
        <input
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          type="text"
          placeholder="Profile Picture (URL only)"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit" onClick={loginFunc}>
          Sign In
        </button>
      </form>
      <p>
        Not a member?{" "}
        <span className="login__register" onClick={register}>
          Register now
        </span>
      </p>
    </div>
  );
};

export default Login;
