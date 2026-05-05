const OPENAI_KEY = "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"; // sk-xxxx

const chatBox = document.getElementById('chat-box');
const userMsgInput = document.getElementById('user-msg');
const sendBtn = document.getElementById('send-btn');

async function handleChat() {
    const text = userMsgInput.value.trim();
    if (!text) return;

    addBubble(text, 'user');
    userMsgInput.value = "";

    const loading = addBubble("تغريد تفكر بعمق...", 'tagreed');

    try {
        const response = await fetch('https://openai.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { 
                        role: "system", 
                        content: "أنتِ تغريد، أخصائية نفسية راقية وفخمة. إذا ذكر المستخدم اسمه، حللي فوراً إذا كان ذكراً (أحمد، علي، إلخ) فخاطبيه بالمذكر. وإذا كان أنثى (سارة، ليلى، إلخ) فخاطبيها بالمؤنث. إذا لم يتضح، استخدمي صيغة المؤنث الافتراضية الدافئة." 
                    },
                    { role: "user", content: text }
                ]
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            loading.remove();
            addBubble(data.choices[0].message.content, 'tagreed');
        } else {
            throw new Error("فشل الرد");
        }

    } catch (err) {
        loading.innerText = "عذراً، أحتاج للتأكد من رصيدي أو مفتاح الـ API. أنا معكِ دائماً.";
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
