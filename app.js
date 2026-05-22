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

  // Normalize picks: default type to 'video' for legacy entries without type field
  const picks = (window.picksData || []).map(p => {
    return Object.assign({ type: 'video' }, p);
  }).sort((a, b) => {
    return (b.date || '').localeCompare(a.date || '');
  });

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

  function showUndoToast(id, title) {
    const existing = document.getElementById('undo-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'undo-toast';
    toast.className = 'undo-toast';
    toast.innerHTML = `
      <span class="undo-toast-text">「${escapeHtml(title || '作品')}」を非表示にしました</span>
      <button class="undo-toast-btn" data-id="${escapeHtml(id)}">元に戻す</button>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));

    const timer = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 250);
    }, 5000);

    toast.querySelector('.undo-toast-btn').addEventListener('click', e => {
      clearTimeout(timer);
      const restoreId = e.target.getAttribute('data-id');
      state.hidden.delete(restoreId);
      saveHidden();
      render();
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 250);
    });
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
    const regionLabel = p.region === 'jp' ? 'JP / 国内' : 'INT / 海外';
    const regionClass = p.region === 'jp' ? 'jp' : 'global';
    const idParts = (p.id || '').split('-');
    const serialNum = idParts[idParts.length - 1] || String(index + 1).padStart(2, '0');
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
          <span class="card-region-badge ${regionClass}">${regionLabel}</span>
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
            <button class="card-delete" data-id="${escapeHtml(p.id)}" data-title="${escapeHtml(p.title)}" title="非表示にする" aria-label="非表示">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6"/>
                <path d="M14 11v6"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </button>
          </div>
          ${p.platform ? `<span class="card-platform-badge">${escapeHtml(p.platform)}</span>` : ''}
        </div>
        <div class="card-body">
          <div class="card-serial">
            <span class="card-serial-num">${escapeHtml(serialNum)}</span>
            <span class="card-serial-region">${p.region === 'jp' ? 'JP' : 'GLOBAL'}</span>
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
    document.getElementById('region-filter').addEventListener('click', e => {
      if (e.target.tagName !== 'BUTTON') return;
      document.querySelectorAll('#region-filter .chip').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      state.region = e.target.getAttribute('data-region');
      render();
    });

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
        state.hidden.add(id);
        saveHidden();
        render();
        showUndoToast(id, title);
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
    buildChipFilter('genre-filter', getAllGenres(), 'genre');
    buildChipFilter('tech-filter', getAllTechs(), 'tech');
    buildDateFilter();
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

  function init() {
    initTabs();
    buildChipFilter('genre-filter', getAllGenres(), 'genre');
    buildChipFilter('tech-filter', getAllTechs(), 'tech');
    buildDateFilter();
    attachEventListeners();
    render();
    initBackgroundVideo();
    initSizeToggle();
    updateHeroMeta();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
