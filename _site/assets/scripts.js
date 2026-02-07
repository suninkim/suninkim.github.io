document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript 실행됨!"); // 디버깅 로그 추가

    const names = ["궁준기", "항상침착하게", "건강행복사랑만사형통축복", "임재롱", "카리스마수학쌤", "이에라냐",
                   "싱춘형", "지윤이어서오고", "캐멋진간지남", "Doooooooooooooly", "평화용기사랑승리", "Pure호영","이건시작일뿐이야", "추가인원"];

    const nameList = document.getElementById("name-list");
    const resultDiv = document.getElementById("result");
    const shuffleBtn = document.getElementById("shuffle-btn");
    const resetBtn = document.getElementById("reset-btn");

    if (!nameList || !shuffleBtn || !resultDiv || !resetBtn) {
        console.error("게임 UI 요소를 찾을 수 없음!");
        return;
    }

    let selectedNames = [];

    function renderNames() {
        nameList.innerHTML = "";  // 🔥 기존 버튼을 모두 지우고 새로 추가
        names.forEach(name => {
            let btn = document.createElement("button");
            btn.innerText = name;
            btn.classList.add("name-btn");
            btn.onclick = () => toggleSelection(name, btn);
            nameList.appendChild(btn);
        });
        updateSelectionUI();  // 🔥 추가된 버튼의 UI를 업데이트
    }

    function toggleSelection(name) {
        if (selectedNames.includes(name)) {
            selectedNames = selectedNames.filter(n => n !== name);
        } else if (selectedNames.length < 10) {
            selectedNames.push(name);
        }
        updateSelectionUI();
    }

    function updateSelectionUI() {
        let buttons = document.querySelectorAll(".name-btn");
        buttons.forEach(btn => {
            if (selectedNames.includes(btn.innerText)) {
                btn.style.backgroundColor = "lightblue";
            } else {
                btn.style.backgroundColor = "";
            }
        });
    }

    function shuffleGroups() {
        if (selectedNames.length !== 10) {
            alert("10명의 소환사만 선택하세요!");
            return;
        }

        let shuffled = [...selectedNames].sort(() => Math.random() - 0.5);
        let group1 = shuffled.slice(0, 5);
        let group2 = shuffled.slice(5, 10);

        resultDiv.innerHTML = `<h3>잘생긴 팀</h3><p>${group1.join(", ")}</p>
                               <h3>못생긴 팀</h3><p>${group2.join(", ")}</p>`;
    }

    function resetSelection() {
        selectedNames = [];
        nameList.innerHTML = "";  // 🔥 기존 버튼 삭제 후 다시 생성
        renderNames(); // 🔥 초기화 후 다시 렌더링
        resultDiv.innerHTML = "";
    }

    shuffleBtn.addEventListener("click", shuffleGroups);
    resetBtn.addEventListener("click", resetSelection);
    
    renderNames();
});
