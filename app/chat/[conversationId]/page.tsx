
import React from "react";
import Form from "./components/Form";
import Body from "./components/Body";
import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import Header from "./components/Header";
import EmptyState from "@/components/EmptyState";

const page = async ({ params }: { params: { conversationId: string } }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default page;
