import { useMutation } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  LOCAL_STORAGE_ACESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "@/constants/local-storage";
import { protectedApi, publicApi } from "@/lib/axios";
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

  const signupMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (variables: FormProps) => {
      const response = await publicApi.post("/users", {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      });
      return response.data;
    },
  });

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (variables: FormProps) => {
      const response = await publicApi.post("/users/login", {
        email: variables.email,
        password: variables.password,
      });
      return response.data;
    },
  });

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true);
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACESS_TOKEN_KEY);
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        );
        if (!accessToken && !refreshToken) return;

        const response = await protectedApi.get("/users/me");

        setUser(response.data);
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

  const login = (data: FormProps) => {
    loginMutation.mutate(data, {
      onSuccess: (loggedUser) => {
        setUser(loggedUser);
        setTokens(loggedUser.tokens);
        toast.success("Login realizado com sucesso!");
      },
      onError: (error) => {
        console.error(error);
      },
    });
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
