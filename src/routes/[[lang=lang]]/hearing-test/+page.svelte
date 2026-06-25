<script lang="ts">
  import { onDestroy, getContext } from 'svelte';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { localizeLink, getLangUrl } from '$lib';

  const ctx = getContext<{ lang: 'en' | 'pa' | 'hi' }>('lang');
  let lang = $derived(ctx?.lang ?? 'en');

  // Reactively derive if we are in standalone mode
  let isStandalone = $derived(browser && $page.url.searchParams.has('standalone'));

  // ── Constants ────────────────────────────────────────────────────
  const SWEEP_DURATION = 32; // seconds — 20 Hz to 30 kHz
  const FREQ_MIN = 20;
  const FREQ_MAX = 30000;
  // Axis markers (Hz) — shown on the spectrum bar
  const MARKERS = [20, 50, 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 20000, 30000];
  // Condensed mobile markers
  const MOBILE_MARKERS = [20, 100, 500, 2000, 8000, 20000, 30000];

  // Discrete frequencies for the results bar graph
  const BAR_FREQS = [125, 250, 500, 1000, 2000, 4000, 8000, 12000, 16000, 20000, 25000, 30000];

  function isFreqHeard(freq: number, intervals: Interval[]): boolean {
    return intervals.some(iv => freq >= iv.startFreq && freq <= iv.endFreq);
  }

  function getFreqAtTime(elapsed: number): number {
    const t = Math.max(0, Math.min(elapsed, SWEEP_DURATION));
    return FREQ_MIN * Math.pow(FREQ_MAX / FREQ_MIN, t / SWEEP_DURATION);
  }
  function getPosForFreq(freq: number): number {
    return Math.log(Math.max(freq, FREQ_MIN) / FREQ_MIN) / Math.log(FREQ_MAX / FREQ_MIN);
  }
  function fmtHz(hz: number): string {
    if (hz >= 1000) return (hz / 1000).toFixed(hz >= 10000 ? 0 : 1) + ' kHz';
    return Math.round(hz) + ' Hz';
  }
  function fmtMarker(hz: number): string {
    if (hz >= 1000) return (hz / 1000) + 'k';
    return String(hz);
  }

  // ── Audio engine ─────────────────────────────────────────────────
  let audioCtx: AudioContext | null = null;
  let osc: OscillatorNode | null = null;
  let gain: GainNode | null = null;
  let pan: StereoPannerNode | null = null;
  let sweepStartCtxTime = 0;
  let rafId = 0;

  function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  }

  function startSweep(ear: 'left' | 'right') {
    stopSweep();
    if (!audioCtx) return;
    osc  = audioCtx.createOscillator();
    gain = audioCtx.createGain();
    pan  = audioCtx.createStereoPanner();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(FREQ_MIN, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(FREQ_MAX, audioCtx.currentTime + SWEEP_DURATION);
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.03, audioCtx.currentTime + 0.12);
    pan.pan.setValueAtTime(ear === 'left' ? -1 : 1, audioCtx.currentTime);

    osc.connect(gain); gain.connect(pan); pan.connect(audioCtx.destination);
    osc.start();
    sweepStartCtxTime = audioCtx.currentTime;
    tick();
  }

  function stopSweep() {
    if (typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(rafId);
    }
    if (osc) {
      try {
        gain?.gain.linearRampToValueAtTime(0, (audioCtx?.currentTime ?? 0) + 0.06);
        if (typeof setTimeout !== 'undefined') {
          setTimeout(() => { try { osc?.stop(); } catch {} }, 70);
        }
      } catch {}
      osc = null; gain = null; pan = null;
    }
  }

  // ── State ─────────────────────────────────────────────────────────
  type Interval = { startFreq: number; endFreq: number };

  let step          = $state<string>('intro');
  let currentEar    = $state<'left' | 'right'>('left');
  let sweepPos      = $state(0);
  let currentFreq   = $state(FREQ_MIN);
  let sweepElapsed  = $state(0);
  let isHolding     = $state(false);
  let isPlaying     = $state(false);
  let sweepDone     = $state(false);
  let leftIntervals  = $state<Interval[]>([]);
  let rightIntervals = $state<Interval[]>([]);
  let holdStartFreq = 0;
  let liveHoldStartPos = $state(0);

  function tick() {
    if (!audioCtx) return;
    const elapsed = audioCtx.currentTime - sweepStartCtxTime;
    sweepElapsed = elapsed;
    currentFreq  = getFreqAtTime(elapsed);
    sweepPos     = getPosForFreq(currentFreq);
    if (elapsed >= SWEEP_DURATION) {
      if (isHolding) { addInterval(holdStartFreq, FREQ_MAX); isHolding = false; }
      currentFreq = FREQ_MAX; sweepPos = 1;
      sweepDone = true; isPlaying = false;
      stopSweep();
      return;
    }
    rafId = requestAnimationFrame(tick);
  }

  function addInterval(s: number, e: number) {
    if (e <= s) return;
    const iv: Interval = { startFreq: s, endFreq: e };
    if (currentEar === 'left') leftIntervals  = [...leftIntervals,  iv];
    else                       rightIntervals = [...rightIntervals, iv];
  }

  function beginSweep() {
    initAudio();
    sweepDone = false; isHolding = false; isPlaying = true;
    sweepPos = 0; currentFreq = FREQ_MIN; sweepElapsed = 0;
    if (currentEar === 'left') leftIntervals = []; else rightIntervals = [];
    startSweep(currentEar);
  }

  function onPressHear() {
    if (sweepDone || !isPlaying) return;
    isHolding = true;
    holdStartFreq = currentFreq;
    liveHoldStartPos = sweepPos;
  }
  function onReleaseHear() {
    if (!isHolding) return;
    addInterval(holdStartFreq, currentFreq);
    isHolding = false;
  }

  function goToRight() {
    step = 'test-right'; currentEar = 'right';
    sweepPos = 0; currentFreq = FREQ_MIN; sweepElapsed = 0;
    isPlaying = false; sweepDone = false; isHolding = false;
    rightIntervals = [];
  }
  function goToResults() { step = 'results'; }

  // ── Result helpers ────────────────────────────────────────────────
  function getHigh(ivs: Interval[]) { return ivs.reduce((m, iv) => Math.max(m, iv.endFreq), 0); }
  function getLow(ivs: Interval[])  { return ivs.length ? ivs.reduce((m, iv) => Math.min(m, iv.startFreq), FREQ_MAX) : 0; }

  function hearingAgeFromFreq(f: number): string {
    if (f >= 25000) return '~10–20';
    if (f >= 20000) return '~15–25';
    if (f >= 16000) return '~20–30';
    if (f >= 12000) return '~30–40';
    if (f >=  8000) return '~40–50';
    if (f >=  4000) return '~50–60';
    if (f >=  2000) return '~60–70';
    return '70+';
  }

  type Grade = { grade: string; interp: string; tips: string[] };
  function hearingGrade(lH: number, rH: number): Grade {
    const best = Math.max(lH, rH);
    if (best >= 20000) return { grade: 'Exceptional Hearing Range',
      interp: 'You can hear frequencies beyond the standard human range. This is rare and typically found only in very young adults or those with exceptional auditory sensitivity.',
      tips: ['Protect this exceptional range — even brief exposure to very loud sounds can cause permanent damage.',
             'Keep headphone volume below 50% when listening at length; your hearing is worth preserving.',
             'Avoid ototoxic medications when alternatives exist; discuss with your doctor.',
             'A professional audiological baseline test will help you track changes over the years.',
             'Antioxidant-rich foods (berries, leafy greens) and omega-3s support long-term cochlear health.'] };
    if (best >= 12000) return { grade: 'Excellent Hearing Range',
      interp: 'Your hearing extends well into the high-frequency range — typical for younger adults with healthy cochlear function.',
      tips: ['Wear ear protection at concerts, near power tools, and in heavy machinery environments.',
             'Follow the 60/60 rule: headphone volume below 60% for no more than 60 minutes at a stretch.',
             'Have a professional Pure Tone Audiometry test every 3–5 years as a preventive baseline.',
             'Limit exposure to ototoxic solvents and certain medications that can silently damage the inner ear.',
             'A diet rich in magnesium and antioxidants is associated with better long-term cochlear resilience.'] };
    if (best >=  8000) return { grade: 'Good Hearing Range',
      interp: 'Your hearing covers most speech-critical frequencies well. Some very high frequencies may show early age-related changes — normal at this stage.',
      tips: ['Protect your ears in noisy environments — restaurants, traffic, and crowds are louder than they feel.',
             'Over-ear headphones with passive isolation are gentler on the cochlea than in-ear buds at the same volume.',
             'An annual PTA screening will help you catch any gradual changes early, when intervention is easiest.',
             'Difficulty following speech in background noise is an early warning signal — do not ignore it.',
             'Cardiovascular health directly affects cochlear blood supply; exercise regularly and manage blood pressure.'] };
    if (best >=  4000) return { grade: 'Mild Concern — High Frequencies Affected',
      interp: 'You may be missing some high-pitched sounds. Consonants like S, F, Th and Sh can become harder to distinguish, especially in background noise.',
      tips: ['Book a professional audiological evaluation soon — early intervention gives significantly better outcomes.',
             'Face speakers during conversation; lip-reading cues supplement what the ear misses.',
             'Ask people to speak clearly rather than loudly — pace matters more than volume.',
             'Avoid further noise exposure to protect remaining cochlear hair cells in the 4–8 kHz range.',
             'Modern hearing aids for mild-to-moderate loss are discreet and can restore speech clarity very effectively.'] };
    return { grade: 'Significant Hearing Loss Indicated',
      interp: 'This screening suggests difficulty hearing frequencies critical for speech understanding. A clinical audiological evaluation is strongly recommended.',
      tips: ['Book an in-person audiometric test with an RCI-certified audiologist as soon as possible.',
             'Do not delay — untreated hearing loss is linked to cognitive decline and social isolation.',
             'Modern digital hearing aids, including rechargeable and near-invisible CIC models, can significantly restore clarity.',
             'Inform family and close contacts so they can adapt their communication style to support you.',
             'Ask your audiologist about assistive listening devices for TV, telephone, and public spaces.'] };
  }

  let leftHigh  = $derived(getHigh(leftIntervals));
  let rightHigh = $derived(getHigh(rightIntervals));
  let leftLow   = $derived(getLow(leftIntervals));
  let rightLow  = $derived(getLow(rightIntervals));
  let grade     = $derived(step === 'results' ? hearingGrade(leftHigh, rightHigh) : null as Grade | null);
  let ageLabel  = $derived(step === 'results' ? hearingAgeFromFreq(Math.max(leftHigh, rightHigh)) : '');

  function toRegions(ivs: Interval[]) {
    return ivs.map(iv => ({
      left:  getPosForFreq(iv.startFreq) * 100,
      width: (getPosForFreq(iv.endFreq) - getPosForFreq(iv.startFreq)) * 100
    }));
  }
  let leftRegions  = $derived(toRegions(leftIntervals));
  let rightRegions = $derived(toRegions(rightIntervals));
  let liveRegion   = $derived(isHolding
    ? { left: liveHoldStartPos * 100, width: Math.max(0.3, (sweepPos - liveHoldStartPos) * 100) }
    : null);

  let timerPct = $derived(Math.min((sweepElapsed / SWEEP_DURATION) * 100, 100));

  function downloadReport() { window.print(); }
  function reset() {
    stopSweep(); step = 'intro';
    sweepPos = 0; currentFreq = FREQ_MIN;
    isHolding = false; isPlaying = false; sweepDone = false;
    leftIntervals = []; rightIntervals = [];
  }
  onDestroy(() => { stopSweep(); try { audioCtx?.close(); } catch {} });

  // ── i18n ──────────────────────────────────────────────────────────
  const ui = {
    en: {
      pageTitle:      'Free Online Hearing Test',
      pageDesc:       'A pure-tone frequency sweep from 20 Hz to 30 kHz. Hold the button while you can hear the tone — test each ear in about 30 seconds and get an instant hearing age report.',
      metaTitle:      'Free Online Hearing Screening | SRI Speech & Hearing Aid Centre',
      introSub:       'Unofficial self-screening — not a clinical diagnosis',
      introTitle:     'Free Online Hearing Test',
      introBody:      'A pure sine tone sweeps continuously from 20 Hz to 30,000 Hz — the full human hearing range and beyond. Press and hold the large button for as long as you can hear the tone. Release when it goes silent. We test each ear separately. The sweep takes about 30 seconds.',
      req1:           'Headphones or earphones are required — speakers will not give accurate results',
      req2:           'Find a quiet room with minimal background noise',
      req3:           'Set your device volume to approximately 50%',
      startBtn:       'Start Hearing Test',
      setupTitle:     'Before You Begin',
      setupBody:      'Take 30 seconds to set up properly for the most accurate result.',
      setupReady:     'I Am Ready — Start Test',
      leftLabel:      'Left Ear',
      rightLabel:     'Right Ear',
      holdInstruction:'Hold the button below for as long as you can hear the tone',
      holdBtn:        'Hold While You Can Hear',
      holdActive:     'Hearing...',
      sweepStart:     'Start Sweep',
      sweeping:       'Sweeping',
      preparing:      'Ready when you are',
      complete:       'Sweep complete',
      redoLeft:       'Redo Left Ear',
      redoRight:      'Redo Right Ear',
      noIntervals:    'No audible range detected. Try increasing your volume slightly and redo the sweep.',
      leftDoneTitle:  'Left Ear Done',
      leftDoneBody:   'Your left ear sweep is complete. Now we will test your right ear.',
      startRight:     'Test Right Ear Now',
      seeResults:     'See My Results',
      resultsTitle:   'Your Hearing Screening Report',
      hearingAge:     'Estimated Hearing Age',
      leftEar:        'Left Ear',
      rightEar:       'Right Ear',
      lowestFreq:     'Lowest heard',
      highestFreq:    'Highest heard',
      tipsTitle:      'Personalised Hearing Health Tips',
      downloadBtn:    'Download Report as PDF',
      callBtn:        'Call a Specialist',
      waBtn:          'WhatsApp a Specialist',
      retakeBtn:      'Retake Test',
      returnHome:     'Return to Home',
      disclaimerTitle:'Important Medical Disclaimer',
      disclaimer:     'This test is not official or clinical and cannot be used as a diagnosis of any kind. It is an informal self-screening tool only. Please consult an RCI-certified audiologist for a professional clinical evaluation.',
      spectrumLabel:  'Frequency Spectrum — 20 Hz to 30 kHz',
      previewLabel:   'Your audible range will be highlighted here in real time',
      yourRange:      'Your audible range',
    },
    pa: {
      pageTitle:      'ਮੁਫ਼ਤ ਔਨਲਾਈਨ ਸੁਣਨ ਜਾਂਚ',
      pageDesc:       '20 Hz ਤੋਂ 30 kHz ਤੱਕ ਸ਼ੁੱਧ-ਟੋਨ ਸਵੀਪ। ਜਦੋਂ ਤੱਕ ਸੁਣਾਈ ਦੇਵੇ ਬਟਨ ਦਬਾਓ ਅਤੇ ਤੁਰੰਤ ਰਿਪੋਰਟ ਪ੍ਰਾਪਤ ਕਰੋ।',
      metaTitle:      'ਮੁਫ਼ਤ ਔਨਲਾਈਨ ਸੁਣਨ ਜਾਂਚ | SRI',
      introSub:       'ਅਣਅਧਿਕਾਰਤ ਸਵੈ-ਜਾਂਚ — ਡਾਕਟਰੀ ਨਿਦਾਨ ਨਹੀਂ',
      introTitle:     'ਮੁਫ਼ਤ ਔਨਲਾਈਨ ਸੁਣਨ ਜਾਂਚ',
      introBody:      'ਇੱਕ ਸ਼ੁੱਧ ਟੋਨ 20 Hz ਤੋਂ 30,000 Hz ਤੱਕ ਲਗਾਤਾਰ ਵੱਜਦੀ ਹੈ। ਜਦੋਂ ਤੱਕ ਸੁਣਾਈ ਦੇਵੇ ਬਟਨ ਦਬਾ ਕੇ ਰੱਖੋ — ਜਦੋਂ ਨਾ ਸੁਣੇ ਛੱਡ ਦਿਓ। ਹਰ ਕੰਨ ਵੱਖਰੇ ਤੌਰ \'ਤੇ ਜਾਂਚਿਆ ਜਾਂਦਾ ਹੈ।',
      req1:           'ਹੈੱਡਫ਼ੋਨ ਜਾਂ ਈਅਰਫ਼ੋਨ ਜ਼ਰੂਰੀ ਹਨ',
      req2:           'ਚੁੱਪ ਵਾਲੇ ਕਮਰੇ ਵਿੱਚ ਬੈਠੋ',
      req3:           'ਵੌਲਿਊਮ ਲਗਭਗ 50% ਰੱਖੋ',
      startBtn:       'ਟੈਸਟ ਸ਼ੁਰੂ ਕਰੋ',
      setupTitle:     'ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ',
      setupBody:      'ਸਹੀ ਨਤੀਜੇ ਲਈ 30 ਸਕਿੰਟ ਤਿਆਰੀ ਕਰੋ।',
      setupReady:     'ਮੈਂ ਤਿਆਰ ਹਾਂ — ਸ਼ੁਰੂ ਕਰੋ',
      leftLabel:      'ਖੱਬਾ ਕੰਨ',
      rightLabel:     'ਸੱਜਾ ਕੰਨ',
      holdInstruction:'ਜਦੋਂ ਤੱਕ ਸੁਣਾਈ ਦੇਵੇ ਹੇਠਲਾ ਬਟਨ ਦਬਾ ਕੇ ਰੱਖੋ',
      holdBtn:        'ਸੁਣਾਈ ਦਿੰਦਾ ਹੈ — ਦਬਾ ਕੇ ਰੱਖੋ',
      holdActive:     'ਸੁਣ ਰਿਹਾ ਹਾਂ...',
      sweepStart:     'ਸਵੀਪ ਸ਼ੁਰੂ ਕਰੋ',
      sweeping:       'ਚੱਲ ਰਿਹਾ ਹੈ',
      preparing:      'ਤਿਆਰ ਹੋਣ \'ਤੇ ਦਬਾਓ',
      complete:       'ਮੁਕੰਮਲ',
      redoLeft:       'ਖੱਬਾ ਦੁਬਾਰਾ',
      redoRight:      'ਸੱਜਾ ਦੁਬਾਰਾ',
      noIntervals:    'ਕੋਈ ਸੁਣਨਯੋਗ ਰੇਂਜ ਨਹੀਂ ਮਿਲੀ — ਵੌਲਿਊਮ ਵਧਾਓ।',
      leftDoneTitle:  'ਖੱਬਾ ਕੰਨ ਮੁਕੰਮਲ',
      leftDoneBody:   'ਖੱਬੇ ਕੰਨ ਦੀ ਜਾਂਚ ਹੋ ਗਈ। ਹੁਣ ਸੱਜੇ ਕੰਨ ਦੀ ਵਾਰੀ।',
      startRight:     'ਸੱਜੇ ਕੰਨ ਦਾ ਟੈਸਟ ਕਰੋ',
      seeResults:     'ਨਤੀਜੇ ਦੇਖੋ',
      resultsTitle:   'ਤੁਹਾਡੀ ਸੁਣਨ ਜਾਂਚ ਰਿਪੋਰਟ',
      hearingAge:     'ਅਨੁਮਾਨਿਤ ਉਮਰ',
      leftEar:        'ਖੱਬਾ ਕੰਨ',
      rightEar:       'ਸੱਜਾ ਕੰਨ',
      lowestFreq:     'ਸਭ ਤੋਂ ਘੱਟ',
      highestFreq:    'ਸਭ ਤੋਂ ਵੱਧ',
      tipsTitle:      'ਨਿੱਜੀ ਸਿਹਤ ਸੁਝਾਅ',
      downloadBtn:    'PDF ਡਾਊਨਲੋਡ ਕਰੋ',
      callBtn:        'ਮਾਹਰ ਨੂੰ ਕਾਲ ਕਰੋ',
      waBtn:          'ਵਟਸਐਪ ਕਰੋ',
      retakeBtn:      'ਦੁਬਾਰਾ ਟੈਸਟ',
      returnHome:     'ਘਰ ਵਾਪਸ',
      disclaimerTitle:'ਮਹੱਤਵਪੂਰਨ ਡਾਕਟਰੀ ਬੇਦਾਅਵਾ',
      disclaimer:     'ਇਹ ਟੈਸਟ ਅਧਿਕਾਰਤ ਜਾਂ ਕਲੀਨਿਕਲ ਨਹੀਂ ਹੈ ਅਤੇ ਇਸਦੀ ਵਰਤੋਂ ਕਿਸੇ ਵੀ ਕਿਸਮ ਦੇ ਨਿਦਾਨ ਵਜੋਂ ਨਹੀਂ ਕੀਤੀ ਜਾ ਸਕਦੀ। ਇਹ ਸਿਰਫ ਇੱਕ ਅਣਰਸਮੀ ਸਵੈ-ਜਾਂਚ ਸਾਧਨ ਹੈ। ਸਹੀ ਨਿਦਾਨ ਲਈ ਕਿਸੇ ਯੋਗ ਆਡੀਓਲੋਜਿਸਟ ਨਾਲ ਸਲਾਹ ਕਰੋ।',
      spectrumLabel:  'ਬਾਰੰਬਾਰਤਾ ਸਪੈਕਟ੍ਰਮ',
      previewLabel:   'ਤੁਹਾਡੀ ਸੁਣਨਯੋਗ ਰੇਂਜ ਇੱਥੇ ਦਿਖਾਈ ਦੇਵੇਗੀ',
      yourRange:      'ਤੁਹਾਡੀ ਰੇਂਜ',
    },
    hi: {
      pageTitle:      'मुफ्त ऑनलाइन श्रवण जांच',
      pageDesc:       '20 Hz से 30 kHz तक शुद्ध-टोन स्वीप। जब तक सुनाई दे बटन दबाए रखें और तुरंत रिपोर्ट प्राप्त करें।',
      metaTitle:      'मुफ्त ऑनलाइन श्रवण जांच | SRI',
      introSub:       'अनौपचारिक स्व-जांच — चिकित्सा निदान नहीं',
      introTitle:     'मुफ्त ऑनलाइन श्रवण जांच',
      introBody:      'एक शुद्ध टोन 20 Hz से 30,000 Hz तक लगातार बजती है। जब तक सुनाई दे बटन दबाए रखें — जब सुनाई देना बंद हो तो छोड़ें। प्रत्येक कान की अलग से जांच होती है।',
      req1:           'हेडफोन या ईयरफोन आवश्यक हैं — स्पीकर से सटीक परिणाम नहीं मिलेंगे',
      req2:           'शांत कमरे में बैठें जहाँ शोर कम हो',
      req3:           'डिवाइस वॉल्यूम लगभग 50% पर सेट करें',
      startBtn:       'परीक्षण शुरू करें',
      setupTitle:     'शुरू करने से पहले',
      setupBody:      'सटीक परिणाम के लिए 30 सेकंड में तैयारी करें।',
      setupReady:     'मैं तैयार हूं — शुरू करें',
      leftLabel:      'बायां कान',
      rightLabel:     'दायां कान',
      holdInstruction:'जब तक टोन सुनाई दे नीचे दिया बटन दबाए रखें',
      holdBtn:        'सुनाई दे रहा है — दबाए रखें',
      holdActive:     'सुन रहा हूं...',
      sweepStart:     'स्वीप शुरू करें',
      sweeping:       'चल रहा है',
      preparing:      'तैयार होने पर दबाएं',
      complete:       'पूर्ण',
      redoLeft:       'बायां दोबारा',
      redoRight:      'दायां दोबारा',
      noIntervals:    'कोई श्रव्य सीमा नहीं मिली — वॉल्यूम बढ़ाएं।',
      leftDoneTitle:  'बायां कान पूर्ण',
      leftDoneBody:   'बाएं कान की जांच हो गई। अब दाएं कान की बारी।',
      startRight:     'दाएं कान का परीक्षण करें',
      seeResults:     'परिणाम देखें',
      resultsTitle:   'आपकी श्रवण जांच रिपोर्ट',
      hearingAge:     'अनुमानित श्रवण आयु',
      leftEar:        'बायां कान',
      rightEar:       'दायां कान',
      lowestFreq:     'सबसे कम',
      highestFreq:    'सबसे अधिक',
      tipsTitle:      'व्यक्तिगत सुझाव',
      downloadBtn:    'रिपोर्ट PDF डाउनलोड करें',
      callBtn:        'विशेषज्ञ को कॉल करें',
      waBtn:          'WhatsApp करें',
      retakeBtn:      'दोबारा दें',
      returnHome:     'होम पर वापस',
      disclaimerTitle:'महत्वपूर्ण चिकित्सा अस्वीकरण',
      disclaimer:     'यह परीक्षण आधिकारिक या नैदानिक (क्लिनिकल) नहीं है और इसका उपयोग किसी भी प्रकार के निदान के रूप में नहीं किया जा सकता है। यह केवल एक अनौपचारिक स्व-जांच उपकरण है। सटीक निदान के लिए किसी योग्य ऑडियोलॉजिस्ट से परामर्श लें।',
      spectrumLabel:  'आवृत्ति स्पेक्ट्रम',
      previewLabel:   'आपकी श्रव्य सीमा यहाँ दिखाई देगी',
      yourRange:      'आपकी सीमा',
    }
  };

  let T = $derived(ui[lang]);

  // Example preview regions for the intro (static demo: ~300Hz–14kHz highlighted)
  const PREVIEW_REGION = {
    left:  getPosForFreq(300) * 100,
    width: (getPosForFreq(14000) - getPosForFreq(300)) * 100
  };
