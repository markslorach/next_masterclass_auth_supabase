import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// components
import NavBar from "../components/NavBar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({children}) {

  const supabase = createServerComponentClient({cookies});
  const {data} = await supabase.auth.getSession()

  if(!data.session){
    redirect('/login')
  }

  return (
    <>
        <NavBar user={data.session.user}/>
        {children}
    </>
  )
}
