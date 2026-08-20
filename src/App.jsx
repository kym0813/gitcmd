import { useEffect, useMemo, useRef, useState } from 'react';
import CaseCard from './components/CaseCard';
import CaseForm from './components/CaseForm';
import DataTools from './components/DataTools';
import LoginPanel from './components/LoginPanel';
import { useAuth } from './hooks/useAuth';
import { useCaseStore } from './hooks/useCaseStore';

const quickKeywords = ['원격 main 최신화', 'push 거절', '리베이스 충돌', '커밋 취소', '실서버 롤백', '브랜치 복사'];
const normalize = value => String(value).toLowerCase().replace(/\s+/g, ' ').trim();

export default function App() {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const { cases, loading, error, saveCase, deleteCase, resetCases, importCases, seedDefaults } = useCaseStore();
  const [category, setCategory] = useState('전체');
  const [query, setQuery] = useState('');
  const [managing, setManaging] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [seedError, setSeedError] = useState('');
  const searchRef = useRef(null);
  const editorRef = useRef(null);

  const categories = useMemo(() => ['전체', ...new Set(cases.map(item => item.category))], [cases]);
  const filteredCases = useMemo(() => {
    const terms = normalize(query).split(' ').filter(Boolean);
    return cases.filter(item => {
      if (category !== '전체' && item.category !== category) return false;
      if (!terms.length) return true;
      const text = normalize([item.title, item.summary, item.command, item.detail, item.category, ...(item.tags || []), ...(item.keywords || [])].join(' '));
      return terms.every(term => text.includes(term));
    });
  }, [cases, category, query]);

  useEffect(() => {
    function shortcuts(event) {
      if (event.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === 'Escape' && document.activeElement === searchRef.current) {
        setQuery('');
        searchRef.current.blur();
      }
    }
    document.addEventListener('keydown', shortcuts);
    return () => document.removeEventListener('keydown', shortcuts);
  }, []);

  useEffect(() => {
    if (!authLoading && isAdmin && !loading && !error && cases.length === 0) {
      seedDefaults().catch(seedFailure => setSeedError(seedFailure.message));
    }
  }, [authLoading, isAdmin, loading, error, cases.length, seedDefaults]);

  function editCase(item) {
    setEditing(item);
    editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function removeCase(item) {
    if (window.confirm(`“${item.title}” 케이스를 삭제할까요?`)) {
      try {
        await deleteCase(item.id);
        if (editing?.id === item.id) setEditing(null);
      } catch (deleteError) {
        window.alert(`삭제 실패: ${deleteError.message}`);
      }
    }
  }

  async function persistCase(item) {
    await saveCase(item, editing?.id || null);
    setEditing(null);
  }

  function openManager() {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    if (!isAdmin) {
      window.alert('관리자 권한이 없는 계정입니다.');
      return;
    }
    setManaging(value => !value);
    setEditing(null);
  }

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top">Git Case Guide</a>
          <div className="header-actions">
            {user && <span className="user-badge">{user.email}</span>}
            <button className={`manage-btn ${managing ? 'active' : ''}`} onClick={openManager}>
              {managing ? '가이드 보기' : user && isAdmin ? '데이터 관리' : '관리자 로그인'}
            </button>
            {user && <button className="logout-btn" onClick={() => { setManaging(false); signOut(); }}>로그아웃</button>}
            <a className="github-link" href="https://github.com/kym0813/gitcmd" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-inner">
            <span className="eyebrow">Git 실무 치트시트</span>
            <h1>명령어가 아니라<br /><span>상황으로 찾는 Git 가이드</span></h1>
            <p>“원격 main 최신화”, “push가 거절됨”, “특정 작업만 롤백”처럼 실제 상황을 검색하세요.</p>
            <div className="search-wrap">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.3-4.3m1.3-5.2a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              <input ref={searchRef} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="예: 원격 main 리베이스, 커밋 취소, 브랜치 삭제..." autoComplete="off" />
              <kbd>/</kbd>
            </div>
            <div className="quick-keywords">
              {quickKeywords.map(keyword => <button className="keyword-btn" key={keyword} onClick={() => { setQuery(keyword); searchRef.current?.focus(); }}>{keyword}</button>)}
            </div>
          </div>
        </section>

        {managing && isAdmin && (
          <section className="manager-section" ref={editorRef}>
            <div className="container manager-grid">
              <CaseForm editing={editing} onSave={persistCase} onCancel={() => setEditing(null)} />
              <DataTools cases={cases} onImport={importCases} onReset={async () => { await resetCases(); setEditing(null); }} />
            </div>
          </section>
        )}

        <section className="content-section">
          <div className="container layout">
            <aside className="sidebar">
              <div className="sidebar-sticky">
                <h2>카테고리</h2>
                <nav className="category-nav" aria-label="Git categories">
                  {categories.map(name => (
                    <button className={`category-btn ${category === name ? 'active' : ''}`} key={name} onClick={() => setCategory(name)}>
                      <span>{name}</span><span className="category-count">{name === '전체' ? cases.length : cases.filter(item => item.category === name).length}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            <section className="results-area">
              <div className="results-head">
                <div><p className="section-label">{managing ? 'MANAGE LIBRARY' : 'CASE LIBRARY'}</p><h2>{category === '전체' ? '전체 Git 케이스' : `${category} 케이스`}</h2></div>
                <span className="result-count">{filteredCases.length}개 결과</span>
              </div>
              {loading ? (
                <div className="empty-state"><h3>서버 데이터를 불러오는 중입니다.</h3></div>
              ) : error ? (
                <div className="empty-state error-state"><h3>데이터베이스 연결을 준비 중입니다.</h3><p>{error}</p></div>
              ) : seedError ? (
                <div className="empty-state error-state"><h3>기본 데이터 저장에 실패했습니다.</h3><p>{seedError}</p></div>
              ) : !filteredCases.length ? (
                <div className="empty-state"><h3>검색 결과가 없습니다.</h3><p>다른 키워드로 검색하거나 카테고리를 변경해보세요.</p></div>
              ) : (
                <div className="cards">{filteredCases.map(item => <CaseCard key={item.id} item={item} managing={managing} onEdit={editCase} onDelete={removeCase} />)}</div>
              )}
            </section>
          </div>
        </section>
      </main>

      <footer><div className="container footer-inner"><p>Git Case Guide · React로 만든 상황별 Git 가이드</p><p>위험한 명령어는 실행 전 현재 브랜치와 상태를 꼭 확인하세요.</p></div></footer>
      {loginOpen && <LoginPanel onClose={() => setLoginOpen(false)} />}
    </>
  );
}
