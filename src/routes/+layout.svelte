<script lang="ts">
  import type { Snippet } from 'svelte';
  let { children }: { children: Snippet } = $props();
  import '../app.css';
  import { onMount, setContext } from 'svelte';

  let mobileOpen = $state(false);
  let scrolled = $state(false);
  let lang = $state<'en' | 'pa' | 'hi'>('en');
  let langOpen = $state(false);
  let mapOpen = $state(false);
  let langRef: HTMLElement;

  onMount(() => {
    const onScroll = () => { scrolled = window.scrollY > 10; };
    const onClick = (e: MouseEvent) => { if (langRef && !langRef.contains(e.target as Node)) langOpen = false; };
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', onClick);
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); document.removeEventListener('click', onClick); };
  });

  function pick(l: 'en' | 'pa' | 'hi') { lang = l; langOpen = false; mobileOpen = false; }
  setContext('lang', { get lang() { return lang; } });

  const t = {
    en: { nav: ['Home', 'Services', 'About', 'Blog', 'Contact'], links: ['/', '/services', '/#about', '/blog', '/#contact'], call: 'Call Now' },
    pa: { nav: ['ਘਰ', 'ਸੇਵਾਵਾਂ', 'ਸਾਡੇ ਬਾਰੇ', 'ਬਲੌਗ', 'ਸੰਪਰਕ'], links: ['/', '/services', '/#about', '/blog', '/#contact'], call: 'ਕਾਲ ਕਰੋ' },
    hi: { nav: ['होम', 'सेवाएं', 'हमारे बारे में', 'ब्लॉग', 'संपर्क'], links: ['/', '/services', '/#about', '/blog', '/#contact'], call: 'कॉल करें' },
  };
  const langNames: Record<string, string> = { en: 'English', pa: 'ਪੰਜਾਬੀ', hi: 'हिंदी' };
  const wa = '917986029544';
  const waMsg = encodeURIComponent('Hello, I would like to book an appointment at SRI Speech & Hearing Clinic.');

</script>

