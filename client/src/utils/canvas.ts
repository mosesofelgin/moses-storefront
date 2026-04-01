import type { Product } from '@/types/storefront';

/**
 * Draw canvas cover art with geometric patterns based on product shape
 */
export function drawCover(canvas: HTMLCanvasElement, product: Product): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const s = canvas.width;
  const [c0, c1, c2, c3] = product.palette;

  // Fill background
  ctx.fillStyle = c0;
  ctx.fillRect(0, 0, s, s);

  // Draw pattern based on shape type
  if (product.shape === 'grid') {
    drawGridPattern(ctx, s, c2, c3, c0);
  } else if (product.shape === 'circle') {
    drawCirclePattern(ctx, s, c2, c3);
  } else if (product.shape === 'lines') {
    drawLinesPattern(ctx, s, c2, c3);
  } else if (product.shape === 'dots') {
    drawDotsPattern(ctx, s, c2, c3);
  } else if (product.shape === 'cross') {
    drawCrossPattern(ctx, s, c2, c3);
  }

  // Add footer bar with product name
  ctx.fillStyle = c1;
  ctx.fillRect(0, s * 0.82, s, s * 0.18);

  // Draw product name on footer
  ctx.font = `bold ${s * 0.07}px 'Bebas Neue', sans-serif`;
  ctx.fillStyle = c3;
  ctx.fillText(product.name, s * 0.06, s * 0.93);
}

function drawGridPattern(
  ctx: CanvasRenderingContext2D,
  s: number,
  c2: string,
  c3: string,
  c0: string
): void {
  ctx.strokeStyle = c2;
  ctx.lineWidth = 0.5;

  // Draw grid lines
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo(i * (s / 9), 0);
    ctx.lineTo(i * (s / 9), s);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * (s / 9));
    ctx.lineTo(s, i * (s / 9));
    ctx.stroke();
  }

  // Draw center square
  ctx.fillStyle = c3;
  ctx.fillRect(s * 0.2, s * 0.2, s * 0.6, s * 0.6);
  ctx.fillStyle = c0;
  ctx.fillRect(s * 0.32, s * 0.32, s * 0.36, s * 0.36);
}

function drawCirclePattern(
  ctx: CanvasRenderingContext2D,
  s: number,
  c2: string,
  c3: string
): void {
  // Draw concentric circles
  for (let r = s * 0.45; r > 0; r -= s * 0.07) {
    ctx.beginPath();
    ctx.arc(s / 2, s / 2, r, 0, Math.PI * 2);
    ctx.strokeStyle = r > s * 0.2 ? c2 : c3;
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  // Draw center dot
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, s * 0.06, 0, Math.PI * 2);
  ctx.fillStyle = c3;
  ctx.fill();
}

function drawLinesPattern(
  ctx: CanvasRenderingContext2D,
  s: number,
  c2: string,
  c3: string
): void {
  // Draw wavy lines
  for (let i = 0; i < 30; i++) {
    const y = i * (s / 29);
    const wave = Math.sin(i * 0.9) * s * 0.15;

    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(s * 0.3, y + wave * 0.3);
    ctx.lineTo(s * 0.7, y - wave * 0.5);
    ctx.lineTo(s, y + wave * 0.2);

    ctx.strokeStyle = i % 3 === 0 ? c3 : c2;
    ctx.lineWidth = 0.7;
    ctx.stroke();
  }
}

function drawDotsPattern(
  ctx: CanvasRenderingContext2D,
  s: number,
  c2: string,
  c3: string
): void {
  // Draw dot grid with radial gradient effect
  for (let x = 1; x < 11; x++) {
    for (let y = 1; y < 11; y++) {
      const px = x * (s / 11);
      const py = y * (s / 11);
      const dist = Math.sqrt((px - s / 2) ** 2 + (py - s / 2) ** 2);
      const r = Math.max(1, 4 - (dist / s) * 12);

      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = dist < s * 0.25 ? c3 : c2;
      ctx.fill();
    }
  }
}

function drawCrossPattern(
  ctx: CanvasRenderingContext2D,
  s: number,
  c2: string,
  c3: string
): void {
  // Draw cross
  ctx.fillStyle = c2;
  ctx.fillRect(s * 0.46, s * 0.1, s * 0.08, s * 0.8);
  ctx.fillRect(s * 0.1, s * 0.46, s * 0.8, s * 0.08);

  // Draw center square
  ctx.fillStyle = c3;
  ctx.fillRect(s * 0.46, s * 0.46, s * 0.08, s * 0.08);
}
