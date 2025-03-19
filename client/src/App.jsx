import "./App.css";
import Layout from "./layout";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./Pages/indexPage";
import Register from "./Pages/register";
import Login from "./Pages/login";
import NewPostPage from "./Pages/newPostPage";
import SinglePostPage from "./Pages/SinglePostPage";
import EditPostPage from "./Pages/EditPostPage";
import { UserContextProvider } from "./context/userContext";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/create"} element={<NewPostPage />} />
          <Route
            path={"/post/:id"}
            element={<SinglePostPage />}
          />
          <Route path={"/edit/:id"} element={<EditPostPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
