import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./features/auth/authActions";
import { router } from "./routes/AppRoutes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Try to restore session on app load
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
