
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { HomeView } from "@/modules/home/ui/views/home-view"
import { headers } from "next/headers";
import { redirect } from "next/navigation";
// import { caller } from "@/trpc/server";


const Page = async () => {
  // const greeting = await caller.hello({ text : "baloooo"});
  const session = await auth.api.getSession({
    headers : await headers()
  })

  if (!session){
    redirect("/sign-in")
  }
  // return <p className="pl-10">{greeting.greeting}</p>
  return <HomeView />
}

export default Page;