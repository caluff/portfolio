import {Redis} from "@upstash/redis";

const PAGE_VIEWS_KEY = "portfolio:page-views";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function getRedis() {
  const url =
    process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return new Redis({url, token});
}

function countResponse(count: number) {
  return Response.json(
    {count},
    {headers: {"Cache-Control": "no-store, max-age=0"}},
  );
}

export async function GET() {
  const redis = getRedis();

  if (!redis) {
    return Response.json(
      {error: "Page view storage is not configured"},
      {status: 503},
    );
  }

  try {
    const count = (await redis.get<number>(PAGE_VIEWS_KEY)) ?? 0;

    return countResponse(count);
  } catch (error) {
    console.error("Unable to read the page view count", error);

    return Response.json(
      {error: "Unable to read the page view count"},
      {status: 500},
    );
  }
}

export async function POST() {
  const redis = getRedis();

  if (!redis) {
    return Response.json(
      {error: "Page view storage is not configured"},
      {status: 503},
    );
  }

  try {
    const count = await redis.incr(PAGE_VIEWS_KEY);

    return countResponse(count);
  } catch (error) {
    console.error("Unable to increment the page view count", error);

    return Response.json(
      {error: "Unable to increment the page view count"},
      {status: 500},
    );
  }
}
