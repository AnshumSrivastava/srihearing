<script lang="ts">
  import { onMount, getContext } from 'svelte';
  import { posts } from '$lib/blogData';
  import { localizeLink, getLangUrl } from '$lib';

  const blogMetaDesc = {
    en: 'Expert articles on hearing loss, hearing aids, speech therapy, stuttering, tinnitus, and voice health from SRI Speech & Hearing Clinic, Ludhiana.',
    pa: 'ਲੁਧਿਆਣਾ ਵਿੱਚ ਸੁਣਨ ਸ਼ਕਤੀ ਦੀ ਕਮੀ, ਹੀਅਰਿੰਗ ਏਡਜ਼, ਬੱਚਿਆਂ ਦੀ ਸਪੀਚ ਥੈਰੇਪੀ, ਟਿੰਨੀਟਸ ਅਤੇ ਆਵਾਜ਼ ਸੰਬੰਧੀ ਮਾਹਰ ਲੇਖ।',
    hi: 'लुधियाना में सुनवाई हानि, हियरिंग एड्स, स्पीच थेरेपी, टिनिटस और आवाज के स्वास्थ्य से जुड़े विशेषज्ञ लेख।'
  };


  const ctx = getContext<{ lang: 'en' | 'pa' | 'hi' }>('lang');
  let lang = $derived(ctx?.lang ?? 'en');

  const t = {
    en: {
      label: 'Knowledge Hub',
      title: 'Speech & Hearing Insights',
      sub: 'Expert articles from our clinical team — helping patients and families understand hearing and speech health.',
      noteTitle: 'Note for the Clinic Team',
      noteDesc: 'These are sample blog posts to demonstrate the layout. To publish real articles, connect to a Supabase database — posts written there will appear here after a rebuild.',
      questionLabel: 'Have a Question?',
      questionTitle: "Don't Wait",
      questionSub: 'Call us today for expert, friendly advice — in Punjabi, Hindi, or English.',
      callBtn: 'Call Now',
      waBtn: 'WhatsApp',
      readMore: 'Read More'
    },
    pa: {
      label: 'ਗਿਆਨ ਕੇਂਦਰ',
      title: 'ਬੋਲਣ ਅਤੇ ਸੁਣਨ ਦੇ ਲੇਖ',
      sub: 'ਸਾਡੀ ਕਲੀਨਿਕਲ ਟੀਮ ਦੇ ਮਾਹਰ ਲੇਖ — ਮਰੀਜ਼ਾਂ ਅਤੇ ਪਰਿਵਾਰਾਂ ਨੂੰ ਸੁਣਨ ਅਤੇ ਬੋਲਣ ਦੀ ਸਿਹਤ ਨੂੰ ਸਮਝਣ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਨ।',
      noteTitle: 'ਕਲੀਨਿਕ ਟੀਮ ਲਈ ਨੋਟ',
      noteDesc: 'ਇਹ ਲੇਖ ਲੇਆਉਟ ਦਿਖਾਉਣ ਲਈ ਨਮੂਨੇ ਵਜੋਂ ਹਨ। ਅਸਲ ਲੇਖ ਪ੍ਰਕਾਸ਼ਿਤ ਕਰਨ ਲਈ, ਸੁਪਾਬੇਸ ਡੇਟਾਬੇਸ ਨਾਲ ਕਨੈਕਟ ਕਰੋ।',
      questionLabel: 'ਕੋਈ ਸਵਾਲ ਹੈ?',
      questionTitle: 'ਦੇਰੀ ਨਾ ਕਰੋ',
      questionSub: 'ਅੱਜ ਹੀ ਮਾਹਰ ਅਤੇ ਦੋਸਤਾਨਾ ਸਲਾਹ ਲਈ ਫ਼ੋਨ ਕਰੋ — ਪੰਜਾਬੀ, ਹਿੰਦੀ, ਜਾਂ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ।',
      callBtn: 'ਹੁਣੇ ਕਾਲ ਕਰੋ',
      waBtn: 'ਵਟਸਐਪ ਕਰੋ',
      readMore: 'ਹੋਰ ਪੜ੍ਹੋ'
    },
    hi: {
      label: 'ज्ञान केंद्र',
      title: 'बोलने और सुनने से जुड़े लेख',
      sub: 'हमारी क्लिनिकल टीम के विशेषज्ञ लेख — रोगियों और परिवारों को सुनने और बोलने के स्वास्थ्य को समझने में मदद करते हैं।',
      noteTitle: 'क्लिनिक टीम के लिए नोट',
      noteDesc: 'ये लेख केवल लेआउट प्रदर्शित करने के लिए नमूने हैं। वास्तविक लेखों को प्रकाशित करने के लिए, सुप्राबेस डेटाबेस से जुड़ें।',
      questionLabel: 'कोई प्रश्न है?',
      questionTitle: 'देरी न करें',
      questionSub: 'विशेषज्ञ और दोस्ताना सलाह के लिए आज ही कॉल करें — पंजाबी, हिंदी या अंग्रेजी में।',
      callBtn: 'अभी कॉल करें',
      waBtn: 'व्हाट्सएप करें',
      readMore: 'और पढ़ें'
    }
  };

  onMount(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
    return () => io.disconnect();
  });
