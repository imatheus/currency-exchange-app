// Gera docs/figma/wireframe-baixa-fidelidade.svg  (node docs/figma/gen-wireframe.mjs)
import { writeFileSync } from 'node:fs';

const S = '#444';
let out = [];
const add = (s) => out.push(s);

const rect = (x, y, w, h, o = {}) =>
  add(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 4}" fill="${o.fill ?? '#fff'}" stroke="${o.stroke ?? S}" stroke-width="${o.sw ?? 1.5}"${o.dash ? ' stroke-dasharray="6 4"' : ''}/>`);
const text = (x, y, t, o = {}) =>
  add(`<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="${o.size ?? 14}" font-weight="${o.bold ? 700 : 400}" fill="${o.fill ?? '#222'}" text-anchor="${o.anchor ?? 'start'}">${t}</text>`);
const line = (x1, y1, x2, y2, o = {}) =>
  add(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.stroke ?? S}" stroke-width="${o.sw ?? 1.5}"/>`);

const field = (x, y, w, label, value = '', h = 36) => {
  text(x, y - 6, label, { size: 12 });
  rect(x, y, w, h, { fill: '#f4f4f4' });
  if (value) text(x + 10, y + h / 2 + 5, value, { fill: '#666' });
};
const button = (x, y, w, label, h = 36) => {
  rect(x, y, w, h, { fill: '#ddd', r: 6 });
  text(x + w / 2, y + h / 2 + 5, label, { anchor: 'middle' });
};
const chips = (x, y, maxW, gap = 8) => {
  const labels = ['7 dias', '15 dias', '30 dias', '3 meses', '6 meses', '1 ano', '5 anos', '10 anos'];
  let cx = x, cy = y;
  labels.forEach((l, i) => {
    const w = 18 + l.length * 8;
    if (cx + w > x + maxW) { cx = x; cy += 36; }
    rect(cx, cy, w, 28, { fill: i === 2 ? '#bbb' : '#fff', r: 14 });
    text(cx + w / 2, cy + 19, l, { anchor: 'middle', size: 12 });
    cx += w + gap;
  });
  return cy + 28;
};
const chart = (x, y, w, h) => {
  rect(x, y, w, h, { fill: '#fafafa' });
  line(x + 40, y + 16, x + 40, y + h - 28);
  line(x + 40, y + h - 28, x + w - 16, y + h - 28);
  const pts = [0, .35, .2, .5, .4, .7, .55, .85]
    .map((v, i) => `${x + 40 + (i * (w - 70)) / 7},${y + h - 28 - v * (h - 60)}`).join(' ');
  add(`<polyline points="${pts}" fill="none" stroke="${S}" stroke-width="2"/>`);
  text(x + w / 2, y + h - 8, 'Gráfico de linha (data x cotação)', { anchor: 'middle', size: 12, fill: '#777' });
};
const table = (x, y, w, rows) => {
  const cols = ['Data', 'Origem', 'Destino', 'Cotação'];
  const cw = w / 4;
  rect(x, y, w, 30, { fill: '#e4e4e4', r: 0 });
  cols.forEach((c, i) => text(x + i * cw + 10, y + 20, c, { bold: true, size: 13 }));
  for (let r = 0; r < rows; r++) {
    const ry = y + 30 + r * 28;
    rect(x, ry, w, 28, { r: 0, sw: 1, stroke: '#aaa' });
    ['dd/mm/aaaa', 'USD', 'BRL', '0,0000'].forEach((c, i) => text(x + i * cw + 10, ry + 19, c, { size: 12, fill: '#777' }));
  }
  return y + 30 + rows * 28;
};
const frame = (x, y, w, h, title) => {
  text(x, y - 12, title, { bold: true, size: 16 });
  rect(x, y, w, h, { fill: '#fff', sw: 2, r: 8 });
};

/* ---------------- DESKTOP ---------------- */
const DX = 0, DY = 40;
frame(DX, DY, 960, 1000, 'Desktop — wireframe de baixa fidelidade');
text(DX + 24, DY + 44, 'Currency Exchange', { bold: true, size: 24 });

// Conversor
rect(DX + 24, DY + 64, 912, 170, { fill: '#fafafa' });
text(DX + 40, DY + 92, 'Conversor', { bold: true, size: 16 });
field(DX + 40, DY + 118, 150, 'Valor', '1');
field(DX + 210, DY + 118, 300, 'De', 'USD - United States Dollar  ▾');
button(DX + 530, DY + 118, 44, '⇄');
field(DX + 594, DY + 118, 300, 'Para', 'BRL - Brazilian Real  ▾');
text(DX + 40, DY + 192, 'R$ 0,00', { bold: true, size: 26 });
text(DX + 40, DY + 216, '1 USD = 0,00 BRL · cotação de dd/mm/aaaa', { size: 12, fill: '#666' });