</script>

<svelte:head>
  <title>{T.metaTitle}</title>
  <meta name="description" content={T.pageDesc} />
  <meta property="og:title"       content={T.metaTitle} />
  <meta property="og:description" content={T.pageDesc} />
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://www.srihearing.in${getLangUrl('/', lang)}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": T.pageTitle,
        "item": `https://www.srihearing.in${getLangUrl('/hearing-test', lang)}`
      }
    ]
  })}<\/script>`}
</svelte:head>

<main class="ht-page" class:is-standalone={isStandalone}>
  {#if isStandalone}
    <header class="ht-standalone-header">
      <a href={localizeLink('/', lang)} class="ht-standalone-logo">
        <img src="/logo.png" alt="SRI logo" class="ht-standalone-logo-img" />
        <span class="ht-standalone-logo-name">SRI Speech & Hearing</span>
      </a>
      <div class="ht-standalone-nav">
        <div class="ht-standalone-langs">
          <a href="{getLangUrl($page.url.pathname, 'en')}?standalone=true" class:active={lang === 'en'}>EN</a>
          <span>&bull;</span>
          <a href="{getLangUrl($page.url.pathname, 'pa')}?standalone=true" class:active={lang === 'pa'}>ਪੰਜਾਬੀ</a>
          <span>&bull;</span>
          <a href="{getLangUrl($page.url.pathname, 'hi')}?standalone=true" class:active={lang === 'hi'}>हिंदी</a>
        </div>
        <a href={localizeLink('/', lang)} class="btn btn-outline" style="min-height: 36px; height: 36px; padding: 0 0.875rem; font-size: 0.75rem;">Full Website</a>
      </div>
    </header>
  {/if}
  <div class="ht-wrap">

    <!-- ══════════════════════════════════════════════════════════
         INTRO
    ═══════════════════════════════════════════════════════════════ -->
    {#if step === 'intro'}
    <div class="ht-intro-layout">

      <!-- Left: Text + CTA -->
      <div class="ht-intro-text">
        <div class="ht-step-label"><div class="ht-step-dot"></div>{T.introSub}</div>
        <h1 class="t-h2" style="margin-bottom:1.25rem;">{T.introTitle}</h1>
        <p class="t-body" style="margin-bottom:2rem;">{T.introBody}</p>
        <ul class="ht-checklist">
          <li>
            <div class="ht-check-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
            </div>{T.req1}
          </li>
          <li>
            <div class="ht-check-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>{T.req2}
          </li>
          <li>
            <div class="ht-check-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
            </div>{T.req3}
          </li>
        </ul>
        <div class="ht-disclaimer-alert" style="margin: 1.75rem 0;">
          <div class="ht-disclaimer-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <div class="ht-disclaimer-content">
            <strong>{T.disclaimerTitle}</strong>
            <p>{T.disclaimer}</p>
          </div>
        </div>
        <button class="btn btn-green btn-lg" onclick={() => step = 'setup'} id="ht-start-btn">{T.startBtn}</button>
      </div>

      <!-- Right: Decorative spectrum preview -->
      <div class="ht-intro-visual">
        <div class="ht-intro-visual-label">{T.previewLabel}</div>
        <div class="ht-analyzer-panel">
          <div class="ht-analyzer-topbar">
            <span class="ht-analyzer-label">{T.spectrumLabel}</span>
            <span class="ht-analyzer-dot idle"></span>
          </div>
          <div class="ht-analyzer-inner">
            {#each MARKERS as m}
              <div class="ht-grid-line" style="left:{getPosForFreq(m)*100}%"></div>
            {/each}
            <div class="ht-spectrum-region committed" style="left:{PREVIEW_REGION.left}%; width:{PREVIEW_REGION.width}%"></div>
            <div class="ht-analyzer-cursor preview" style="left:72%"></div>
          </div>
          <div class="ht-analyzer-axis">
            {#each MOBILE_MARKERS as m}
              <div class="ht-axis-mk" style="left:{getPosForFreq(m)*100}%">{fmtMarker(m)}</div>
            {/each}
          </div>
        </div>
        <div class="ht-intro-visual-caption">
          <div class="ht-legend-dot committed"></div> Example audible range &nbsp;|&nbsp;
          <div class="ht-legend-dot cursor"></div> Sweep position
        </div>
      </div>
    </div>
    {/if}

    <!-- ══════════════════════════════════════════════════════════
         SETUP
    ═══════════════════════════════════════════════════════════════ -->
    {#if step === 'setup'}
    <div class="ht-card" id="ht-setup">
      <div class="ht-step-label"><div class="ht-step-dot"></div>Setup</div>
      <h2 class="t-h2" style="margin-bottom:0.5rem;">{T.setupTitle}</h2>
      <p class="t-body" style="margin-bottom:1.75rem;">{T.setupBody}</p>
      <ul class="ht-checklist">
        <li><div class="ht-check-ic active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>Put on your headphones or earphones</li>
        <li><div class="ht-check-ic active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>Move to a quiet room — turn off background noise sources</li>
        <li><div class="ht-check-ic active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>Set your device volume to approximately 50%</li>
        <li><div class="ht-check-ic active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>Left ear first (~30 sec), then right ear (~30 sec)</li>
      </ul>
      <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:1.75rem;">
        <button class="btn btn-green btn-lg" onclick={() => { step = 'test-left'; currentEar = 'left'; }} id="ht-begin-btn">{T.setupReady}</button>
        <button class="btn btn-outline" onclick={() => step = 'intro'}>Back</button>
      </div>
    </div>
    {/if}

    <!-- ══════════════════════════════════════════════════════════
         SWEEP TEST
    ═══════════════════════════════════════════════════════════════ -->
    {#if step === 'test-left' || step === 'test-right'}
    <div class="ht-test-wrap" id="ht-test">

      <!-- Ear + progress header -->
      <div class="ht-test-header">
        <div class="ht-ear-badge {currentEar}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;"><path d="M17.73 12.02a5.86 5.86 0 0 0-1.48-3.81A5.99 5.99 0 0 0 12 6a6 6 0 0 0-6 6c0 1.38.47 2.65 1.25 3.65L9 18v1h6v-1l1.73-2.31A5.97 5.97 0 0 0 18 12c0-.01 0-.01-.27.02z"/><line x1="12" y1="22" x2="12" y2="18"/></svg>
          {currentEar === 'left' ? T.leftLabel : T.rightLabel}
        </div>
        <div class="ht-test-step-indicator">
          <div class="ht-test-step-dot" class:active={currentEar === 'left'}></div>
          <div class="ht-test-step-dot" class:active={currentEar === 'right'}></div>
        </div>
      </div>

      <!-- Analyzer panel -->
      <div class="ht-analyzer-panel main-panel">
        <div class="ht-analyzer-topbar">
          <span class="ht-analyzer-label">{T.spectrumLabel}</span>
          <span class="ht-analyzer-dot" class:idle={!isPlaying} class:done={sweepDone}></span>
        </div>
        <div class="ht-analyzer-inner">
          {#each MARKERS as m}
            <div class="ht-grid-line" style="left:{getPosForFreq(m)*100}%"></div>
          {/each}
          {#each (currentEar === 'left' ? leftRegions : rightRegions) as r}
            <div class="ht-spectrum-region committed" style="left:{r.left}%; width:{r.width}%"></div>
          {/each}
          {#if liveRegion}
            <div class="ht-spectrum-region live" style="left:{liveRegion.left}%; width:{liveRegion.width}%"></div>
          {/if}
          {#if isPlaying || sweepDone}
            <div class="ht-analyzer-cursor" class:done={sweepDone} style="left:{sweepPos*100}%"></div>
          {/if}
        </div>
        <div class="ht-analyzer-axis">
          {#each MARKERS as m}
            <div class="ht-axis-mk" style="left:{getPosForFreq(m)*100}%">{fmtMarker(m)}</div>
          {/each}
        </div>
      </div>

      <!-- Live readout row -->
      <div class="ht-live-row">
        <div class="ht-live-left">
          <div class="ht-live-hz">{(isPlaying || sweepDone) ? fmtHz(currentFreq) : '— Hz'}</div>
          <div class="ht-live-sub">
            {#if sweepDone}{T.complete}{:else if isPlaying}{T.sweeping}&hellip;{:else}{T.preparing}{/if}
          </div>
        </div>
        <div class="ht-live-right">
          {#if isPlaying}
            <div class="ht-live-timer-wrap">
              <svg viewBox="0 0 36 36" class="ht-live-timer-ring">
                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--border)" stroke-width="2.5"/>
                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--green-light)" stroke-width="2.5"
                  stroke-dasharray="{94.25}"
                  stroke-dashoffset="{94.25 * (1 - timerPct/100)}"
                  stroke-linecap="round"
                  transform="rotate(-90 18 18)"/>
              </svg>
              <span class="ht-live-timer-pct">{Math.round(timerPct)}%</span>
            </div>
          {:else if sweepDone}
            <div class="ht-live-done-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          {/if}
        </div>
      </div>

      <!-- Hold button area -->
      <div class="ht-hold-area">
        {#if !sweepDone}
          {#if !isPlaying}
            <button class="btn btn-green btn-lg ht-sweep-start-btn" onclick={beginSweep} id="ht-sweep-start-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px;"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              {T.sweepStart}
            </button>
          {:else}
            <p class="ht-hold-instruction">{T.holdInstruction}</p>
            <div class="ht-hold-circle-wrap {isHolding ? 'is-holding' : ''}">
              <div class="ht-hold-ring r1"></div>
              <div class="ht-hold-ring r2"></div>
              <div class="ht-hold-ring r3"></div>
              <button
                class="ht-hold-btn {isHolding ? 'holding' : ''}"
                onmousedown={onPressHear}
                onmouseup={onReleaseHear}
                onmouseleave={onReleaseHear}
                ontouchstart={(e) => { e.preventDefault(); onPressHear(); }}
                ontouchend={(e) => { e.preventDefault(); onReleaseHear(); }}
                ontouchcancel={(e) => { e.preventDefault(); onReleaseHear(); }}
                id="ht-hold-btn"
                aria-label="Hold while you can hear the tone"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="ht-hold-btn-icon"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
                <span class="ht-hold-btn-text">{isHolding ? T.holdActive : T.holdBtn}</span>
              </button>
            </div>
          {/if}
        {:else}
          <!-- Sweep done — show next actions -->
          {#if (currentEar === 'left' ? leftIntervals : rightIntervals).length === 0}
            <p class="ht-no-range-msg">{T.noIntervals}</p>
          {/if}
          <div class="ht-next-actions">
            {#if currentEar === 'left'}
              <button class="btn btn-green btn-lg" onclick={goToRight} id="ht-next-ear-btn">{T.startRight}</button>
              <button class="btn btn-outline" onclick={beginSweep}>{T.redoLeft}</button>
            {:else}
              <button class="btn btn-green btn-lg" onclick={goToResults} id="ht-see-results-btn">{T.seeResults}</button>
              <button class="btn btn-outline" onclick={beginSweep}>{T.redoRight}</button>
            {/if}
          </div>
        {/if}
      </div>
    </div>
    {/if}

    <!-- ══════════════════════════════════════════════════════════
         RESULTS
    ═══════════════════════════════════════════════════════════════ -->
    {#if step === 'results' && grade}
    <div class="ht-results-wrap" id="ht-results">

      <!-- Disclaimer at the top of results -->
      <div class="ht-disclaimer-alert" style="margin-bottom:1.5rem;">
        <div class="ht-disclaimer-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <div class="ht-disclaimer-content">
          <strong>{T.disclaimerTitle}</strong>
          <p>{T.disclaimer}</p>
        </div>
      </div>

      <!-- Score header -->
      <div class="ht-score-card">
        <p class="t-label" style="margin-bottom:0.75rem;">{T.resultsTitle}</p>
        <div class="ht-hearing-age-badge">
          <div class="age-num">{ageLabel}</div>
          <div class="age-label">{T.hearingAge}</div>
        </div>
        <div class="ht-result-grade">{grade.grade}</div>
        <p class="ht-result-interp">{grade.interp}</p>
      </div>

      <!-- Ear range visualisations and combined bar graph -->
      <div class="ht-ears-section">
        <h3 class="t-h3" style="margin-bottom:1.5rem; text-align:center;">Your Audible Frequency Range</h3>

        <!-- Textual stats side-by-side -->
        <div class="ht-result-stats-row">
          <div class="ht-result-stat-box left">
            <span class="ht-result-ear-label left">{T.leftEar}</span>
            <div class="ht-stat-vals">
              <div class="ht-stat-val"><span>{T.lowestFreq}:</span> <strong>{leftLow > 0 ? fmtHz(leftLow) : '—'}</strong></div>
              <div class="ht-stat-val"><span>{T.highestFreq}:</span> <strong>{leftHigh > 0 ? fmtHz(leftHigh) : '—'}</strong></div>
            </div>
          </div>
          <div class="ht-result-stat-box right">
            <span class="ht-result-ear-label right">{T.rightEar}</span>
            <div class="ht-stat-vals">
              <div class="ht-stat-val"><span>{T.lowestFreq}:</span> <strong>{rightLow > 0 ? fmtHz(rightLow) : '—'}</strong></div>
              <div class="ht-stat-val"><span>{T.highestFreq}:</span> <strong>{rightHigh > 0 ? fmtHz(rightHigh) : '—'}</strong></div>
            </div>
          </div>
        </div>

        <!-- Combined Bar Graph -->
        <div class="ht-chart-card">
          <div class="ht-chart-header">
            <h4 class="ht-chart-title">Audible Frequencies Response</h4>
            <div class="ht-chart-legend">
              <div class="ht-legend-item"><span class="ht-legend-color left"></span> {T.leftEar}</div>
              <div class="ht-legend-item"><span class="ht-legend-color right"></span> {T.rightEar}</div>
            </div>
          </div>
          
          <div class="ht-chart-body">
            <div class="ht-chart-y-axis">
              <span class="ht-y-label positive">Heard</span>
              <span class="ht-y-label negative">Silent</span>
            </div>
            
            <div class="ht-chart-bars">
              {#each BAR_FREQS as freq}
                {@const leftHeard = isFreqHeard(freq, leftIntervals)}
                {@const rightHeard = isFreqHeard(freq, rightIntervals)}
                <div class="ht-chart-column">
                  <div class="ht-column-bars">
                    <!-- Left Bar -->
                    <div class="ht-bar left" class:heard={leftHeard} style="height: {leftHeard ? '100%' : '15%'}" title="{T.leftEar}: {fmtHz(freq)} - {leftHeard ? 'Heard' : 'Unheard'}"></div>
                    <!-- Right Bar -->
                    <div class="ht-bar right" class:heard={rightHeard} style="height: {rightHeard ? '100%' : '15%'}" title="{T.rightEar}: {fmtHz(freq)} - {rightHeard ? 'Heard' : 'Unheard'}"></div>
                  </div>
                  <span class="ht-column-label">{fmtMarker(freq)}</span>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>

      <!-- Tips -->
      <div class="ht-tips">
        <h4>{T.tipsTitle}</h4>
        <ul>
          {#each grade.tips as tip}
          <li><div class="ht-tips-dot"></div><span>{tip}</span></li>
          {/each}
        </ul>
      </div>

      <!-- CTAs -->
      <div class="ht-cta-group btn-print-hide">
        <button class="btn btn-green" onclick={downloadReport} id="ht-download-btn">{T.downloadBtn}</button>
        <a href="tel:+917986029544" class="btn btn-outline" id="ht-call-btn">{T.callBtn}</a>
        <a href="https://wa.me/917986029544?text=Hello%2C+I+just+took+the+online+hearing+sweep+test+and+would+like+a+specialist+consultation." target="_blank" rel="noopener noreferrer" class="btn btn-green" id="ht-wa-btn">{T.waBtn}</a>
        <button class="btn btn-outline" onclick={reset} id="ht-retake-btn">{T.retakeBtn}</button>
      </div>

      <div style="text-align:center; margin-top:2rem;" class="btn-print-hide">
        <a href={localizeLink('/', lang)} class="t-small" style="color:var(--muted); text-decoration:underline; text-underline-offset:3px;">{T.returnHome}</a>
      </div>
    </div>
    {/if}

  </div>
</main>
