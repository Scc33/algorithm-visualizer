import {
  parseArrayInput,
  encodeUrlParams,
  decodeUrlParams,
} from "@/lib/urlState";

describe("parseArrayInput", () => {
  it("parses a valid comma-separated list", () => {
    const result = parseArrayInput("5,10,23,8,42");
    expect(result.error).toBeNull();
    expect(result.data).toEqual([5, 10, 23, 8, 42]);
  });

  it("trims whitespace and handles spaces as separators", () => {
    const result = parseArrayInput("  5 , 10 , 23 , 8 , 42  ");
    expect(result.error).toBeNull();
    expect(result.data).toEqual([5, 10, 23, 8, 42]);
  });

  it("accepts exactly 3 values (minimum)", () => {
    const result = parseArrayInput("1,2,3");
    expect(result.error).toBeNull();
    expect(result.data).toHaveLength(3);
  });

  it("accepts exactly 25 values (maximum)", () => {
    const input = Array.from({ length: 25 }, (_, i) => i + 1).join(",");
    const result = parseArrayInput(input);
    expect(result.error).toBeNull();
    expect(result.data).toHaveLength(25);
  });

  it("returns error for fewer than 3 values", () => {
    const result = parseArrayInput("5,10");
    expect(result.error).not.toBeNull();
    expect(result.data).toHaveLength(0);
  });

  it("returns error for more than 25 values", () => {
    const input = Array.from({ length: 26 }, (_, i) => i + 1).join(",");
    const result = parseArrayInput(input);
    expect(result.error).not.toBeNull();
    expect(result.data).toHaveLength(0);
  });

  it("returns error for non-numeric token", () => {
    const result = parseArrayInput("5,abc,23");
    expect(result.error).toContain("abc");
    expect(result.data).toHaveLength(0);
  });

  it("returns error for value below minimum (0)", () => {
    const result = parseArrayInput("0,5,10");
    expect(result.error).not.toBeNull();
  });

  it("returns error for value above maximum (1000)", () => {
    const result = parseArrayInput("5,1000,10");
    expect(result.error).not.toBeNull();
  });

  it("returns error for floating point numbers", () => {
    const result = parseArrayInput("5,10.5,23");
    expect(result.error).not.toBeNull();
  });

  it("returns error for empty string", () => {
    const result = parseArrayInput("");
    expect(result.error).not.toBeNull();
  });
});

describe("encodeUrlParams / decodeUrlParams round-trip", () => {
  it("round-trips data and speed", () => {
    const data = [5, 10, 23, 8, 42];
    const speed = 7;
    const params = encodeUrlParams({ data, speed });
    const decoded = decodeUrlParams(params);
    expect(decoded.data).toEqual(data);
    expect(decoded.speed).toBe(speed);
  });

  it("round-trips target for searching", () => {
    const params = encodeUrlParams({ data: [1, 2, 3], target: 22, speed: 5 });
    const decoded = decodeUrlParams(params);
    expect(decoded.target).toBe(22);
  });

  it("round-trips start vertex for graph", () => {
    const params = encodeUrlParams({ start: 3, speed: 5 });
    const decoded = decodeUrlParams(params);
    expect(decoded.start).toBe(3);
  });

  it("returns undefined for missing keys", () => {
    const decoded = decodeUrlParams(new URLSearchParams());
    expect(decoded.data).toBeUndefined();
    expect(decoded.target).toBeUndefined();
    expect(decoded.start).toBeUndefined();
    expect(decoded.speed).toBeUndefined();
  });

  it("ignores invalid data values silently", () => {
    const params = new URLSearchParams("data=abc&speed=5");
    const decoded = decodeUrlParams(params);
    expect(decoded.data).toBeUndefined();
    expect(decoded.speed).toBe(5);
  });

  it("ignores out-of-range speed", () => {
    const params = new URLSearchParams("speed=99");
    const decoded = decodeUrlParams(params);
    expect(decoded.speed).toBeUndefined();
  });

  it("ignores negative start vertex", () => {
    const params = new URLSearchParams("start=-1");
    const decoded = decodeUrlParams(params);
    expect(decoded.start).toBeUndefined();
  });
});
