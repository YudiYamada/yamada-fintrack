import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

import { useLogin, useSignup } from "@/api/hooks/user";
import { UserService } from "@/api/services/user";
import {
  LOCAL_STORAGE_ACESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "@/constants/local-storage";
import type { FormProps } from "@/types/components/form";
import type { AuthContextType, AuthUser, Tokens } from "@/types/contexts/auth";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isInitializing: true,
  login: () => {},
  signup: () => {},
  signOut: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuthContext = () => useContext(AuthContext);

const setTokens = (tokens: Tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACESS_TOKEN_KEY);
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
};

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const signupMutation = useSignup();
  const loginMutation = useLogin();

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true);
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACESS_TOKEN_KEY);
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        );
        if (!accessToken && !refreshToken) return;
        const response = await UserService.me();
        setUser(response);
      } catch (error) {
        setUser(null);
        console.log("error", error);
      } finally {
        setIsInitializing(false);
      }
    };
    init();
  }, []);

  const signup = (data: FormProps) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser: AuthUser) => {
        setUser(createdUser);
        setTokens(createdUser.tokens!);
        toast.success("Conta criada com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao criar conta.");
      },
    });
  };

  const login = async (data: FormProps) => {
    try {
      const loggedUser = await loginMutation.mutateAsync(data);
      setUser(loggedUser);
      setTokens(loggedUser.tokens);
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };
  const signOut = () => {
    setUser(null);
    removeTokens();
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, isInitializing, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
