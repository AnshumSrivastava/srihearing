<script lang="ts">
  import { onMount, getContext } from 'svelte';
  const ctx = getContext<{ lang: 'en' | 'pa' | 'hi' }>('lang');
  let lang = $derived(ctx?.lang ?? 'en');

  const h = {
    en: { badge: 'Trusted Clinic in Ludhiana', h1: 'Rediscover the', h2: 'Joy of Sound', desc: 'Expert audiological evaluations, advanced rechargeable hearing aids, and compassionate speech therapy for children and adults — all under one roof.', cta1: 'Book Appointment', cta2: 'Our Services', stats: [['500+', 'Happy Patients'], ['7+', 'Years Experience'], ['100%', 'Personalised Care']] },
    pa: { badge: 'ਲੁਧਿਆਣਾ ਦਾ ਭਰੋਸੇਮੰਦ ਕਲੀਨਿਕ', h1: 'ਆਵਾਜ਼ ਦੀ', h2: 'ਖੁਸ਼ੀ ਮੁੜ ਪਾਓ', desc: 'ਲੁਧਿਆਣਾ ਵਿੱਚ ਮਾਹਿਰ ਆਡੀਓਲੌਜੀਕਲ ਮੁਲਾਂਕਣ, ਆਧੁਨਿਕ ਹੀਅਰਿੰਗ ਏਡ ਅਤੇ ਬੋਲਣ ਦੀ ਥੈਰੇਪੀ।', cta1: 'ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ', cta2: 'ਸੇਵਾਵਾਂ', stats: [['500+', 'ਖੁਸ਼ ਮਰੀਜ਼'], ['7+', 'ਸਾਲ ਤਜਰਬਾ'], ['100%', 'ਨਿੱਜੀ ਦੇਖਭਾਲ']] },
    hi: { badge: 'लुधियाना का विश्वसनीय क्लिनिक', h1: 'ध्वनि का', h2: 'आनंद पुनः खोजें', desc: 'ऑडियोलॉजिकल मूल्यांकन, रिचार्जेबल हियरिंग एड और स्पीच थेरेपी — सब एक छत के नीचे।', cta1: 'अपॉइंटमेंट बुक करें', cta2: 'सेवाएं', stats: [['500+', 'खुश मरीज़'], ['7+', 'वर्ष अनुभव'], ['100%', 'व्यक्तिगत देखभाल']] },
  };

  const svcs = [
    { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>', t: 'Hearing Aids', tp: 'ਹੀਅਰਿੰਗ ਏਡ', th: 'हियरिंग एड', d: 'Rechargeable & CIC digital hearing aids. Trial available on all brands.' },
    { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>', t: 'Speech Therapy', tp: 'ਬੋਲਣ ਦੀ ਥੈਰੇਪੀ', th: 'स्पीच थेरेपी', d: 'Play-based therapy for children with delayed speech and articulation disorders.' },
    { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>', t: 'Voice Therapy', tp: 'ਆਵਾਜ਼ ਥੈਰੇਪੀ', th: 'वॉइस थेरेपी', d: 'Treatment for hoarseness, vocal nodules, and professional voice care.' },
    { svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>', t: 'Audiological Tests', tp: 'ਆਡੀਓਮੈਟਰੀ', th: 'ऑडियोमेट्री', d: 'PTA, speech audiometry, tympanometry — comprehensive hearing assessments.' },
  ];

  const why = [
    { n: '01', t: 'Expert Audiologists', d: 'RCI-certified qualifications in audiology and speech-language pathology.' },
    { n: '02', t: 'Latest Technology', d: 'Rechargeable, CIC, and BTE hearing aids from leading international brands.' },
    { n: '03', t: 'Trilingual Care', d: 'We speak Punjabi, Hindi, and English — feel at home in every consultation.' },
    { n: '04', t: 'Affordable Pricing', d: 'Transparent pricing with no hidden fees. Trial periods on all hearing aids.' },
  ];

  const tests = [
    { txt: 'My mother can now hear clearly for the first time in a decade. The team is incredibly patient and kind.', name: 'Gurpreet Singh', role: 'Son of patient' },
    { txt: "My son started speech therapy at age 3. Within 6 months his vocabulary exploded. He loves going there.", name: 'Harjinder Kaur', role: 'Mother of patient' },
    { txt: 'Professional evaluation, honest advice, no upselling. Exactly the right CIC aid for my budget.', name: 'Rajesh Kumar', role: 'Hearing aid patient' },
  ];

  const contactText = {
    en: {
      title: 'Get In Touch',
      sub: 'Book an appointment or visit our clinic. We are here to help you hear and speak better.',
      name: 'Full Name',
      phone: 'Phone Number',
      service: 'Select Service',
      msg: 'Your Message',
      btn: 'Send Booking Request',
      hours: 'Opening Hours',
      hoursVal: 'Mon - Sat: 10:00 AM - 7:00 PM (Sunday Closed)',
      address: 'Our Address',
      addressVal: 'Near ESI Hospital, Model Gram, Ludhiana, Punjab 141001',
      contactInfo: 'Contact Information',
      success: 'Inquiry Sent Successfully! We will call you back shortly.'
    },
    pa: {
      title: 'ਸੰਪਰਕ ਕਰੋ',
      sub: 'ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ ਜਾਂ ਸਾਡੇ ਕਲੀਨਿਕ ਤੇ ਆਓ। ਅਸੀਂ ਤੁਹਾਡੀ ਮਦਦ ਲਈ ਤਿਆਰ ਹਾਂ।',
      name: 'ਪੂਰਾ ਨਾਮ',
      phone: 'ਫ਼ੋਨ ਨੰਬਰ',
      service: 'ਸੇਵਾ ਚੁਣੋ',
      msg: 'ਤੁਹਾਡਾ ਸੰਦੇਸ਼',
      btn: 'ਬੁਕਿੰਗ ਭੇਜੋ',
      hours: 'ਖੁੱਲ੍ਹਣ ਦਾ ਸਮਾਂ',
      hoursVal: 'ਸੋਮਵਾਰ - ਸ਼ਨੀਵਾਰ: 10:00 AM - 7:00 PM (ਐਤਵਾਰ ਬੰਦ)',
      address: 'ਸਾਡਾ ਪਤਾ',
      addressVal: 'ਈ.ਐਸ.ਆਈ. ਹਸਪਤਾਲ ਦੇ ਨੇੜੇ, ਮਾਡਲ ਗ੍ਰਾਮ, ਲੁਧਿਆਣਾ, ਪੰਜਾਬ 141001',
      contactInfo: 'ਸੰਪਰਕ ਜਾਣਕਾਰੀ',
      success: 'ਪੁੱਛਗਿੱਛ ਸਫਲਤਾਪੂਰਵਕ ਭੇਜੀ ਗਈ! ਅਸੀਂ ਜਲਦੀ ਹੀ ਤੁਹਾਨੂੰ ਕਾਲ ਕਰਾਂਗੇ।'
    },
    hi: {
      title: 'संपर्क करें',
      sub: 'अपॉइंटमेंट बुक करें या हमारे क्लिनिक पर आएं। हम आपकी सहायता के लिए यहाँ हैं।',
      name: 'पूरा नाम',
      phone: 'फ़ोन नंबर',
      service: 'सेवा चुनें',
      msg: 'आपका संदेश',
      btn: 'बुकिंग अनुरोध भेजें',
      hours: 'खुलने का समय',
      hoursVal: 'सोम - शनि: 10:00 AM - 7:00 PM (रविवार बंद)',
      address: 'हमारा पता',
      addressVal: 'ईएसआई अस्पताल के पास, मॉडल ग्राम, लुधियाना, पंजाब 141001',
      contactInfo: 'संपर्क जानकारी',
      success: 'पूछताछ सफलतापूर्वक भेजी गई! हम जल्द ही आपको कॉल करेंगे।'
    }
  };

  let formState = $state({ name: '', phone: '', service: '', message: '' });
  let submitted = $state(false);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    submitted = true;
    setTimeout(() => {
      formState = { name: '', phone: '', service: '', message: '' };
      submitted = false;
    }, 5000);
  }

  onMount(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
    return () => io.disconnect();
  });
</script>

<svelte:head>
  <title>SRI Speech & Hearing Aid Centre | Ludhiana, Punjab</title>
  <meta name="description" content="Expert speech therapy and hearing aid services in Ludhiana, Punjab. Rechargeable & CIC hearing aids, audiological evaluation, children's speech therapy. Near ESI Hospital." />
</svelte:head>

<section class="hero">
  <div class="wrap">
    <div class="hero-grid">
      <div>
        <div class="hero-badge anim-up"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> {h[lang].badge}</div>
        <h1 class="t-hero anim-up anim-d1">{h[lang].h1}<br><span style="color:var(--green)">{h[lang].h2}</span></h1>
        <p class="t-body-lg hero-desc anim-up anim-d2">{h[lang].desc}</p>
        <div class="hero-actions anim-up anim-d3">
          <a href="tel:+917986029544" class="btn btn-green btn-lg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.8.36 1.58.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c1.23.34 2.01.58 2.81.7A2 2 0 0 1 22 16.92z"/></svg> {h[lang].cta1}</a>
          <a href="/services" class="btn btn-outline btn-lg">{h[lang].cta2} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
        </div>
        <div class="hero-stats anim-up anim-d4">
          {#each h[lang].stats as s}<div class="hero-stat"><strong>{s[0]}</strong><span>{s[1]}</span></div>{/each}
        </div>
      </div>
      <div class="anim-up anim-d2"><div class="hero-img"><img src="/images/hero_clinic.png" alt="SRI Speech & Hearing Clinic" /></div></div>
    </div>
  </div>
</section>

<section class="sec bg-white" id="services">
  <div class="wrap">
    <div class="fade-in" style="text-align:center; max-width:580px; margin:0 auto 3rem;">
      <p class="t-label">What We Treat</p>
      <h2 class="t-h2" style="margin:0.75rem 0;">Comprehensive Hearing & Speech Care</h2>
      <p class="t-body">From hearing loss to childhood speech delays — expert care for every patient under one roof.</p>
    </div>
    <div class="g4">
      {#each svcs as s, i}<div class="card svc-card fade-in" style="transition-delay:{i*50}ms;">
        <div class="svc-icon">{@html s.svg}</div>
        <h3 class="t-h3">{lang==='pa' ? s.tp : lang==='hi' ? s.th : s.t}</h3>
        <p class="t-body" style="font-size:0.9375rem;">{s.d}</p>
      </div>{/each}
    </div>
    <div style="text-align:center; margin-top:2.5rem;" class="fade-in"><a href="/services" class="btn btn-green">Explore All Services</a></div>
  </div>
</section>

<section class="sec" id="about">
  <div class="wrap">
    <div class="about-grid">
      <div class="about-img fade-in"><img src="/images/about_team.png" alt="SRI clinic team" /></div>
      <div class="fade-in">
        <p class="t-label">About Us</p>
        <h2 class="t-h2" style="margin:0.75rem 0 1rem;">Ludhiana's Most Trusted Hearing & Speech Clinic</h2>
        <p class="t-body" style="margin-bottom:2rem;">Located near ESI Hospital in Model Gram, SRI Speech & Hearing Aid Centre has served the Ludhiana community with expert audiological care. We combine clinical expertise with genuine warmth.</p>
        <div style="display:flex; flex-direction:column; gap:1.25rem; margin-bottom:2rem;">
          <div class="chk"><div class="chk-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div><div><strong>RCI-Certified Specialists</strong><br><span class="t-small">Registered with Rehabilitation Council of India</span></div></div>
          <div class="chk"><div class="chk-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div><div><strong>All Brands, All Budgets</strong><br><span class="t-small">Rechargeable, CIC, BTE — trial periods available</span></div></div>
        </div>
        <a href="/#contact" class="btn btn-outline">Book a Free Consultation</a>
      </div>
    </div>
  </div>
</section>

<section class="sec bg-white" id="why-us">
  <div class="wrap">
    <div class="fade-in" style="max-width:580px; margin:0 auto 3rem; text-align:center;">
      <p class="t-label">Why Choose Us</p>
      <h2 class="t-h2" style="margin:0.75rem 0;">The SRI Difference</h2>
      <p class="t-body">Clinical excellence with a warm, family-first approach.</p>
    </div>
    <div class="g2">
      {#each why as w, i}<div class="card svc-card fade-in" style="transition-delay:{i*60}ms; align-items:flex-start; text-align:left;">
        <div class="why-n">{w.n}</div>
        <h3 class="t-h3">{w.t}</h3>
        <p class="t-body" style="font-size:0.9375rem;">{w.d}</p>
      </div>{/each}
    </div>
  </div>
</section>

<section class="sec" id="testimonials">
  <div class="wrap">
    <div class="fade-in" style="max-width:580px; margin:0 auto 3rem; text-align:center;">
      <p class="t-label">Patient Stories</p>
      <h2 class="t-h2" style="margin:0.75rem 0;">What Our Patients Say</h2>
    </div>
    <div class="g3">
      {#each tests as t, i}<div class="card tst-card fade-in" style="transition-delay:{i*80}ms;">
        <div class="tst-q"><svg viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg></div>
        <p class="tst-txt">"{t.txt}"</p>
        <div class="tst-who">
          <div class="tst-av"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
          <div><div class="tst-name">{t.name}</div><div class="tst-role">{t.role}</div></div>
        </div>
      </div>{/each}
    </div>
  </div>
</section>

<section class="sec bg-white" id="contact">
  <div class="wrap">
    <div class="contact-grid fade-in">
      <div class="contact-info">
        <p class="t-label">{contactText[lang].contactInfo}</p>
        <h2 class="t-h2" style="margin: 0.5rem 0 1.5rem;">{contactText[lang].title}</h2>
        <p class="t-body" style="margin-bottom: 2rem;">{contactText[lang].sub}</p>
        
        <div class="contact-details">
          <div class="contact-detail-item">
            <div class="contact-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.8.36 1.58.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c1.23.34 2.01.58 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <strong>Phone</strong>
              <p class="t-body"><a href="tel:+917986029544">+91 79860 29544</a></p>
            </div>
          </div>

          <div class="contact-detail-item">
            <div class="contact-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <strong>{contactText[lang].address}</strong>
              <p class="t-body">{contactText[lang].addressVal}</p>
            </div>
          </div>

          <div class="contact-detail-item">
            <div class="contact-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px;"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            </div>
            <div>
              <strong>{contactText[lang].hours}</strong>
              <p class="t-body">{contactText[lang].hoursVal}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="contact-form-container">
        {#if submitted}
          <div class="success-message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:48px;height:48px;color:var(--green);margin-bottom:1rem;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <h3 class="t-h3" style="margin-bottom: 0.5rem;">Thank You!</h3>
            <p class="t-body" style="text-align:center;">{contactText[lang].success}</p>
          </div>
        {:else}
          <form onsubmit={handleSubmit} class="contact-form">
            <div class="form-group">
              <label for="name">{contactText[lang].name}</label>
              <input type="text" id="name" bind:value={formState.name} required placeholder="Full Name" />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="phone">{contactText[lang].phone}</label>
                <input type="tel" id="phone" bind:value={formState.phone} required placeholder="+91 XXXXX XXXXX" />
              </div>

              <div class="form-group">
                <label for="service">{contactText[lang].service}</label>
                <select id="service" bind:value={formState.service} required style="background: var(--white);">
                  <option value="" disabled selected>-- Select --</option>
                  <option value="hearing-aid">Hearing Aids</option>
                  <option value="speech-therapy">Speech Therapy</option>
                  <option value="voice-therapy">Voice Therapy</option>
                  <option value="audiometry">Audiological Tests</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="message">{contactText[lang].msg}</label>
              <textarea id="message" rows="4" bind:value={formState.message} placeholder="Tell us how we can help you..."></textarea>
            </div>

            <button type="submit" class="btn btn-green btn-full">{contactText[lang].btn}</button>
          </form>
        {/if}
      </div>
    </div>
  </div>
</section>

<div class="wrap fade-in">
  <div class="cta-b">
    <p class="t-label" style="color:rgba(255,255,255,0.5);">Take the First Step</p>
    <h2 class="t-h2" style="color:white; margin:0.75rem 0 0.5rem;">Ready to Hear Better?</h2>
    <p class="t-body" style="color:rgba(255,255,255,0.65); max-width:460px; margin:0 auto;">Book a free hearing test or speech evaluation today. No pressure — just expert care.</p>
    <div class="cta-acts">
      <a href="tel:+917986029544" class="btn btn-cream btn-lg">Call +91 79860 29544</a>
      <a href="https://wa.me/917986029544" class="btn btn-ghost btn-lg">WhatsApp Us</a>
    </div>
  </div>
</div>
