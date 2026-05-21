import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitize and generate unique filename
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}_${originalName}`;

    // 1. Check if running in development (local) environment
    const isDev = process.env.NODE_ENV === 'development';
    const localUploadDir = path.join(process.cwd(), 'public', 'uploads');

    if (isDev) {
      if (!fs.existsSync(localUploadDir)) {
        fs.mkdirSync(localUploadDir, { recursive: true });
      }
      const localFilePath = path.join(localUploadDir, filename);
      fs.writeFileSync(localFilePath, buffer);
      return NextResponse.json({ 
        success: true, 
        url: `/uploads/${filename}`,
        message: 'Asset uploaded locally' 
      });
    }

    // 2. Production Flow: Commit file binary payload to GitHub
    const token = req.headers.get('x-github-token') || process.env.GITHUB_TOKEN || process.env.GH_PAT;
    if (!token) {
      return NextResponse.json({ 
        success: false, 
        error: 'Authentication failed. Please provide a GitHub Personal Access Token (PAT) with repo scope in the settings panel.' 
      }, { status: 401 });
    }

    const owner = 'pixel-junkie-creative-studios';
    const repo = 'the-1-percent-club-v2';
    const filePath = `public/uploads/${filename}`;
    const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

    const base64Content = buffer.toString('base64');
    const commitBody = {
      message: `sync(upload): add image asset public/uploads/${filename} via visual builder`,
      content: base64Content,
      branch: 'main'
    };

    const putRes = await fetch(githubApiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': '1percent-club-builder-v1'
      },
      body: JSON.stringify(commitBody)
    });

    const putData = await putRes.json();

    if (putRes.status === 200 || putRes.status === 201) {
      return NextResponse.json({ 
        success: true, 
        url: `/uploads/${filename}`,
        message: 'Asset committed to GitHub repo. Vercel deployment triggered.',
        data: putData
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: putData.message || 'Failed to commit asset to GitHub.' 
      }, { status: putRes.status });
    }

  } catch (error: any) {
    console.error('Error in upload-image:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
