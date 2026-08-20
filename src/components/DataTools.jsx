import { useRef, useState } from 'react';

export default function DataTools({ cases, onImport, onReset }) {
  const inputRef = useRef(null);
  const [message, setMessage] = useState('');

  function exportData() {
    const blob = new Blob([JSON.stringify(cases, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `git-cases-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage('JSON 백업 파일을 저장했습니다.');
  }

  async function importData(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      onImport(JSON.parse(await file.text()));
      setMessage('JSON 데이터를 가져왔습니다.');
    } catch (error) {
      setMessage(`가져오기 실패: ${error.message}`);
    } finally {
      event.target.value = '';
    }
  }

  function resetData() {
    if (window.confirm('브라우저에서 편집한 내용을 지우고 기본 데이터로 되돌릴까요?')) {
      onReset();
      setMessage('기본 데이터로 복원했습니다.');
    }
  }

  return (
    <div className="data-tools">
      <div><p className="section-label">DATA TOOLS</p><h3>데이터 백업 및 복원</h3><p>변경 내용은 이 브라우저에 자동 저장됩니다.</p></div>
      <div className="tool-actions">
        <button className="secondary-btn" onClick={exportData}>JSON 내보내기</button>
        <button className="secondary-btn" onClick={() => inputRef.current?.click()}>JSON 가져오기</button>
        <input ref={inputRef} type="file" accept="application/json,.json" hidden onChange={importData} />
        <button className="secondary-btn danger-text" onClick={resetData}>기본값 복원</button>
      </div>
      {message && <p className="tool-message" role="status">{message}</p>}
    </div>
  );
}
