import { useSelector } from "react-redux";
import PostCardList from "./components/posts/post-card-list";
import MainLayout from "./layout/main-layout";
import { RootState } from "./redux";

function App() {
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <MainLayout>
      {auth.isAuth ? <PostCardList /> : <div>Please Login first</div>}
    </MainLayout>
  );
}

export default App;
