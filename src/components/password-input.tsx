import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

import type { PasswordInputsProps } from "@/types/components/password-input";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

function PasswordInput({ placeholder }: PasswordInputsProps) {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  return (
    <div className="relative">
      <Input
        type={passwordIsVisible ? "text" : "password"}
        placeholder={placeholder}
      />
      <Button
        variant={`ghost`}
        className="text-muted-foreground absolute top-0 right-0 bottom-0 my-auto mr-1 h-8 w-8"
        onClick={() => setPasswordIsVisible((prev) => !prev)}
      >
        {passwordIsVisible ? <EyeOffIcon /> : <EyeIcon />}
      </Button>
    </div>
  );
}

export default PasswordInput;
