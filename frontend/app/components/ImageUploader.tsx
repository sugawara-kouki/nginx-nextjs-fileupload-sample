'use client';

import React, { useState, useRef, useCallback } from 'react';
import { UploadResponse, ImageInfo } from '@/app/types';
import { useToast } from '@/app/hooks';

export const ImageUploader: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<ImageInfo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    // プロミス型のトースト通知
    const uploadPromise = fetch('/api/upload', {
      method: 'POST',
      body: formData,
    }).then(async (response) => {
      const result: UploadResponse = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'アップロードに失敗しました');
      }
      
      return result;
    });

    try {
      const result = await toast.promise(uploadPromise, {
        loading: `${file.name} をアップロード中...`,
        success: (data) => `${data.filename} のアップロードが完了しました`,
        error: (err) => `アップロードエラー: ${err.message}`,
      });

      const newImage: ImageInfo = {
        id: Date.now().toString(),
        url: result.imageUrl,
        filename: result.filename,
        uploadedAt: new Date().toLocaleString(),
      };
      
      setUploadedImages(prev => [...prev, newImage]);
    } catch (error) {
      // エラーはtoast.promiseで既に表示されているため、追加処理不要
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  }, [toast]);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const getImageUrl = useCallback((originalUrl: string): string => {
    if (originalUrl.startsWith('/')) {
      // nginxの静的ファイルサーバー（localhost:8080）を参照
      return `http://localhost:8080${originalUrl}`;
    }
    return originalUrl;
  }, []);

  const copyToClipboard = useCallback(async (url: string, imageId: string, filename: string) => {
    const fullUrl = getImageUrl(url);
    
    try {
      // Modern Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(fullUrl);
      } else {
        // Fallback for older browsers or non-HTTPS
        const textArea = document.createElement('textarea');
        textArea.value = fullUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (!successful) {
          throw new Error('コピーに失敗しました');
        }
      }
      
      // Success feedback with React state
      setCopySuccess(imageId);
      setTimeout(() => {
        setCopySuccess(null);
      }, 2000);
      
      // トースト通知でコピー成功を表示
      toast.success(`${filename} のURLをコピーしました`);
      
    } catch (error) {
      console.error('コピーエラー:', error);
      toast.error(`コピーに失敗しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [getImageUrl, toast]);

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          ファイルアップローダー
        </h1>

        {/* アップロードエリア */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            dragOver
              ? 'border-blue-400 bg-blue-900/20'
              : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          role="button"
          tabIndex={0}
          aria-label="ファイルアップロード領域"
        >
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <p className="text-xl text-gray-300 mb-4 font-medium">
            画像をドラッグ&ドロップ または
          </p>
          
          <button
            onClick={openFileDialog}
            disabled={uploading}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label={uploading ? "アップロード中" : "ファイルを選択"}
          >
            {uploading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                アップロード中...
              </span>
            ) : (
              'ファイルを選択'
            )}
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="sr-only"
            aria-label="画像ファイル選択"
          />
          
          <p className="text-sm text-gray-400 mt-4">
            対応形式: JPEG, PNG, GIF, WebP (最大10MB)
          </p>
        </div>

        {/* アップロード済み画像一覧 */}
        {uploadedImages.length > 0 && (
          <section className="mt-12" aria-labelledby="uploaded-images-heading">
            <h2 id="uploaded-images-heading" className="text-2xl font-bold mb-6 text-gray-100">
              アップロード済み画像 ({uploadedImages.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadedImages.map((image) => (
                <article key={image.id} className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-700">
                  <div className="aspect-video bg-gray-900 relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getImageUrl(image.url)}
                      alt={`アップロード画像: ${image.filename}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuOCqOODqeODvDwvdGV4dD48L3N2Zz4=';
                      }}
                    />
                    
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <a 
                          href={getImageUrl(image.url)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white bg-opacity-90 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-opacity-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          aria-label={`${image.filename}を新しいタブで開く`}
                        >
                          拡大表示
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-100 truncate mb-2">
                      {image.filename}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">
                      {image.uploadedAt}
                    </p>
                    
                    <div className="flex space-x-2">
                      <a 
                        href={getImageUrl(image.url)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-sm text-blue-400 hover:text-blue-300 bg-blue-900/20 hover:bg-blue-900/30 py-2 px-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        aria-label={`${image.filename}を新しいタブで開く`}
                      >
                        新しいタブで開く
                      </a>
                      <button
                        onClick={() => copyToClipboard(image.url, image.id, image.filename)}
                        className={`flex-1 text-center text-sm py-2 px-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                          copySuccess === image.id
                            ? 'text-green-300 bg-green-900/40 focus:ring-green-500'
                            : 'text-green-400 hover:text-green-300 bg-green-900/20 hover:bg-green-900/30 focus:ring-green-500'
                        }`}
                        aria-label={`${image.filename}のURLをコピー`}
                      >
                        {copySuccess === image.id ? 'コピー済み!' : 'URLコピー'}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};