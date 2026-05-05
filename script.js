// 1. إعدادات المفاتيح
const config = {
    firebase: {
        apiKey: "YOUR_FIREBASE_KEY", // استبدليها ببياناتك من Firebase
        projectId: "YOUR_PROJECT_ID",
        appId: "YOUR_APP_ID"
    },
    openai: "sk-xxxxxxxxxxxxxxxxxxxxxxxx" // ضعي مفتاحك المشحون هنا
};

// 2. تهيئة Firebase للسحابة
firebase.initializeApp(config.firebase);
const db = firebase.firestore();

const chatViewport = document.getElementById('chat-viewport');
const userInput = document.getElementById('user-input');
const sendTrigger = document.getElementById('send-trigger');

// 3. معالج إرسال الرسالة والتحليل
async function startConversation() {
    const text = userInput.value.trim();
    if (!text) return;

    // عرض رسالة المستخدم وحفظها سحابياً للمتابعة
    appendBubble(text, 'user');
    userInput.value = "";
    
    await db.collection("conversations").add({
        text: text, sender: "user", time: new Date()
    });

    const skeleton = appendBubble("تغريد تحلل حالتك الآن...", 'tagreed');

    try {
        const response = await fetch('https://openai.com', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${config.openai}` 
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { 
                        role: "system", 
                        content: `أنتِ تغريد، أخصائية نفسية عربية فخمة وراقية.
                        قاعدة ذهبية: حللي الاسم الأول في رسالة المستخدم. إذا كان مذكراً (أحمد، خالد، إلخ) خاطبيه بصيغة المذكر. إذا كان مؤنثاً (سارة، ليلى، إلخ) خاطبيه بصيغة المؤنث. إذا لم يذكر اسماً، خاطبيه بصيغة المؤنث افتراضياً بأسلوب دافئ.` 
                    },
                    { role: "user", content: text }
                ]
            })
        });

        const data = await response.json();
        
        // التحقق من صحة المفتاح والرصيد
        if (data.error) throw new Error(data.error.message);

        skeleton.remove();
        const reply = data.choices.message.content;
        appendBubble(reply, 'tagreed');

        // حفظ رد تغريد للمسؤول
        await db.collection("conversations").add({
            text: reply, sender: "tagreed", time: new Date()
        });

    } catch (err) {
        skeleton.innerText = "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";
        console.error("Technical Error:", err);
    }
}

function appendBubble(text, type) {
    const div = document.createElement('div');
    div.className = `bubble ${type}`;
    div.innerText = text;
    chatViewport.appendChild(div);
    chatViewport.scrollTop = chatViewport.scrollHeight;
    return div;
}

sendTrigger.addEventListener('click', startConversation);
userInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') startConversation(); });
