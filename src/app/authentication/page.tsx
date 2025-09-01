import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInFormComponet from "./components/sign-in-form";
import SignUpFormComponet from "./components/sign-up-form";

const AuthenticationPage = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 p-5">
      <Tabs defaultValue="sign-in">
        <TabsList>
          <TabsTrigger value="sign-in">Entrar</TabsTrigger>
          <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignInFormComponet />
        </TabsContent>

        <TabsContent value="sign-up">
          <SignUpFormComponet />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPage;
