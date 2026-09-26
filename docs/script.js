console.log("Portfolio loaded successfully.");

// --- typing effect on hero tagline ---
const typeTarget = document.getElementById("typeTarget");
const phrases = [
  "building with the MERN stack",
  "deploying with AWS, Docker & Terraform",
  "shipping pixel-perfect UI from Figma"
];

if (typeTarget && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = phrases[phraseIndex];
    if (!deleting) {
      charIndex++;
      typeTarget.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      typeTarget.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 55);
  }
  tick();
} else if (typeTarget) {
  typeTarget.textContent = phrases[0];
}

// --- sidebar active state + tab bar sync ---
const navItems = document.querySelectorAll(".tree-item");
const views = document.querySelectorAll(".view");
const tabbar = document.getElementById("tabbar");

const fileNames = {
  home: "home.md",
  about: "about.md",
  education: "education.md",
  experience: "internships.js",
  projects: "featured.jsx",
  skills: "skills.json",
  certifications: "certifications.yml",
  assignments: "fsdl-assignments.md",
  contact: "contact.sh"
};

function setActive(id) {
  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.target === id);
  });
  if (tabbar) {
    tabbar.innerHTML = `<div class="tab active">${fileNames[id] || "home.md"}</div>`;
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
);

views.forEach((view) => observer.observe(view));

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    console.log(`Navigating to ${link.dataset.target}`);
    if (window.innerWidth <= 720) {
      document.getElementById("sidebar").classList.remove("open");
    }
  });
});

// --- mobile explorer toggle ---
const toggleBtn = document.getElementById("explorerToggle");
const sidebar = document.getElementById("sidebar");
if (toggleBtn && sidebar) {
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
}
