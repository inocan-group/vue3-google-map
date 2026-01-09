import { SuperClusterViewportAlgorithm, type AlgorithmInput, type AlgorithmOutput } from "@googlemaps/markerclusterer";

/**
 * Wrapper around SuperClusterViewportAlgorithm that handles empty marker arrays.
 *
 * Stopgap for upstream issue googlemaps/js-markerclusterer#1129.
 * The fix from PR #1014 was only applied to SuperClusterAlgorithm, not
 * SuperClusterViewportAlgorithm. This wrapper adds the same empty markers check.
 *
 * @see https://github.com/googlemaps/js-markerclusterer/issues/1129
 * @see https://github.com/googlemaps/js-markerclusterer/pull/1130
 *
 * TODO: Remove once upstream PR #1130 is released.
 */
export class SafeSuperClusterViewportAlgorithm extends SuperClusterViewportAlgorithm {
  calculate(input: AlgorithmInput): AlgorithmOutput {
    // Early return for empty markers - prevents "Cannot read properties of
    // undefined (reading 'range')" error when supercluster.getClusters() is
    // called before load() has initialized the internal KD-tree.
    if (input.markers.length === 0) {
      return { clusters: [], changed: true };
    }
    return super.calculate(input);
  }
}
