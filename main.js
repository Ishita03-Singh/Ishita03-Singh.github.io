/* =========================================================
   Ishita Singh — portfolio behaviour
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------
     Splash — the original app opened with a typed greeting.
     Kept, but short, skippable, and only once per session so
     it never stands between a visitor and the content.
     ------------------------------------------------------ */
  (function splash() {
    var el = document.getElementById("splash");
    if (!el) return;

    var seen;
    try { seen = sessionStorage.getItem("splashSeen"); } catch (e) { seen = null; }

    function finish() {
      el.classList.add("is-done");
      document.body.classList.remove("is-locked");
      window.setTimeout(function () { el.remove(); }, 600);
      try { sessionStorage.setItem("splashSeen", "1"); } catch (e) { /* private mode */ }
    }

    if (seen || reduceMotion) { el.remove(); return; }

    document.body.classList.add("is-locked");

    var target = document.getElementById("splashType");
    var text = "Hello, I am Ishita Singh";
    var i = 0;
    var timer = window.setInterval(function () {
      target.textContent = text.slice(0, ++i);
      if (i >= text.length) {
        window.clearInterval(timer);
        window.setTimeout(finish, 450);
      }
    }, 55);

    // any interaction skips the rest of the intro
    ["click", "keydown", "touchstart", "wheel"].forEach(function (evt) {
      window.addEventListener(evt, function once() {
        window.clearInterval(timer);
        target.textContent = text;
        finish();
        ["click", "keydown", "touchstart", "wheel"].forEach(function (e2) {
          window.removeEventListener(e2, once);
        });
      }, { once: true, passive: true });
    });
  })();

  /* ------------------------------------------------------
     Header: shrink on scroll, hide when scrolling down
     ------------------------------------------------------ */
  (function header() {
    var el = document.getElementById("header");
    var last = window.scrollY;
    var ticking = false;

    function update() {
      var y = window.scrollY;
      el.classList.toggle("is-stuck", y > 60);

      var drawerOpen = document.getElementById("drawer").classList.contains("is-open");
      if (!drawerOpen && y > 160) {
        el.classList.toggle("is-hidden", y > last);
      } else {
        el.classList.remove("is-hidden");
      }
      last = y;
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  })();

  /* ------------------------------------------------------
     Mobile drawer
     ------------------------------------------------------ */
  (function drawer() {
    var btn = document.getElementById("burger");
    var panel = document.getElementById("drawer");
    var scrim = document.getElementById("scrim");

    function open() {
      panel.hidden = false;
      scrim.hidden = false;
      // let the browser paint the hidden state before transitioning in
      window.requestAnimationFrame(function () {
        panel.classList.add("is-open");
        scrim.classList.add("is-open");
      });
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Close menu");
      document.body.classList.add("is-locked");
    }

    function close() {
      panel.classList.remove("is-open");
      scrim.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
      document.body.classList.remove("is-locked");
      window.setTimeout(function () {
        if (!panel.classList.contains("is-open")) { panel.hidden = true; scrim.hidden = true; }
      }, 320);
    }

    btn.addEventListener("click", function () {
      if (btn.getAttribute("aria-expanded") === "true") { close(); } else { open(); }
    });
    scrim.addEventListener("click", close);
    panel.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { close(); btn.focus(); }
    });

    // if the viewport grows past the mobile breakpoint, drop the drawer state
    var wide = window.matchMedia("(min-width: 769px)");
    function onWide(e) {
      if (e.matches && btn.getAttribute("aria-expanded") === "true") close();
    }
    if (wide.addEventListener) { wide.addEventListener("change", onWide); }
    else if (wide.addListener) { wide.addListener(onWide); }
  })();

  /* ------------------------------------------------------
     Experience tabs (roving tabindex, arrow-key navigation)
     ------------------------------------------------------ */
  (function tabs() {
    var list = document.querySelector(".exp__tabs");
    if (!list) return;

    var buttons = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    var marker = list.querySelector(".exp__marker");

    function moveMarker(btn) {
      if (window.matchMedia("(max-width: 768px)").matches) {
        marker.style.width = btn.offsetWidth + "px";
        marker.style.height = "2px";
        marker.style.transform = "translateX(" + btn.offsetLeft + "px)";
      } else {
        marker.style.width = "2px";
        marker.style.height = btn.offsetHeight + "px";
        marker.style.transform = "translateY(" + btn.offsetTop + "px)";
      }
    }

    function select(btn, focus) {
      buttons.forEach(function (b) {
        var on = b === btn;
        b.setAttribute("aria-selected", on ? "true" : "false");
        b.tabIndex = on ? 0 : -1;
        document.getElementById(b.getAttribute("aria-controls")).hidden = !on;
      });
      moveMarker(btn);
      if (focus) btn.focus();
    }

    buttons.forEach(function (btn, idx) {
      btn.addEventListener("click", function () { select(btn); });
      btn.addEventListener("keydown", function (e) {
        var horizontal = window.matchMedia("(max-width: 768px)").matches;
        var next = horizontal ? "ArrowRight" : "ArrowDown";
        var prev = horizontal ? "ArrowLeft" : "ArrowUp";
        var to = null;
        if (e.key === next) to = (idx + 1) % buttons.length;
        else if (e.key === prev) to = (idx - 1 + buttons.length) % buttons.length;
        else if (e.key === "Home") to = 0;
        else if (e.key === "End") to = buttons.length - 1;
        if (to !== null) { e.preventDefault(); select(buttons[to], true); }
      });
    });

    select(buttons[0]);

    var resizeTimer;
    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        var current = list.querySelector('[aria-selected="true"]');
        if (current) moveMarker(current);
      }, 120);
    });
    // fonts land after first paint and change tab metrics
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        var current = list.querySelector('[aria-selected="true"]');
        if (current) moveMarker(current);
      });
    }
  })();

  /* ------------------------------------------------------
     Reveal sections + fill the skill bars once seen
     ------------------------------------------------------ */
  (function reveal() {
    var items = document.querySelectorAll(".reveal");

    function fillSkills(root) {
      root.querySelectorAll(".skill").forEach(function (skill, i) {
        var level = Math.max(0, Math.min(100, parseInt(skill.dataset.level, 10) || 0));
        window.setTimeout(function () {
          skill.querySelector(".skill__bar i").style.width = level + "%";
        }, reduceMotion ? 0 : i * 110);
      });
    }

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { fillSkills(el); });
      return;
    }

    // only hide things once we know we can reveal them again
    items.forEach(function (el) { el.classList.add("is-armed"); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        fillSkills(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -60px 0px" });

    items.forEach(function (el) { io.observe(el); });
  })();

  /* ------------------------------------------------------
     Scroll spy for the desktop nav
     ------------------------------------------------------ */
  (function spy() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav__list a"));
    var sections = links
      .map(function (a) { return document.querySelector(a.getAttribute("href")); })
      .filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (s) { io.observe(s); });
  })();
})();
