import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Feed from "./components/Feed";
import Header from "./components/Header";
import Login from "./components/Login";
import SideBar from "./components/SideBar";
import { Widget } from "./components/Widget";
import { selectUser, logout, login } from "./features/userSlice";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  console.log(user);
  React.useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe();
  }, []);

  return (
    <div className="app">
      <Header />
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <SideBar />
          <Feed />
          <Widget />
        </div>
      )}
    </div>
  );
}

export default App;
