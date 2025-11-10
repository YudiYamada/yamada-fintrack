import { publicApi } from "@/lib/axios";
import type { FormProps } from "@/types/components/form";

export const UserService = {
  signup: async (input: FormProps) => {
    const response = await publicApi.post("/users", {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    });
    return response.data;
  },
};
