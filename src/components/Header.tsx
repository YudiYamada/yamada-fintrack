import { ChevronDownIcon, JapaneseYen, LogOutIcon } from "lucide-react";

import { useAuthContext } from "@/contexts/auth";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function Header() {
  const { user, signOut } = useAuthContext();
  return (
    <Card>
      <CardContent className="flex items-center justify-between px-8 py-0.5">
        <div>
          <h1 className="flex items-center justify-center gap-3">
            <JapaneseYen className="h-16 w-16" />{" "}
            <span className="text-lg font-bold">Yamanada Finance Track</span>
          </h1>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="space-x-1">
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback>
                    {user?.firstName[0]} {user?.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm">
                  {user?.firstName} {user?.lastName}
                </p>
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  variant={`ghost`}
                  size={`sm`}
                  className="w-full justify-start"
                  onClick={signOut}
                >
                  <LogOutIcon /> Sair
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

export default Header;
