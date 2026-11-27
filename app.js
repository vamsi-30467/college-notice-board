const notices = [
  {
    title: "End-semester examination timetable released",
    category: "Academic",
    date: "Nov 26, 2026",
    pinned: true,
    description:
      "The final examination schedule is now available on the student portal. Please check your course timings and report any clashes to the examinations office by November 30.",
  },
  {
    title: "Campus library hours extended during study week",
    category: "Facilities",
    date: "Nov 25, 2026",
    pinned: false,
    description:
      "The main library will stay open until midnight from December 1–12. The quiet study zone on level three is open 24 hours with your campus ID.",
  },
  {
    title: "Winter arts showcase — performer registration open",
    category: "Events",
    date: "Nov 24, 2026",
    pinned: false,
    description:
      "Share your music, dance, or creative work at this year's winter showcase on December 10. Sign up at the student union desk by December 3.",
  },
  {
    title: "Student council applications close this Friday",
    category: "Students",
    date: "Nov 23, 2026",
    pinned: false,
    description:
      "Applications are open for next semester's student council. Submit a short statement about your ideas for campus life using the student portal.",
  },
  {
    title: "Science block entrance temporarily relocated",
    category: "Facilities",
    date: "Nov 22, 2026",
    pinned: false,
    description:
      "Maintenance work at the east entrance continues through December 2. Please use the north entrance and follow the signs to the lecture halls.",
  },
];

const noticeList = document.querySelector("#notice-list");
const searchInput = document.querySelector("#notice-search");
const categoryFilter = document.querySelector("#category-filter");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");

function renderNotices() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = `${notice.title} ${notice.description}`
      .toLowerCase()
      .includes(searchTerm);
    const matchesCategory =
      selectedCategory === "all" || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  noticeList.replaceChildren(
    ...filteredNotices.map((notice) => {
      const article = document.createElement("article");
      article.className = "notice-card";

      const meta = document.createElement("div");
      meta.className = "notice-meta";

      const category = document.createElement("span");
      category.className = `category ${notice.category.toLowerCase()}`;
      category.textContent = notice.category;
      meta.append(category);

      if (notice.pinned) {
        const pinned = document.createElement("span");
        pinned.className = "pinned";
        pinned.textContent = "★ Pinned";
        meta.append(pinned);
      }

      const date = document.createElement("time");
      date.className = "notice-date";
      date.textContent = notice.date;
      meta.append(date);

      const title = document.createElement("h3");
      title.textContent = notice.title;
      const description = document.createElement("p");
      description.textContent = notice.description;

      article.append(meta, title, description);
      return article;
    }),
  );

  resultCount.textContent = `${filteredNotices.length} ${
    filteredNotices.length === 1 ? "notice" : "notices"
  }`;
  emptyState.hidden = filteredNotices.length > 0;
}

searchInput.addEventListener("input", renderNotices);
categoryFilter.addEventListener("change", renderNotices);
renderNotices();
