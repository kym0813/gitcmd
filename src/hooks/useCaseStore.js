import { useCallback, useEffect, useMemo, useState } from 'react';
import { defaultCases } from '../data/defaultCases';
import { supabase } from '../lib/supabase';

function normalizeCase(item) {
  return {
    id: String(item.id || '').trim(),
    category: String(item.category || '').trim(),
    title: String(item.title || '').trim(),
    summary: String(item.summary || '').trim(),
    command: String(item.command || '').trim(),
    detail: String(item.detail || '').trim(),
    tags: Array.isArray(item.tags) ? item.tags.map(String).map(value => value.trim()).filter(Boolean) : [],
    keywords: Array.isArray(item.keywords) ? item.keywords.map(String).map(value => value.trim()).filter(Boolean) : [],
    danger: item.danger || null
  };
}

function validateCases(items) {
  if (!Array.isArray(items) || items.length === 0) throw new Error('비어 있지 않은 JSON 배열이 필요합니다.');
  const normalized = items.map(normalizeCase);
  if (normalized.some(item => !item.id || !item.category || !item.title || !item.summary || !item.command || !item.detail)) {
    throw new Error('필수 필드가 누락된 항목이 있습니다.');
  }
  const ids = normalized.map(item => item.id);
  if (new Set(ids).size !== ids.length) throw new Error('중복 ID가 포함되어 있습니다.');
  return normalized;
}

export function useCaseStore() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const ids = useMemo(() => new Set(cases.map(item => item.id)), [cases]);

  const loadCases = useCallback(async () => {
    setLoading(true);
    const { data, error: queryError } = await supabase.from('git_cases').select('*').order('created_at', { ascending: true });
    if (queryError) {
      setError(queryError.message);
      setCases([]);
    } else {
      setError('');
      setCases((data || []).map(normalizeCase));
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadCases(); }, [loadCases]);

  const saveCase = useCallback(async (item, originalId = null) => {
    const normalized = validateCases([item])[0];
    if (normalized.id !== originalId && ids.has(normalized.id)) throw new Error('이미 사용 중인 ID입니다.');
    const query = originalId
      ? supabase.from('git_cases').update(normalized).eq('id', originalId).select().single()
      : supabase.from('git_cases').insert(normalized).select().single();
    const { data, error: mutationError } = await query;
    if (mutationError) throw new Error(mutationError.message);
    const saved = normalizeCase(data);
    setCases(current => originalId ? current.map(entry => entry.id === originalId ? saved : entry) : [saved, ...current]);
    return saved;
  }, [ids]);

  const deleteCase = useCallback(async id => {
    const { error: mutationError } = await supabase.from('git_cases').delete().eq('id', id);
    if (mutationError) throw new Error(mutationError.message);
    setCases(current => current.filter(item => item.id !== id));
  }, []);

  const replaceAll = useCallback(async items => {
    const normalized = validateCases(items);
    const { error: deleteError } = await supabase.from('git_cases').delete().neq('id', '');
    if (deleteError) throw new Error(deleteError.message);
    const { data, error: insertError } = await supabase.from('git_cases').insert(normalized).select();
    if (insertError) throw new Error(insertError.message);
    setCases((data || []).map(normalizeCase));
  }, []);

  const resetCases = useCallback(() => replaceAll(defaultCases), [replaceAll]);
  const importCases = useCallback(items => replaceAll(items), [replaceAll]);
  const seedDefaults = useCallback(async () => {
    if (cases.length) return false;
    const { data, error: insertError } = await supabase.from('git_cases').insert(defaultCases.map(normalizeCase)).select();
    if (insertError) throw new Error(insertError.message);
    setCases((data || []).map(normalizeCase));
    return true;
  }, [cases.length]);

  return { cases, loading, error, loadCases, saveCase, deleteCase, resetCases, importCases, seedDefaults };
}
