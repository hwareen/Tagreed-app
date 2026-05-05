// ضع مفتاح جوجل هنا (يبدأ بـ AIza)
const GEMINI_API_KEY = "AIzaSyA3kfmCctS9FMnHNAndSbjXEo6qNELjPFY";

const chatBox = document.getElementById('chat-box');
const userMsgInput = document.getElementById('user-msg');
const sendBtn = document.getElementById('send-btn');

async function handleChat() {
    const text = userMsgInput.value.trim();
    if (!text || GEMINI_API_KEY.includes("AIza")) return;

    addBubble(text, 'user');
    userMsgInput.value = "";

    const loading = addBubble("تغريد تفكر بعمق...", 'tagreed');

    try {
        const url = `https://googleapis.com{GEMINI_API_KEY}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `أنتِ تغريد، أخصائية نفسية عربية فخمة.
                        قاعدة: حللي الاسم الأول في الرسالة القادمة؛ إذا كان ذكراً خاطبيه بالمذكر، وإذا أنثى بالمؤنث.
                        كوني دافئة جداً ووفري الدعم النفسي.
                        الرسالة هي: ${text}`
                    }]
                }]
            })
        });

        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;

        loading.remove();
        addBubble(reply, 'tagreed');

    } catch (err) {
        loading.innerText = "عذراً، يبدو أن هناك مشكلة في الاتصال. سأكون معكِ قريباً.";
        console.error(err);
    }
}

function addBubble(text, type) {
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    return div;
}

sendBtn.addEventListener('click', handleChat);
userMsgInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleChat(); });
