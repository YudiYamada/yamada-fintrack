import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import * as z from "zod";

import PasswordInput from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/contexts/auth";
import type { FormProps } from "@/types/components/form";

const signupSchema = z
  .object({
    firstName: z.string().trim().min(1, {
      message: "O nome é obrigatório.",
    }),
    lastName: z.string().trim().min(1, {
      message: "O sobrenome é obrigatório.",
    }),
    email: z
      .email({
        message: "O e-mail é inválido.",
      })
      .trim()
      .min(1, {
        message: "O e-mail é obrigatório.",
      }),
    password: z.string().trim().min(6, {
      message: "A senha deve ter no mínimo 6 caracteres.",
    }),
    passwordConfirmation: z.string().trim().min(6, {
      message: "A confirmação de senha é obrigatória.",
    }),
    terms: z.boolean().refine((value) => value === true, {
      message: "Você precisa aceitar os termos.",
    }),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation;
    },
    {
      message: "As senhas não coincidem.",
      path: ["passwordConfirmation"],
    }
  );

function SignupPage() {
  const { user, signup } = useAuthContext();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      terms: false,
    },
  });

  const handleSubmit = (data: FormProps) => signup(data);

  if (user) {
    return <h1>Olá {user.first_name}!</h1>;
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-[320px] md:w-md">
            <CardHeader>
              <CardTitle>Crie a sua conta</CardTitle>
              <CardDescription>Insira os seus dados abaixo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/*Nome*/}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*Sobrenome nome*/}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*Email*/}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*Senha*/}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={`Digite a sua senha`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*Confirmar senha*/}
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Digite a senha novamente</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={`Digite a sua senha novamente`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="items-top flex space-y-0 space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="leading-none">
                      <label
                        htmlFor="terms"
                        className={`text-muted-foreground text-xs opacity-75 ${form.formState.errors.terms && "text-red-500"}`}
                      >
                        Ao clicar em "Criar conta", você aceita{" "}
                        <a
                          href="#"
                          className={`cursor-pointer text-white underline`}
                        >
                          nosso termo de uso e política de privacidade.
                        </a>
                      </label>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Criar conta</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Já possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to={`/login`}>Faça login</Link>
        </Button>
      </div>
    </div>
  );
}

export default SignupPage;
