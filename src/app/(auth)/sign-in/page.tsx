import { SignInView } from "@/modules/auth/views/sign-in-view";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const Page = async () => {
    const session = await auth.api.getSession({
        headers : await headers()
      })
    
      if (!!session){
        redirect("/")
      }
    
    return (
        <SignInView />
    );
}

export default Page;

// localhost:3000/auth/sign-in