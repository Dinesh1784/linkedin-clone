import {
  CalendarViewDay,
  Create,
  EventNoteSharp,
  Image,
  SubscriptionsSharp,
} from "@mui/icons-material";
import React from "react";
import { db } from "../firebase";
import "./Feed.css";
import InputOption from "./InputOption";
import Post from "./Post";
import firebase from "firebase/compat";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice.js";

const Feed = () => {
  const [posts, setPosts] = React.useState([]);
  const [input, setInput] = React.useState("");
  const user = useSelector(selectUser);

  React.useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const sendPost = (e) => {
    e.preventDefault();
    db.collection("posts").add({
      name: user.displayName,
      descritpion: user.email,
      message: input,
      photoUrl: user.photoUrl || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <Create />
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={Image} title="Photo" color="#70B5F9" />
          <InputOption
            Icon={SubscriptionsSharp}
            title="Video"
            color="#E7A33E"
          />
          <InputOption Icon={EventNoteSharp} title="Event" color="#C0CBCD" />
          <InputOption
            Icon={CalendarViewDay}
            title="Write article"
            color="#7FC15E"
          />
        </div>
      </div>
      <div>
        {posts &&
          posts.map(
            ({ id, data: { name, descritpion, message, photoUrl } }) => (
              <Post
                key={id}
                name={name}
                message={message}
                description={descritpion}
              />
            )
          )}
      </div>
    </div>
  );
};

export default Feed;
