import getCurrentUser from "@/actions/getCurrentUser"
import AuthForm from "./components/Authform"

export default async function Home() {
  const currentUser= await getCurrentUser()

  
  return (
    <div
    className="
    flex
    min-h-full
    h-screen
    flex-col
    sm:px-6
    lg:px-8
    bg-white
    dark:bg-black
    "
    >
     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    
      <h2
      className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
      >
       Verify Your Email Address
      </h2>
     </div>
      <AuthForm currentUser={currentUser!}/>
    </div>
  )
}
