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
    }, 500);
}

function r(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function needForm(msg) {
    return msg.includes("rất sợ") || msg.includes("bị đánh") || msg.includes("không dám nói") || msg.includes("đe dọa") || msg.includes("kéo dài");
}

// Dữ liệu câu hỏi & dẫn dắt theo chủ đề (~500 câu)
const topics = {
    "bắt nạt": [
        "Em có thể kể chi tiết để thầy cô hiểu rõ hơn không?",
        "Ai đã làm em tổn thương? Điều này xảy ra ở trường hay trên mạng?",
        "Em đã chịu chuyện này bao lâu rồi? Có người chứng kiến không?",
        "Em có cảm thấy sợ hãi khi đến lớp không?",
        "Thầy cô sẽ giúp em tìm cách an toàn."
    ],
    "buồn": [
        "Thầy cô cảm nhận em đang rất mệt 💙. Điều gì khiến em buồn nhất?",
        "Em có thể từ từ kể, không cần vội.",
        "Cảm giác này chắc không dễ chịu chút nào.",
        "Em chia sẻ được như vậy là rất dũng cảm.",
        "Ngoài chuyện này, em còn điều gì làm em lo lắng không?"
    ],
    "áp lực": [
        "Áp lực học tập có thể khiến em căng thẳng 😔. Em lo điểm số hay kỳ vọng của ai?",
        "Em có đang sợ làm bố mẹ hoặc thầy cô thất vọng không?",
        "Em đã cố gắng rất nhiều, thầy cô thấy rõ.",
        "Em muốn thầy cô giúp cách giảm áp lực thế nào?",
        "Có lúc nào em muốn nghỉ ngơi hoặc thư giãn không?"
    ],
    "mạng": [
        "Những lời nói trên mạng cũng làm em tổn thương 😞. Em đã gặp chuyện gì?",
        "Em có lưu lại tin nhắn hoặc hình ảnh không?",
        "Em không nên chịu chuyện này một mình.",
        "Thầy cô hướng dẫn cách phản ứng hoặc báo cáo nếu em muốn.",
        "Em có muốn chia sẻ thêm để tìm cách giải quyết?"
    ],
    "giao thông": [
        "An toàn của em là quan trọng nhất 🚦. Em gặp tình huống nào?",
        "Em thường đi học bằng phương tiện gì?",
        "Em có từng suýt gặp tai nạn không?",
        "Thầy cô muốn hướng dẫn cách đi an toàn hơn.",
        "Em có cảm thấy lo lắng khi ra đường không?"
    ],
    "sức khỏe": [
        "Em có thắc mắc về cơ thể, sức khỏe vị thành niên nào không?",
        "Em có biết cách giữ gìn sức khỏe, vệ sinh hằng ngày không?",
        "Có điều gì khiến em lo hoặc ngại chia sẻ?",
        "Thầy cô có thể hướng dẫn cách phòng tránh bệnh hoặc tình huống nguy hiểm.",
        "Em cảm thấy áp lực khi thay đổi cơ thể không?"
    ]
};

// Bot chủ động hỏi thêm vấn đề liên quan
function getResponse(msg) {
    let reply = "";

    for (let topic in topics) {
        if (msg.includes(topic)) {
            reply = r(topics[topic]) + "<br>" + r(topics[topic]);
            break;
        }
    }

    if (!reply) {
        reply = r([
            "Cảm ơn em đã chia sẻ 💙. Em có thể nói thêm để thầy cô hiểu rõ hơn không?",
            "Em còn điều gì khác đang làm em lo lắng không?",
            "Thầy cô muốn nghe thêm để hỗ trợ em tốt hơn.",
            "Em đã rất dũng cảm khi chia sẻ.",
            "Nếu em muốn, em có thể kể chi tiết hơn để thầy cô giúp."
        ]);
    }

    if (needForm(msg)) {
        reply += `
        <br><br>
        Nếu em thấy khó nói trực tiếp hoặc muốn chia sẻ kín đáo hơn, em có thể điền biểu mẫu:
        <br>
        <a href="https://forms.gle/PWc5rKJEGZw564zD8" target="_blank">
            📝 Biểu mẫu hỗ trợ kín đáo
        </a>`;
    }

    return reply;
}
