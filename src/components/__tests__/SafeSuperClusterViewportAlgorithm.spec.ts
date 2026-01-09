import { SafeSuperClusterViewportAlgorithm } from "../SafeSuperClusterViewportAlgorithm";
import type { AlgorithmInput } from "@googlemaps/markerclusterer";

const mockSuperCalculate = jest.fn();

jest.mock("@googlemaps/markerclusterer", () => {
  return {
    SuperClusterViewportAlgorithm: class {
      calculate(input: AlgorithmInput) {
        return mockSuperCalculate(input);
      }
    },
  };
});

describe("SafeSuperClusterViewportAlgorithm", () => {
  let algorithm: SafeSuperClusterViewportAlgorithm;

  beforeEach(() => {
    jest.clearAllMocks();
    algorithm = new SafeSuperClusterViewportAlgorithm({});
  });

  describe("calculate()", () => {
    it("should return empty clusters for empty markers array", () => {
      const input = {
        markers: [],
        map: {} as google.maps.Map,
        mapCanvasProjection: {} as google.maps.MapCanvasProjection,
      };

      const result = algorithm.calculate(input);

      expect(result).toEqual({ clusters: [], changed: true });
      expect(mockSuperCalculate).not.toHaveBeenCalled();
    });

    it("should delegate to parent calculate for non-empty markers", () => {
      const expectedOutput = { clusters: [{}], changed: false };
      mockSuperCalculate.mockReturnValue(expectedOutput);

      const input = {
        markers: [{} as google.maps.Marker],
        map: {} as google.maps.Map,
        mapCanvasProjection: {} as google.maps.MapCanvasProjection,
      };

      const result = algorithm.calculate(input);

      expect(result).toEqual(expectedOutput);
      expect(mockSuperCalculate).toHaveBeenCalledWith(input);
    });
  });
});
