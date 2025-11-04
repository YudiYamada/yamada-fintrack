import { FormProps } from "@/types/components/form";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  tokens?: Tokens;
}

export interface AuthContextType {
  user: AuthUser | null;
  isInitializing: boolean;
  login: (data: FormProps) => void;
  signup: (data: FormProps) => void;
}
