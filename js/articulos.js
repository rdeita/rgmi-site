/* ═══════════════════════════════════════════════════════════
   ARTÍCULOS — Renderizado y filtrado
   ═══════════════════════════════════════════════════════════ */

const ARTICLES = {
  manifest: null,

  async load() {
    try {
      const res = await fetch('articulos/manifest.json?v=' + Date.now());
      if (!res.ok) throw new Error('manifest not found');
      this.manifest = await res.json();
      return this.manifest;
    } catch (e) {
      this.manifest = { articles: [] };
      return this.manifest;
    }
  },

  formatDate(iso, lang) {
    if (!iso) return '';
    const d = new Date(iso);
    const opts = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-MX', opts);
  },

  estimateReadTime(text) {
    if (!text) return 1;
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 220));
  },

  // ─── PREVIEW (homepage) ────────────────────────────
  async renderPreview() {
    const container = document.getElementById('articlesPreview');
    if (!container) return;

    await this.load();
    const lang = window.I18N ? window.I18N.current : 'es';
    const items = (this.manifest.articles || [])
      .filter(a => !a.lang || a.lang === lang)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    if (items.length === 0) {
      container.innerHTML = `<div class="articles-loading">${window.I18N ? window.I18N.t('articles.empty') : 'Sin artículos.'}</div>`;
      return;
    }

    container.innerHTML = items.map(a => this.cardHTML(a, lang)).join('');
  },

  // ─── LIST PAGE ────────────────────────────
  async renderList() {
    const container = document.getElementById('articlesList');
    if (!container) return;

    await this.load();
    this.bindFilters();
    this.renderFiltered();
  },

  bindFilters() {
    const search = document.getElementById('searchInput');
    const chips = document.querySelectorAll('.cat-chip');

    if (search) {
      search.addEventListener('input', () => this.renderFiltered());
    }
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.renderFiltered();
      });
    });

    // Re-render on language change
    document.addEventListener('langchange', () => this.renderFiltered());
  },

  renderFiltered() {
    const container = document.getElementById('articlesList');
    if (!container) return;

    const lang = window.I18N ? window.I18N.current : 'es';
    const search = document.getElementById('searchInput');
    const activeChip = document.querySelector('.cat-chip.active');
    const q = search ? search.value.trim().toLowerCase() : '';
    const cat = activeChip ? activeChip.getAttribute('data-cat') : '';

    let items = (this.manifest.articles || [])
      .filter(a => !a.lang || a.lang === lang)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (cat && cat !== 'all') {
      items = items.filter(a => (a.category || '').toLowerCase() === cat.toLowerCase());
    }
    if (q) {
      items = items.filter(a =>
        (a.title || '').toLowerCase().includes(q) ||
        (a.summary || '').toLowerCase().includes(q) ||
        (a.tags || []).some(t => t.toLowerCase().includes(q))
      );
    }

    if (items.length === 0) {
      container.innerHTML = `<div class="articles-empty">${window.I18N ? window.I18N.t('articles.empty') : 'Sin resultados.'}</div>`;
      return;
    }
    container.innerHTML = items.map(a => this.cardHTML(a, lang)).join('');
  },

  cardHTML(a, lang) {
    const date = this.formatDate(a.date, lang);
    const cat = a.category || '';
    return `
      <a href="articulo.html?slug=${encodeURIComponent(a.slug)}" class="article-card">
        <div class="article-meta">
          ${cat ? `<span>${cat}</span><span class="dot">·</span>` : ''}
          <span>${date}</span>
        </div>
        <h3>${a.title || ''}</h3>
        <p>${a.summary || ''}</p>
        <span class="read-more">${window.I18N ? window.I18N.t('articles.read') : 'Leer'} →</span>
      </a>
    `;
  },

  // ─── READER ────────────────────────────
  async renderReader() {
    const container = document.getElementById('articleReader');
    if (!container) return;

    await this.load();
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    if (!slug) {
      container.innerHTML = '<p>Artículo no encontrado.</p>';
      return;
    }

    const article = (this.manifest.articles || []).find(a => a.slug === slug);
    if (!article) {
      container.innerHTML = '<p>Artículo no encontrado.</p>';
      return;
    }

    const lang = window.I18N ? window.I18N.current : 'es';
    const back = window.I18N ? window.I18N.t('articles.back') : '← Volver';

    try {
      const mdRes = await fetch(`content/articulos/${article.slug}.md?v=${Date.now()}`);
      const md = await mdRes.text();
      const body = this.stripFrontmatter(md);
      const html = window.marked ? window.marked.parse(body) : `<pre>${body}</pre>`;
      const minutes = this.estimateReadTime(body);
      const date = this.formatDate(article.date, lang);

      // Update document title
      document.title = `${article.title} — Rafael Martínez De Ita`;

      container.innerHTML = `
        <a href="articulos.html" class="article-back">${back}</a>
        <div class="article-meta">
          ${article.category ? `<span>${article.category}</span>` : ''}
          <span>${date}</span>
          <span>${minutes} ${window.I18N ? window.I18N.t('articles.minutes') : 'min de lectura'}</span>
        </div>
        <h1>${article.title}</h1>
        ${article.summary ? `<div class="article-summary">${article.summary}</div>` : ''}
        <div class="article-content">${html}</div>
        <div class="article-share">
          <span>${window.I18N ? window.I18N.t('articles.share') : 'COMPARTIR'}</span>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
          </a>
          <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}" target="_blank" rel="noopener" aria-label="X">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(window.location.href)}" aria-label="Email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </a>
        </div>
      `;
    } catch (e) {
      container.innerHTML = '<p>Error al cargar el artículo.</p>';
    }
  },

  stripFrontmatter(md) {
    if (md.startsWith('---')) {
      const end = md.indexOf('---', 3);
      if (end > -1) return md.slice(end + 3).trim();
    }
    return md;
  }
};

// Auto-init based on which page we're on
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('articlesPreview')) ARTICLES.renderPreview();
  if (document.getElementById('articlesList')) ARTICLES.renderList();
  if (document.getElementById('articleReader')) ARTICLES.renderReader();

  document.addEventListener('langchange', () => {
    if (document.getElementById('articlesPreview')) ARTICLES.renderPreview();
    if (document.getElementById('articleReader')) ARTICLES.renderReader();
  });
});
