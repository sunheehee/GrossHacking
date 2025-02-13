// 방문자 로그 기록 함수
function logVisitor() {
    const timestamp = new Date().toISOString();
    const referrer = document.referrer || "direct"; // 방문자가 어디서 왔는지 확인
    const userAgent = navigator.userAgent; // 기기 정보

    console.log(`✅ 방문 로그 - 시간: ${timestamp}, 유입 경로: ${referrer}, 기기: ${userAgent}`);

    // 현재는 로그를 서버에 전송할 곳이 없으므로, fetch 요청을 주석 처리
    /*
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
      .then(data => console.log("✅ 서버 응답:", data))
      .catch(error => console.error("❌ 로그 전송 오류:", error));
    */
}

// 버튼 클릭 로그 기록 함수
function logButtonClick(eventLabel) {
    const timestamp = new Date().toISOString();
    console.log(`✅ 버튼 클릭 - 이벤트: ${eventLabel}, 시간: ${timestamp}`);

    // 현재는 로그를 서버에 전송할 곳이 없으므로, fetch 요청을 주석 처리
    /*
    fetch("/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            event: "button_click",
            label: eventLabel,
            time: timestamp
        })
    }).then(response => response.json())
      .then(data => console.log("✅ 서버 응답:", data))
      .catch(error => console.error("❌ 로그 전송 오류:", error));
    */
}

// GitHub에 업로드된 이미지 URL (RAW URL 사용)
const imageUrl = "https://github.com/sunheehee/GrossHacking/raw/main/KakaoTalk_20250213_221702187.png?raw=true";

// 새 창에서 이미지 열기 (팝업 차단 우회)
function openImage(eventLabel) {
    logButtonClick(eventLabel);
    setTimeout(() => {
        window.open(imageUrl, "_blank", "noopener,noreferrer");
    }, 100); // 100ms 지연 후 실행 (팝업 차단 회피)
}

// 페이지가 로드되면 버튼 이벤트 추가 (CSP 우회)
document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ script.js 로드 완료!");

    const dateButton = document.getElementById("dateButton");
    const priceButton = document.getElementById("priceButton");

    if (dateButton) {
        console.log("✅ 날짜 선택 버튼 감지됨!");
        dateButton.addEventListener("click", function () {
            console.log("✅ 날짜 버튼 클릭됨!");
            openImage("날짜 선택");
        });
    } else {
        console.error("❌ 날짜 선택 버튼을 찾을 수 없음!");
    }

    if (priceButton) {
        console.log("✅ 가격 선택 버튼 감지됨!");
        priceButton.addEventListener("click", function () {
            console.log("✅ 가격 버튼 클릭됨!");
            openImage("가격 선택");
        });
    } else {
        console.error("❌ 가격 선택 버튼을 찾을 수 없음!");
    }

    // 방문자 로그 실행
    logVisitor();
});
