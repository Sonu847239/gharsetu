/**
 * In-browser and Node compatible Perceptual Hashing & Duplicate Photo Detector
 * For live camera captures vs. stolen gallery photos.
 */

export interface CameraCaptureResult {
  dataUrl: string;
  perceptualHash: string;
  capturedAt: string;
  coords: {
    latitude: number;
    longitude: number;
    accuracyMeters: number;
  };
  distanceFromListingMeters: number;
  isFlaggedDuplicate: boolean;
  matchScore: number;
}

// Calculate distance in meters using Haversine formula
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

// Simple 64-bit average hash (aHash) implementation for demonstration
export function computeImageHashFromCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
): string {
  // Draw down to 8x8 pixels
  const offscreen = document.createElement('canvas');
  offscreen.width = 8;
  offscreen.height = 8;
  const offCtx = offscreen.getContext('2d');
  if (!offCtx) return 'a1b2c3d4e5f60718';

  offCtx.drawImage(canvas, 0, 0, 8, 8);
  const imgData = offCtx.getImageData(0, 0, 8, 8);
  const data = imgData.data;

  // Grayscale & average
  let totalLuma = 0;
  const lumas: number[] = [];
  for (let i = 0; i < data.length; i += 4) {
    const luma = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    lumas.push(luma);
    totalLuma += luma;
  }
  const avg = totalLuma / 64;

  // Build binary string
  let binaryStr = '';
  for (const luma of lumas) {
    binaryStr += luma >= avg ? '1' : '0';
  }

  // Convert to hex
  let hex = '';
  for (let i = 0; i < 64; i += 4) {
    const chunk = binaryStr.substring(i, i + 4);
    hex += parseInt(chunk, 2).toString(16);
  }

  return hex;
}

// Hamming distance between two hex hashes (0-64)
export function computeHammingDistance(hash1: string, hash2: string): number {
  if (!hash1 || !hash2 || hash1.length !== hash2.length) return 32;

  let distance = 0;
  for (let i = 0; i < hash1.length; i++) {
    const v1 = parseInt(hash1[i], 16);
    const v2 = parseInt(hash2[i], 16);
    let xor = v1 ^ v2;
    while (xor > 0) {
      if (xor & 1) distance++;
      xor >>= 1;
    }
  }
  return distance;
}

// Known stolen broker stock photo hashes (Simulated registry)
export const KNOWN_STOCK_BROKER_HASHES = [
  'f0e1d2c3b4a59687',
  '1234567890abcdef',
  'ffff0000ffff0000',
  '8a7b6c5d4e3f2a1b'
];

export function checkReversePhotoMatch(candidateHash: string): {
  isMatch: boolean;
  score: number;
} {
  for (const known of KNOWN_STOCK_BROKER_HASHES) {
    const dist = computeHammingDistance(candidateHash, known);
    // If distance is <= 6 out of 64 bits, high probability of stolen image
    if (dist <= 6) {
      return { isMatch: true, score: 1 - dist / 64 };
    }
  }
  return { isMatch: false, score: 0 };
}

