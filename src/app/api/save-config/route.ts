import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { config } = await req.json();
    if (!config) {
      return NextResponse.json({ success: false, error: 'Config payload is required' }, { status: 400 });
    }

    const configCode = `export const siteConfig = ${JSON.stringify(config, null, 2)};\n`;

    // 1. Check if running in development (local) environment
    const isDev = process.env.NODE_ENV === 'development';
    const localFilePath = path.join(process.cwd(), 'src', 'siteConfig.ts');

    if (isDev && fs.existsSync(path.dirname(localFilePath))) {
      // Local write
      fs.writeFileSync(localFilePath, configCode, 'utf8');
      return NextResponse.json({ success: true, message: 'Local configuration updated successfully' });
    }

    // 2. Production Flow: Commit to GitHub via Fetch
    const token = req.headers.get('x-github-token') || process.env.GITHUB_TOKEN || process.env.GH_PAT;
    if (!token) {
      return NextResponse.json({ 
        success: false, 
        error: 'Authentication failed. Please provide a GitHub Personal Access Token (PAT) with repo scope in the sidebar settings.' 
      }, { status: 401 });
    }

    const owner = 'pixel-junkie-creative-studios';
    const repo = 'the-1-percent-club-v2';
    const filePath = 'src/siteConfig.ts';
    const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

    // A. Fetch current file SHA from GitHub
    let sha: string | null = null;
    try {
      const getRes = await fetch(githubApiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': '1percent-club-builder-v1'
        }
      });
      if (getRes.status === 200) {
        const fileData = await getRes.json();
        sha = fileData.sha;
      }
    } catch (err) {
      console.warn("Could not retrieve file SHA (creating new file if non-existent).", err);
    }

    // B. Commit content back to GitHub
    const base64Content = Buffer.from(configCode).toString('base64');
    const commitBody = {
      message: 'sync(config): update siteConfig from visual builder',
      content: base64Content,
      branch: 'main',
      ...(sha ? { sha } : {})
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
        message: 'Configuration committed to GitHub repo. Vercel deployment triggered.',
        data: putData
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: putData.message || 'Failed to commit configuration to GitHub.' 
      }, { status: putRes.status });
    }

  } catch (error: any) {
    console.error('Error in save-config:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
