import clsx from "clsx";
import useConversation from "@/hooks/useConversation";
import ConversationList from "./components/ConversationList";
import getConversations from "@/actions/getConversations";
import getUsers from "@/actions/getUsers";
import getCurrentUser from "@/actions/getCurrentUser";
import { useRouter } from "next/navigation";

const Home = async () => {
  const conversations = await getConversations();
  const users = await getUsers();
  const currentUser = await getCurrentUser();

  return (
    <div className={clsx("")}>
      <ConversationList users={users} currentUser={currentUser!} initialItems={conversations} />
    </div>
  );
};

export default Home;
