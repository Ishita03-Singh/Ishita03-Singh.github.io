/* =========================================================
   Ishita Singh — portfolio behaviour
   Vanilla, no dependencies. Every effect degrades to a
   static, readable page without JS or with reduced motion.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ------------------------------------------------------
     Theme — the pre-paint script already applied any saved
     choice; this only wires the toggle and keeps the
     browser UI colour in step.
     ------------------------------------------------------ */
  (function theme() {
    var btn = $("#themeToggle");
    var meta = $('meta[name="theme-color"]');

    function current() {
      var set = document.documentElement.getAttribute("data-theme");
      if (set) return set;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function paintMeta() {
      if (!meta) return;
      meta.setAttribute("content", current() === "dark" ? "#15151b" : "#f3f1e7");
    }

    paintMeta();
    if (!btn) return;

    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* private mode */ }
      paintMeta();
    });
  })();

  /* ------------------------------------------------------
     Loader — a short counter, once per session, skippable.
     It never stands between a visitor and the content.
     ------------------------------------------------------ */
  (function loader() {
    var el = $("#loader");
    if (!el) return;

    var seen;
    try { seen = sessionStorage.getItem("introSeen"); } catch (e) { seen = null; }

    function start() { document.body.classList.add("is-ready"); }

    function finish() {
      el.classList.add("is-done");
      document.body.classList.remove("is-locked");
      start();
      window.setTimeout(function () { if (el.parentNode) el.remove(); }, 600);
      try { sessionStorage.setItem("introSeen", "1"); } catch (e) { /* private mode */ }
    }

    if (seen || reduceMotion) { el.remove(); start(); return; }

    document.body.classList.add("is-locked");

    var numEl = $("#loaderNum");
    var barEl = $("#loaderBar");
    var typeEl = $("#loaderType");
    var word = "building the release…";
    var pct = 0;
    var chars = 0;
    var done = false;

    var typer = window.setInterval(function () {
      typeEl.textContent = word.slice(0, ++chars);
      if (chars >= word.length) window.clearInterval(typer);
    }, 32);

    var ticker = window.setInterval(function () {
      pct = Math.min(100, pct + Math.random() * 16 + 8);
      var shown = Math.floor(pct);
      numEl.textContent = shown;
      barEl.style.width = shown + "%";
      if (pct >= 100) {
        window.clearInterval(ticker);
        window.setTimeout(skip, 260);
      }
    }, 60);

    function skip() {
      if (done) return;
      done = true;
      window.clearInterval(ticker);
      window.clearInterval(typer);
      typeEl.textContent = word;
      numEl.textContent = "100";
      barEl.style.width = "100%";
      finish();
    }

    ["click", "keydown", "touchstart", "wheel"].forEach(function (evt) {
      window.addEventListener(evt, skip, { once: true, passive: true });
    });
    // never let a stalled asset trap the page behind the loader
    window.setTimeout(skip, 2600);
  })();

  /* ------------------------------------------------------
     Header: border on scroll, hide on the way down
     ------------------------------------------------------ */
  (function head() {
    var el = $("#head");
    var drawer = $("#drawer");
    var last = window.scrollY;
    var ticking = false;

    function update() {
      var y = window.scrollY;
      el.classList.toggle("is-stuck", y > 40);

      var open = drawer && drawer.classList.contains("is-open");
      if (!open && y > 220) {
        el.classList.toggle("is-hidden", y > last + 4);
      } else {
        el.classList.remove("is-hidden");
      }
      last = y;
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  })();

  /* ------------------------------------------------------
     Scroll progress bar
     ------------------------------------------------------ */
  (function progress() {
    var bar = $("#progress i");
    if (!bar) return;
    var ticking = false;

    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = Math.min(100, Math.max(0, pct)) + "%";
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  })();

  /* ------------------------------------------------------
     Mobile drawer
     ------------------------------------------------------ */
  (function drawer() {
    var btn = $("#burger");
    var panel = $("#drawer");
    var scrim = $("#scrim");
    if (!btn || !panel || !scrim) return;

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
      }, 420);
    }

    btn.addEventListener("click", function () {
      if (btn.getAttribute("aria-expanded") === "true") close(); else open();
    });
    scrim.addEventListener("click", close);
    $$("a", panel).forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { close(); btn.focus(); }
    });

    var wide = window.matchMedia("(min-width: 901px)");
    function onWide(e) { if (e.matches && btn.getAttribute("aria-expanded") === "true") close(); }
    if (wide.addEventListener) wide.addEventListener("change", onWide);
    else if (wide.addListener) wide.addListener(onWide);
  })();

  /* ------------------------------------------------------
     Hero role rotator
     ------------------------------------------------------ */
  (function rotator() {
    var host = $("#rotator");
    if (!host || reduceMotion) return;

    var words = [
      "production systems",
      "release pipelines",
      "event-driven backends",
      "Angular libraries",
      "things that don't page you at 2am"
    ];
    var el = $(".rotator__word", host);
    var i = 0;

    window.setInterval(function () {
      el.classList.add("is-out");
      window.setTimeout(function () {
        i = (i + 1) % words.length;
        el.textContent = words[i];
        el.classList.remove("is-out");
      }, 320);
    }, 2800);
  })();

  /* ------------------------------------------------------
     Reveal on scroll + count up the impact numbers
     ------------------------------------------------------ */
  (function reveal() {
    var items = $$(".reveal");

    function countUp(root) {
      $$("[data-count]", root).forEach(function (el, idx) {
        var target = parseInt(el.getAttribute("data-count"), 10) || 0;
        if (reduceMotion) { el.textContent = target; return; }

        var duration = 1300;
        var startAt = null;
        window.setTimeout(function () {
          window.requestAnimationFrame(function step(now) {
            if (startAt === null) startAt = now;
            var t = Math.min(1, (now - startAt) / duration);
            // ease-out so the number settles rather than slams
            var eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased);
            if (t < 1) window.requestAnimationFrame(step);
          });
        }, idx * 80);
      });
    }

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        countUp(el);
        $$(".chart__fill", el).forEach(function (f) { f.classList.add("is-drawn"); });
      });
      return;
    }

    // only hide things once we know we can reveal them again
    items.forEach(function (el) { el.classList.add("is-armed"); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        countUp(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -70px 0px" });

    items.forEach(function (el) { io.observe(el); });
  })();

  /* ------------------------------------------------------
     Events handled today.

     The pipeline sustains ~120K events a day. Rather than
     print that average as another static number, run it
     forward from midnight IST so the tile shows roughly
     where today stands. It is labelled as an estimate in the
     markup, because that is what it is.
     ------------------------------------------------------ */
  (function liveEvents() {
    var el = $("#liveEvents");
    if (!el) return;

    var PER_DAY = 120000;
    var SECONDS_IN_DAY = 86400;

    function secondsSinceMidnightIST() {
      var d = new Date();
      try {
        var parts = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
        }).formatToParts(d);
        var t = { hour: 0, minute: 0, second: 0 };
        parts.forEach(function (p) {
          if (p.type in t) t[p.type] = parseInt(p.value, 10) || 0;
        });
        // en-GB renders midnight as 24, not 00
        if (t.hour === 24) t.hour = 0;
        return t.hour * 3600 + t.minute * 60 + t.second;
      } catch (e) {
        // no time-zone support — fall back to the visitor's own clock
        return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
      }
    }

    function value() {
      return Math.floor(PER_DAY * (secondsSinceMidnightIST() / SECONDS_IN_DAY));
    }

    function render(n) { el.textContent = n.toLocaleString("en-IN"); }

    var target = value();

    if (reduceMotion) {
      render(target);
      window.setInterval(function () { render(value()); }, 30000);
      return;
    }

    // count up to today's figure once, then keep pace with the clock
    var shown = 0;
    var startAt = null;
    window.requestAnimationFrame(function step(now) {
      if (startAt === null) startAt = now;
      var t = Math.min(1, (now - startAt) / 1600);
      shown = Math.round(target * (1 - Math.pow(1 - t, 3)));
      render(shown);
      if (t < 1) { window.requestAnimationFrame(step); return; }
      // ~1.39 events/sec at 120K/day, so a nudge every few seconds
      window.setInterval(function () { render(value()); }, 4000);
    });
  })();

  /* ------------------------------------------------------
     Evidence lens.

     Every tool in the Stack section that I have actually
     shipped with carries a data-tech key. Clicking it lights
     up the experience bullets and projects that share that
     key, so a tag list becomes a way to check the claim
     rather than a keyword dump.
     ------------------------------------------------------ */
  (function lens() {
    var chips = $$(".chips li[data-tech]");
    var bar = $("#lens");
    var nameEl = $("#lensName");
    var countEl = $("#lensCount");
    var clearBtn = $("#lensClear");
    if (!chips.length || !bar) return;

    var targets = $$("[data-tech]").filter(function (el) { return !el.matches(".chips li"); });
    var active = null;

    chips.forEach(function (c) {
      c.setAttribute("role", "button");
      c.setAttribute("tabindex", "0");
      c.setAttribute("aria-pressed", "false");
    });

    function matches(el, key) {
      return (" " + el.getAttribute("data-tech") + " ").indexOf(" " + key + " ") > -1;
    }

    function clear() {
      active = null;
      document.body.classList.remove("is-lensed");
      targets.forEach(function (el) { el.classList.remove("is-lit"); });
      chips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
      bar.hidden = true;
    }

    function apply(chip) {
      var key = chip.getAttribute("data-tech");
      if (active === key) { clear(); return; }

      active = key;
      var hits = targets.filter(function (el) { return matches(el, key); });

      targets.forEach(function (el) { el.classList.toggle("is-lit", matches(el, key)); });
      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", c.getAttribute("data-tech") === key ? "true" : "false");
      });

      document.body.classList.add("is-lensed");
      nameEl.textContent = chip.textContent.trim();
      countEl.textContent = hits.length;
      bar.hidden = false;

      if (hits.length) {
        hits[0].scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      }
    }

    chips.forEach(function (c) {
      c.addEventListener("click", function () { apply(c); });
      c.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); apply(c); }
      });
    });

    clearBtn.addEventListener("click", clear);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && active) clear(); });
  })();

  /* ------------------------------------------------------
     Scroll spy for the desktop dock
     ------------------------------------------------------ */
  (function spy() {
    var links = $$(".dock__list a");
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

  /* ------------------------------------------------------
     Magnetic buttons — desktop, fine pointer only
     ------------------------------------------------------ */
  (function magnetic() {
    if (!finePointer || reduceMotion) return;

    $$("[data-magnetic]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = "translate(" + dx * 0.28 + "px," + dy * 0.28 + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  })();

  /* ------------------------------------------------------
     Live local time in Gurgaon + footer year
     ------------------------------------------------------ */
  (function clock() {
    var year = $("#year");
    if (year) year.textContent = new Date().getFullYear();

    var el = $("#clock");
    if (!el) return;

    function fmt() {
      try {
        return new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit", minute: "2-digit", hour12: false
        }).format(new Date());
      } catch (e) {
        // no Intl time zone support — fall back to the visitor's own clock
        var d = new Date();
        return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
      }
    }

    function tick() { el.textContent = fmt(); }
    tick();
    window.setInterval(tick, 15000);
  })();
})();
