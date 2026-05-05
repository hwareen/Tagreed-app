// 1. إعدادات المفاتيح
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNWmnJygQGp6nAQ0pbBL8XJK3rKE_d-ug",
  authDomain: "tagreedapp-72d72.firebaseapp.com",
  projectId: "tagreedapp-72d72",
  storageBucket: "tagreedapp-72d72.firebasestorage.app",
  messagingSenderId: "638611639219",
  appId: "1:638611639219:web:e32635983470c8f84919c6",
  measurementId: "G-T20N54D81J"
};
    openai: "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" // ضعي مفتاحك المشحون هنا
};

// 2. تهيئة Firebase للسحابة
firebase.initializeApp(firebaseConfig);
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
