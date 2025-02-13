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

// 페이지가 로드되면 버튼 이벤트 추가 (CSP 우회)
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("dateButton").addEventListener("click", function() {
        logButtonClick("날짜 선택");
        window.open("https://github.com/sunheehee/GrossHacking/blob/main/KakaoTalk_20250213_221702187.png?raw=true", "_blank");
    });

    document.getElementById("priceButton").addEventListener("click", function() {
        logButtonClick("가격 선택");
        window.open("https://github.com/sunheehee/GrossHacking/blob/main/KakaoTalk_20250213_221702187.png?raw=true", "_blank");
    });

    // 방문자 로그 실행
    logVisitor();
});
