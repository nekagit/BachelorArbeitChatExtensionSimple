document.addEventListener("DOMContentLoaded", () => {
  const inputElement = document.getElementById(
    "chat-input"
  ) as HTMLInputElement;
  const outputElement = document.getElementById(
    "chat-output"
  ) as HTMLDivElement;
  const sendButton = document.getElementById(
    "send-button"
  ) as HTMLButtonElement;

  sendButton.addEventListener("click", async () => {
    const userInput = inputElement.value;
    if (userInput) {
      const userMessageElement = document.createElement("div");
      userMessageElement.textContent = `User: ${userInput}`;
      outputElement.appendChild(userMessageElement);

      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      const botMessageElement = document.createElement("div");
      botMessageElement.textContent = `Bot: ${data.reply}`;
      outputElement.appendChild(botMessageElement);

      inputElement.value = "";
    }
  });
});
