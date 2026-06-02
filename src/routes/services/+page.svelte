<script lang="ts">
  import { onMount, getContext } from 'svelte';
  const ctx = getContext<{ lang: 'en' | 'pa' | 'hi' }>('lang');
  let lang = $derived(ctx?.lang ?? 'en');

  const services = [
    {
      id: 'hearing-aids',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
      title: 'Hearing Aids', tp: 'ਹੀਅਰਿੰਗ ਏਡ', th: 'हियरिंग एड',
      image: '/images/hearing_aid.png',
      desc: 'We offer a comprehensive range of hearing aids to suit every lifestyle and budget — from discreet CIC models to powerful BTE devices. All prescribed after thorough audiological evaluation.',
      bullets: ['Rechargeable hearing aids — no tiny batteries', 'Invisible CIC (Completely-In-Canal) models', 'BTE & RIC for severe hearing loss', 'Digital signal processing for natural sound', 'Trial periods available on all models', 'All leading brands stocked and serviced'],
      rev: false,
    },
    {
      id: 'speech-therapy',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
      title: 'Speech Therapy for Children', tp: 'ਬੱਚਿਆਂ ਲਈ ਬੋਲਣ ਦੀ ਥੈਰੇਪੀ', th: 'बच्चों के लिए स्पीच थेरेपी',
      image: '/images/speech_therapy.png',
      desc: 'Children with delayed speech, articulation errors, or language disorders thrive with our play-based, evidence-backed therapy conducted by certified speech-language pathologists.',
      bullets: ['Delayed speech and language development', 'Articulation and phonological disorders', 'Autism spectrum communication support', 'Cleft palate speech rehabilitation', 'Bilingual therapy (Punjabi/Hindi/English)', 'Parent guidance and home exercise programs'],
      rev: true,
    },
    {
      id: 'audiological-eval',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
      title: 'Audiological Evaluation', tp: 'ਆਡੀਓਲੌਜੀਕਲ ਮੁਲਾਂਕਣ', th: 'ऑडियोलॉजिकल मूल्यांकन',
      image: '/images/hero_clinic.png',
      desc: 'A complete hearing assessment is the first step to better hearing. Our clinic is equipped with state-of-the-art testing equipment for accurate diagnosis.',
      bullets: ['Pure Tone Audiometry (PTA)', 'Speech Audiometry & Word Recognition Score', 'Tympanometry & Middle Ear Testing', 'OAE for newborns', 'BERA testing', 'Pediatric & adult protocols'],
      rev: false,
    },
    {
      id: 'voice',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>',
      title: 'Voice Therapy', tp: 'ਆਵਾਜ਼ ਥੈਰੇਪੀ', th: 'वॉइस थेरेपी',
      image: '/images/about_team.png',
      desc: 'Hoarseness, vocal fatigue, or voice loss can affect teachers, singers, and professionals. Our specialists rehabilitate all voice disorders.',
      bullets: ['Vocal nodules & polyp management', 'Puberphonia treatment', 'Professional voice care for teachers', 'Laryngeal cancer voice rehab', 'Resonance and pitch therapy', 'Vocal hygiene counselling'],
      rev: true,
    },
    {
      id: 'stuttering',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
      title: 'Stuttering & Fluency', tp: 'ਹਕਲਾਹਟ ਥੈਰੇਪੀ', th: 'हकलाहट थेरेपी',
      image: '/images/speech_therapy.png',
      desc: 'Stuttering can profoundly affect confidence. We use the Lidcombe Program for children and evidence-based techniques for adults.',
      bullets: ['Lidcombe Program for young children', 'Fluency shaping for adults', 'Stuttering modification & acceptance', 'Confidence & public speaking coaching', 'Group therapy available', 'Telehealth sessions on request'],
      rev: false,
    },
    {
      id: 'tinnitus',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12.5C5 7 10 4 12 4s7 3 10 8.5C19 17 14 20 12 20S5 17 2 12.5z"/><circle cx="12" cy="12.5" r="3"/></svg>',
      title: 'Tinnitus Management', tp: 'ਟਿੰਨੀਟਸ ਪ੍ਰਬੰਧਨ', th: 'टिनिटस प्रबंधन',
      image: '/images/hearing_aid.png',
      desc: 'Constant ringing or buzzing in the ears can be debilitating. We offer sound therapy, hearing aids with masking features, and counselling.',
      bullets: ['Tinnitus Retraining Therapy (TRT)', 'Sound masking strategies', 'Hearing aids with tinnitus masker', 'Psychological impact support', 'Lifestyle counselling', 'Long-term management plan'],
      rev: true,
    },
    {
      id: 'cochlear',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
      title: 'Cochlear Implant Rehab', tp: 'ਕੋਕਲੀਅਰ ਇਮਪਲਾਂਟ ਰੀਹੈਬ', th: 'कॉक्लियर इम्प्लांट रिहैब',
      image: '/images/hero_clinic.png',
      desc: 'A cochlear implant is just the beginning. Post-implant auditory-verbal therapy is crucial for the brain to learn to interpret new sounds.',
      bullets: ['Post-implant auditory training', 'Speech & language development', 'Auditory-Verbal Therapy (AVT)', 'Mapping session support', 'Family training & home practice', 'School integration support'],
      rev: false,
    },
  ];

  onMount(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    return () => io.disconnect();
  });
