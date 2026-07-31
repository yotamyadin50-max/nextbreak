(function () {
  'use strict';

  // All dates verified via Hebcal's date-converter API (Hebrew year 5787) and
  // the Israeli Ministry of Education's official תשפ"ז academic calendar.
  var EVENTS = {
    roshhashana: { name: 'ראש השנה',            date: '2026-09-12', icon: 'shofar' },
    yomkippur:   { name: 'יום כיפור',            date: '2026-09-21', icon: 'book' },
    sukkot:      { name: 'סוכות',                date: '2026-09-26', icon: 'sukkah' },
    simchattorah:{ name: 'שמחת תורה',            date: '2026-10-03', icon: 'scroll' },
    hanukkah:    { name: 'חנוכה',                date: '2026-12-05', icon: 'menorah' },
    tubishvat:   { name: 'ט"ו בשבט',             date: '2027-01-23', icon: 'tree' },
    purim:       { name: 'פורים',                date: '2027-03-23', icon: 'hamantasch' },
    pesach:      { name: 'פסח',                  date: '2027-04-22', icon: 'matzah' },
    yomhaatzmaut:{ name: 'יום העצמאות',          date: '2027-05-11', icon: 'flag' },
    lagbaomer:   { name: 'ל"ג בעומר',            date: '2027-05-25', icon: 'bonfire' },
    shavuot:     { name: 'שבועות',                date: '2027-06-11', icon: 'wheat' },
    schoolend:   { name: 'סוף שנת הלימודים',      date: '2027-06-30', icon: 'cap' },
    summer:      { name: 'חופש גדול',             date: '2027-07-01', icon: 'sun' }
  };

  var ICONS = {
    sun: '<circle cx="24" cy="19" r="8"/><line x1="24" y1="4" x2="24" y2="8"/><line x1="11" y1="10" x2="14" y2="13"/><line x1="37" y1="10" x2="34" y2="13"/><line x1="6" y1="19" x2="10" y2="19"/><line x1="42" y1="19" x2="38" y2="19"/><path d="M4 35 Q10 31 16 35 T28 35 T40 35"/>',
    cap: '<path d="M6 18 L24 10 L42 18 L24 26 Z"/><line x1="24" y1="26" x2="24" y2="36"/><path d="M14 21.5 V29 Q24 34 34 29 V21.5"/><line x1="42" y1="18" x2="42" y2="27"/>',
    menorah: '<line x1="24" y1="14" x2="24" y2="34"/><line x1="14" y1="38" x2="34" y2="38"/><line x1="24" y1="34" x2="24" y2="38"/><path d="M24 14 Q17 14 15 20"/><path d="M24 18 Q19 18 18 23"/><path d="M24 22 Q21 22 20.5 26"/><path d="M24 14 Q31 14 33 20"/><path d="M24 18 Q29 18 30 23"/><path d="M24 22 Q27 22 27.5 26"/><circle cx="24" cy="10" r="1.6" fill="currentColor" stroke="none"/><circle cx="15" cy="16" r="1.4" fill="currentColor" stroke="none"/><circle cx="18" cy="19" r="1.4" fill="currentColor" stroke="none"/><circle cx="20.5" cy="22" r="1.4" fill="currentColor" stroke="none"/><circle cx="33" cy="16" r="1.4" fill="currentColor" stroke="none"/><circle cx="30" cy="19" r="1.4" fill="currentColor" stroke="none"/><circle cx="27.5" cy="22" r="1.4" fill="currentColor" stroke="none"/>',
    matzah: '<path d="M14 10 Q14 20 20 24 V34 H8 V24 Q14 20 14 10 Z"/><rect x="26" y="14" width="16" height="20" rx="2"/><line x1="29" y1="18" x2="39" y2="18"/><line x1="29" y1="24" x2="39" y2="24"/><line x1="29" y1="30" x2="39" y2="30"/>',
    shofar: '<ellipse cx="12" cy="34" rx="6" ry="4.5"/><path d="M12 30 Q13 18 22 12 Q30 6 37 8"/><path d="M14 26 Q18 20 24 16"/><circle cx="37.5" cy="8" r="1.6" fill="currentColor" stroke="none"/>',
    book: '<path d="M24 15 C20 12 12 11 8 13 V33 C12 31 20 32 24 35 C28 32 36 31 40 33 V13 C36 11 28 12 24 15 Z"/><line x1="24" y1="15" x2="24" y2="35"/><line x1="12" y1="18" x2="19" y2="18"/><line x1="29" y1="18" x2="36" y2="18"/>',
    sukkah: '<line x1="10" y1="20" x2="10" y2="37"/><line x1="38" y1="20" x2="38" y2="37"/><line x1="10" y1="37" x2="38" y2="37"/><line x1="8" y1="20" x2="40" y2="20"/><line x1="10" y1="16" x2="6" y2="10"/><line x1="17" y1="16" x2="14" y2="9"/><line x1="24" y1="16" x2="24" y2="8"/><line x1="31" y1="16" x2="34" y2="9"/><line x1="38" y1="16" x2="42" y2="10"/>',
    scroll: '<ellipse cx="14" cy="24" rx="5" ry="10"/><ellipse cx="34" cy="24" rx="5" ry="10"/><line x1="19" y1="15" x2="29" y2="15"/><line x1="19" y1="33" x2="29" y2="33"/><line x1="24" y1="15" x2="24" y2="33"/>',
    tree: '<line x1="24" y1="30" x2="24" y2="38"/><line x1="16" y1="38" x2="32" y2="38"/><circle cx="24" cy="19" r="10"/>',
    hamantasch: '<path d="M24 10 L38 34 L10 34 Z" stroke-linejoin="round"/><circle cx="24" cy="27" r="3" fill="currentColor" stroke="none"/>',
    flag: '<line x1="12" y1="8" x2="12" y2="40"/><path d="M12 10 H36 V26 H12 Z"/><path d="M18 21 L24 12 L30 21 Z"/><path d="M18 15 L24 24 L30 15 Z"/>',
    bonfire: '<line x1="14" y1="36" x2="30" y2="30"/><line x1="14" y1="30" x2="30" y2="36"/><path d="M24 10 Q30 18 26 25 Q24 28 22 25 Q18 18 24 10 Z"/>',
    wheat: '<line x1="18" y1="35" x2="30" y2="35"/><path d="M24 35 Q20 24 16 12"/><path d="M24 35 Q24 22 24 9"/><path d="M24 35 Q28 24 32 12"/>'
  };

  var STORAGE_KEY = 'nextbreak_custom_events';

  var fixedCardsEl = document.getElementById('fixed-cards');
  var myEventsSection = document.getElementById('my-events-section');
  var myEventsCardsEl = document.getElementById('my-events-cards');
  var viewSelect = document.getElementById('view-select');
  var viewCountdown = document.getElementById('view-countdown');
  var countdownLive = document.querySelector('.countdown-live');
  var arrivalState = document.getElementById('arrival-state');
  var eventNameEl = document.getElementById('event-name');
  var arrivalSubEl = document.getElementById('arrival-sub');
  var confettiEl = document.getElementById('confetti');
  var btnChangeEvent = document.getElementById('btn-change-event');
  var btnRestart = document.getElementById('btn-restart');
  var btnShare = document.getElementById('btn-share');
  var shareConfirmEl = document.getElementById('share-confirm');
  var customForm = document.getElementById('custom-form');

  var numberEls = {
    days: document.getElementById('num-days'),
    hours: document.getElementById('num-hours'),
    minutes: document.getElementById('num-minutes'),
    seconds: document.getElementById('num-seconds')
  };
  var blockEls = {
    days: document.querySelector('.number-block[data-unit="days"]'),
    hours: document.querySelector('.number-block[data-unit="hours"]'),
    minutes: document.querySelector('.number-block[data-unit="minutes"]'),
    seconds: document.querySelector('.number-block[data-unit="seconds"]')
  };

  var timerId = null;
  var prevValues = { days: null, hours: null, minutes: null, seconds: null };

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function formatDateDMY(dateStr) {
    var parts = dateStr.split('-');
    return parts[2] + '.' + Number(parts[1]) + '.' + parts[0];
  }

  function parseDateOnly(dateStr) {
    var parts = dateStr.split('-').map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0);
  }

  function startOfDay(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
  }

  // For a recurring (birthday-type) saved event, the stored date's month/day
  // repeats every year. Always resolve to the next upcoming occurrence, this
  // year if it hasn't happened yet, otherwise next year, so the event never
  // needs re-entering and never permanently "expires."
  function effectiveDate(saved) {
    var stored = parseDateOnly(saved.date);
    if (!saved.recurring) return stored;
    var today = startOfDay(new Date());
    var candidate = new Date(today.getFullYear(), stored.getMonth(), stored.getDate(), 0, 0, 0, 0);
    if (candidate.getTime() < today.getTime()) {
      candidate = new Date(today.getFullYear() + 1, stored.getMonth(), stored.getDate(), 0, 0, 0, 0);
    }
    return candidate;
  }

  function formatDateObjDMY(d) {
    return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
  }

  function dateToISO(d) {
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + m + '-' + day;
  }

  // ---------- Saved custom events (localStorage) ----------

  function loadSavedEvents() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveSavedEvents(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) { /* storage unavailable, fail silently, the app still works without persistence */ }
  }

  function addSavedEvent(label, date, recurring) {
    var list = loadSavedEvents();
    var id = 'c' + Date.now();
    list.push({ id: id, label: label, date: date, recurring: !!recurring });
    saveSavedEvents(list);
    return id;
  }

  function removeSavedEvent(id) {
    var list = loadSavedEvents().filter(function (ev) { return ev.id !== id; });
    saveSavedEvents(list);
    renderMyEvents();
  }

  // ---------- Card rendering ----------

  function buildIconSvg(iconKey) {
    return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[iconKey] || '') + '</svg>';
  }

  function createFixedCard(id, ev) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'event-card';
    btn.dataset.eventId = id;
    btn.innerHTML =
      '<span class="event-icon" aria-hidden="true">' + buildIconSvg(ev.icon) + '</span>' +
      '<span class="event-text">' +
        '<span class="event-name">' + ev.name + '</span>' +
        '<span class="event-date"><span dir="ltr">' + formatDateDMY(ev.date) + '</span></span>' +
      '</span>';
    btn.addEventListener('click', function () {
      goTo('countdown/' + id);
    });
    return btn;
  }

  function createSavedCard(saved) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'event-card saved-card';
    var effective = effectiveDate(saved);
    var params = new URLSearchParams();
    params.set('date', saved.date);
    params.set('label', saved.label);
    params.set('id', saved.id);
    var recurringTag = saved.recurring ? '<span class="tag-recurring">חוזר כל שנה</span>' : '';
    btn.innerHTML =
      '<button type="button" class="delete-btn" aria-label="הסירו את ' + saved.label + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>' +
      '</button>' +
      '<span class="event-icon" aria-hidden="true">' + buildIconSvg('sun') + '</span>' +
      '<span class="event-text">' +
        '<span class="event-name">' + saved.label + '</span>' +
        '<span class="event-date"><span dir="ltr">' + formatDateObjDMY(effective) + '</span> ' + recurringTag + '</span>' +
      '</span>';
    btn.addEventListener('click', function () {
      goTo('countdown/custom?' + params.toString());
    });
    var deleteBtn = btn.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      removeSavedEvent(saved.id);
    });
    return btn;
  }

  function renderFixedCards() {
    fixedCardsEl.innerHTML = '';
    Object.keys(EVENTS).forEach(function (id) {
      fixedCardsEl.appendChild(createFixedCard(id, EVENTS[id]));
    });
  }

  function renderMyEvents() {
    var saved = loadSavedEvents();
    myEventsCardsEl.innerHTML = '';
    if (saved.length === 0) {
      myEventsSection.hidden = true;
      return;
    }
    myEventsSection.hidden = false;
    saved.forEach(function (ev) {
      myEventsCardsEl.appendChild(createSavedCard(ev));
    });
  }

  // ---------- Routing ----------

  function currentRoute() {
    var hash = location.hash.replace(/^#/, '');
    if (hash.indexOf('countdown/custom') === 0) {
      var qIndex = hash.indexOf('?');
      var params = new URLSearchParams(qIndex >= 0 ? hash.slice(qIndex + 1) : '');
      var date = params.get('date');
      var savedId = params.get('id');
      if (savedId) {
        var savedMatch = loadSavedEvents().filter(function (ev) { return ev.id === savedId; })[0];
        if (savedMatch) {
          return {
            view: 'countdown',
            type: 'custom',
            date: dateToISO(effectiveDate(savedMatch)),
            label: savedMatch.label,
            recurring: !!savedMatch.recurring
          };
        }
      }
      if (date) {
        return {
          view: 'countdown',
          type: 'custom',
          date: date,
          label: params.get('label') || 'הספירה שלי'
        };
      }
    } else if (hash.indexOf('countdown/') === 0) {
      var id = hash.slice('countdown/'.length);
      if (EVENTS[id]) {
        return { view: 'countdown', type: 'fixed', id: id };
      }
    }
    return { view: 'select' };
  }

  function goTo(hash) {
    location.hash = hash;
  }

  function crossfade(hideEl, showEl, afterShow) {
    if (hideEl.hidden) {
      showEl.hidden = false;
      if (afterShow) afterShow();
      return;
    }
    hideEl.classList.add('fading-out');
    setTimeout(function () {
      hideEl.hidden = true;
      hideEl.classList.remove('fading-out');
      showEl.hidden = false;
      showEl.classList.remove('view');
      void showEl.offsetWidth;
      showEl.classList.add('view');
      if (afterShow) afterShow();
    }, 250);
  }

  function render() {
    var route = currentRoute();
    stopTimer();

    if (route.view === 'select') {
      renderMyEvents();
      crossfade(viewCountdown, viewSelect);
      return;
    }

    var target, name;
    if (route.type === 'fixed') {
      var ev = EVENTS[route.id];
      target = parseDateOnly(ev.date);
      name = ev.name;
    } else {
      target = parseDateOnly(route.date);
      name = route.label;
    }

    eventNameEl.textContent = name;
    btnShare.hidden = route.type !== 'custom';
    shareConfirmEl.hidden = true;
    prevValues = { days: null, hours: null, minutes: null, seconds: null };

    crossfade(viewSelect, viewCountdown, function () {
      startTimer(target, name);
    });
  }

  // ---------- Countdown timer ----------

  function startTimer(target, name) {
    tick(target, name);
    timerId = setInterval(function () {
      tick(target, name);
    }, 1000);
  }

  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function tick(target, name) {
    var diff = target.getTime() - Date.now();
    if (diff <= 0) {
      showArrival(name);
      stopTimer();
      return;
    }
    countdownLive.hidden = false;
    arrivalState.hidden = true;

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    updateUnit('days', days);
    updateUnit('hours', hours);
    updateUnit('minutes', minutes);
    updateUnit('seconds', seconds);
  }

  function updateUnit(unit, value) {
    var changed = prevValues[unit] !== null && prevValues[unit] !== value;
    numberEls[unit].textContent = pad(value);

    if (changed) {
      var el = blockEls[unit];
      var cls = unit === 'seconds' ? 'pulse-tick' : 'pulse-roll';
      el.classList.remove('pulse-tick', 'pulse-roll');
      void el.offsetWidth;
      el.classList.add(cls);
    }
    prevValues[unit] = value;
  }

  // ---------- Arrival state ----------

  function showArrival(name) {
    countdownLive.hidden = true;
    arrivalState.hidden = false;
    arrivalSubEl.textContent = name + ' כבר כאן.';
    spawnConfetti(name);
  }

  function seededRandom(seed) {
    var s = seed;
    return function () {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }

  function spawnConfetti(seedLabel) {
    confettiEl.innerHTML = '';
    var seed = 0;
    for (var i = 0; i < seedLabel.length; i++) seed += seedLabel.charCodeAt(i);
    var rand = seededRandom(seed || 1);

    var colors = ['var(--color-accent)', '#FFC28A', '#FF9F70'];
    for (var i = 0; i < 24; i++) {
      var piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.style.left = (rand() * 100) + '%';
      piece.style.background = colors[Math.floor(rand() * colors.length)];
      piece.style.animationDelay = (rand() * 200) + 'ms';
      piece.style.transform = 'rotate(' + Math.floor(rand() * 360) + 'deg)';
      confettiEl.appendChild(piece);
    }
  }

  // ---------- Events ----------

  customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var date = document.getElementById('custom-date').value;
    if (!date) return;
    var label = document.getElementById('custom-label').value.trim() || 'הספירה שלי';
    var recurring = document.getElementById('custom-recurring').checked;
    var id = addSavedEvent(label, date, recurring);
    var params = new URLSearchParams();
    params.set('date', date);
    params.set('label', label);
    params.set('id', id);
    document.getElementById('custom-date').value = '';
    document.getElementById('custom-label').value = '';
    document.getElementById('custom-recurring').checked = false;
    goTo('countdown/custom?' + params.toString());
  });

  btnChangeEvent.addEventListener('click', function () {
    goTo('select');
  });

  btnRestart.addEventListener('click', function () {
    goTo('select');
  });

  btnShare.addEventListener('click', function () {
    var url = location.href;
    function showConfirm() {
      shareConfirmEl.hidden = false;
      setTimeout(function () { shareConfirmEl.hidden = true; }, 2500);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(showConfirm).catch(function () {
        fallbackCopy(url, showConfirm);
      });
    } else {
      fallbackCopy(url, showConfirm);
    }
  });

  function fallbackCopy(text, done) {
    var input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    try { document.execCommand('copy'); } catch (e) { /* no-op */ }
    document.body.removeChild(input);
    done();
  }

  // ---------- PWA install prompt ----------

  var btnInstall = document.getElementById('btn-install');
  var deferredInstallPrompt = null;

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredInstallPrompt = e;
    btnInstall.hidden = false;
  });

  btnInstall.addEventListener('click', function () {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then(function () {
      deferredInstallPrompt = null;
      btnInstall.hidden = true;
    });
  });

  window.addEventListener('appinstalled', function () {
    btnInstall.hidden = true;
  });

  // ---------- Notifications (best-effort, no server) ----------
  // A static site with no backend cannot wake itself up on a schedule while
  // fully closed, real push needs a server. This checks, whenever the tab is
  // open or becomes visible, whether a reminder window has started (10:00 the
  // day before, 08:00 the day of) and fires it once per event per year.

  var btnNotify = document.getElementById('btn-notify');
  var NOTIFIED_KEY = 'nextbreak_notified';
  var notifSupported = 'Notification' in window && 'serviceWorker' in navigator;

  function loadNotified() {
    try {
      var raw = localStorage.getItem(NOTIFIED_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }

  function markNotified(key) {
    var map = loadNotified();
    map[key] = true;
    try { localStorage.setItem(NOTIFIED_KEY, JSON.stringify(map)); } catch (e) { /* no-op */ }
  }

  function sendNotification(title, body, tag) {
    navigator.serviceWorker.ready.then(function (reg) {
      reg.active && reg.active.postMessage({ type: 'show-notification', payload: { title: title, body: body, tag: tag } });
    });
  }

  function updateNotifyButton() {
    if (!notifSupported) { btnNotify.hidden = true; return; }
    btnNotify.hidden = false;
    if (Notification.permission === 'granted') {
      btnNotify.textContent = 'התראות פעילות';
      btnNotify.classList.add('is-active');
    } else {
      btnNotify.textContent = 'הפעילו התראות';
      btnNotify.classList.remove('is-active');
    }
  }

  btnNotify.addEventListener('click', function () {
    if (Notification.permission === 'granted' || Notification.permission === 'denied') return;
    Notification.requestPermission().then(updateNotifyButton);
  });

  function checkReminders() {
    if (!notifSupported || Notification.permission !== 'granted') return;
    var today = startOfDay(new Date());
    var hour = new Date().getHours();
    var notified = loadNotified();
    var toMark = [];

    function check(key, name, target) {
      var year = target.getFullYear();
      var dayMs = 24 * 60 * 60 * 1000;
      var diffDays = Math.round((target.getTime() - today.getTime()) / dayMs);
      var beforeKey = key + '_before_' + year;
      var ofKey = key + '_of_' + year;
      if (diffDays === 1 && hour >= 10 && !notified[beforeKey]) {
        sendNotification('מחר: ' + name, name + ' מגיע מחר. תפתחו את NextBreak לספירה החיה.', beforeKey);
        toMark.push(beforeKey);
      }
      if (diffDays === 0 && hour >= 8 && !notified[ofKey]) {
        sendNotification('היום: ' + name + ' 🎉', 'היום זה היום! ' + name + ' כאן.', ofKey);
        toMark.push(ofKey);
      }
    }

    Object.keys(EVENTS).forEach(function (id) {
      check(id, EVENTS[id].name, parseDateOnly(EVENTS[id].date));
    });
    loadSavedEvents().forEach(function (ev) {
      check(ev.id, ev.label, effectiveDate(ev));
    });

    toMark.forEach(markNotified);
  }

  if (notifSupported) {
    navigator.serviceWorker.register('sw.js').catch(function () { /* offline/unsupported, app still works */ });
  }

  renderFixedCards();
  updateNotifyButton();
  window.addEventListener('hashchange', render);
  window.addEventListener('DOMContentLoaded', render);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') checkReminders();
  });
  render();
  checkReminders();
  setInterval(checkReminders, 60000);
})();
