// frontend/src/app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'ファイルが見つかりません' });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ローカル環境用のパス（Dockerコンテナとの共有ディレクトリ）
    const uploadDir = path.join(process.cwd(), '..', 'shared-uploads', 'images');
    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    return NextResponse.json({
      success: true,
      imageUrl: `/uploads/images/${filename}`,
      filename: filename,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: 'アップロードに失敗しました' });
  }
}