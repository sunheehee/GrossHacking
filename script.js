// Google Sheets API URL (Apps Script에서 배포한 Web App URL 입력)
const LOG_API_URL = "https://script.google.com/macros/s/AKfycbxwk6FlBlXuelIDCK_VFaR7lKI6HzqeOjBjSI-bD2i_0ppyJN-OurM6RnamN0MfN_5q/exec"; // ← 새 URL 입력!

// ✅ 방문자 로그 기록 함수
function logVisitor() {
    const timestamp = new Date().toISOString();
    const referrer = document.referrer || "direct";
    const userAgent = navigator.userAgent;

    console.log(`✅ 방문 로그 - 시간: ${timestamp}, 유입 경로: ${referrer}, 기기: ${userAgent}`);

    fetch(LOG_API_URL, {
        method: "POST",
        mode: "cors", // CORS 허용 모드 변경
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            event: "page_visit",
            time: timestamp,
            referrer: referrer,
            userAgent: userAgent
        })
    })
    .then(response => response.json())
    .then(data => console.log("✅ 로그 전송 성공:", data))
    .catch(error => console.error("❌ 로그 전송 오류:", error));
}

// ✅ 버튼 클릭 로그 기록 함수 + 이미지 이동
function logButtonClick(eventLabel) {
    const timestamp = new Date().toISOString();
    console.log(`✅ 버튼 클릭 - 이벤트: ${eventLabel}, 시간: ${timestamp}`);

    fetch(LOG_API_URL, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            event: eventLabel,
            time: timestamp
        })
    })
    .then(response => response.json())
    .then(data => console.log("✅ 로그 전송 성공:", data))
    .catch(error => console.error("❌ 로그 전송 오류:", error));

    // ✅ 버튼 클릭 시 이미지 화면으로 이동
    const imageUrl = "https://github.com/sunheehee/GrossHacking/raw/main/KakaoTalk_20250213_221702187.png?raw=true";
    window.open(imageUrl, "_blank");
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
