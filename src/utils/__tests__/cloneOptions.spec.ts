import { cloneOptions } from "../index";

describe("cloneOptions", () => {
  describe("deep-clones plain data", () => {
    it("returns a structurally-equal but distinct object", () => {
      const source = { a: 1, nested: { b: 2 }, list: [1, 2, 3] };
      const clone = cloneOptions(source);

      expect(clone).toEqual(source);
      expect(clone).not.toBe(source);
      expect(clone.nested).not.toBe(source.nested);
      expect(clone.list).not.toBe(source.list);
    });

    it("clones arrays (including arrays of plain objects)", () => {
      const source = [
        { lat: 1, lng: 2 },
        { lat: 3, lng: 4 },
      ];
      const clone = cloneOptions(source);

      expect(clone).toEqual(source);
      expect(clone).not.toBe(source);
      expect(clone[0]).not.toBe(source[0]);
    });

    // The property the deep-reactivity fix relies on: a snapshot taken before an
    // in-place mutation of the source must NOT observe that later mutation.
    it("insulates the snapshot from later in-place mutation of the source", () => {
      const source = { path: [{ lat: 1, lng: 2 }] };
      const snapshot = cloneOptions(source);

      source.path.push({ lat: 3, lng: 4 });
      source.path[0].lat = 99;

      expect(snapshot.path).toHaveLength(1);
      expect(snapshot.path[0].lat).toBe(1);
    });

    it("does not let mutations of the clone leak back into the source", () => {
      const source = { nested: { b: 2 } };
      const clone = cloneOptions(source);

      clone.nested.b = 99;

      expect(source.nested.b).toBe(2);
    });
  });

  describe("preserves non-plain values by reference", () => {
    it("keeps class instances by reference (not deep-cloned)", () => {
      class LatLng {
        constructor(public lat: number, public lng: number) {}
      }
      const instance = new LatLng(1, 2);
      const clone = cloneOptions({ position: instance });

      expect(clone.position).toBe(instance);
      expect(clone.position).toBeInstanceOf(LatLng);
    });

    it("keeps functions by reference", () => {
      const fn = () => "x";
      const clone = cloneOptions({ onClick: fn });

      expect(clone.onClick).toBe(fn);
    });

    it("keeps DOM nodes by reference", () => {
      const element = document.createElement("div");
      const clone = cloneOptions({ element });

      expect(clone.element).toBe(element);
    });
  });

  describe("passes primitives and nullish values through", () => {
    it.each([
      ["a string", "hello"],
      ["a number", 42],
      ["a boolean", true],
      ["null", null],
      ["undefined", undefined],
    ])("returns %s as-is", (_label, value) => {
      expect(cloneOptions(value)).toBe(value);
    });
  });
});
