import { NextResponse } from 'next/server';
import { look, LookError } from '@/lib/look/report';
import { allowLook, clientIp } from '@/lib/look/limit';

export const dynamic = 'force-dynamic';
export const maxDuration = 20;

/** The first look as JSON: the same report the page shows, for anyone who prefers to call it directly. */
export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get('url') ?? '';
  if (!allowLook(clientIp(request.headers))) {
    return NextResponse.json({ ok: false, error: 'Too many looks for now. Try again in a few minutes.' }, { status: 429 });
  }
  try {
    const report = await look(url.slice(0, 500));
    return NextResponse.json({ ok: true, report }, { headers: { 'cache-control': 'no-store' } });
  } catch (error) {
    if (error instanceof LookError) return NextResponse.json({ ok: false, code: error.code, error: error.message }, { status: error.code === 'address' ? 400 : 502 });
    return NextResponse.json({ ok: false, error: 'The page could not be read.' }, { status: 500 });
  }
}
