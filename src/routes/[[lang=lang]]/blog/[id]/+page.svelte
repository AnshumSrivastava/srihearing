<script lang="ts">
  import { getContext } from 'svelte';
  import { page } from '$app/stores';
  import { posts } from '$lib/blogData';
  import { localizeLink, getLangUrl } from '$lib';


  const ctx = getContext<{ lang: 'en' | 'pa' | 'hi' }>('lang');
  let lang = $derived(ctx?.lang ?? 'en');

  let post = $derived(posts.find(p => p.id === $page.params.id));

  const t = {
    en: { back: 'Back to Blog', notFound: 'Post Not Found', notFoundDesc: 'Sorry, the article you are looking for does not exist.' },
    pa: { back: 'ਬਲੌਗ ਤੇ ਵਾਪਸ ਜਾਓ', notFound: 'ਲੇਖ ਨਹੀਂ ਮਿਲਿਆ', notFoundDesc: 'ਮਾਫ਼ ਕਰਨਾ, ਜਿਹੜਾ ਲੇਖ ਤੁਸੀਂ ਲੱਭ ਰਹੇ ਹੋ ਉਹ ਮੌਜੂਦ ਨਹੀਂ ਹੈ।' },
    hi: { back: 'ब्लॉग पर वापस जाएं', notFound: 'लेख नहीं मिला', notFoundDesc: 'क्षमा करें, आप जो लेख ढूंढ रहे हैं वह मौजूद नहीं है।' }
  };
</script>

<svelte:head>
  {#if post}
    <title>{post.title[lang]} | SRI Speech & Hearing Clinic</title>
    <meta name="description" content={post.excerpt[lang]} />
    
    <!-- Localized OG Overrides -->
    <meta property="og:title" content="{post.title[lang]} | SRI Speech & Hearing Clinic" />
    <meta property="og:description" content={post.excerpt[lang]} />
    <meta name="twitter:title" content="{post.title[lang]} | SRI Speech & Hearing Clinic" />
    <meta name="twitter:description" content={post.excerpt[lang]} />

    <!-- Schema.org BlogPosting JSON-LD -->
    {@html `<script type="application/ld+json">
      ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://www.srihearing.in${getLangUrl(`/blog/${post.id}`, lang)}`
        },
        "headline": post.title[lang],
        "description": post.excerpt[lang],
        "image": "https://www.srihearing.in/logo.png",
        "datePublished": post.date[lang],
        "author": {
          "@type": "Organization",
          "name": "SRI Speech & Hearing Clinic",
          "url": "https://www.srihearing.in"
        },
        "publisher": {
          "@type": "Organization",
          "name": "SRI Speech & Hearing Clinic",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.srihearing.in/logo.png"
          }
        }
      })}
    </script>`}
  {:else}
    <title>Post Not Found | SRI Clinic</title>
  {/if}
</svelte:head>

<section class="sec" style="padding-top: calc(var(--nav-h) + 3rem); min-height: 70vh;">
  <div class="wrap" style="max-width: 800px; margin-inline: auto;">
    <div style="margin-bottom: 2rem;">
      <a href={localizeLink('/blog', lang)} class="btn btn-outline" style="min-height: 40px; padding: 0.5rem 1.25rem; font-size: 0.875rem;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px;"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        {t[lang].back}
      </a>
    </div>

    {#if post}
      <article>
        <div style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 1rem;">
          <span class="blog-tag" style="margin-bottom: 0;">{post.tag[lang]}</span>
          <span style="color: var(--muted); font-size: 0.875rem;">&bull;</span>
          <span style="color: var(--muted); font-size: 0.875rem;">{post.date[lang]} &bull; {post.readTime[lang]}</span>
        </div>
        
        <h1 class="t-h2" style="font-size: clamp(2rem, 4.5vw, 3rem); margin-bottom: 2rem; line-height: 1.15; font-weight: 800;">
          {post.title[lang]}
        </h1>

        <div class="card" style="padding: clamp(1.5rem, 4vw, 2.5rem); margin-bottom: 3rem; background: var(--white); box-shadow: var(--sh-sm);">
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            {#each post.content[lang] as paragraph}
              <p class="t-body" style="font-size: 1.0625rem; line-height: 1.8;">
                {paragraph}
              </p>
            {/each}
          </div>
        </div>
      </article>
    {:else}
      <div style="text-align: center; padding: 4rem 1.5rem;">
        <h2 class="t-h2">{t[lang].notFound}</h2>
        <p class="t-body" style="margin-top: 1rem; margin-bottom: 2rem;">{t[lang].notFoundDesc}</p>
        <a href={localizeLink('/blog', lang)} class="btn btn-green">{t[lang].back}</a>
      </div>
    {/if}
  </div>
</section>
