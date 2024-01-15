"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import clsx from "clsx";
import { find } from "lodash";

import useConversation from "@/hooks/useConversation";
import { pusherClient } from "@/libs/pusher";
import ConversationBox from "./ConversationBox";
import { FullConversationType } from "@/types";
import { ModeToggle } from "@/components/ui/toggle";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
  title?: string;
  currentUser: User;
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users,
  currentUser,
}) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const session = useSession();

  const { conversationId, isOpen } = useConversation();

  if (!currentUser?.emailVerified) router.push("/verify");

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    console.log(process.env.PUSHER_SECRET);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });
    };

    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:remove", removeHandler);
  }, [pusherKey, router]);

  return (
    <>
      <aside
        className={clsx(
          `
      `,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold  ml-6">Messenger</div>
            <div
              onClick={() => router.push("/chat")}
              className="
                rounded-full 
                p-2 
                cursor-pointer 
                hover:opacity-75 
                transition
              "
            >
              <div className="flex flex-row gap-x-8">
                <MdOutlineGroupAdd size={20} />
                <div className="-mt-3">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
