import { useState } from 'react';
import { ADMIN_EMAIL, supabase } from '../lib/supabase';

export default function LoginPanel({ onClose }) {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setMessage(`로그인 실패: ${error.message}`);
    else onClose();
  }

  return (
    <div className="login-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className="login-panel" role="dialog" aria-modal="true" aria-labelledby="login-title">
        <button className="modal-close" onClick={onClose} aria-label="닫기">×</button>
        <p className="section-label">ADMIN LOGIN</p>
        <h2 id="login-title">관리자 로그인</h2>
        <p>등록된 관리자 계정으로 로그인하면 서버 데이터를 관리할 수 있습니다.</p>
        <form onSubmit={submit}>
          <label className="form-field"><span>이메일</span><input type="email" value={email} onChange={event => setEmail(event.target.value)} required autoComplete="username" /></label>
          <label className="form-field"><span>비밀번호</span><input type="password" value={password} onChange={event => setPassword(event.target.value)} required autoComplete="current-password" /></label>
          {message && <p className="form-error" role="alert">{message}</p>}
          <button className="primary-btn login-submit" disabled={busy}>{busy ? '로그인 중...' : '로그인'}</button>
        </form>
      </section>
    </div>
  );
}
