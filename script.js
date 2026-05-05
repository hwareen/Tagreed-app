:root {
    --bg: #F1F5F9;
    --surface: #FFFFFF;
    --primary: #1E293B;
    --accent: #334155;
    --tagreed-bg: #F8FAFC;
    --user-bg: #1E293B;
    --danger: #EF4444;
}

body {
    margin: 0; background-color: var(--bg);
    font-family: 'Cairo', sans-serif;
    display: flex; justify-content: center; align-items: center;
    height: 100vh; color: var(--primary);
}

.app-container {
    width: 100%; max-width: 500px; height: 95vh;
    background: var(--surface); display: flex; flex-direction: column;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05); border-radius: 30px; overflow: hidden;
}

.app-header {
    padding: 20px 25px; border-bottom: 1px solid #F1F5F9;
    display: flex; justify-content: space-between; align-items: center;
}

.profile { display: flex; align-items: center; gap: 15px; }
.avatar { position: relative; width: 50px; height: 50px; }
.avatar img { border-radius: 15px; width: 100%; }
.pulse {
    position: absolute; bottom: -2px; right: -2px; width: 12px; height: 12px;
    background: #10B981; border: 2px solid white; border-radius: 50%;
}

.info h1 { margin: 0; font-size: 18px; font-weight: 700; }
.info p { margin: 0; font-size: 11px; color: #64748B; }

.btn-emergency {
    text-decoration: none; color: var(--danger); background: #FEF2F2;
    padding: 8px 16px; border-radius: 12px; font-size: 13px; font-weight: bold;
}

.chat-viewport {
    flex: 1; overflow-y: auto; padding: 25px;
    display: flex; flex-direction: column; gap: 20px;
}

.bubble {
    max-width: 85%; padding: 18px 22px; font-size: 18px; line-height: 1.6;
    animation: fadeInUp 0.4s ease;
}

.tagreed { background: var(--tagreed-bg); align-self: flex-start; border-radius: 5px 20px 20px 20px; color: var(--primary); }
.user { background: var(--user-bg); align-self: flex-end; border-radius: 20px 20px 5px 20px; color: white; }

.input-section { padding: 20px 25px; background: white; }
.input-wrapper {
    display: flex; background: #F8FAFC; border: 1px solid #E2E8F0;
    border-radius: 18px; padding: 10px 10px 10px 20px; align-items: center;
}

input {
    flex: 1; border: none; background: transparent; outline: none;
    font-family: 'Cairo'; font-size: 18px;
}

#send-trigger {
    background: var(--primary); color: white; border: none;
    width: 45px; height: 45px; border-radius: 14px; cursor: pointer;
}

@keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
