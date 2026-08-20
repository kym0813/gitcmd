const state = { category: '전체', query: '' };
const cardsEl = document.getElementById('cards');
const categoryNav = document.getElementById('categoryNav');
const searchInput = document.getElementById('searchInput');
const resultCount = document.getElementById('resultCount');
const resultsTitle = document.getElementById('resultsTitle');
const emptyState = document.getElementById('emptyState');
const quickKeywords = document.getElementById('quickKeywords');

const categories = ['전체', ...new Set(gitCases.map(item => item.category))];
const quicks = ['원격 main 최신화', 'push 거절', '리베이스 충돌', '커밋 취소', '실서버 롤백', '브랜치 복사'];

function normalize(v) {
  return String(v).toLowerCase().replace(/\s+/g, ' ').trim();
}

function categoryCount(category) {
  if (category === '전체') return gitCases.length;
  return gitCases.filter(item => item.category === category).length;
}

function renderCategories() {
  categoryNav.innerHTML = categories.map(category => `
    <button class="category-btn ${state.category === category ? 'active' : ''}" data-category="${category}">
      <span>${category}</span><span class="category-count">${categoryCount(category)}</span>
    </button>
  `).join('');

  categoryNav.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.category = btn.dataset.category;
      renderCategories();
      renderCards();
    });
  });
}

function renderQuicks() {
  quickKeywords.innerHTML = quicks.map(keyword => `<button class="keyword-btn" data-keyword="${keyword}">${keyword}</button>`).join('');
  quickKeywords.querySelectorAll('.keyword-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      searchInput.value = btn.dataset.keyword;
      state.query = btn.dataset.keyword;
      renderCards();
      searchInput.focus();
    });
  });
}

function searchableText(item) {
  return normalize([
    item.title,
    item.summary,
    item.command,
    item.detail,
    item.category,
    ...(item.tags || []),
    ...(item.keywords || [])
  ].join(' '));
}

function filteredCases() {
  const q = normalize(state.query);
  return gitCases.filter(item => {
    const categoryMatch = state.category === '전체' || item.category === state.category;
    if (!categoryMatch) return false;
    if (!q) return true;
    const terms = q.split(' ').filter(Boolean);
    const haystack = searchableText(item);
    return terms.every(term => haystack.includes(term)) || haystack.includes(q);
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderCards() {
  const list = filteredCases();
  resultCount.textContent = `${list.length}개 결과`;
  resultsTitle.textContent = state.category === '전체' ? '전체 Git 케이스' : `${state.category} 케이스`;
  emptyState.hidden = list.length !== 0;

  cardsEl.innerHTML = list.map(item => `
    <article class="case-card" id="${item.id}">
      <div class="card-main">
        <div class="card-top">
          <div class="card-tags">
            ${(item.tags || []).map(tag => `<span class="tag ${item.danger || ''}">${escapeHtml(tag)}</span>`).join('')}
          </div>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="case-summary">${escapeHtml(item.summary)}</p>
        <div class="code-block">
          <div class="code-label"><span>TERMINAL</span><button class="copy-btn" data-command="${encodeURIComponent(item.command)}">복사</button></div>
          <pre><code>${escapeHtml(item.command)}</code></pre>
        </div>
      </div>
      <div class="card-details">
        <button class="details-toggle" aria-expanded="false"><span>설명 / 주의사항</span><span>＋</span></button>
        <div class="details-content">
          <strong>설명</strong>
          <p>${escapeHtml(item.detail)}</p>
          <div class="related">${(item.keywords || []).slice(0, 5).map(k => `<span>${escapeHtml(k)}</span>`).join('')}</div>
        </div>
      </div>
    </article>
  `).join('');

  cardsEl.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const command = decodeURIComponent(btn.dataset.command);
      try {
        await navigator.clipboard.writeText(command);
        const old = btn.textContent;
        btn.textContent = '복사됨';
        setTimeout(() => btn.textContent = old, 1200);
      } catch {
        btn.textContent = '실패';
      }
    });
  });

  cardsEl.querySelectorAll('.details-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
      btn.lastElementChild.textContent = isOpen ? '−' : '＋';
    });
  });
}

searchInput.addEventListener('input', e => {
  state.query = e.target.value;
  renderCards();
});

document.addEventListener('keydown', e => {
  if (e.key === '/' && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
  }
  if (e.key === 'Escape' && document.activeElement === searchInput) {
    searchInput.value = '';
    state.query = '';
    renderCards();
    searchInput.blur();
  }
});

renderCategories();
renderQuicks();
renderCards();
