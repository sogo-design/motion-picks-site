/* ========================================
   Daily Motion Graphics Picks — App Logic
   ======================================== */

(function() {
  'use strict';

  const STORAGE_KEY = 'motion-picks-favorites-v1';
  const BG_STORAGE_KEY = 'motion-picks-bg-enabled-v1';

  const state = {
    region: 'all',
    genre: 'all',
    tech: 'all',
    date: 'all',
    favoritesOnly: false,
    search: '',
    favorites: loadFavorites(),
  };

  const picks = (window.picksData || []).slice().sort((a, b) => {
    return (b.date || '').localeCompare(a.date || '');
  });

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

  function uniq(arr) {
    return Array.from(new Set(arr.filter(Boolean)));
  }

  function getAllGenres() {
    const all = [];
    picks.forEach(p => (p.genre || []).forEach(g => all.push(g)));
    return uniq(all).sort();
  }

  function getAllTechs() {
    const all = [];
    picks.forEach(p => (p.techniques || []).forEach(t => all.push(t)));
    return uniq(all).sort();
  }

  function getAllDates() {
    return uniq(picks.map(p => p.date)).sort().reverse();
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
    const regionLabel = p.region === 'jp' ? '🇯🇵 国内' : '🌍 海外';
    const regionClass = p.region === 'jp' ? 'jp' : 'global';
    const idParts = (p.id || '').split('-');
    const serialNum = idParts[idParts.length - 1] || String(index + 1).padStart(2, '0');
    const thumb = p.thumbnail
      ? `<img src="${escapeHtml(p.thumbnail)}" alt="${escapeHtml(p.title)}" loading="lazy" onerror="this.parentElement.classList.add('no-image'); this.remove();">`
      : '🎬';

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
          <button class="card-favorite ${isFav ? 'active' : ''}" data-id="${escapeHtml(p.id)}" title="お気に入り">
            ${isFav ? '★' : '☆'}
          </button>
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

    if (filtered.length === 0) {
      grid.innerHTML = '';
      empty.style.display = 'block';
    } else {
      grid.innerHTML = filtered.map((p, i) => renderCard(p, i)).join('');
      empty.style.display = 'none';
    }

    document.getElementById('stat-total').textContent = picks.length;
    document.getElementById('stat-favorites').textContent = state.favorites.size;
    document.getElementById('stat-days').textContent = uniq(picks.map(p => p.date)).length;

    const countEl = document.getElementById('result-count-num');
    if (countEl) countEl.textContent = filtered.length;
  }

  function buildChipFilter(containerId, items, attr) {
    const container = document.getElementById(containerId);
    const allBtn = container.querySelector('[data-' + attr + '="all"]');
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

    // Click delegation for cards (favorite button + thumbnail click)
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

      const thumb = e.target.closest('.card-thumbnail');
      if (thumb) {
        const url = thumb.getAttribute('data-url');
        if (url) window.open(url, '_blank', 'noopener');
      }
    });
  }

  // ========== Background video ==========
  function getEmbedUrl(pick) {
    const url = pick && pick.videoUrl ? pick.videoUrl : '';
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{6,})/);
    if (ytMatch) {
      const id = ytMatch[1];
      const params = [
        'autoplay=1', 'mute=1', 'loop=1', 'playlist=' + id,
        'controls=0', 'showinfo=0', 'modestbranding=1', 'disablekb=1',
        'fs=0', 'iv_load_policy=3', 'playsinline=1', 'rel=0'
      ].join('&');
      return { url: 'https://www.youtube.com/embed/' + id + '?' + params, kind: 'youtube' };
    }
    const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeoMatch) {
      return {
        url: 'https://player.vimeo.com/video/' + vimeoMatch[1] + '?background=1&autoplay=1&loop=1&muted=1&dnt=1',
        kind: 'vimeo'
      };
    }
    return null;
  }

  function pickFeaturedVideo() {
    const eligible = picks.filter(p => getEmbedUrl(p));
    if (eligible.length === 0) return null;
    const latestDate = eligible[0].date;
    const fromLatest = eligible.filter(p => p.date === latestDate);
    const pool = fromLatest.length > 0 ? fromLatest : eligible;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function isBgEnabled() {
    try {
      const v = localStorage.getItem(BG_STORAGE_KEY);
      if (v === null) {
        // Default: ON, unless prefers-reduced-motion
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

  function applyBgState(enabled) {
    document.body.classList.toggle('bg-off', !enabled);
    const wrapper = document.getElementById('bg-video-wrapper');
    if (enabled) {
      if (wrapper && !wrapper.dataset.loaded) loadBgVideo();
    } else {
      // Stop video to save resources
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

  function loadBgVideo() {
    const wrapper = document.getElementById('bg-video-wrapper');
    if (!wrapper) return;
    const pick = pickFeaturedVideo();
    if (!pick) return;
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
    wrapper.innerHTML = '';
    wrapper.appendChild(iframe);
    wrapper.dataset.loaded = '1';

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
        setBgEnabled(wasOff); // if was off → enable, if was on → disable
      });
    }
  }

  function updateHeroMeta() {
    const dates = uniq(picks.map(p => p.date)).sort();
    const volNum = String(dates.length || 0).padStart(3, '0');
    const latest = dates[dates.length - 1] || '';
    const volEl = document.getElementById('hero-vol-num');
    const dateEl = document.getElementById('hero-date');
    if (volEl) volEl.textContent = volNum;
    if (dateEl && latest) {
      // Format: 2026.05.22
      dateEl.textContent = latest.replace(/-/g, '.');
    } else if (dateEl) {
      dateEl.textContent = '—';
    }
  }

  function init() {
    buildChipFilter('genre-filter', getAllGenres(), 'genre');
    buildChipFilter('tech-filter', getAllTechs(), 'tech');
    buildDateFilter();
    attachEventListeners();
    render();
    initBackgroundVideo();
    updateHeroMeta();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
