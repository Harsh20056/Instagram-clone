import { useSelector } from "react-redux";

export const useAuth = () => {
  const { user, status, error } = useSelector((state) => state.auth);
  
  return {
    user,
    isAuthenticated: !!user,
    isLoading: status === "loading",
    error,
  };
};
