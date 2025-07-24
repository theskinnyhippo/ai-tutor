"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";


export const HomeView = () => {
    // const router = useRouter()
    const trpc = useTRPC();
    const { data } = useQuery(trpc.hello.queryOptions({ text : "Balo"}));
    
    // if (!session){
    //   return (
    //     <p>Loading...</p>
    //   )
    // }

  return(
      <div className="flex flex-col p-4 gap-y-4 bg-accent">
        { data?.greeting }
        {/* <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut({
                fetchOptions: {onSuccess: () => router.push("/sign-in")
                }
            })
        }>
          Sign Out
        </Button>  */}
      </div>
  );
}
