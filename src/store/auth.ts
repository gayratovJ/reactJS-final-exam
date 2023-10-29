import { create } from "zustand";
import { TOKEN, USER } from "../constants";
import { devtools } from "zustand/middleware";
import { NavigateFunction} from "react-router-dom"
import request from "../server";
import User from "../types/user";
import Login from "../types/login";
import Cookies from "js-cookie";

interface AuthData {
  isAuthenticated: boolean;
  user: null | User;
  login: (values: Login,navigate: NavigateFunction) => void;
}


const useAuth = create<AuthData>()(
  devtools((set) => ({
    isAuthenticated: Boolean(Cookies.get(TOKEN)),
    user: localStorage.getItem(USER)?
    JSON.parse(localStorage.getItem(USER) || "" )
    : null,
    login: async (value , navigate) => {
      const {
        data: { token, user },
      } = await request.post("auth/login", value);
      Cookies.set(TOKEN, token);
      localStorage.setItem(USER, JSON.stringify(user));
      set((state) => ({ ...state, isAuthenticated: true, user }));
      navigate("/client")
    },
  }))
);

export default useAuth;
