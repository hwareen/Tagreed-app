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
},
  openai: "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" // ضعي مفتاحك المشحون هنا
};
////////

const API_KEY = "AIzaSyCNWmnJygQGp6nAQ0pbBL8XJK3rKE_d-ug"

const chatViewport = document.getElementById('chat-viewport');
const userInput = document.getElementById('user-input');
const sendTrigger = document.getElementById('send-trigger');

async function startConversation() {
    const text = userInput.value.trim();
    if (!text) return;

    appendBubble(text, 'user');
    userInput.value = "";

    const loading = appendBubble("تغريد تفكر...", 'tagreed');

    try {
        const response = await fetch('https://openai.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { 
                        role: "system", 
                        content: "أنتِ تغريد، أخصائية نفسية. حللي الاسم في أول رسالة: إذا كان ذكراً خاطبيه بالمذكر، وإذا أنثى بالمؤنث. كوني فخمة ودافئة." 
                    },
                    { role: "user", content: text }
                ]
            })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);

        loading.remove();
        appendBubble(data.choices[0].message.content, 'tagreed');

    } catch (err) {
        loading.innerText = "عذراً، تأكدي من شحن رصيد الـ API في OpenAI.";
        console.error(err);
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
///////////////////////////////////////


    
  
   

sendTrigger.addEventListener('click', startConversation);
userInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') startConversation(); });
