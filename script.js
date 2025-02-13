// Google Sheets API URL (Apps Script에서 배포한 Web App URL 입력)
const LOG_API_URL = "https://script.google.com/macros/s/AKfycbxjgW-W5ZXZGoaEDXnHhM2Zu0kihLvyWiFxvWQhvXE9BvcMJmnTxsJ5jOcW-RKphk3L/exec"; // ← 여기에 새 URL 넣기!

// ✅ 방문자 로그 기록 함수
function logVisitor() {
    const timestamp = new Date().toISOString();
    const referrer = document.referrer || "direct";
    const userAgent = navigator.userAgent;

    console.log(`✅ 방문 로그 - 시간: ${timestamp}, 유입 경로: ${referrer}, 기기: ${userAgent}`);

    fetch(LOG_API_URL, {
        method: "POST",
        mode: "no-cors", // CORS 오류 방지 설정 추가
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            event: "page_visit",
            time: timestamp,
            referrer: referrer,
            userAgent: userAgent
        })
    })
    .then(() => console.log("✅ 로그 전송 성공"))
    .catch(error => console.error("❌ 로그 전송 오류:", error));
}

// ✅ 버튼 클릭 로그 기록 함수
function logButtonClick(eventLabel) {
    const timestamp = new Date().toISOString();
    console.log(`✅ 버튼 클릭 - 이벤트: ${eventLabel}, 시간: ${timestamp}`);

    fetch(LOG_API_URL, {
        method: "POST",
        mode: "no-cors", // CORS 오류 방지 설정 추가
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            event: eventLabel,
            time: timestamp
        })
    })
    .then(() => console.log("✅ 로그 전송 성공"))
    .catch(error => console.error("❌ 로그 전송 오류:", error));
}

// ✅ 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ script.js 로드 완료!");

    document.getElementById("dateButton").addEventListener("click", function() {
        logButtonClick("날짜 선택");
    });

    document.getElementById("priceButton").addEventListener("click", function() {
        logButtonClick("가격 선택");
    });

    logVisitor();
});
