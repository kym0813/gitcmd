import { useEffect, useState } from 'react';

const EMPTY_CASE = {
  id: '', category: '', title: '', summary: '', command: '', detail: '', tags: [], keywords: [], danger: ''
};

const toList = value => value.split(',').map(item => item.trim()).filter(Boolean);

export default function CaseForm({ editing, onSave, onCancel }) {
  const [form, setForm] = useState(EMPTY_CASE);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(editing ? { ...EMPTY_CASE, ...editing } : EMPTY_CASE);
    setError('');
  }, [editing]);

  function update(event) {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    try {
      await onSave({ ...form, tags: Array.isArray(form.tags) ? form.tags : toList(form.tags), keywords: Array.isArray(form.keywords) ? form.keywords : toList(form.keywords) });
      setForm(EMPTY_CASE);
      setError('');
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  }

  const field = (name, label, placeholder, required = true) => (
    <label className="form-field">
      <span>{label}{required && <em>*</em>}</span>
      <input name={name} value={form[name]} onChange={update} placeholder={placeholder} required={required} />
    </label>
  );

  return (
    <form className="case-form" onSubmit={submit}>
      <div className="form-heading">
        <div><p className="section-label">CASE EDITOR</p><h3>{editing ? '케이스 수정' : '새 케이스 추가'}</h3></div>
        <button type="button" className="text-btn" onClick={onCancel}>{editing ? '수정 취소' : '닫기'}</button>
      </div>
      <div className="form-grid">
        {field('id', '고유 ID', '예: undo-last-commit')}
        {field('category', '카테고리', '예: 커밋')}
        <div className="full-field">{field('title', '제목', '사용자가 찾을 상황을 입력하세요')}</div>
        <div className="full-field">{field('summary', '상황 요약', '언제 사용하는 명령인지 설명하세요')}</div>
        <label className="form-field full-field"><span>명령어<em>*</em></span><textarea name="command" value={form.command} onChange={update} rows="3" required placeholder={'git status\ngit log --oneline'} /></label>
        <label className="form-field full-field"><span>상세 설명<em>*</em></span><textarea name="detail" value={form.detail} onChange={update} rows="3" required placeholder="주의사항과 사용 방법을 입력하세요" /></label>
        <label className="form-field"><span>태그</span><input name="tags" value={Array.isArray(form.tags) ? form.tags.join(', ') : form.tags} onChange={update} placeholder="기본, 안전" /></label>
        <label className="form-field"><span>검색 키워드</span><input name="keywords" value={Array.isArray(form.keywords) ? form.keywords.join(', ') : form.keywords} onChange={update} placeholder="상태, 수정파일" /></label>
        <label className="form-field"><span>위험도</span><select name="danger" value={form.danger || ''} onChange={update}><option value="">일반</option><option value="warning">주의</option><option value="danger">위험</option></select></label>
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="primary-btn" type="submit" disabled={saving}>{saving ? '저장 중...' : editing ? '변경사항 저장' : '케이스 추가'}</button>
    </form>
  );
}