</script>

<svelte:head>
  <title>{t[lang].title} | SRI Speech & Hearing Aid Centre, Ludhiana</title>
  <meta name="description" content={blogMetaDesc[lang]} />

  <!-- Social Open Graph Overrides -->
  <meta property="og:title" content="{t[lang].title} | SRI Speech & Hearing Aid Centre, Ludhiana" />
  <meta property="og:description" content={blogMetaDesc[lang]} />
  <meta name="twitter:title" content="{t[lang].title} | SRI Speech & Hearing Aid Centre, Ludhiana" />
  <meta name="twitter:description" content={blogMetaDesc[lang]} />
</svelte:head>

<section class="sec" style="padding-top: calc(var(--nav-h) + 3rem);">
  <div class="wrap fade-in" style="text-align:center; max-width:680px; margin-inline:auto;">
    <p class="t-label">{t[lang].label}</p>
    <h1 class="t-h2" style="margin:0.75rem 0;">{t[lang].title}</h1>
    <p class="t-body-lg" style="margin-top:1rem;">{t[lang].sub}</p>
  </div>
</section>

<section style="padding-bottom: 4rem;">
  <div class="wrap">
    <div class="g3">
      {#each posts as post, i}
        <article class="card fade-in" style="transition-delay:{i * 60}ms; display:flex; flex-direction:column;">
          <div class="blog-card-top">{@html post.svg}</div>
          <div class="blog-card-body">
            <span class="blog-tag">{post.tag[lang]}</span>
            <h2 class="t-h3" style="margin-bottom:0.75rem; font-weight: 700;">{post.title[lang]}</h2>
            <p class="t-body" style="font-size:0.9375rem; margin-bottom:1.25rem; flex-grow:1;">{post.excerpt[lang]}</p>
            <div class="blog-meta">
              <span>{post.date[lang]} &middot; {post.readTime[lang]}</span>
              <a href={localizeLink(`/blog/${post.id}`, lang)} class="blog-more">{t[lang].readMore} &rarr;</a>
            </div>
          </div>
        </article>
      {/each}
    </div>

    <!-- Supabase note -->
    <div class="card fade-in" style="margin-top:3rem; padding:2rem; background:rgba(123,45,142,0.03);">
      <h3 class="t-h3" style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        {t[lang].noteTitle}
      </h3>
      <p class="t-body">{t[lang].noteDesc}</p>
    </div>
  </div>
</section>

<div class="wrap fade-in" style="padding-bottom:4rem;">
  <div class="cta-b">
    <p class="t-label" style="color:rgba(255,255,255,0.5);">{t[lang].questionLabel}</p>
    <h2 class="t-h2" style="color:white; margin:0.75rem 0 0.5rem;">{t[lang].questionTitle}</h2>
    <p class="t-body" style="color:rgba(255,255,255,0.65); max-width:460px; margin:0 auto;">{t[lang].questionSub}</p>
    <div class="cta-acts">
      <a href="tel:+917986029544" class="btn btn-cream btn-lg">{t[lang].callBtn}</a>
      <a href="https://wa.me/917986029544" class="btn btn-ghost btn-lg">{t[lang].waBtn}</a>
    </div>
  </div>
</div>
