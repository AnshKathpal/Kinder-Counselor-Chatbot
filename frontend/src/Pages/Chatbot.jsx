import React from "react";
import { useState } from "react";
import axios from "axios";
import { Box, Flex, Text } from "@chakra-ui/react";
import "../Chat.css";

export const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserMessage("");
    setIsLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        message: userMessage,
      });
      const modelReply = await response.data.message;
      console.log(modelReply);

      const updatedConversation = [
        ...conversation,
        { role: "user", content: userMessage },
        { role: "bot", content: modelReply },
      ];

      setConversation(updatedConversation);
      setIsLoading(false);

      // setUserMessage("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Flex
      w="100%"
      h="100vh"
      justify={"center"}
      align="center"
      direction={"column"}
      gap="25px"
      bg="#FFF3DA"
    >
      <Text  fontSize={"40px"} fontFamily = "'Paytone One', sans-serif">Kinder Counselor</Text>

      <Flex
        // border="1px solid red"
        shadow={
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"
        }
        w="75%"
        h="70vh"
        justify={"flex-end"}
        direction="column"
        bg="#DFCCFB"
        borderRadius={"3xl"}
      >
        <div
          className="messages-container"
          style={{
            height: "100%",
            overflowY: "scroll",
            padding: "10px",
          }}
        >
          {/* {isLoading ? (
            <div>Loading....</div>
          ) : ( */}
          {conversation.map((message, index) => (
            <div
              key={index}
              className={`message-container ${
                message.role === "user" ? "user-message" : "bot-message"
              }`}
              style={{
                display: "flex",
                justifyContent: `${
                  message.role == "user" ? "flex-end" : "flex-start"
                }`,
                width: "100%",
                padding: "10px 30px 10px 30px",
              }}
            >
              <div
                className={`message-container ${
                  message.role === "user" ? "user-message" : "bot-message"
                }`}
                style={{
                  width: `${message.role == "user" ? "30%" : "70%"}`,
                  backgroundColor: "#BEADFA",
                  padding: "10px",
                  borderRadius: "30px",
                  boxShadow:
                    "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                }}
              >
                <strong>
                  {message.role === "user" ? "You" : "Counseler"}:
                </strong>{" "}
                {message.content}
              </div>
            </div>
          ))}
          {/* )} */}
          {isLoading && (
            <div className="loader" style={{ textAlign: "center" }}>
              <img
                style={{ mixBlendMode: "multiply", width: "20%" }}
                src="https://cdn.dribbble.com/users/563824/screenshots/3678774/media/3364057f610900222ad8829fe390f80d.gif"
                alt=""
              />
            </div>
          )}
        </div>

        <form
          action=""
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <input
            style={{
              border: "1px solid grey",
              width: "70%",
              fontSize: "20px",
              padding: "5px",
              borderRadius: "10px",
            }}
            type="text"
            name=""
            id=""
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <input
            style={{
              cursor: "pointer",
              width: "12%",
              fontSize: "20px",
              padding: "5px",
              borderRadius: "10px",
              backgroundColor: "#BEADFA",
              boxShadow:
                "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
            }}
            type="submit"
          />
        </form>
      </Flex>
    </Flex>
  );
};
