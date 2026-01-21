const articles = Array.from(document.querySelectorAll(".article-item"));
const modal = document.getElementById("articleModal");
const modalBody = document.getElementById("modalBody");
const btnPrev = document.getElementById("prevArticle");
const btnNext = document.getElementById("nextArticle");
const btnClose = document.getElementById("closeModal");

let currentIndex = 0;
let isAnimating = false;

function updateButtons() {
  btnPrev.disabled = currentIndex === 0;
  btnNext.disabled = currentIndex === articles.length - 1;
}

function loadArticle(index, direction = "next") {
  if (isAnimating) return;
  isAnimating = true;

  const articleId = articles[index].dataset.articleId;
  const content = document.getElementById(articleId).innerHTML;

  modalBody.style.opacity = "0";
  modalBody.style.transform =
    direction === "next" ? "translateX(-20px)" : "translateX(20px)";

  setTimeout(() => {
    modalBody.innerHTML = content;
    modalBody.scrollTop = 0;

    modalBody.style.opacity = "1";
    modalBody.style.transform = "translateX(0)";
    currentIndex = index;
    updateButtons();
    isAnimating = false;
  }, 200);
}

function openModal(index) {
  modal.classList.add("active");
  currentIndex = index;
  modalBody.innerHTML =
    document.getElementById(articles[index].dataset.articleId).innerHTML;
  modalBody.scrollTop = 0;
  updateButtons();
}

articles.forEach((item, index) => {
  item.addEventListener("click", () => openModal(index));
});

btnPrev.addEventListener("click", () => {
  if (currentIndex > 0) {
    loadArticle(currentIndex - 1, "prev");
  }
});

btnNext.addEventListener("click", () => {
  if (currentIndex < articles.length - 1) {
    loadArticle(currentIndex + 1, "next");
  }
});

btnClose.addEventListener("click", () => {
  modal.classList.remove("active");
});

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("active")) return;

  if (e.key === "ArrowLeft" && currentIndex > 0) {
    loadArticle(currentIndex - 1, "prev");
  }

  if (e.key === "ArrowRight" && currentIndex < articles.length - 1) {
    loadArticle(currentIndex + 1, "next");
  }

  if (e.key === "Escape") {
    modal.classList.remove("active");
  }
});