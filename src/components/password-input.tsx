import { EyeIcon, EyeOffIcon } from "lucide-react";
import { forwardRef, useState } from "react";

import type { PasswordInputsProps } from "@/types/components/password-input";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

// Tipagem do componente com forwardRef
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputsProps>(
  ({ placeholder, ...props }, ref) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    return (
      <div className="relative">
        <Input
          type={passwordIsVisible ? "text" : "password"}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
        <Button
          variant="ghost"
          className="text-muted-foreground absolute top-0 right-0 bottom-0 my-auto mr-1 h-8 w-8"
          onClick={() => setPasswordIsVisible((prev) => !prev)}
        >
          {passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput"; // necessário para forwardRef

export default PasswordInput;
