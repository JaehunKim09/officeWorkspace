export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET() {
  return Response.json(
    {
      status: 'ok',
      commit: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
      environment: process.env.VERCEL_ENV || 'local',
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    },
  );
}
