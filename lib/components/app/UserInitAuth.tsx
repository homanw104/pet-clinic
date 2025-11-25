import { ReactNode, useEffect } from "react";
import axios from "@/lib/utils/axios";
import { useAppDispatch } from "@/lib/utils/hook";
import { login, logout } from "@/lib/store/authSlice";

export default function UserInitAuth({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const result = await axios.get("/user/self-info");
        dispatch(login(result.data.user.username));
      } catch (error) {
        dispatch(logout());
      }
    }
    
    checkUserAuth().then();
  }, [dispatch]);

  return <>{children}</>
}
