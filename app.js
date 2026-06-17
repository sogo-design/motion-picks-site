/* ========================================
   Daily Motion Graphics Picks — App Logic
   ======================================== */

(function() {
  'use strict';

  const STORAGE_KEY = 'motion-picks-favorites-v1';
  const BG_STORAGE_KEY = 'motion-picks-bg-enabled-v1';
  const SIZE_STORAGE_KEY = 'motion-picks-card-size-v1';
  const TYPE_STORAGE_KEY = 'motion-picks-content-type-v1';
  const HIDDEN_STORAGE_KEY = 'motion-picks-hidden-v1';
  const USER_ENTRIES_KEY = 'motion-picks-user-entries-v1';
  const VALID_SIZES = ['sm', 'md', 'lg'];
  const VALID_TYPES = ['video', 'graphic'];

  const state = {
    type: loadType(),
    region: 'all',
    genre: 'all',
    tech: 'all',
    date: 'all',
    favoritesOnly: false,
    search: '',
    favorites: loadFavorites(),
    hidden: loadHidden(),
  };

  // User-added entries (stored in this browser's localStorage)
  let userEntries = loadUserEntries();

  // Combined pick list (site data + user entries), rebuilt whenever user entries change
  let picks = buildPicks();

  function buildPicks() {
    const siteData = (window.picksData || []).map(p => Object.assign({ type: 'video' }, p));
    const combined = userEntries.concat(siteData);
    return combined.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }

  function loadUserEntries() {
    try {
      const raw = localStorage.getItem(USER_ENTRIES_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function saveUserEntries() {
    try {
      localStorage.setItem(USER_ENTRIES_KEY, JSON.stringify(userEntries));
    } catch (e) {
      console.warn('Failed to save user entries:', e);
    }
  }

  function loadType() {
    try {
      const v = localStorage.getItem(TYPE_STORAGE_KEY);
      if (VALID_TYPES.indexOf(v) !== -1) return v;
    } catch (e) {}
    return 'video';
  }

  function saveType(t) {
    try {
      localStorage.setItem(TYPE_STORAGE_KEY, t);
    } catch (e) {}
  }

  function loadFavorites() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch (e) {
      return new Set();
    }
  }

  function saveFavorites() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(state.favorites)));
    } catch (e) {
      console.warn('Failed to save favorites:', e);
    }
  }

  function loadHidden() {
    try {
      const raw = localStorage.getItem(HIDDEN_STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch (e) {
      return new Set();
    }
  }

  function saveHidden() {
    try {
      localStorage.setItem(HIDDEN_STORAGE_KEY, JSON.stringify(Array.from(state.hidden)));
    } catch (e) {
      console.warn('Failed to save hidden list:', e);
    }
  }

  function showToast(message, onUndo) {
    const existing = document.getElementById('undo-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'undo-toast';
    toast.className = 'undo-toast';
    toast.innerHTML = `
      <span class="undo-toast-text">${escapeHtml(message)}</span>
      ${onUndo ? '<button class="undo-toast-btn">元に戻す</button>' : ''}
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    const timer = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 250);
    }, 5000);

    const btn = toast.querySelector('.undo-toast-btn');
    if (btn && onUndo) {
      btn.addEventListener('click', () => {
        clearTimeout(timer);
        onUndo();
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 250);
      });
    }
  }

  function uniq(arr) {
    return Array.from(new Set(arr.filter(Boolean)));
  }

  function picksOfType(type) {
    return picks.filter(p => p.type === type);
  }

  function getAllGenres(type) {
    const all = [];
    picksOfType(type || state.type).forEach(p => (p.genre || []).forEach(g => all.push(g)));
    return uniq(all).sort();
  }

  function getAllTechs(type) {
    const all = [];
    picksOfType(type || state.type).forEach(p => (p.techniques || []).forEach(t => all.push(t)));
    return uniq(all).sort();
  }

  function getAllDates(type) {
    return uniq(picksOfType(type || state.type).map(p => p.date)).sort().reverse();
  }

  function escapeHtml(s) {
    if (!s) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const month = d.getMonth() + 1;
      const day = d.getDate();
      const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
      return `${month}/${day}(${weekdays[d.getDay()]})`;
    } catch (e) {
      return dateStr;
    }
  }

  function filterPicks() {
    return picks.filter(p => {
      if (p.type !== state.type) return false;
      // Hidden items are permanently excluded from view
      if (state.hidden.has(p.id)) return false;
      if (state.region !== 'all' && p.region !== state.region) return false;
      if (state.genre !== 'all' && !(p.genre || []).includes(state.genre)) return false;
      if (state.tech !== 'all' && !(p.techniques || []).includes(state.tech)) return false;
      if (state.date !== 'all' && p.date !== state.date) return false;
      if (state.favoritesOnly && !state.favorites.has(p.id)) return false;
      if (state.search) {
        const q = state.search.toLowerCase();
        const haystack = [
          p.title, p.creator, p.notes, p.platform,
          ...(p.genre || []),
          ...(p.techniques || []),
        ].filter(Boolean).join(' ').toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }

  function renderCard(p, index) {
    const isFav = state.favorites.has(p.id);
    const isUser = !!p.userAdded;
    const idParts = (p.id || '').split('-');
    const serialNum = isUser ? 'MY' : (idParts[idParts.length - 1] || String(index + 1).padStart(2, '0'));
    const thumb = p.thumbnail
      ? `<img src="${escapeHtml(p.thumbnail)}" alt="${escapeHtml(p.title)}" loading="lazy" onerror="this.parentElement.classList.add('no-image'); this.remove();">`
      : '<svg viewBox="0 0 64 64" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="14" width="48" height="36" rx="3"/><line x1="20" y1="14" x2="20" y2="50"/><line x1="44" y1="14" x2="44" y2="50"/><line x1="8" y1="22" x2="20" y2="22"/><line x1="8" y1="42" x2="20" y2="42"/><line x1="44" y1="22" x2="56" y2="22"/><line x1="44" y1="42" x2="56" y2="42"/></svg>';

    const genreTags = (p.genre || []).map(g =>
      `<span class="card-tag genre">${escapeHtml(g)}</span>`
    ).join('');

    const techTags = (p.techniques || []).map(t =>
      `<span class="card-tag tech">${escapeHtml(t)}</span>`
    ).join('');

    const links = [];
    if (p.creatorUrl) {
      links.push(`<a class="card-link" href="${escapeHtml(p.creatorUrl)}" target="_blank" rel="noopener">制作者 ↗</a>`);
    }
    if (p.articleUrl) {
      links.push(`<a class="card-link" href="${escapeHtml(p.articleUrl)}" target="_blank" rel="noopener">記事 ↗</a>`);
    }

    return `
      <article class="card" data-id="${escapeHtml(p.id)}">
        <div class="card-thumbnail ${p.thumbnail ? '' : 'no-image'}" data-url="${escapeHtml(p.videoUrl || '')}">
          ${thumb}
          <div class="card-actions">
            <button class="card-favorite ${isFav ? 'active' : ''}" data-id="${escapeHtml(p.id)}" title="お気に入り" aria-label="お気に入り">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path d="M12 2.5l2.92 6.36 6.97.65-5.27 4.78 1.59 6.85L12 17.77 5.79 21.14l1.59-6.85L2.11 9.51l6.97-.65L12 2.5z"
                  fill="${isFav ? 'currentColor' : 'none'}"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="card-delete" data-id="${escapeHtml(p.id)}" data-title="${escapeHtml(p.title)}" data-user="${isUser ? '1' : '0'}" title="${isUser ? '削除する' : '非表示にする'}" aria-label="${isUser ? '削除' : '非表示'}">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6"/>
                <path d="M14 11v6"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </button>
          </div>
          ${isUser ? '<span class="card-mypick-badge">MY PICK</span>' : ''}
          ${p.platform ? `<span class="card-platform-badge">${escapeHtml(p.platform)}</span>` : ''}
        </div>
        <div class="card-body">
          <div class="card-serial">
            <span class="card-serial-num ${isUser ? 'is-user' : ''}">${escapeHtml(serialNum)}</span>
            <span class="card-serial-platform">${escapeHtml(p.platform || '')}</span>
          </div>
          <h3 class="card-title">${escapeHtml(p.title)}</h3>
          ${p.creator ? `<p class="card-creator">${escapeHtml(p.creator)}</p>` : ''}
          ${p.notes ? `<p class="card-notes">${escapeHtml(p.notes)}</p>` : ''}
          <div class="card-tags">
            ${genreTags}
            ${techTags}
          </div>
          <div class="card-meta">
            <span class="card-date">${formatDate(p.date)}</span>
            <div class="card-links">
              ${links.join('')}
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function render() {
    const filtered = filterPicks();
    const grid = document.getElementById('card-grid');
    const empty = document.getElementById('empty-state');

    // Apply type class for type-specific styling (aspect ratio etc.)
    VALID_TYPES.forEach(t => grid.classList.remove('type-' + t));
    grid.classList.add('type-' + state.type);

    if (filtered.length === 0) {
      grid.innerHTML = '';
      empty.style.display = 'block';
    } else {
      grid.innerHTML = filtered.map((p, i) => renderCard(p, i)).join('');
      empty.style.display = 'none';
    }

    const currentTypePicks = picksOfType(state.type);
    const visiblePicks = currentTypePicks.filter(p => !state.hidden.has(p.id));
    const visibleFavorites = visiblePicks.filter(p => state.favorites.has(p.id)).length;

    document.getElementById('stat-total').textContent = visiblePicks.length;
    document.getElementById('stat-favorites').textContent = visibleFavorites;

    const countEl = document.getElementById('result-count-num');
    if (countEl) countEl.textContent = filtered.length;
  }

  function buildChipFilter(containerId, items, attr) {
    const container = document.getElementById(containerId);
    if (!container) return;
    // Clear existing chips except the 'all' button
    const allBtn = container.querySelector('[data-' + attr + '="all"]');
    container.innerHTML = '';
    if (allBtn) container.appendChild(allBtn);
    items.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'chip';
      btn.setAttribute('data-' + attr, item);
      btn.textContent = item;
      container.appendChild(btn);
    });
  }

  function buildDateFilter() {
    const select = document.getElementById('date-filter');
    if (!select) return;
    // Reset
    select.innerHTML = '<option value="all">すべての日付</option>';
    getAllDates().forEach(d => {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = formatDate(d) + ' (' + d + ')';
      select.appendChild(opt);
    });
  }

  function attachEventListeners() {
    document.getElementById('genre-filter').addEventListener('click', e => {
      if (e.target.tagName !== 'BUTTON') return;
      document.querySelectorAll('#genre-filter .chip').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      state.genre = e.target.getAttribute('data-genre');
      render();
    });

    document.getElementById('tech-filter').addEventListener('click', e => {
      if (e.target.tagName !== 'BUTTON') return;
      document.querySelectorAll('#tech-filter .chip').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      state.tech = e.target.getAttribute('data-tech');
      render();
    });

    document.getElementById('date-filter').addEventListener('change', e => {
      state.date = e.target.value;
      render();
    });

    document.getElementById('favorites-only').addEventListener('change', e => {
      state.favoritesOnly = e.target.checked;
      render();
    });


    let searchTimer;
    document.getElementById('search-input').addEventListener('input', e => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        state.search = e.target.value.trim();
        render();
      }, 150);
    });

    document.getElementById('reset-filters').addEventListener('click', () => {
      state.region = 'all';
      state.genre = 'all';
      state.tech = 'all';
      state.date = 'all';
      state.favoritesOnly = false;
      state.search = '';
      document.querySelectorAll('.chip-group').forEach(group => {
        group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        const allBtn = group.querySelector('[data-region="all"], [data-genre="all"], [data-tech="all"]');
        if (allBtn) allBtn.classList.add('active');
      });
      document.getElementById('date-filter').value = 'all';
      document.getElementById('favorites-only').checked = false;
      document.getElementById('search-input').value = '';
      render();
    });

    // Click delegation for cards (favorite + delete + thumbnail click)
    document.getElementById('card-grid').addEventListener('click', e => {
      const favBtn = e.target.closest('.card-favorite');
      if (favBtn) {
        e.stopPropagation();
        const id = favBtn.getAttribute('data-id');
        if (state.favorites.has(id)) {
          state.favorites.delete(id);
        } else {
          state.favorites.add(id);
        }
        saveFavorites();
        render();
        return;
      }

      const delBtn = e.target.closest('.card-delete');
      if (delBtn) {
        e.stopPropagation();
        const id = delBtn.getAttribute('data-id');
        const title = delBtn.getAttribute('data-title');
        const isUser = delBtn.getAttribute('data-user') === '1';
        if (isUser) {
          // User-added entry: remove permanently from localStorage (restorable via undo)
          const removed = userEntries.find(en => en.id === id);
          userEntries = userEntries.filter(en => en.id !== id);
          saveUserEntries();
          picks = buildPicks();
          rebuildFiltersForType();
          render();
          showToast('「' + (title || '作品') + '」を削除しました', function() {
            if (removed) {
              userEntries.unshift(removed);
              saveUserEntries();
              picks = buildPicks();
              rebuildFiltersForType();
              render();
            }
          });
        } else {
          state.hidden.add(id);
          saveHidden();
          render();
          showToast('「' + (title || '作品') + '」を非表示にしました', function() {
            state.hidden.delete(id);
            saveHidden();
            render();
          });
        }
        return;
      }

      const thumb = e.target.closest('.card-thumbnail');
      if (thumb) {
        const url = thumb.getAttribute('data-url');
        if (url) window.open(url, '_blank', 'noopener');
      }
    });
  }

  // ========== Background video (continuous rotation) ==========
  const BG_ROTATION_MS = 75 * 1000; // 75秒ごとに次の動画へ
  let bgQueue = [];
  let bgRotationTimer = null;
  let bgCurrentIdx = 0;

  function getEmbedUrl(pick) {
    const url = pick && pick.videoUrl ? pick.videoUrl : '';
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{6,})/);
    if (ytMatch) {
      const id = ytMatch[1];
      // start=0 で先頭、loop+playlist=ID で同一動画ループ、enablejsapi で将来のAPI制御に備える
      const params = [
        'autoplay=1', 'mute=1', 'loop=1', 'playlist=' + id,
        'controls=0', 'showinfo=0', 'modestbranding=1', 'disablekb=1',
        'fs=0', 'iv_load_policy=3', 'playsinline=1', 'rel=0',
        'enablejsapi=1'
      ].join('&');
      return { url: 'https://www.youtube.com/embed/' + id + '?' + params, kind: 'youtube' };
    }
    const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeoMatch) {
      // background=1 は Vimeo の専用バックグラウンドモード（ループ・無音・コントロール無し）
      return {
        url: 'https://player.vimeo.com/video/' + vimeoMatch[1] + '?background=1&autoplay=1&loop=1&muted=1&dnt=1',
        kind: 'vimeo'
      };
    }
    return null;
  }

  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildBgQueue() {
    // BG video always uses video-type picks regardless of current tab
    const videoOnly = picks.filter(p => p.type === 'video' && getEmbedUrl(p));
    if (videoOnly.length === 0) return [];
    // Vimeo (background=1) is more reliable; put first when available
    const vimeoFirst = videoOnly.filter(p => /vimeo\.com/.test(p.videoUrl));
    const ytPool = videoOnly.filter(p => !/vimeo\.com/.test(p.videoUrl));
    return shuffleArray(vimeoFirst).concat(shuffleArray(ytPool));
  }

  function isBgEnabled() {
    try {
      const v = localStorage.getItem(BG_STORAGE_KEY);
      if (v === null) {
        return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      }
      return v === '1';
    } catch (e) {
      return true;
    }
  }

  function setBgEnabled(enabled) {
    try {
      localStorage.setItem(BG_STORAGE_KEY, enabled ? '1' : '0');
    } catch (e) {}
    applyBgState(enabled);
  }

  function stopBgRotation() {
    if (bgRotationTimer) {
      clearTimeout(bgRotationTimer);
      bgRotationTimer = null;
    }
  }

  function scheduleNextRotation() {
    stopBgRotation();
    bgRotationTimer = setTimeout(() => {
      if (document.body.classList.contains('bg-off')) return;
      if (document.hidden) {
        // タブが非表示なら次のタイミングまでスキップ
        scheduleNextRotation();
        return;
      }
      bgCurrentIdx++;
      if (bgCurrentIdx >= bgQueue.length) {
        // 一巡したら再シャッフルして繰り返し
        bgQueue = buildBgQueue();
        bgCurrentIdx = 0;
      }
      renderBgVideo(bgQueue[bgCurrentIdx]);
      scheduleNextRotation();
    }, BG_ROTATION_MS);
  }

  function applyBgState(enabled) {
    document.body.classList.toggle('bg-off', !enabled);
    const wrapper = document.getElementById('bg-video-wrapper');
    if (enabled) {
      // Build queue + start rotation
      bgQueue = buildBgQueue();
      bgCurrentIdx = 0;
      if (bgQueue.length > 0) {
        renderBgVideo(bgQueue[0]);
        scheduleNextRotation();
      }
    } else {
      stopBgRotation();
      if (wrapper) wrapper.innerHTML = '';
      if (wrapper) wrapper.dataset.loaded = '';
      const nowPlaying = document.getElementById('bg-now-playing');
      if (nowPlaying) nowPlaying.style.display = 'none';
    }
    const btn = document.getElementById('bg-toggle');
    if (btn) {
      btn.title = enabled ? '背景動画 OFFにする' : '背景動画 ONにする';
      btn.setAttribute('aria-label', btn.title);
    }
  }

  function renderBgVideo(pick) {
    const wrapper = document.getElementById('bg-video-wrapper');
    if (!wrapper || !pick) return;
    const embed = getEmbedUrl(pick);
    if (!embed) return;

    const iframe = document.createElement('iframe');
    iframe.src = embed.url;
    iframe.setAttribute('allow', 'autoplay; encrypted-media; fullscreen; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('loading', 'eager');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.setAttribute('tabindex', '-1');

    // フェードイン効果用
    iframe.style.opacity = '0';
    iframe.style.transition = 'opacity 0.8s ease';

    wrapper.innerHTML = '';
    wrapper.appendChild(iframe);
    wrapper.dataset.loaded = '1';

    requestAnimationFrame(() => {
      iframe.style.opacity = '1';
    });

    const nowPlaying = document.getElementById('bg-now-playing');
    const titleEl = document.getElementById('bg-now-playing-title');
    if (nowPlaying && titleEl) {
      titleEl.textContent = pick.title + (pick.creator ? ' / ' + pick.creator : '');
      nowPlaying.style.display = 'inline-flex';
    }
  }

  function initBackgroundVideo() {
    const enabled = isBgEnabled();
    applyBgState(enabled);

    const btn = document.getElementById('bg-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const wasOff = document.body.classList.contains('bg-off');
        setBgEnabled(wasOff);
      });
    }

    // タブ復帰時にもループを再起動（タイマーがバックグラウンドで止まることがあるため）
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && !document.body.classList.contains('bg-off')) {
        if (!bgRotationTimer) scheduleNextRotation();
      }
    });
  }

  // ========== Content type tabs ==========
  function resetFilters() {
    state.region = 'all';
    state.genre = 'all';
    state.tech = 'all';
    state.date = 'all';
    state.favoritesOnly = false;
    state.search = '';
    document.querySelectorAll('.chip-group').forEach(group => {
      group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      const allBtn = group.querySelector('[data-region="all"], [data-genre="all"], [data-tech="all"]');
      if (allBtn) allBtn.classList.add('active');
    });
    const dateFilter = document.getElementById('date-filter');
    if (dateFilter) dateFilter.value = 'all';
    const favOnly = document.getElementById('favorites-only');
    if (favOnly) favOnly.checked = false;
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
  }

  // Rebuild the genre/tech/date filter chips for the current type
  function rebuildFiltersForType() {
    buildChipFilter('genre-filter', getAllGenres(), 'genre');
    buildChipFilter('tech-filter', getAllTechs(), 'tech');
    buildDateFilter();
  }

  function switchType(newType) {
    if (VALID_TYPES.indexOf(newType) === -1) return;
    if (state.type === newType) return;
    state.type = newType;
    saveType(newType);

    // Update tab UI
    document.querySelectorAll('.content-tab').forEach(tab => {
      const isActive = tab.getAttribute('data-type') === newType;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Reset filters and rebuild for new type
    resetFilters();
    rebuildFiltersForType();
    render();
    updateHeroMeta();
  }

  function initTabs() {
    document.querySelectorAll('.content-tab').forEach(tab => {
      const isActive = tab.getAttribute('data-type') === state.type;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      tab.addEventListener('click', () => {
        switchType(tab.getAttribute('data-type'));
      });
    });
  }

  // ========== Card size toggle ==========
  function getSavedSize() {
    try {
      const v = localStorage.getItem(SIZE_STORAGE_KEY);
      if (VALID_SIZES.indexOf(v) !== -1) return v;
    } catch (e) {}
    return 'md';
  }

  function applyCardSize(size) {
    if (VALID_SIZES.indexOf(size) === -1) size = 'md';
    const grid = document.getElementById('card-grid');
    if (grid) {
      VALID_SIZES.forEach(s => grid.classList.remove('size-' + s));
      grid.classList.add('size-' + size);
    }
    document.querySelectorAll('#size-toggle .size-toggle-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-size') === size);
    });
    try {
      localStorage.setItem(SIZE_STORAGE_KEY, size);
    } catch (e) {}
  }

  function initSizeToggle() {
    const initial = getSavedSize();
    applyCardSize(initial);

    const toggle = document.getElementById('size-toggle');
    if (toggle) {
      toggle.addEventListener('click', e => {
        const btn = e.target.closest('.size-toggle-btn');
        if (!btn) return;
        const size = btn.getAttribute('data-size');
        applyCardSize(size);
      });
    }
  }

  function updateHeroMeta() {
    const dates = uniq(picksOfType(state.type).map(p => p.date)).sort();
    const volNum = String(dates.length || 0).padStart(3, '0');
    const latest = dates[dates.length - 1] || '';
    const volEl = document.getElementById('hero-vol-num');
    const dateEl = document.getElementById('hero-date');
    if (volEl) volEl.textContent = volNum;
    if (dateEl && latest) {
      dateEl.textContent = latest.replace(/-/g, '.');
    } else if (dateEl) {
      dateEl.textContent = '—';
    }
  }

  // ========== Add your own pick (user entries) ==========

  // Parse a media URL → platform name + thumbnail URL
  function parseMediaUrl(url) {
    url = (url || '').trim();
    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{6,})/);
    if (yt) {
      return { platform: 'YouTube', thumbnail: 'https://img.youtube.com/vi/' + yt[1] + '/mqdefault.jpg' };
    }
    const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeo) {
      return { platform: 'Vimeo', thumbnail: 'https://vumbnail.com/' + vimeo[1] + '.jpg' };
    }
    if (/(?:twitter\.com|x\.com)\//.test(url)) return { platform: 'X', thumbnail: '' };
    if (/tiktok\.com\//.test(url)) return { platform: 'TikTok', thumbnail: '' };
    if (/instagram\.com\//.test(url)) return { platform: 'Instagram', thumbnail: '' };
    if (/behance\.net\//.test(url)) return { platform: 'Behance', thumbnail: '' };
    if (/dribbble\.com\//.test(url)) return { platform: 'Dribbble', thumbnail: '' };
    if (/pinterest\.[a-z.]+\//.test(url)) return { platform: 'Pinterest', thumbnail: '' };
    return { platform: 'Web', thumbnail: '' };
  }

  function splitTags(value) {
    if (!value) return [];
    return value.split(/[,、\s]+/).map(s => s.trim()).filter(Boolean).slice(0, 6);
  }

  // Holds the most recent auto-fetched metadata for the URL in the add form
  let lastFetchedMeta = null;

  // Infer genre / technique tags from the title + creator text (best-effort, rule-based)
  function inferTags(title, creator, platform) {
    const text = ((title || '') + ' ' + (creator || '') + ' ' + (platform || '')).toLowerCase();
    const has = (...keys) => keys.some(k => text.indexOf(k.toLowerCase()) !== -1);

    const genre = [];
    if (has('mv', 'music video', 'ミュージックビデオ', 'ミュージック・ビデオ', 'official video', 'lyric')) genre.push('MV');
    if (has('リリック', 'lyric', '歌詞')) genre.push('リリックモーション');
    if (has('cm', 'tvcm', 'tv-cm', 'コマーシャル', 'commercial', '広告', '篇', '編', '公式チャンネル', 'official channel')) genre.push('CM');
    if (has('op', 'opening', 'オープニング', 'ノンクレジット', 'タイトル', 'title sequence', 'ed', 'ending', 'エンディング')) genre.push('タイトル/OP');
    if (has('予告', 'trailer', 'ティザー', 'teaser', 'pv', 'プロモ', 'promo')) genre.push('CM');
    if (has('ロゴ', 'logo')) genre.push('ロゴモーション');
    if (has('ブランド', 'brand', 'rebrand', 'リブランド', 'identity', ' vi', ' ci')) genre.push('ブランディング');
    if (has('アニメ', 'anime', 'animation', 'アニメーション')) genre.push('アニメーション');
    if (has('3dcg', '3d cg')) genre.push('3DCG');

    const techniques = [];
    if (has('npr')) techniques.push('NPR');
    if (has('セルシェード', 'cel shad', 'cel-shad', 'toon', 'トゥーン')) techniques.push('セルシェード');
    if (has('3dcg', '3d', 'cgi')) techniques.push('3DCG');
    if (has('2d', '2dアニメ')) techniques.push('2Dアニメーション');
    if (has('作字', '書道', 'カリグラフィ', 'calligraph', 'レタリング')) techniques.push('作字');
    if (has('キネティック', 'kinetic')) techniques.push('キネティックタイポ');
    if (has('タイポ', 'typograph', 'lettering', '文字')) techniques.push('タイポグラフィ');
    if (has('ストップモーション', 'stop motion', 'stop-motion')) techniques.push('ストップモーション');
    if (has('セルアニメ', 'セル画')) techniques.push('セルアニメ');
    if (has('実写', 'live action', 'live-action')) techniques.push('実写合成');
    if (has('glitch', 'グリッチ')) techniques.push('Glitch');

    return {
      genre: uniq(genre).slice(0, 2),
      techniques: uniq(techniques).slice(0, 3)
    };
  }

  // Fetch title / author / thumbnail for a URL using oEmbed (via CORS-enabled noembed.com),
  // with direct fallbacks for YouTube/Vimeo thumbnails.
  function fetchMeta(url) {
    const local = parseMediaUrl(url);
    // noembed supports YouTube, Vimeo, X/Twitter, TikTok, SoundCloud, and many more
    return fetch('https://noembed.com/embed?url=' + encodeURIComponent(url))
      .then(r => (r.ok ? r.json() : null))
      .then(j => {
        if (j && !j.error) {
          return {
            title: j.title || '',
            creator: j.author_name || '',
            creatorUrl: j.author_url || '',
            thumbnail: j.thumbnail_url || local.thumbnail || '',
            platform: j.provider_name || local.platform,
            ok: true
          };
        }
        return { title: '', creator: '', creatorUrl: '', thumbnail: local.thumbnail, platform: local.platform, ok: false };
      })
      .catch(() => ({ title: '', creator: '', creatorUrl: '', thumbnail: local.thumbnail, platform: local.platform, ok: false }));
  }

  function todayStr() {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + m + '-' + day;
  }

  function makeUserId() {
    return 'user-' + Date.now().toString(36) + '-' + Math.floor(Math.random() * 1e6).toString(36);
  }

  function addUserEntry(data) {
    const meta = parseMediaUrl(data.url);
    const fetched = lastFetchedMeta && lastFetchedMeta.url === data.url ? lastFetchedMeta : null;
    // Prefer manual input, then auto-fetched, then URL-derived fallback
    const title = (data.title || '').trim() || (fetched && fetched.title) || '';
    const creator = (data.creator || '').trim() || (fetched && fetched.creator) || '';
    const creatorUrl = (data.creatorUrl || '').trim() || (fetched && fetched.creatorUrl) || '';
    const thumbnail = (data.thumbnail || '').trim() || (fetched && fetched.thumbnail) || meta.thumbnail;
    const platform = (fetched && fetched.platform) || meta.platform;
    const entry = {
      id: makeUserId(),
      date: data.date || todayStr(),
      type: VALID_TYPES.indexOf(data.type) !== -1 ? data.type : state.type,
      region: 'jp',
      userAdded: true,
      title: title || data.url,
      creator: creator,
      platform: platform,
      videoUrl: data.url,
      creatorUrl: creatorUrl,
      articleUrl: '',
      publishedDate: '',
      genre: splitTags(data.genre),
      techniques: splitTags(data.techniques),
      thumbnail: thumbnail,
      notes: data.notes || ''
    };
    userEntries.unshift(entry);
    saveUserEntries();
    picks = buildPicks();
    rebuildFiltersForType();
    render();
    return entry;
  }

  function openAddModal() {
    const modal = document.getElementById('add-modal');
    if (!modal) return;
    // Reflect current tab in the type selector
    const typeSel = document.getElementById('add-type');
    if (typeSel) typeSel.value = state.type;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    const urlInput = document.getElementById('add-url');
    if (urlInput) setTimeout(() => urlInput.focus(), 50);
  }

  function closeAddModal() {
    const modal = document.getElementById('add-modal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    const form = document.getElementById('add-form');
    if (form) form.reset();
    lastFetchedMeta = null;
    setFetchStatus('idle');
    const details = document.getElementById('add-details');
    if (details) details.open = false;
  }

  function initAddEntry() {
    const openBtn = document.getElementById('add-entry-btn');
    if (openBtn) openBtn.addEventListener('click', openAddModal);

    const modal = document.getElementById('add-modal');
    if (!modal) return;

    // Close on backdrop click, close button, or Escape
    modal.addEventListener('click', e => {
      if (e.target === modal || e.target.closest('[data-close-modal]')) closeAddModal();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeAddModal();
    });

    const form = document.getElementById('add-form');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const url = document.getElementById('add-url').value.trim();
        if (!url) return;
        const manualTitle = document.getElementById('add-title').value.trim();
        const autoTitle = (lastFetchedMeta && lastFetchedMeta.url === url) ? lastFetchedMeta.title : '';
        if (!manualTitle && !autoTitle) {
          // No title available — ask the user to fill it manually
          openDetails();
          const t = document.getElementById('add-title');
          t.setAttribute('placeholder', '自動取得できませんでした。タイトルを入力してください');
          t.focus();
          return;
        }
        const entry = addUserEntry({
          url: url,
          title: manualTitle,
          creator: document.getElementById('add-creator').value,
          creatorUrl: document.getElementById('add-creator-url').value,
          genre: document.getElementById('add-genre').value,
          techniques: document.getElementById('add-tech').value,
          thumbnail: document.getElementById('add-thumb').value,
          notes: document.getElementById('add-notes').value,
          type: document.getElementById('add-type').value
        });
        closeAddModal();
        if (entry.type !== state.type) {
          switchType(entry.type);
        }
        showToast('「' + (entry.title || '作品') + '」を登録しました（このブラウザに保存）');
      });
    }

    // Auto-fetch metadata when the URL changes (debounced)
    const urlInput = document.getElementById('add-url');
    let fetchTimer = null;
    if (urlInput) {
      urlInput.addEventListener('input', () => {
        const url = urlInput.value.trim();
        clearTimeout(fetchTimer);
        if (!url || !/^https?:\/\//.test(url)) {
          setFetchStatus('idle');
          return;
        }
        setFetchStatus('loading');
        fetchTimer = setTimeout(() => {
          fetchMeta(url).then(meta => {
            meta.url = url;
            lastFetchedMeta = meta;
            applyFetchedMeta(meta);
          });
        }, 500);
      });
    }
  }

  function openDetails() {
    const d = document.getElementById('add-details');
    if (d) d.open = true;
  }

  function setFetchStatus(status) {
    const el = document.getElementById('add-fetch-status');
    const preview = document.getElementById('add-preview');
    if (!el) return;
    if (status === 'idle') {
      el.textContent = '';
      if (preview) preview.style.display = 'none';
    } else if (status === 'loading') {
      el.textContent = '情報を取得中…';
      el.className = 'add-fetch-status loading';
    }
  }

  function applyFetchedMeta(meta) {
    const el = document.getElementById('add-fetch-status');
    const preview = document.getElementById('add-preview');
    const pThumb = document.getElementById('add-preview-thumb');
    const pTitle = document.getElementById('add-preview-title');
    const pCreator = document.getElementById('add-preview-creator');
    const pPlatform = document.getElementById('add-preview-platform');

    // Infer genre / technique tags from the fetched title + creator
    const inferred = inferTags(meta.title, meta.creator, meta.platform);

    // Pre-fill the (hidden) detail fields so the user can tweak if needed
    const titleField = document.getElementById('add-title');
    const creatorField = document.getElementById('add-creator');
    const creatorUrlField = document.getElementById('add-creator-url');
    const thumbField = document.getElementById('add-thumb');
    const genreField = document.getElementById('add-genre');
    const techField = document.getElementById('add-tech');
    if (titleField && !titleField.value) titleField.value = meta.title || '';
    if (creatorField && !creatorField.value) creatorField.value = meta.creator || '';
    if (creatorUrlField && !creatorUrlField.value) creatorUrlField.value = meta.creatorUrl || '';
    if (thumbField && !thumbField.value && meta.thumbnail) thumbField.value = meta.thumbnail;
    if (genreField && !genreField.value && inferred.genre.length) genreField.value = inferred.genre.join(', ');
    if (techField && !techField.value && inferred.techniques.length) techField.value = inferred.techniques.join(', ');

    if (el) {
      if (meta.title) {
        el.textContent = '✓ 自動取得しました';
        el.className = 'add-fetch-status ok';
      } else {
        el.textContent = '⚠ 自動取得できませんでした。下の「詳細を編集」でタイトルを入力してください';
        el.className = 'add-fetch-status warn';
      }
    }

    if (preview) {
      if (meta.title || meta.thumbnail) {
        preview.style.display = 'flex';
        if (pThumb) {
          if (meta.thumbnail) { pThumb.src = meta.thumbnail; pThumb.style.display = 'block'; }
          else pThumb.style.display = 'none';
        }
        if (pTitle) pTitle.textContent = meta.title || '(タイトル未取得)';
        if (pCreator) pCreator.textContent = meta.creator || '';
        if (pPlatform) pPlatform.textContent = meta.platform || '';
        const pTags = document.getElementById('add-preview-tags');
        if (pTags) {
          const allTags = inferred.genre.concat(inferred.techniques);
          if (allTags.length) {
            pTags.innerHTML = allTags.map(t => '<span class="add-preview-tag">' + escapeHtml(t) + '</span>').join('');
            pTags.style.display = 'flex';
          } else {
            pTags.innerHTML = '<span class="add-preview-tag muted">タグ未推定（詳細で追加可）</span>';
            pTags.style.display = 'flex';
          }
        }
      } else {
        preview.style.display = 'none';
      }
    }
  }

  function init() {
    initTabs();
    buildChipFilter('genre-filter', getAllGenres(), 'genre');
    buildChipFilter('tech-filter', getAllTechs(), 'tech');
    buildDateFilter();
    attachEventListeners();
    render();
    initBackgroundVideo();
    initSizeToggle();
    initAddEntry();
    updateHeroMeta();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
