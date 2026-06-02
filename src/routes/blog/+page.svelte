<script lang="ts">
  import { onMount } from 'svelte';

  const posts = [
    { id: 'signs-child-needs-speech-therapy', tag: 'Speech Therapy', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>', title: '5 Signs Your Child May Need Speech Therapy', excerpt: "Many parents wonder if their child's speech development is on track. Here are five clear warning signs.", date: 'May 2025', readTime: '4 min' },
    { id: 'rechargeable-vs-disposable-hearing-aids', tag: 'Hearing Aids', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>', title: 'Rechargeable vs. Disposable Battery Hearing Aids', excerpt: 'We break down the pros, cons, and real-world costs of rechargeable vs. traditional battery-powered devices.', date: 'April 2025', readTime: '5 min' },
    { id: 'what-is-tinnitus', tag: 'Hearing Health', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12.5C5 7 10 4 12 4s7 3 10 8.5C19 17 14 20 12 20S5 17 2 12.5z"/><circle cx="12" cy="12.5" r="3"/></svg>', title: 'What Is Tinnitus? Causes, Symptoms & Treatments', excerpt: 'Ringing in the ears affects 1 in 8 people. We explain what causes tinnitus and which treatments help.', date: 'March 2025', readTime: '6 min' },
    { id: 'stuttering-myths', tag: 'Stuttering', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>', title: '7 Common Myths About Stuttering — Debunked', excerpt: '"He\'ll grow out of it." We bust the most persistent myths about stuttering and explain what science says.', date: 'February 2025', readTime: '5 min' },
    { id: 'cochlear-implant-rehab', tag: 'Cochlear Implant', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>', title: 'Life After a Cochlear Implant: Why Rehab Matters', excerpt: 'Getting a cochlear implant is only half the journey. Post-implant therapy determines outcomes.', date: 'January 2025', readTime: '7 min' },
    { id: 'voice-care-teachers', tag: 'Voice Therapy', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>', title: 'Voice Care for Teachers: 8 Daily Habits', excerpt: 'Teachers use their voice more than almost any profession. Practical habits to prevent vocal fatigue.', date: 'December 2024', readTime: '4 min' },
  ];

  onMount(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
    return () => io.disconnect();
  });
</script>

<svelte:head>
  <title>Blog | SRI Speech & Hearing Aid Centre, Ludhiana</title>
  <meta name="description" content="Expert articles on hearing loss, hearing aids, speech therapy, stuttering, tinnitus, and voice health from SRI Speech & Hearing Clinic, Ludhiana." />
</svelte:head>

<section class="sec" style="padding-top: calc(var(--nav-h) + 3rem);">
  <div class="wrap fade-in" style="text-align:center; max-width:680px; margin-inline:auto;">
    <p class="t-label">Knowledge Hub</p>
    <h1 class="t-h2" style="margin:0.75rem 0;">Speech & Hearing Insights</h1>
    <p class="t-body-lg" style="margin-top:1rem;">Expert articles from our clinical team — helping patients and families understand hearing and speech health.</p>
  </div>
</section>

<section style="padding-bottom: 4rem;">
  <div class="wrap">
    <div class="g3">
      {#each posts as post, i}
        <article class="card fade-in" style="transition-delay:{i * 60}ms; display:flex; flex-direction:column;">
          <div class="blog-card-top">{@html post.svg}</div>
          <div class="blog-card-body">
            <span class="blog-tag">{post.tag}</span>
            <h2 class="t-h3" style="margin-bottom:0.75rem;">{post.title}</h2>
            <p class="t-body" style="font-size:0.9375rem; margin-bottom:1.25rem; flex-grow:1;">{post.excerpt}</p>
            <div class="blog-meta">
              <span>{post.date} &middot; {post.readTime}</span>
              <a href="/blog/{post.id}" class="blog-more">Read More &rarr;</a>
            </div>
          </div>
        </article>
      {/each}
    </div>

    <!-- Supabase note -->
    <div class="card fade-in" style="margin-top:3rem; padding:2rem; background:rgba(27,67,50,0.03);">
      <h3 class="t-h3" style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        Note for the Clinic Team
      </h3>
      <p class="t-body">These are sample blog posts to demonstrate the layout. To publish real articles, connect to a Supabase database — posts written there will appear here after a rebuild.</p>
    </div>
  </div>
</section>

<div class="wrap fade-in" style="padding-bottom:4rem;">
  <div class="cta-b">
    <p class="t-label" style="color:rgba(255,255,255,0.5);">Have a Question?</p>
    <h2 class="t-h2" style="color:white; margin:0.75rem 0 0.5rem;">Don't Wait</h2>
    <p class="t-body" style="color:rgba(255,255,255,0.65); max-width:460px; margin:0 auto;">Call us today for expert, friendly advice — in Punjabi, Hindi, or English.</p>
    <div class="cta-acts">
      <a href="tel:+917986029544" class="btn btn-cream btn-lg">Call Now</a>
      <a href="https://wa.me/917986029544" class="btn btn-ghost btn-lg">WhatsApp</a>
    </div>
  </div>
</div>
