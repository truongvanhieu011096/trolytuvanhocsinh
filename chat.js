const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");

input.addEventListener("keydown", e => {
    if (e.key === "Enter") send();
});

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = sender;
    div.innerHTML = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function quick(text) {
    input.value = text;
    send();
}

function send() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, "user");
    input.value = "";
    setTimeout(() => {
        addMessage(getResponse(text.toLowerCase()), "bot");
    }, 600);
}

function r(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function needForm(msg) {
    return msg.includes("rất sợ")
        || msg.includes("bị đánh")
        || msg.includes("bị đe dọa")
        || msg.includes("không dám nói")
        || msg.includes("kéo dài");
}

function getResponse(msg) {

    let reply = "";

    if (msg.includes("bắt nạt")) {
        reply = r([
            "Nghe em nói vậy, chắc em đã rất tổn thương 😞. Chuyện này xảy ra với em trong hoàn cảnh nào?",
            "Bị bắt nạt không phải lỗi của em. Em có thể kể thêm để thầy cô hiểu rõ hơn không?",
            "Em đã phải chịu đựng chuyện này bao lâu rồi?",
            "Có ai chứng kiến hoặc biết chuyện này không em?"
        ]);
    }

    else if (msg.includes("buồn") || msg.includes("lo") || msg.includes("rối")) {
        reply = r([
            "Thầy cô cảm nhận được em đang rất mệt 💙. Điều gì khiến em buồn nhất lúc này?",
            "Em có thể từ từ nói ra, không cần vội.",
            "Cảm giác này chắc không dễ chịu chút nào. Em đang lo về chuyện gì?",
            "Em chia sẻ được như vậy là rất can đảm rồi."
        ]);
    }

    else if (msg.includes("áp lực") || msg.includes("học")) {
        reply = r([
            "Áp lực học tập có thể khiến mình rất căng thẳng 😔. Em đang lo về điểm số hay kỳ vọng của ai đó?",
            "Em có đang sợ làm ai thất vọng không?",
            "Thầy cô thấy em đang cố gắng rất nhiều.",
            "Em muốn được giúp theo cách nào?"
        ]);
    }

    else if (msg.includes("mạng")) {
        reply = r([
            "Những lời nói trên mạng cũng có thể làm mình rất buồn 😞. Em đã gặp chuyện gì?",
            "Em có lưu lại tin nhắn hoặc hình ảnh đó không?",
            "Em không nên chịu chuyện này một mình.",
            "Thầy cô ở đây để giúp em tìm cách an toàn hơn."
        ]);
    }

    else {
        reply = r([
            "Cảm ơn em đã chia sẻ 💙. Em có thể nói rõ hơn một chút không?",
            "Thầy cô đang lắng nghe em.",
            "Chuyện của em rất quan trọng.",
            "Em cứ tiếp tục nói, không sao cả."
        ]);
    }

    if (needForm(msg)) {
        reply += `
        <br><br>
        Nếu em cảm thấy khó nói trực tiếp hoặc muốn chia sẻ kín đáo hơn,
        em có thể điền vào biểu mẫu này để thầy cô hỗ trợ riêng cho em:
        <br>
        <a href="https://forms.gle/PWc5rKJEGZw564zD8" target="_blank">
            📝 Biểu mẫu hỗ trợ kín đáo
        </a>`;
    }

    return reply;
}
