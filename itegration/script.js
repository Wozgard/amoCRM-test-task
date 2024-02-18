const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU3ZDhhMzk0MGE5ZmVmZGE3ZTY3MzY4MDVlMmQwOWYxMTg5NTlkZjNhYzU5MTNkZGM2YzhlOWM1NzdiNDJjZDc0Zjc0ZTQ5OWZjODYyNzI4In0.eyJhdWQiOiJjNzg5ZWMwZC1hNDEzLTRmMmItOWJhMi00MmIyNDQwZTNhZTEiLCJqdGkiOiJlN2Q4YTM5NDBhOWZlZmRhN2U2NzM2ODA1ZTJkMDlmMTE4OTU5ZGYzYWM1OTEzZGRjNmM4ZTljNTc3YjQyY2Q3NGY3NGU0OTlmYzg2MjcyOCIsImlhdCI6MTcwODI0NjMwOCwibmJmIjoxNzA4MjQ2MzA4LCJleHAiOjE3MDkxNjQ4MDAsInN1YiI6IjEwNjg4NzU4IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNTc2MzcwLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMGU0NDBhNWMtZjIyNC00YmIwLTgyMGItMzI1NjBjY2Y0YTdkIn0.QMsg_VQ-HwAVIlBLt53SQ3eRubNC_Yj40mbddNolg4QN2L2tf-oS-8vLGg2-HssR0Vcc5EpqcSU-QHqLkEhI2n2PB4N3tAnSDwzNp_8ik6j3cpkJXxkRVHudWqPZZI0K8NbWLHYKnylk3XNA9ia2_JcVlanzfA_Blo_taKU6aajubnyCBPQsWTYaBf479G1Wl8F8khLjbp4d19q833I7F-KZFHNdlr8rB7tX9JbwqIXoaVN3rvTVa_trh4RBBtA_qh2UUaNye7EjT-duNP5n5j2CXzp563ZqpKxCEpMV2Tsj6cTGy1lLAZrvtoA7Yf-gegi5CK4uViwR1wNhpyh0aQ";
const amoUrl = "https://wozgard.amocrm.ru/api/v4/leads";
const dealsData = [
  { name: "Сделка 1", budget: "$1000", dateCreated: "2024-02-17" },
  { name: "Сделка 2", budget: "$2000", dateCreated: "2024-02-16" },
  { name: "Сделка 3", budget: "$3000", dateCreated: "2024-02-15" },
  { name: "Сделка 4", budget: "$4000", dateCreated: "2024-02-14" },
  { name: "Сделка 5", budget: "$5000", dateCreated: "2024-02-13" },
  { name: "Сделка 6", budget: "$6000", dateCreated: "2024-02-12" },
  { name: "Сделка 7", budget: "$7000", dateCreated: "2024-02-11" },
  { name: "Сделка 8", budget: "$8000", dateCreated: "2024-02-10" },
  { name: "Сделка 9", budget: "$9000", dateCreated: "2024-02-09" },
  { name: "Сделка 10", budget: "$10000", dateCreated: "2024-02-08" },
  { name: "Сделка 11", budget: "$11000", dateCreated: "2024-02-07" },
];
let dealsPerPage = 5;
let currentPage = 1;

const ngrok = "https://367d-162-55-239-236.ngrok-free.app";
const localhost = "http://localhost:3000/";

// API ========================================================
async function fetchData() {
  console.log("Start");
  const response = await fetch(ngrok, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Url": "https://wozgard.amocrm.ru/api/v4/leads",
      "Authorization": `Bearer ${token}`,
    },
    method: "GET",
  });
  console.log(response);
  const data = await response.json();
  console.log(data);
  console.log("End");
}
// ===================================================
// Render content ====================================
function renderDealsTable() {
  const startIndex = (currentPage - 1) * dealsPerPage;
  const endIndex = startIndex + dealsPerPage;
  const dealsToShow = dealsData.slice(startIndex, endIndex);

  const tableBody = document.getElementById("deal-table__body");
  tableBody.innerHTML = "";

  dealsToShow.forEach((deal) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${deal.name}</td>
      <td>${deal.budget}</td>
      <td>${deal.dateCreated}</td>
    `;
    tableBody.appendChild(row);
  });

  document.querySelector(".main").style.display = "flex";
  document.querySelector(".loader-wrapper").style.display = "none";
}

function updatePageInfo() {
  const totalPages = Math.ceil(dealsData.length / dealsPerPage);
  document.getElementById(
    "page-info"
  ).innerText = `Страница ${currentPage} из ${totalPages}`;
}
// ================================================================
// Some functions =================================================
function setPerPage(num) {
  clearButtonDisabled();
  if (num > 0) {
    document.getElementById(`${num}_btn`).classList.add("_activeBtn");
    document.getElementById(`${num}_btn`).setAttribute("disabled", "");
    dealsPerPage = num;
    currentPage = 1;
    renderDealsTable();
    updatePageInfo();
  } else if (num === -1) {
    document.getElementById(`all_btn`).classList.add("_activeBtn");
    document.getElementById(`all_btn`).setAttribute("disabled", "");
    dealsPerPage = dealsData.length;
    currentPage = 1;
    renderDealsTable();
    updatePageInfo();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderDealsTable();
    updatePageInfo();
  }
}

function clearButtonDisabled() {
  document.querySelectorAll(".pagination__page-button").forEach((button) => {
    button.classList.remove("_activeBtn");
    button.removeAttribute("disabled");
  });
}

// Функция для перехода на следующую страницу
function nextPage() {
  const totalPages = Math.ceil(dealsData.length / dealsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderDealsTable();
    updatePageInfo();
  }
}

// Start =============================================================
document.addEventListener("DOMContentLoaded", function () {
  fetchData();
  document.querySelector(".loader-wrapper").style.display = "block";
  renderDealsTable();
  updatePageInfo();

  // Сортировка по названию или бюджету
  document.querySelectorAll(".sort-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const sortBy = this.dataset.sort;
      dealsData.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
      renderDealsTable();
    });
  });

  // Опции отображения количества сделок на странице
  document.querySelectorAll(".show-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const showCount = this.dataset.show;
      let displayedDeals;
      if (showCount === "all") {
        displayedDeals = dealsData;
      } else {
        displayedDeals = dealsData.slice(0, showCount);
      }
      renderDealsTable(displayedDeals);
    });
  });
});
