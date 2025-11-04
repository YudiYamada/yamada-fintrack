import { useMutation } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

import { api } from "@/lib/axios";
import type { FormProps } from "@/types/components/form";
import type { AuthContextType, AuthUser } from "@/types/contexts/auth";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  signup: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const signupMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (variables: FormProps) => {
      const response = await api.post("/users", {
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
      const response = await api.post("/users/login", {
        email: variables.email,
        password: variables.password,
      });
      return response.data;
    },
  });

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        if (!accessToken && !refreshToken) return;

        const response = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        console.log("error", error);
      }
    };
    init();
  }, []);

  const signup = (data: FormProps) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser: AuthUser) => {
        const accessToken = createdUser.tokens?.accessToken;
        const refreshToken = createdUser.tokens?.refreshToken;

        setUser(createdUser);
        if (accessToken) localStorage.setItem("accessToken", accessToken);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

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
        const accessToken = loggedUser.tokens.accessToken;
        const refreshToken = loggedUser.tokens.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setUser(loggedUser);
        toast.success("Login realizado com sucesso!");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