</script>

<svelte:head>
  <title>Our Services | SRI Speech & Hearing Aid Centre, Ludhiana</title>
  <meta name="description" content="Comprehensive speech therapy and hearing aid services in Ludhiana — hearing aids, speech therapy, audiological evaluation, voice therapy, tinnitus management, cochlear rehab." />
</svelte:head>

<!-- Hero -->
<section class="sec" style="padding-top: calc(var(--nav-h) + 3rem);">
  <div class="wrap fade-in" style="text-align:center; max-width:720px; margin-inline:auto;">
    <p class="t-label">Our Services</p>
    <h1 class="t-h2" style="margin:0.75rem 0;">Complete Speech & Hearing Care</h1>
    <p class="t-body-lg" style="margin-top:1rem;">Everything from hearing tests to children's speech therapy — under one expert roof in Ludhiana, Punjab.</p>
  </div>
</section>

<!-- Service Detail Cards -->
<section style="padding-bottom: 4rem;">
  <div class="wrap">
    {#each services as svc, i}
      <div id={svc.id} class="card svc-detail fade-in" class:rev={svc.rev} style="transition-delay:{i * 50}ms; margin-bottom: 2rem;">
        <div class="svc-detail-body">
          <div class="svc-icon">{@html svc.svg}</div>
          <h2 class="t-h2" style="font-size: clamp(1.5rem, 3vw, 2rem);">{lang === 'pa' ? svc.tp : lang === 'hi' ? svc.th : svc.title}</h2>
          <p class="t-body">{svc.desc}</p>
          <ul style="display:flex; flex-direction:column; gap:0.5rem;">
            {#each svc.bullets as b}
              <li class="svc-check">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {b}
              </li>
            {/each}
          </ul>
          <div><a href="tel:+917986029544" class="btn btn-green">Book Appointment</a></div>
        </div>
        <div class="svc-detail-img">
          <img src={svc.image} alt={svc.title} loading="lazy" />
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- CTA -->
<div class="wrap fade-in" style="padding-bottom: 4rem;">
  <div class="cta-b">
    <p class="t-label" style="color:rgba(255,255,255,0.5);">Need Guidance?</p>
    <h2 class="t-h2" style="color:white; margin:0.75rem 0 0.5rem;">Not Sure Which Service You Need?</h2>
    <p class="t-body" style="color:rgba(255,255,255,0.65); max-width:460px; margin:0 auto;">Call us for a free 10-minute consultation. We'll guide you to the right specialist.</p>
    <div class="cta-acts">
      <a href="tel:+917986029544" class="btn btn-cream btn-lg">Call +91 79860 29544</a>
      <a href="https://wa.me/917986029544" class="btn btn-ghost btn-lg">WhatsApp Us</a>
    </div>
  </div>
</div>
