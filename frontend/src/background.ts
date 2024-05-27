chrome.runtime.onMessage.addListener(
  (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: any) => void
  ) => {
    if (message.action === "sendText") {
      // Hier kannst du den Text an deinen Server senden oder speichern
      console.log("PDF Text:", message.text);
    }
  }
);
