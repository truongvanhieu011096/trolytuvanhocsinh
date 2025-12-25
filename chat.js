const chatBox = document.getElementById("chat-box");
const input = document.getElementById("chat-input");

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && input.value.trim() !== "") {
    sendMessage();
  }
});

function sendMessage() {
  const message = input.value.trim();
  appendMessage("user", message);

  const reply = getReply(message);
  setTimeout(() => appendMessage("bot", reply), 500);

  input.value = "";
}

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.className = sender;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function detectTopic(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("không muốn sống") || msg.includes("muốn biến mất"))
    return "nguy_co";

  if (msg.includes("bắt nạt") || msg.includes("đánh"))
    return "bat_nat";

  if (msg.includes("áp lực") || msg.includes("mệt") || msg.includes("học"))
    return "ap_luc";

  if (msg.includes("bạn") || msg.includes("cãi"))
    return "ban_be";

  if (msg.includes("cô đơn") || msg.includes("không ai"))
    return "co_don";

  if (msg.includes("rối") || msg.includes("lo"))
    return "roi";

  return "mac_dinh";
}

function getReply(message) {
  const topic = detectTopic(message);
  let reply = randomFrom(RESPONSES[topic]);

  if (topic !== "mac_dinh") {
    reply += "\n\nNếu em muốn được thầy cô hỗ trợ trực tiếp, em có thể gửi tại:\n" + SUPPORT_LINK;
  }

  return reply;
}
