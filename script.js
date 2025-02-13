// Google Sheets API URL (Apps Script에서 제공하는 URL 입력)
const LOG_API_URL = "https://script.google.com/macros/s/AKfycbxU1cR5Bquj37L__KFLrFBGgNdmgtY1r8rj0mNdk4nSagv8dbk_UgOVrR70nsmeJzhG/exec"; // ← 여기에 Apps Script 배포된 URL 입력

// 방문자 로그 기록 함수
function logVisitor() {
    const timestamp = new Date().toISOString();
    const referrer = document.referrer || "direct"; // 방문자가 어디서 왔는지 확인
    const userAgent = navigator.userAgent; // 기기 정보

    console.log(`✅ 방문 로그 - 시간: ${timestamp}, 유입 경로: ${referrer}, 기기: ${userAgent}`);

    // Google Sheets에 로그 전송
    fetch(LOG_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            event: "page_visit",
            time: timestamp,
            referrer: referrer,
            userAgent: userAgent
        })
    })
    .then(response => response.text())
    .then(data => console.log("✅ 서버 응답:", data))
    .catch(error => console.error("❌ 로그 전송 오류:", error));
}

// 버튼 클릭 로그 기록 함수
function logButtonClick(eventLabel) {
    const timestamp = new Date().toISOString();
    console.log(`✅ 버튼 클릭 - 이벤트: ${eventLabel}, 시간: ${timestamp}`);

    // Google Sheets에 로그 전송
    fetch(LOG_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            event: eventLabel,
            time: timestamp
        })
    })
    .then(response => response.text())
    .then(data => console.log("✅ 서버 응답:", data))
    .catch(error => console.error("❌ 로그 전송 오류:", error));
}

// 페이지가 로드되면 버튼 이벤트 추가 (CSP 우회)
document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ script.js 로드 완료!");

    document.getElementById("dateButton").addEventListener("click", function() {
        logButtonClick("날짜 선택");
    });

    document.getElementById("priceButton").addEventListener("click", function() {
        logButtonClick("가격 선택");
    });

    logVisitor(); // 방문자 로그 실행
});
