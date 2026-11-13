import { SafeSuperClusterViewportAlgorithm } from "../SafeSuperClusterViewportAlgorithm";

// Runs against the real SuperClusterViewportAlgorithm (not mocked here).
describe("SafeSuperClusterViewportAlgorithm with the real parent", () => {
  it("clusters a lone marker again after it was removed and added back", () => {
    const map = new google.maps.Map(document.createElement("div"));
    jest.spyOn(map, "getZoom").mockReturnValue(10);
    jest.spyOn(map, "getBounds").mockReturnValue(new google.maps.LatLngBounds());
    const mapCanvasProjection = {
      fromLatLngToDivPixel: () => new google.maps.Point(0, 0),
      fromDivPixelToLatLng: () => new google.maps.LatLng(0, 0),
    } as unknown as google.maps.MapCanvasProjection;
    const marker = new google.maps.Marker();
    jest.spyOn(marker, "getPosition").mockReturnValue(new google.maps.LatLng(38.7, -9.1));
    const input = { map, mapCanvasProjection };
    const algorithm = new SafeSuperClusterViewportAlgorithm({});

    algorithm.calculate({ ...input, markers: [marker] });
    algorithm.calculate({ ...input, markers: [] });
    const { clusters, changed } = algorithm.calculate({ ...input, markers: [marker] });

    expect(changed).toBe(true);
    expect(clusters).toHaveLength(1);
    expect(clusters[0].markers).toEqual([marker]);
  });
});
