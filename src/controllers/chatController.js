import chatService from "../services/ChatService";

// import notifyService from "../services/NotifyService";
const handleGetChat = async (req, res) => {
  //   const data = req.params;

  const reg = await chatService.handleGetChatService();
  // console.log(reg);
  return res.status(200).json({
    reg,
  });

  // console.log(data);
  //   return res.status(400).json({
  //     EC: 5,
  //     EM: "MISSING DATA",
  //   });
};

const handlePushChat = async (req, res) => {
  const data = req.body;
  if (data && data.userFrom && data.userTo && data.chat) {
    const reg = await chatService.handlePushChatService(
      data.userFrom,
      data.userTo,
      chat
    );
    // console.log(reg);
    return res.status(200).json({
      reg,
    });
  } else {
    // console.log(data);
      return res.status(400).json({
        EC: 5,
        EM: "MISSING DATA",
      });
  }
};
export default {
  handleGetChat,
  handlePushChat,
};