// Histórico
rect(DX + 24, DY + 254, 912, 726, { fill: '#fafafa' });
text(DX + 40, DY + 282, 'Histórico USD → BRL', { bold: true, size: 16 });
const cy = chips(DX + 40, DY + 296, 880);
chart(DX + 40, cy + 16, 880, 220);
let fy = cy + 16 + 220 + 36;
field(DX + 40, fy, 120, 'De', 'dd/mm/aaaa', 32);
field(DX + 176, fy, 120, 'Até', 'dd/mm/aaaa', 32);
field(DX + 312, fy, 110, 'Cotação mín.', '', 32);
field(DX + 438, fy, 110, 'Cotação máx.', '', 32);
field(DX + 564, fy, 160, 'Ordenar por', 'Data (recente) ▾', 32);
button(DX + 740, fy, 80, 'Limpar', 32);
button(DX + 830, fy, 90, 'Exportar CSV', 32);
text(DX + 40, fy + 62, 'N registro(s) encontrado(s)', { size: 12 });
table(DX + 40, fy + 74, 880, 6);

/* ---------------- MOBILE ---------------- */
const MX = 1020, MY = 40;
frame(MX, MY, 390, 1400, 'Mobile (390px) — proposta de adaptação');
text(MX + 16, MY + 38, 'Currency Exchange', { bold: true, size: 20 });
rect(MX + 12, MY + 54, 366, 340, { fill: '#fafafa' });
text(MX + 24, MY + 80, 'Conversor', { bold: true, size: 15 });
field(MX + 24, MY + 104, 342, 'Valor', '1');
field(MX + 24, MY + 164, 342, 'De', 'USD  ▾');
button(MX + 24, MY + 212, 342, '⇄  Inverter moedas');
field(MX + 24, MY + 272, 342, 'Para', 'BRL  ▾');
text(MX + 24, MY + 346, 'R$ 0,00', { bold: true, size: 24 });
text(MX + 24, MY + 370, '1 USD = 0,00 BRL · dd/mm/aaaa', { size: 12, fill: '#666' });

rect(MX + 12, MY + 410, 366, 970, { fill: '#fafafa' });
text(MX + 24, MY + 436, 'Histórico USD → BRL', { bold: true, size: 15 });
const mcy = chips(MX + 24, MY + 450, 342);
chart(MX + 24, mcy + 14, 342, 190);
let my = mcy + 14 + 190 + 34;
field(MX + 24, my, 160, 'De', 'dd/mm/aaaa', 32);
field(MX + 206, my, 160, 'Até', 'dd/mm/aaaa', 32);
my += 64;
field(MX + 24, my, 160, 'Cotação mín.', '', 32);
field(MX + 206, my, 160, 'Cotação máx.', '', 32);
my += 64;
field(MX + 24, my, 342, 'Ordenar por', 'Data (recente) ▾', 32);
my += 48;
button(MX + 24, my, 160, 'Limpar filtros', 32);
button(MX + 206, my, 160, 'Exportar CSV', 32);
text(MX + 24, my + 56, 'N registro(s) encontrado(s)', { size: 12 });
table(MX + 24, my + 68, 342, 5);

/* ---------------- ESTADOS ---------------- */
const SY = 1120;
text(0, SY - 40, 'Estados de interface', { bold: true, size: 18 });

// Loading
frame(0, SY, 460, 200, 'Loading');
[0, 1, 2].forEach((i) => rect(20, SY + 24 + i * 34, 420 - i * 90, 20, { fill: '#e4e4e4', sw: 0 }));
rect(20, SY + 130, 420, 50, { fill: '#e4e4e4', sw: 0 });
text(230, SY + 160, 'Carregando histórico...', { anchor: 'middle', size: 13, fill: '#555' });

// Erro
frame(500, SY, 460, 200, 'Erro (falha na API)');
rect(520, SY + 40, 420, 56, { fill: '#e8e8e8' });
text(536, SY + 74, '⚠  Erro na API (404). Tente novamente.', { size: 14 });
text(520, SY + 130, 'Gráfico e tabela ocultos; conversor mantém a', { size: 12, fill: '#666' });
text(520, SY + 148, 'mensagem de erro no próprio bloco.', { size: 12, fill: '#666' });

// Sem dados
frame(0, SY + 250, 460, 200, 'Ausência de dados');
rect(20, SY + 290, 420, 56, { fill: '#f1f1f1' });
text(36, SY + 324, 'Nenhum dado disponível para este par/período.', { size: 14 });
text(20, SY + 380, 'Também exibido na tabela: "Nenhum registro', { size: 12, fill: '#666' });
text(20, SY + 398, 'para os filtros aplicados."', { size: 12, fill: '#666' });

// Validação
frame(500, SY + 250, 460, 200, 'Entrada inválida');
field(520, SY + 300, 420, 'Valor', 'abc');
rect(520, SY + 356, 420, 40, { fill: '#e8e8e8' });
text(536, SY + 381, 'Informe um valor numérico maior que zero.', { size: 13 });

const W = 1440, H = 1620;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="#f0f0f0"/>
${out.join('\n')}
</svg>`;
writeFileSync(new URL('./wireframe-baixa-fidelidade.svg', import.meta.url), svg);
console.log('ok', svg.length);
