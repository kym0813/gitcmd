import { useCallback, useEffect, useMemo, useState } from 'react';
import { defaultCases } from '../data/defaultCases';

const STORAGE_KEY = 'git-case-guide:cases:v1';

function normalizeCase(item) {
  return {
    id: String(item.id || '').trim(),
    category: String(item.category || '').trim(),
    title: String(item.title || '').trim(),
    summary: String(item.summary || '').trim(),
    command: String(item.command || '').trim(),
    detail: String(item.detail || '').trim(),
    tags: Array.isArray(item.tags) ? item.tags.map(String).map(v => v.trim()).filter(Boolean) : [],
    keywords: Array.isArray(item.keywords) ? item.keywords.map(String).map(v => v.trim()).filter(Boolean) : [],
    ...(item.danger ? { danger: item.danger } : {})
  };
}

function loadCases() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultCases;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.map(normalizeCase) : defaultCases;
  } catch {
    return defaultCases;
  }
}

export function useCaseStore() {
  const [cases, setCases] = useState(loadCases);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
  }, [cases]);

  const ids = useMemo(() => new Set(cases.map(item => item.id)), [cases]);

  const saveCase = useCallback((item, originalId = null) => {
    const normalized = normalizeCase(item);
    if (!normalized.id || !normalized.category || !normalized.title || !normalized.summary || !normalized.command || !normalized.detail) {
      throw new Error('필수 항목을 모두 입력해 주세요.');
    }
    if (normalized.id !== originalId && ids.has(normalized.id)) {
      throw new Error('이미 사용 중인 ID입니다.');
    }
    setCases(current => originalId
      ? current.map(entry => entry.id === originalId ? normalized : entry)
      : [normalized, ...current]);
    return normalized;
  }, [ids]);

  const deleteCase = useCallback(id => {
    setCases(current => current.filter(item => item.id !== id));
  }, []);

  const resetCases = useCallback(() => setCases(defaultCases), []);

  const importCases = useCallback(items => {
    if (!Array.isArray(items) || items.length === 0) throw new Error('비어 있지 않은 JSON 배열이 필요합니다.');
    const normalized = items.map(normalizeCase);
    const importedIds = normalized.map(item => item.id);
    if (normalized.some(item => !item.id || !item.category || !item.title || !item.command || !item.summary || !item.detail)) {
      throw new Error('필수 필드가 누락된 항목이 있습니다.');
    }
    if (new Set(importedIds).size !== importedIds.length) throw new Error('중복 ID가 포함되어 있습니다.');
    setCases(normalized);
  }, []);

  return { cases, saveCase, deleteCase, resetCases, importCases };
}
