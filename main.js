/* =========================================================
   Ishita Singh — portfolio behaviour
   Vanilla, no dependencies. Every effect degrades to a
   static, readable page without JS or with reduced motion.
   ========================================================= */
(function () {
  "use strict";

  /* ------------------------------------------------------
     Config
     ------------------------------------------------------ */
  var GITHUB_USER = "Ishita03-Singh";
  var LEETCODE_USER = "IshitaSingh";
  var CAREER_START = new Date(2023, 0, 1);          // joined I2V, Jan 2023

  // Visitor counter (Abacus: free, no account, no cookies). The footer line
  // stays hidden if the service is unreachable.
  var COUNTER_NS = "ishita-singh-portfolio";
  var COUNTER_KEY = "visitors";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function getJSON(url) {
    return fetch(url).then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); });
  }
  function fmt(n) { return Number(n).toLocaleString("en-IN"); }

  /* ------------------------------------------------------
     Theme toggle
     ------------------------------------------------------ */
  (function theme() {
    var btn = $("#themeToggle");
    var meta = $('meta[name="theme-color"]');

    function current() {
      var set = document.documentElement.getAttribute("data-theme");
      if (set) return set;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    function paintMeta() { if (meta) meta.setAttribute("content", current() === "dark" ? "#0e0e11" : "#f7f6f2"); }

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
     Header state + scroll progress
     ------------------------------------------------------ */
  (function scrolling() {
    var head = $("#head");
    var drawer = $("#drawer");
    var bar = $("#progress i");
    var last = window.scrollY;
    var ticking = false;

    function update() {
      var y = window.scrollY;
      head.classList.toggle("is-stuck", y > 16);
      var open = drawer && drawer.classList.contains("is-open");
      if (!open && y > 320) head.classList.toggle("is-hidden", y > last + 4);
      else head.classList.remove("is-hidden");
      last = y;

      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + "%";
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
      panel.hidden = false; scrim.hidden = false;
      window.requestAnimationFrame(function () {
        panel.classList.add("is-open"); scrim.classList.add("is-open");
      });
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Close menu");
    }
    function close() {
      panel.classList.remove("is-open"); scrim.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
      window.setTimeout(function () {
        if (!panel.classList.contains("is-open")) { panel.hidden = true; scrim.hidden = true; }
      }, 220);
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
    function onWide(e) { if (e.matches) close(); }
    if (wide.addEventListener) wide.addEventListener("change", onWide);
    else if (wide.addListener) wide.addListener(onWide);
  })();

  /* ------------------------------------------------------
     Scroll spy for the nav
     ------------------------------------------------------ */
  (function spy() {
    var links = $$(".nav a");
    var sections = links.map(function (a) { return $(a.getAttribute("href")); }).filter(Boolean);
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
     Reveal on scroll + count up the impact numbers
     ------------------------------------------------------ */
  (function reveal() {
    var items = $$(".reveal");

    function countUp(root) {
      $$("[data-count]", root).forEach(function (n, idx) {
        var target = parseInt(n.getAttribute("data-count"), 10) || 0;
        if (reduceMotion) { n.textContent = target; return; }
        var startAt = null;
        n.textContent = "0";
        window.setTimeout(function () {
          window.requestAnimationFrame(function step(now) {
            if (startAt === null) startAt = now;
            var t = Math.min(1, (now - startAt) / 1200);
            n.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
            if (t < 1) window.requestAnimationFrame(step);
          });
        }, idx * 70);
      });
    }

    if (!("IntersectionObserver" in window)) return;
    items.forEach(function (n) { n.classList.add("is-armed"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        countUp(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -60px 0px" });
    items.forEach(function (n) { io.observe(n); });
  })();

  /* ------------------------------------------------------
     Case-study explorer (ARIA tabs). Without JS every case
     is shown stacked; this collapses them into tabs.
     ------------------------------------------------------ */
  var cases = (function caseTabs() {
    var root = $("#cases");
    if (!root) return null;
    var tabs = $$('[role="tab"]', root);
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute("aria-controls")); });

    function select(i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
      });
      if (focus) tabs[i].focus();
      // keep the chosen tab in view on the mobile scroller
      if (root.offsetWidth < 900) tabs[i].scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
    }

    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(i); });
      t.addEventListener("keydown", function (e) {
        var k = e.key, n = tabs.length, next = null;
        if (k === "ArrowDown" || k === "ArrowRight") next = (i + 1) % n;
        else if (k === "ArrowUp" || k === "ArrowLeft") next = (i - 1 + n) % n;
        else if (k === "Home") next = 0;
        else if (k === "End") next = n - 1;
        if (next !== null) { e.preventDefault(); select(next, true); }
      });
    });
    panels.forEach(function (p) { p.tabIndex = 0; });

    root.classList.add("is-ready");
    select(0);
    return { select: function (tab) { var i = tabs.indexOf(tab); if (i > -1) select(i); } };
  })();

  /* ------------------------------------------------------
     Evidence lens: click a skill chip, and the work that
     used it lights up across the page.
     ------------------------------------------------------ */
  (function lens() {
    var chips = $$(".skills .chips li[data-tech]");
    var bar = $("#lens");
    if (!chips.length || !bar) return;

    var targets = $$("[data-tech]").filter(function (n) { return !n.matches(".chips li"); });
    var active = null;

    chips.forEach(function (c) {
      c.setAttribute("role", "button");
      c.setAttribute("tabindex", "0");
      c.setAttribute("aria-pressed", "false");
    });

    function has(n, key) { return (" " + n.getAttribute("data-tech") + " ").indexOf(" " + key + " ") > -1; }

    function clear() {
      active = null;
      document.body.classList.remove("is-lensed");
      targets.forEach(function (n) { n.classList.remove("is-lit"); });
      chips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
      bar.hidden = true;
    }

    function apply(chip) {
      var key = chip.getAttribute("data-tech");
      if (active === key) { clear(); return; }
      active = key;
      var hits = targets.filter(function (n) { return has(n, key); });
      targets.forEach(function (n) { n.classList.toggle("is-lit", has(n, key)); });
      chips.forEach(function (c) { c.setAttribute("aria-pressed", c.getAttribute("data-tech") === key ? "true" : "false"); });
      document.body.classList.add("is-lensed");
      $("#lensName").textContent = chip.textContent.trim();
      $("#lensCount").textContent = hits.length;
      bar.hidden = false;

      if (!hits.length) return;
      // a lit case tab should also open its case
      var tab = hits.filter(function (n) { return n.matches(".ctab"); })[0];
      if (tab && cases) cases.select(tab);
      hits[0].scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    }

    chips.forEach(function (c) {
      c.addEventListener("click", function () { apply(c); });
      c.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); apply(c); }
      });
    });
    $("#lensClear").addEventListener("click", clear);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && active) clear(); });
  })();

  /* ------------------------------------------------------
     Years of experience, local time, footer year
     ------------------------------------------------------ */
  (function facts() {
    var y = $("#year");
    if (y) y.textContent = new Date().getFullYear();

    var exp = $("#yearsExp");
    if (exp) {
      var years = (Date.now() - CAREER_START.getTime()) / (365.25 * 864e5);
      exp.textContent = (Math.floor(years * 2) / 2).toString().replace(/\.0$/, "") + "+";
    }

    var clock = $("#clock");
    if (!clock) return;
    function tick() {
      try {
        clock.textContent = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false
        }).format(new Date()) + " IST";
      } catch (e) { clock.textContent = "IST · UTC+5:30"; }
    }
    tick();
    window.setInterval(tick, 20000);
  })();

  /* ------------------------------------------------------
     Copy email
     ------------------------------------------------------ */
  (function copyMail() {
    var btn = $("#copyMail");
    var note = $("#copyNote");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var mail = btn.getAttribute("data-mail");
      function done(ok) {
        note.textContent = ok ? "Copied. Paste it into your mail app." : "Couldn't copy. The address is " + mail;
        btn.textContent = ok ? "Copied ✓" : "Copy email";
        window.setTimeout(function () { btn.textContent = "Copy email"; }, 2400);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(mail).then(function () { done(true); }, function () { done(false); });
      } else { done(false); }
    });
  })();

  /* ------------------------------------------------------
     Shared chart tooltip (hover + keyboard focus)
     ------------------------------------------------------ */
  var tip = (function () {
    var node = $("#tip");
    function show(target, text) {
      if (!node) return;
      var r = target.getBoundingClientRect();
      node.textContent = text;
      node.hidden = false;
      var x = Math.max(80, Math.min(window.innerWidth - 80, r.left + r.width / 2));
      node.style.left = x + "px";
      node.style.top = r.top + "px";
    }
    function hide() { if (node) node.hidden = true; }
    window.addEventListener("scroll", hide, { passive: true });
    return {
      bind: function (target, text) {
        target.addEventListener("mouseenter", function () { show(target, text); });
        target.addEventListener("mouseleave", hide);
        target.addEventListener("focus", function () { show(target, text); });
        target.addEventListener("blur", hide);
      }
    };
  })();

  function setState(card, state, msg) {
    if (!card) return;
    card.setAttribute("data-state", state);
    var m = $(".panel__msg", card);
    if (m && msg) m.textContent = msg;
  }

  /* ------------------------------------------------------
     GitHub: all-time contributions by year, calendar for
     the selected year, and profile KPIs.
     ------------------------------------------------------ */
  (function github() {
    var card = $("#ghCard");
    if (!card || !window.fetch) return;

    var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var byYear = {};

    function drawCalendar(year) {
      var days = byYear[year] || [];
      var grid = $("#ghGrid");
      var months = $("#ghMonths");
      grid.innerHTML = ""; months.innerHTML = "";
      if (!days.length) return;

      var total = days.reduce(function (a, d) { return a + d.count; }, 0);
      $("#ghCalLabel").textContent = year + " · " + fmt(total) + (total === 1 ? " contribution" : " contributions");
      grid.setAttribute("aria-label", "GitHub contribution calendar for " + year + ": " + total + " contributions");

      var lead = new Date(days[0].date + "T00:00:00").getDay();
      for (var i = 0; i < lead; i++) grid.appendChild(el("span", "is-pad"));

      var seenMonth = -1;
      days.forEach(function (d, idx) {
        var cell = el("span");
        cell.setAttribute("data-level", String(d.level || 0));
        tip.bind(cell, (d.count ? d.count : "No") + (d.count === 1 ? " contribution" : " contributions") + " · " + d.date);
        grid.appendChild(cell);

        var dt = new Date(d.date + "T00:00:00");
        if (dt.getMonth() !== seenMonth && dt.getDate() <= 7) {
          seenMonth = dt.getMonth();
          var label = el("span", null, MONTHS[seenMonth]);
          label.style.gridColumn = String(Math.floor((idx + lead) / 7) + 1);
          months.appendChild(label);
        }
      });
    }

    function drawYears(totals) {
      var host = $("#ghYearsChart");
      var years = Object.keys(totals).sort();
      var max = Math.max.apply(null, years.map(function (y) { return totals[y]; }).concat([1]));
      var buttons = [];

      years.forEach(function (y) {
        var b = el("button", "ycol");
        b.type = "button";
        b.setAttribute("aria-pressed", "false");
        b.setAttribute("aria-label", y + ": " + totals[y] + " contributions. Show calendar.");
        var v = el("span", "ycol__v", fmt(totals[y]));
        var bar = el("span", "ycol__bar");
        bar.style.height = Math.max(2, Math.round((totals[y] / max) * 100)) + "px";
        var lab = el("span", "ycol__y", y);
        b.appendChild(v); b.appendChild(bar); b.appendChild(lab);
        b.addEventListener("click", function () {
          buttons.forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
          drawCalendar(y);
        });
        buttons.push(b);
        host.appendChild(b);
      });

      // open on the most active year, so the calendar shows real work
      var busiest = years.reduce(function (a, y) { return totals[y] > totals[a] ? y : a; }, years[0]);
      buttons[years.indexOf(busiest)].click();
      return years;
    }

    var contrib = getJSON("https://github-contributions-api.jogruber.de/v4/" + GITHUB_USER)
      .then(function (d) {
        var totals = d.total || {};
        (d.contributions || []).forEach(function (c) {
          var y = c.date.slice(0, 4);
          if (!(y in totals)) return;
          (byYear[y] = byYear[y] || []).push(c);
        });
        Object.keys(byYear).forEach(function (y) {
          byYear[y].sort(function (a, b) { return a.date < b.date ? -1 : 1; });
          // no future days in the current year
          var today = new Date().toISOString().slice(0, 10);
          byYear[y] = byYear[y].filter(function (c) { return c.date <= today; });
        });
        var years = drawYears(totals);
        var all = years.reduce(function (a, y) { return a + totals[y]; }, 0);
        $("#ghAll").textContent = fmt(all);
        $("#ghYears").textContent = years.length;
      });

    var user = getJSON("https://api.github.com/users/" + GITHUB_USER).then(function (u) {
      $("#ghRepos").textContent = fmt(u.public_repos);
      $("#ghFollowers").textContent = fmt(u.followers);
    });

    Promise.all([contrib.catch(function () { return "x"; }), user.catch(function () { return "x"; })])
      .then(function (r) {
        if (r[0] === "x" && r[1] === "x") {
          setState(card, "error", "GitHub didn't respond just now. You can see everything on the profile instead.");
        } else {
          setState(card, "ready");
        }
      });
  })();

  /* ------------------------------------------------------
     Repositories + languages (one API call feeds both)
     ------------------------------------------------------ */
  (function repos() {
    var card = $("#repoCard");
    var gh = $("#ghCard");
    if (!card || !window.fetch) return;

    // categorical slots in fixed order; the sixth is "Other"
    var SLOTS = ["var(--c1)", "var(--c2)", "var(--c3)", "var(--c4)", "var(--c5)"];

    getJSON("https://api.github.com/users/" + GITHUB_USER + "/repos?per_page=100&sort=pushed")
      .then(function (all) {
        var own = (all || []).filter(function (r) { return !r.fork && !r.archived && r.name.toLowerCase() !== GITHUB_USER.toLowerCase(); });
        if (!own.length) { setState(card, "error", "No public repositories to show yet."); return; }

        /* languages: count of repos per primary language */
        var counts = {};
        own.forEach(function (r) { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1; });
        var langs = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a] || (a < b ? -1 : 1); });
        var top = langs.slice(0, 5);
        var other = langs.slice(5).reduce(function (a, l) { return a + counts[l]; }, 0);
        var colorOf = {};
        top.forEach(function (l, i) { colorOf[l] = SLOTS[i]; });
        var rows = top.map(function (l) { return { name: l, n: counts[l], c: colorOf[l] }; });
        if (other) rows.push({ name: "Other", n: other, c: "var(--c-other)" });
        var sum = rows.reduce(function (a, r) { return a + r.n; }, 0);

        var barHost = $("#langBar"), keyHost = $("#langKey");
        rows.forEach(function (r) {
          var seg = el("i");
          seg.style.flex = String(r.n);
          seg.style.background = r.c;
          barHost.appendChild(seg);
          var li = el("li");
          var sw = el("i"); sw.style.background = r.c;
          li.appendChild(sw);
          li.appendChild(document.createTextNode(r.name + " "));
          li.appendChild(el("b", null, Math.round((r.n / sum) * 100) + "%"));
          keyHost.appendChild(li);
        });
        if (gh) gh.setAttribute("data-langs", "ready");

        /* recent repositories */
        var list = $("#repoList");
        own.slice(0, 6).forEach(function (r) {
          var li = el("li");
          var a = el("a");
          a.href = r.html_url; a.target = "_blank"; a.rel = "noopener";
          a.appendChild(el("b", null, r.name));
          var meta = el("span");
          if (r.language) {
            var dot = el("i");
            dot.style.background = colorOf[r.language] || "var(--c-other)";
            meta.appendChild(dot);
            meta.appendChild(document.createTextNode(r.language + " · "));
          }
          meta.appendChild(document.createTextNode(new Date(r.pushed_at).toLocaleDateString("en-GB", { month: "short", year: "numeric" })));
          a.appendChild(meta);
          if (r.description) a.appendChild(el("em", null, r.description));
          li.appendChild(a);
          list.appendChild(li);
        });
        setState(card, "ready");
      })
      .catch(function () {
        setState(card, "error", "GitHub didn't respond just now. Browse the repositories on GitHub instead.");
      });

    /* pull requests merged into other people's repositories */
    getJSON("https://api.github.com/search/issues?q=type:pr+author:" + GITHUB_USER + "+is:merged&sort=created&order=desc&per_page=20")
      .then(function (d) {
        var mine = GITHUB_USER.toLowerCase() + "/";
        var items = (d.items || []).filter(function (it) {
          var repo = it.repository_url.split("/repos/")[1] || "";
          return repo.toLowerCase().indexOf(mine) !== 0;
        });
        if (!items.length) return;
        var list = $("#ossList");
        items.slice(0, 5).forEach(function (it) {
          var li = el("li");
          var a = el("a");
          a.href = it.html_url; a.target = "_blank"; a.rel = "noopener";
          a.appendChild(el("b", null, it.repository_url.split("/repos/")[1]));
          a.appendChild(el("span", null, it.created_at.slice(0, 7)));
          a.appendChild(el("em", null, it.title));
          li.appendChild(a);
          list.appendChild(li);
        });
        $("#ossBlock").hidden = false;
      })
      .catch(function () { /* optional block; stays hidden */ });
  })();

  /* ------------------------------------------------------
     LeetCode. Read through a community proxy, because
     LeetCode's own GraphQL endpoint refuses cross-origin
     browser calls. A second proxy is the fallback.
     ------------------------------------------------------ */
  (function leetcode() {
    var card = $("#lcCard");
    if (!card || !window.fetch || !LEETCODE_USER) return;

    var LANGS = { csharp: "C#", cpp: "C++", java: "Java", python: "Python", python3: "Python", javascript: "JavaScript", typescript: "TypeScript", kotlin: "Kotlin", dart: "Dart", c: "C" };

    var SOURCES = [
      {
        url: "https://leetcode-api-faisalshohag.vercel.app/" + LEETCODE_USER,
        read: function (d) {
          return {
            total: d.totalSolved, easy: d.easySolved, med: d.mediumSolved, hard: d.hardSolved,
            tEasy: d.totalEasy, tMed: d.totalMedium, tHard: d.totalHard,
            recent: d.recentSubmissions || []
          };
        }
      },
      {
        url: "https://alfa-leetcode-api.onrender.com/" + LEETCODE_USER + "/solved",
        read: function (d) {
          return { total: d.solvedProblem, easy: d.easySolved, med: d.mediumSolved, hard: d.hardSolved, recent: [] };
        }
      }
    ];

    function ok(n) { return typeof n === "number" && isFinite(n) && n >= 0; }

    function render(s) {
      $("#lcTotal").textContent = fmt(s.total);
      var rows = [["easy", s.easy, s.tEasy, "#lcEasy"], ["med", s.med, s.tMed, "#lcMed"], ["hard", s.hard, s.tHard, "#lcHard"]];
      // bars show each band's share of what's solved, so they're comparable to each other
      rows.forEach(function (r) {
        $(r[3]).textContent = r[1] + (ok(r[2]) ? " / " + fmt(r[2]) : "");
        var fill = $('.meter__track i[data-k="' + r[0] + '"]', card);
        var pct = s.total ? (r[1] / s.total) * 100 : 0;
        window.requestAnimationFrame(function () { fill.style.width = pct.toFixed(1) + "%"; });
      });

      // recently accepted, one row per problem
      var seen = {};
      var accepted = s.recent.filter(function (x) {
        if (x.statusDisplay !== "Accepted" || seen[x.titleSlug]) return false;
        seen[x.titleSlug] = true;
        return true;
      }).slice(0, 5);

      var list = $("#lcRecent");
      if (accepted.length) {
        accepted.forEach(function (x) {
          var li = el("li");
          var a = el("a");
          a.href = "https://leetcode.com/problems/" + x.titleSlug + "/";
          a.target = "_blank"; a.rel = "noopener";
          a.appendChild(el("b", null, x.title));
          var when = new Date(Number(x.timestamp) * 1000);
          a.appendChild(el("span", null, (LANGS[x.lang] || x.lang) + " · " + when.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })));
          li.appendChild(a);
          list.appendChild(li);
        });
        var lang = LANGS[accepted[0].lang] || accepted[0].lang;
        var lEl = $("#lcLang");
        lEl.textContent = "Solving in " + lang;
        lEl.hidden = false;
      } else {
        list.appendChild(el("li", "panel__msg", "No recent accepted submissions to show."));
      }
      setState(card, "ready");
    }

    function attempt(i) {
      if (i >= SOURCES.length) {
        setState(card, "error", "LeetCode stats aren't reachable right now. The full history is on the profile.");
        return;
      }
      var src = SOURCES[i];
      getJSON(src.url)
        .then(function (d) {
          var s = src.read(d);
          if (ok(s.total) && ok(s.easy) && ok(s.med) && ok(s.hard)) render(s);
          else attempt(i + 1);
        })
        .catch(function () { attempt(i + 1); });
    }
    attempt(0);
  })();

  /* ------------------------------------------------------
     Unique visitors (footer). Counted once per browser.
     ------------------------------------------------------ */
  (function visitors() {
    var wrap = $("#visitWrap");
    if (!wrap || !window.fetch || !COUNTER_NS) return;
    var seen;
    try { seen = localStorage.getItem("hasBeenCounted"); } catch (e) { seen = null; }
    function ask(verb) { return getJSON("https://abacus.jasoncameron.dev/" + verb + "/" + COUNTER_NS + "/" + COUNTER_KEY); }
    (seen ? ask("get").catch(function () { return ask("hit"); }) : ask("hit"))
      .then(function (d) {
        if (typeof d.value !== "number") return;
        try { localStorage.setItem("hasBeenCounted", "1"); } catch (e) {}
        $("#visitCount").textContent = fmt(d.value);
        wrap.hidden = false;
      })
      .catch(function () { /* stays hidden */ });
  })();
})();
