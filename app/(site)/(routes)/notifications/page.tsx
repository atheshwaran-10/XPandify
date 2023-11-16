import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import useCurrentUser from "@/hooks/useCurrentUser";

import { getSession } from "next-auth/react";



const Notifications = () => {
  return ( 
    <>
      <Header label="Notifications" />
      <NotificationsFeed />
    </>
   );
}
 
export default Notifications;