<!-- Navbar -->
<nav class="nav" class:scrolled>
  <div class="wrap nav-inner">
    <a href="/" class="logo">
      <img src="/logo.png" alt="SRI" class="logo-img" />
      <div><span class="logo-name">SRI Speech & Hearing</span><span class="logo-sub">Ludhiana, Punjab</span></div>
    </a>

    <ul class="nav-links">
      {#each t[lang].nav as label, i}<li><a href={t[lang].links[i]}>{label}</a></li>{/each}
    </ul>

    <div class="nav-right">
      <div class="lang-w" bind:this={langRef}>
        <button class="lang-btn" onclick={() => langOpen = !langOpen}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          {langNames[lang]}
          <svg class="lang-chev" class:open={langOpen} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        {#if langOpen}
          <div class="lang-menu">
            {#each (['en','pa','hi'] as const) as l}<button class:active={lang===l} onclick={() => pick(l)}>{langNames[l]}</button>{/each}
          </div>
        {/if}
      </div>

      <a href="tel:+917986029544" class="btn btn-green">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.8.36 1.58.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c1.23.34 2.01.58 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        {t[lang].call}
      </a>

      <button class="hamburger" onclick={() => mobileOpen = true} aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </div>
</nav>

<!-- Mobile -->
{#if mobileOpen}
<div class="mob-ov">
  <button class="mob-close" onclick={() => mobileOpen = false} aria-label="Close">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  </button>
  {#each t[lang].nav as label, i}<a href={t[lang].links[i]} onclick={() => mobileOpen = false}>{label}</a>{/each}
  <div style="display:flex; gap:0.5rem; margin-top:1rem;">
    {#each (['en','pa','hi'] as const) as l}
      <button class="btn" class:btn-green={lang===l} class:btn-outline={lang!==l} style="padding:0.5rem 1rem; min-height:40px; font-size:0.875rem;" onclick={() => pick(l)}>{langNames[l]}</button>
    {/each}
  </div>
  <a href="tel:+917986029544" class="btn btn-green btn-lg" style="margin-top:0.5rem;">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.8.36 1.58.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c1.23.34 2.01.58 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    {t[lang].call}
  </a>
</div>
{/if}

{@render children()}

<!-- Footer -->
<footer class="footer">
  <div class="wrap">
    <div class="ft-grid">
      <div class="ft-brand">
        <div class="ft-logo">
          <img src="/logo.png" alt="SRI" class="ft-logo-img" />
          <div><span class="ft-logo-name">SRI Speech & Hearing</span><br><span class="ft-logo-sub">Ludhiana, Punjab</span></div>
        </div>
        <p>Trusted speech therapy and hearing aid services in Ludhiana. Serving patients of all ages with compassion and clinical expertise.</p>
      </div>
      <div class="ft-col"><h4>Services</h4><ul>
        <li><a href="/services#hearing-aids">Hearing Aids</a></li>
        <li><a href="/services#speech-therapy">Speech Therapy</a></li>
        <li><a href="/services#audiological-eval">Audiometry</a></li>
        <li><a href="/services#voice">Voice Therapy</a></li>
        <li><a href="/services#tinnitus">Tinnitus Care</a></li>
      </ul></div>
      <div class="ft-col"><h4>Quick Links</h4><ul>
        <li><a href="/">Home</a></li>
        <li><a href="/#about">About Us</a></li>
        <li><a href="/services">All Services</a></li>
        <li><a href="/blog">Blog</a></li>
      </ul></div>
      <div class="ft-col"><h4>Contact</h4><ul>
        <li><a href="tel:+917986029544">+91 7986 029 544</a></li>
        <li><a href="https://wa.me/{wa}" target="_blank" rel="noopener noreferrer">WhatsApp Us</a></li>
        <li><a href="https://maps.google.com/?q=SRI+Speech+Hearing+Ludhiana" target="_blank" rel="noopener noreferrer">Get Directions</a></li>
      </ul></div>
    </div>
    <div class="ft-btm">
      <span>&copy; {new Date().getFullYear()} SRI Speech & Hearing Aid Centre. All rights reserved.</span>
      <span>Near ESI Hospital, Model Gram, Ludhiana, Punjab 141001</span>
    </div>
  </div>
</footer>

<!-- FAB buttons -->
<div class="fab-stack">
  <button class="fab fab-map" onclick={() => mapOpen = !mapOpen} aria-label="Find us on map">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  </button>
  <a href="https://wa.me/{wa}?text={waMsg}" class="fab fab-wa" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
</div>

<!-- Map popup -->
{#if mapOpen}
<div class="map-overlay" onclick={() => mapOpen = false}>
  <div class="map-popup" onclick={(e) => e.stopPropagation()}>
    <div class="map-popup-header">
      <h3>Find Us</h3>
      <button class="map-popup-close" onclick={() => mapOpen = false} aria-label="Close map">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3423.506959877165!2d75.8407722!3d30.900450799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a83d4f541dc67%3A0x97a616df873274d5!2sSri%20Speech%20%26%20Hearing%20Aid%20Centre%20%7C%20Speech%20Therapy%20%7C%20Rechargeable%20hearing%20aid%20%7C%20CIC%20digital%20hearing%20aid!5e0!3m2!1sen!2sin!4v1780353381215!5m2!1sen!2sin"
      width="100%" height="100%" style="border:0; border-radius: 0 0 16px 16px;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"
      title="SRI Speech & Hearing Clinic Location"
    ></iframe>
    <div class="map-popup-footer">
      <p>Near ESI Hospital, Model Gram, Ludhiana, Punjab 141001</p>
      <a href="https://maps.google.com/?q=SRI+Speech+Hearing+Ludhiana" target="_blank" rel="noopener noreferrer" class="btn btn-green">Get Directions</a>
    </div>
  </div>
</div>
{/if}
