// 방문자 로그 기록 함수
function logVisitor() {
    const timestamp = new Date().toISOString();
    const referrer = document.referrer || "direct"; // 방문자가 어디서 왔는지 확인
    const userAgent = navigator.userAgent; // 기기 정보

    console.log(`방문 로그 - 시간: ${timestamp}, 유입 경로: ${referrer}, 기기: ${userAgent}`);

    fetch("/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            event: "page_visit",
            time: timestamp,
            referrer: referrer,
            userAgent: userAgent
        })
    }).then(response => response.json())
      .then(data => console.log("서버 응답:", data))
      .catch(error => console.error("로그 전송 오류:", error));
}

// 버튼 클릭 로그 기록 함수
function logButtonClick(eventLabel) {
    const timestamp = new Date().toISOString();
    console.log(`버튼 클릭 - 이벤트: ${eventLabel}, 시간: ${timestamp}`);

    fetch("/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            event: "button_click",
            label: eventLabel,
            time: timestamp
        })
    }).then(response => response.json())
      .then(data => console.log("서버 응답:", data))
      .catch(error => console.error("로그 전송 오류:", error));
}

// 🚀 GitHub에서 "raw" 이미지 URL 사용
const imageUrl = "https://raw.githubusercontent.com/sunheehee/GrossHacking/main/KakaoTalk_20250213_221702187.png";

// 버튼 클릭 이벤트 추가
document.addEventListener("DOMContentLoaded", function() {
    const dateButton = document.getElementById("dateButton");
    const priceButton = document.getElementById("priceButton");

    if (dateButton) {
        dateButton.addEventListener("click", function() {
            logButtonClick("날짜 선택");
            console.log("날짜 선택 버튼 클릭됨!"); // 디버깅 로그
            window.location.href = imageUrl; // 🚀 새 창이 아니라 현재 창에서 이동하도록 변경
        });
    } else {
        console.error("❌ dateButton을 찾을 수 없음!");
    }

    if (priceButton) {
        priceButton.addEventListener("click", function() {
            logButtonClick("가격 선택");
            console.log("가격 선택 버튼 클릭됨!"); // 디버깅 로그
            window.location.href = imageUrl; // 🚀 새 창이 아니라 현재 창에서 이동하도록 변경
        });
    } else {
        console.error("❌ priceButton을 찾을 수 없음!");
    }

    // 방문자 로그 실행
    logVisitor();
});
