"use client";
import { XIcon } from "lucide-react";
import Image from "next/image";
import XBlack from "@/public/images/X-Logo-PNG.png";
import { useTheme } from "next-themes";
import XWhite from "@/public/images/X-White-Logo-PNG.png";
import useNotifications from "@/hooks/useNotifications";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect } from "react";

const NotificationsFeed = () => {

  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);
  const { theme } = useTheme();

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
        >
          <Image
            alt=""
            src={theme === "light" ? XBlack : XWhite}
            height={30}
            width={30}
          />
          <p className=" ">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
