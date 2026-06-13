import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;
const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

interface FileMeta {
  name: string;
  originalName: string;
  size: number;
  mimeType: string;
  url: string;
}

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<FileMeta | null>(null);
  const [error, setError] = useState('');
  const [clientError, setClientError] = useState('');
  const prevPreview = useRef<string | null>(null);

  useEffect(() => {
    if (prevPreview.current) {
      URL.revokeObjectURL(prevPreview.current);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      prevPreview.current = url;
    } else {
      setPreview(null);
      prevPreview.current = null;
    }
    return () => {
      if (prevPreview.current) URL.revokeObjectURL(prevPreview.current);
    };
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setResult(null);
    setError('');
    setClientError('');
    setProgress(0);

    if (!selected) { setFile(null); return; }

    if (!ALLOWED_TYPES.includes(selected.type)) {
      setClientError('Тільки JPEG, PNG, WebP');
      setFile(null);
      return;
    }
    if (selected.size > MAX_SIZE) {
      setClientError('Файл перевищує розмір 5 МБ');
      setFile(null);
      return;
    }

    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setError('');
    setProgress(0);

    try {
      const { data } = await axios.post<FileMeta>(`${API}/files`, formData, {
        onUploadProgress: (e) => {
          if (e.total) setProgress(Math.round((e.loaded / e.total) * 100));
        },
      });
      setResult(data);
      setFile(null);
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 413 || status === 400) {
        setError('Сервер отменил файл');
      } else {
        setError('Помилка сервера');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: '0 1rem', fontFamily: 'sans-serif' }}>
      <h1>Завантаження зображень</h1>

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        disabled={uploading}
      />

      {clientError && <p style={{ color: 'red' }}>{clientError}</p>}

      {file && preview && (
        <div style={{ marginTop: '1rem' }}>
          <img src={preview} alt="preview" style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8 }} />
          <p> Файл чек{file.name} — {(file.size / 1024).toFixed(1)} КБ</p>
        </div>
      )}

      {file && (
        <button onClick={handleUpload} disabled={uploading} style={{ marginTop: '0.5rem', padding: '0.5rem 1.5rem' }}>
          {uploading ? 'Завантаження...' : 'Завантажити'}
        </button>
      )}

      {uploading && (
        <div style={{ marginTop: '1rem' }}>
          <div style={{ background: '#eee', borderRadius: 4, overflow: 'hidden', height: 20 }}>
            <div style={{ width: `${progress}%`, background: '#4caf50', height: '100%', transition: 'width 0.2s' }} />
          </div>
          <p style={{ textAlign: 'center' }}>{progress}%</p>
        </div>
      )}

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0fff0', borderRadius: 8 }}>
          <p style={{ color: 'green' }}>Файл завантажений</p>
          <img src={result.url} alt={result.originalName} style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8 }} />
          <p>Файл чек {result.originalName} — {(result.size / 1024).toFixed(1)} КБ</p>
        </div>
      )}
    </div>
  );
}