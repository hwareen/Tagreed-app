// مفتاح Groq المجاني (gsk_...)
const FREE_API_KEY = "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"; 

const chatBox = document.getElementById('chat-box');
const userMsgInput = document.getElementById('user-msg');
const sendBtn = document.getElementById('send-btn');

async function handleChat() {
    const text = userMsgInput.value.trim();
    if (!text) return;

    addBubble(text, 'user');
    userMsgInput.value = "";

    const loading = addBubble("تغريد تفكر...", 'tagreed');

    try {
        const response = await fetch('https://groq.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${FREE_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama3-8b-8192", // نموذج مجاني وقوي جداً
                messages: [
                    { 
                        role: "system", 
                        content: "أنتِ تغريد، أخصائية نفسية دافئة. حللي اسم المستخدم في بداية الحوار، إذا كان ذكراً خاطبيه بالمذكر، وإذا أنثى بالمؤنث. لغتكِ عربية راقية وفخمة." 
                    },
                    { role: "user", content: text }
                ]
            })
        });

        const data = await response.json();
        loading.remove();
        addBubble(data.choices[0].message.content, 'tagreed');

    } catch (err) {
        loading.innerText = "عذراً، يبدو أن هناك ضغطاً على النظام المجاني. حاولي مرة أخرى.";
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
