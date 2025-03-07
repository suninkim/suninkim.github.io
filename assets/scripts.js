document.addEventListener("DOMContentLoaded", function () {
    const names = ["김민수", "이서연", "박지훈", "정예린", "최도영", "한지우", 
                   "강민호", "윤아린", "서준호", "배현우", "신유진", "오태경"];

    const nameList = document.getElementById("name-list");
    const resultDiv = document.getElementById("result");
    const shuffleBtn = document.getElementById("shuffle-btn");

    let selectedNames = [];

    function renderNames() {
        nameList.innerHTML = "";
        names.forEach((name, index) => {
            let btn = document.createElement("button");
            btn.innerText = name;
            btn.classList.add("name-btn");
            btn.onclick = () => toggleSelection(name);
            nameList.appendChild(btn);
        });
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
            alert("10명을 선택하세요!");
            return;
        }

        let shuffled = [...selectedNames].sort(() => Math.random() - 0.5);
        let group1 = shuffled.slice(0, 5);
        let group2 = shuffled.slice(5, 10);

        resultDiv.innerHTML = `<h3>그룹 1</h3><p>${group1.join(", ")}</p>
                               <h3>그룹 2</h3><p>${group2.join(", ")}</p>`;
    }

    shuffleBtn.addEventListener("click", shuffleGroups);

    renderNames();
});
