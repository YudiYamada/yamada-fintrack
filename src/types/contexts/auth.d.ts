import { FormProps } from "@/types/components/form";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  tokens?: Tokens;
}

export interface AuthContextType {
  user: AuthUser | null;
  isInitializing: boolean;
  signOut: () => void;
  login: (data: FormProps) => void;
  signup: (data: FormProps) => void;
}
