const ARRAY_MIN_LENGTH = 3;
const ARRAY_MAX_LENGTH = 25;
const VALUE_MIN = 1;
const VALUE_MAX = 999;
const SPEED_MIN = 1;
const SPEED_MAX = 10;

export interface ParseResult {
  data: number[];
  error: string | null;
}

export function parseArrayInput(raw: string): ParseResult {
  const tokens = raw
    .trim()
    .split(/[\s,]+/)
    .filter((t) => t.length > 0);

  if (tokens.length < ARRAY_MIN_LENGTH) {
    return {
      data: [],
      error: `Enter at least ${ARRAY_MIN_LENGTH} numbers.`,
    };
  }
  if (tokens.length > ARRAY_MAX_LENGTH) {
    return {
      data: [],
      error: `Enter at most ${ARRAY_MAX_LENGTH} numbers.`,
    };
  }

  const data: number[] = [];
  for (const token of tokens) {
    const n = Number(token);
    if (!Number.isInteger(n) || isNaN(n)) {
      return { data: [], error: `"${token}" is not a valid integer.` };
    }
    if (n < VALUE_MIN || n > VALUE_MAX) {
      return {
        data: [],
        error: `Values must be between ${VALUE_MIN} and ${VALUE_MAX}.`,
      };
    }
    data.push(n);
  }

  return { data, error: null };
}

interface EncodeOptions {
  data?: number[];
  target?: number;
  start?: number;
  speed: number;
}

export function encodeUrlParams(opts: EncodeOptions): URLSearchParams {
  const params = new URLSearchParams();
  if (opts.data && opts.data.length > 0) {
    params.set("data", opts.data.join(","));
  }
  if (opts.target !== undefined) {
    params.set("target", String(opts.target));
  }
  if (opts.start !== undefined) {
    params.set("start", String(opts.start));
  }
  params.set("speed", String(opts.speed));
  return params;
}

interface DecodedState {
  data?: number[];
  target?: number;
  start?: number;
  speed?: number;
}

function parseIntParam(
  params: URLSearchParams,
  key: string,
  min: number,
  max: number
): number | undefined {
  const raw = params.get(key);
  if (raw === null) return undefined;
  const n = Number(raw);
  return Number.isInteger(n) && n >= min && n <= max ? n : undefined;
}

export function decodeUrlParams(params: URLSearchParams): DecodedState {
  const result: DecodedState = {};

  const rawData = params.get("data");
  if (rawData) {
    const parsed = parseArrayInput(rawData);
    if (!parsed.error) result.data = parsed.data;
  }

  const target = parseIntParam(params, "target", VALUE_MIN, VALUE_MAX);
  if (target !== undefined) result.target = target;

  const start = parseIntParam(params, "start", 0, Number.MAX_SAFE_INTEGER);
  if (start !== undefined) result.start = start;

  const speed = parseIntParam(params, "speed", SPEED_MIN, SPEED_MAX);
  if (speed !== undefined) result.speed = speed;

  return result;
}
