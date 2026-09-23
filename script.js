/* The Health Lab — interactions */

// Scroll reveals
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
  io.observe(el);
});

// FAQ: keep only one item open
document.querySelectorAll(".faq").forEach((faq) => {
  faq.addEventListener("toggle", () => {
    if (!faq.open) return;
    document.querySelectorAll(".faq[open]").forEach((other) => {
      if (other !== faq) other.open = false;
    });
  });
});

// Booking form: character count + mailto handoff
const msg = document.getElementById("bf-msg");
const count = document.getElementById("charCount");
msg?.addEventListener("input", () => {
  count.textContent = `${msg.value.length} / 350`;
});

document.getElementById("bookingForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const body = [
    `Name: ${f.name.value}`,
    `Email: ${f.email.value}`,
    `Phone: ${f.phone.value || "—"}`,
    `Service: ${f.service.value}`,
    "",
    f.message.value,
  ].join("\n");
  const href = `mailto:healthlab@surreynurse.com?subject=${encodeURIComponent(
    "Booking request — " + (f.service.value || "Consultation")
  )}&body=${encodeURIComponent(body)}`;
  document.getElementById("formNote").hidden = false;
  window.location.href = href;
});
