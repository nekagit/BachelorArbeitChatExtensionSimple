import * as pdfjsLib from "pdfjs-dist";

const extractTextFromPDF = async (url: string): Promise<string> => {
  // Set the worker source manually
  pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf.worker.js";

  const pdf = await pdfjsLib.getDocument(url).promise;
  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item: any) => item.str).join(" ");
    text += pageText;
  }

  return text;
};

const sendTextToPopup = (text: string) => {
  chrome.runtime.sendMessage({ action: "sendText", text });
};

const pdfElements = document.querySelectorAll(
  'embed[type="application/pdf"], iframe[src*=".pdf"]'
);

if (pdfElements.length > 0) {
  const pdfUrl =
    (pdfElements[0] as HTMLObjectElement).data ||
    (pdfElements[0] as HTMLIFrameElement).src;

  if (pdfUrl) {
    extractTextFromPDF(pdfUrl).then(sendTextToPopup);
  }
}
