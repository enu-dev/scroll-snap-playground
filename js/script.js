const root = document.documentElement;
const scrollContainer = document.getElementById('scrollContainer');
const cssOutput = document.getElementById('cssOutput');
const warnMsg = document.getElementById('warnMsg');

const inputs = {
  type:   document.getElementById('typeSelect'),
  align:  document.getElementById('alignSelect'),
  stop:   document.getElementById('stopSelect'),
  pad:    document.getElementById('padInput'),
  margin: document.getElementById('marginInput'),
  count:  document.getElementById('countInput'),
};

const values = {
  pad:    document.getElementById('padValue'),
  margin: document.getElementById('marginValue'),
  count:  document.getElementById('countValue'),
};

const presets = {
  carousel:   { dir: 'horizontal', type: 'x mandatory', align: 'center', stop: 'normal', pad: 8,  margin: 0, count: 5 },
  fullscreen: { dir: 'vertical',   type: 'y mandatory', align: 'start',  stop: 'always', pad: 0,  margin: 0, count: 4 },
  gallery:    { dir: 'horizontal', type: 'x proximity', align: 'start',  stop: 'normal', pad: 16, margin: 8, count: 6 },
};

const DEFAULTS = {
  dir: 'horizontal',
  type: 'x mandatory',
  align: 'center',
  stop: 'normal',
  pad: 16,
  margin: 0,
  count: 5,
};

function clearPresetActive() {
  document.querySelectorAll('#presetRow .chip').forEach(b => b.classList.remove('active'));
}

function rebuildItems(count) {
  scrollContainer.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const item = document.createElement('div');
    item.className = 'scroll-item';
    item.style.setProperty('--i', i);
    item.textContent = i;
    scrollContainer.appendChild(item);
  }
}

function checkDirectionMismatch(direction, type) {
  if (type === 'none' || type === 'both mandatory') return false;
  const typeAxis = type.startsWith('x') ? 'horizontal' : 'vertical';
  return typeAxis !== direction;
}

function update() {
  const type   = inputs.type.value;
  const align  = inputs.align.value;
  const stop   = inputs.stop.value;
  const pad    = inputs.pad.value;
  const margin = inputs.margin.value;
  const count  = parseInt(inputs.count.value, 10);

  values.pad.textContent    = pad;
  values.margin.textContent = margin;
  values.count.textContent  = count;

  scrollContainer.style.scrollSnapType = type;
  scrollContainer.style.scrollPadding  = pad + 'px';

  if (parseInt(scrollContainer.children.length, 10) !== count) {
    rebuildItems(count);
  }

  Array.from(scrollContainer.children).forEach(item => {
    item.style.scrollSnapAlign = align;
    item.style.scrollSnapStop  = stop;
    item.style.scrollMargin    = margin + 'px';
  });

  const direction = scrollContainer.dataset.direction;
  const overflowAxis = direction === 'horizontal' ? 'overflow-x' : 'overflow-y';

  cssOutput.textContent = `.scroll-container {
  scroll-snap-type: ${type};
  scroll-padding: ${pad}px;
  ${overflowAxis}: auto;
  display: flex;
  flex-direction: ${direction === 'horizontal' ? 'row' : 'column'};
}
.scroll-container > * {
  scroll-snap-align: ${align};
  scroll-snap-stop: ${stop};
  scroll-margin: ${margin}px;
  flex-shrink: 0;
}`;

  warnMsg.hidden = !checkDirectionMismatch(direction, type);
}

Object.values(inputs).forEach(el => el.addEventListener('input', () => {
  clearPresetActive();
  update();
}));

document.getElementById('dirToggle').addEventListener('click', (e) => {
  const btn = e.target.closest('.dir-btn');
  if (!btn) return;
  document.querySelectorAll('#dirToggle .dir-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  scrollContainer.dataset.direction = btn.dataset.dir;
  scrollContainer.scrollTo(0, 0);
  clearPresetActive();
  update();
});

document.getElementById('presetRow').addEventListener('click', (e) => {
  const btn = e.target.closest('.chip');
  if (!btn) return;
  if (btn.classList.contains('active')) {
    btn.classList.remove('active');
    return;
  }
  const p = presets[btn.dataset.preset];
  if (!p) return;
  clearPresetActive();
  btn.classList.add('active');

  scrollContainer.dataset.direction = p.dir;
  document.querySelectorAll('#dirToggle .dir-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.dir === p.dir);
  });

  inputs.type.value   = p.type;
  inputs.align.value  = p.align;
  inputs.stop.value   = p.stop;
  inputs.pad.value    = p.pad;
  inputs.margin.value = p.margin;
  inputs.count.value  = p.count;

  scrollContainer.scrollTo(0, 0);
  update();
});

document.getElementById('clearBtn').addEventListener('click', () => {
  scrollContainer.dataset.direction = DEFAULTS.dir;
  document.querySelectorAll('#dirToggle .dir-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.dir === DEFAULTS.dir);
  });
  inputs.type.value   = DEFAULTS.type;
  inputs.align.value  = DEFAULTS.align;
  inputs.stop.value   = DEFAULTS.stop;
  inputs.pad.value    = DEFAULTS.pad;
  inputs.margin.value = DEFAULTS.margin;
  inputs.count.value  = DEFAULTS.count;
  scrollContainer.scrollTo(0, 0);
  clearPresetActive();
  update();
});

const copyBtn = document.getElementById('copyBtn');
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(cssOutput.textContent);
    copyBtn.textContent = 'コピーしました！';
    copyBtn.classList.add('copied');
    setTimeout(() => {
      copyBtn.textContent = 'CSSをコピー';
      copyBtn.classList.remove('copied');
    }, 1600);
  } catch {
    copyBtn.textContent = 'コピー失敗（手動でどうぞ）';
    setTimeout(() => (copyBtn.textContent = 'CSSをコピー'), 1600);
  }
});

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
});

update();
