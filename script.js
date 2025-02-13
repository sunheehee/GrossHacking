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

// GitHub에 업로드된 이미지 URL (실제 사용 가능한 RAW URL 입력)
const imageUrl = "https://github.com/sunheehee/GrossHacking/raw/main/KakaoTalk_20250213_221702187.png?raw=true";

// 새 창에서 이미지 열기 (팝업 차단 우회)
function openImage() {
    logButtonClick("이미지 보기");
    setTimeout(() => {
        window.open(imageUrl, "_blank", "noopener,noreferrer");
    }, 100); // 100ms 지연 후 실행 (팝업 차단 회피)
}

// 페이지가 로드되면 버튼 이벤트 추가 (CSP 우회)
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("dateButton").addEventListener("click", openImage);
    document.getElementById("priceButton").addEventListener("click", openImage);
    logVisitor(); // 방문자 로그 실행
});

document.addEventListener("DOMContentLoaded", function() {
    console.log("script.js 로드 완료!"); // 스크립트 실행 확인

    const dateButton = document.getElementById("dateButton");
    const priceButton = document.getElementById("priceButton");

    if (dateButton) {
        console.log("날짜 버튼 감지됨!"); // 버튼 감지 여부 확인
        dateButton.addEventListener("click", function() {
            console.log("날짜 버튼 클릭됨!"); // 클릭 이벤트 감지 확인
            window.open("https://github.com/sunheehee/GrossHacking/raw/main/KakaoTalk_20250213_221702187.png?raw=true", "_blank", "noopener,noreferrer");
        });
    } else {
        console.log("❌ 날짜 버튼을 찾을 수 없음!");
    }

    if (priceButton) {
        console.log("가격 버튼 감지됨!"); // 버튼 감지 여부 확인
        priceButton.addEventListener("click", function() {
            console.log("가격 버튼 클릭됨!"); // 클릭 이벤트 감지 확인
            window.open("https://github.com/sunheehee/GrossHacking/raw/main/KakaoTalk_20250213_221702187.png?raw=true", "_blank", "noopener,noreferrer");
        });
    } else {
        console.log("❌ 가격 버튼을 찾을 수 없음!");
    }
});

