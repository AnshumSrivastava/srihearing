<script lang="ts">
  import { onMount, getContext } from 'svelte';
  import { localizeLink, getLangUrl } from '$lib';
  const ctx = getContext<{ lang: 'en' | 'pa' | 'hi' }>('lang');
  let lang = $derived(ctx?.lang ?? 'en');

  const serviceMetaDesc = {
    en: 'Comprehensive speech therapy and hearing aid services in Ludhiana — hearing aids, speech therapy, audiological evaluation, voice therapy, tinnitus management, cochlear rehab.',
    pa: 'ਲੁਧਿਆਣਾ ਵਿੱਚ ਸੁਣਨ ਅਤੇ ਬੋਲਣ ਦੀ ਮੁਕੰਮਲ ਦੇਖਭਾਲ: ਹੀਅਰਿੰਗ ਏਡ, ਬੱਚਿਆਂ ਦੀ ਸਪੀਚ ਥੈਰੇਪੀ, ਆਡੀਓਮੈਟਰੀ, ਆਵਾਜ਼ ਥੈਰੇਪੀ, ਟਿੰਨੀਟਸ ਪ੍ਰਬੰਧਨ ਅਤੇ ਕੋਕਲੀਅਰ ਇਮਪਲਾਂਟ ਰੀਹੈਬ।',
    hi: 'लुधियाना में श्रवण और वाक् की पूर्ण देखभाल: हियरिंग एड, बच्चों की स्पीच थेरेपी, ऑडियोमेट्री, वॉयस थेरेपी, टिनिटस प्रबंधन और कॉक्लियर इम्प्लांट रिहैब।'
  };


  const t = {
    en: {
      label: 'Our Services',
      title: 'Complete Speech & Hearing Care',
      sub: "Everything from hearing tests to children's speech therapy — under one expert roof in Ludhiana, Punjab.",
      bookBtn: 'Book Appointment',
      guidanceLabel: 'Need Guidance?',
      guidanceTitle: 'Not Sure Which Service You Need?',
      guidanceSub: "Call us for a free 10-minute consultation. We'll guide you to the right specialist.",
      guidanceCall: 'Call +91 79860 29544',
      guidanceWa: 'WhatsApp Us'
    },
    pa: {
      label: 'ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ',
      title: 'ਸੁਣਨ ਅਤੇ ਬੋਲਣ ਦੀ ਮੁਕੰਮਲ ਦੇਖਭਾਲ',
      sub: 'ਸੁਣਨ ਦੀ ਜਾਂਚ ਤੋਂ ਲੈ ਕੇ ਬੱਚਿਆਂ ਦੀ ਸਪੀਚ ਥੈਰੇਪੀ ਤੱਕ — ਲੁਧਿਆਣਾ, ਪੰਜਾਬ ਵਿੱਚ ਇੱਕੋ ਛੱਤ ਹੇਠ ਸਭ ਕੁਝ।',
      bookBtn: 'ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ',
      guidanceLabel: 'ਮਾਰਗਦਰਸ਼ਨ ਚਾਹੀਦਾ ਹੈ?',
      guidanceTitle: 'ਸਮਝ ਨਹੀਂ ਆ ਰਿਹਾ ਕਿ ਕਿਹੜੀ ਸੇਵਾ ਦੀ ਲੋੜ ਹੈ?',
      guidanceSub: 'ਮੁਫ਼ਤ 10 ਮਿੰਟ ਦੀ ਸਲਾਹ ਲਈ ਸਾਨੂੰ ਫ਼ੋਨ ਕਰੋ। ਅਸੀਂ ਤੁਹਾਨੂੰ ਸਹੀ ਮਾਹਰ ਕੋਲ ਭੇਜਾਂਗੇ।',
      guidanceCall: 'ਕਾਲ ਕਰੋ +91 79860 29544',
      guidanceWa: 'ਵਟਸਐਪ ਕਰੋ'
    },
    hi: {
      label: 'हमारी सेवाएं',
      title: 'श्रवण और वाक् की पूर्ण देखभाल',
      sub: 'सुनने की जांच से लेकर बच्चों की स्पीच थेरेपी तक — लुधियाना, पंजाब में एक ही छत के नीचे सब कुछ।',
      bookBtn: 'अपॉइंटमेंट बुक करें',
      guidanceLabel: 'मार्गदर्शन चाहिए?',
      guidanceTitle: 'समझ नहीं आ रहा कि किस सेवा की आवश्यकता है?',
      guidanceSub: 'मुफ्त 10 मिनट के परामर्श के लिए हमें कॉल करें। हम आपको सही विशेषज्ञ के पास भेजेंगे।',
      guidanceCall: 'कॉल करें +91 79860 29544',
      guidanceWa: 'व्हाट्सएप करें'
    }
  };

  const services = [
    {
      id: 'hearing-aids',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
      title: { en: 'Hearing Aids', pa: 'ਹੀਅਰਿੰਗ ਏਡ', hi: 'हियरिंग एड' },
      image: '/images/hearing_aid.png',
      desc: {
        en: 'We offer a comprehensive range of hearing aids to suit every lifestyle and budget — from discreet CIC models to powerful BTE devices. All prescribed after thorough audiological evaluation.',
        pa: 'ਅਸੀਂ ਹਰ ਜੀਵਨ ਸ਼ੈਲੀ ਅਤੇ ਬਜਟ ਦੇ ਅਨੁਕੂਲ ਹੀਅਰਿੰਗ ਏਡਜ਼ ਦੀ ਇੱਕ ਵਿਸ਼ਾਲ ਸ਼੍ਰੇਣੀ ਪੇਸ਼ ਕਰਦੇ ਹਾਂ — ਛੋਟੇ ਸੀ.ਆਈ.ਸੀ. (CIC) ਮਾਡਲਾਂ ਤੋਂ ਲੈ ਕੇ ਸ਼ਕਤੀਸ਼ਾਲੀ ਬੀ.ਟੀ.ਈ. (BTE) ਉਪਕਰਣਾਂ ਤੱਕ।',
        hi: 'हम हर जीवनशैली और बजट के अनुकूल हियरिंग एड्स की एक विस्तृत श्रृंखला प्रदान करते हैं — विवेकपूर्ण सीआईसी (CIC) मॉडल से लेकर शक्तिशाली बीटीई (BTE) उपकरणों तक।'
      },
      bullets: {
        en: ['Rechargeable hearing aids — no tiny batteries', 'Invisible CIC (Completely-In-Canal) models', 'BTE & RIC for severe hearing loss', 'Digital signal processing for natural sound', 'Trial periods available on all models', 'All leading brands stocked and serviced'],
        pa: ['ਰਿਚਾਰਜਯੋਗ ਹੀਅਰਿੰਗ ਏਡਜ਼ — ਛੋਟੀਆਂ ਬੈਟਰੀਆਂ ਦੀ ਕੋਈ ਲੋੜ ਨਹੀਂ', 'ਅਦਿੱਖ ਸੀ.ਆਈ.ਸੀ. (ਕੰਨ ਦੇ ਅੰਦਰ) ਮਾਡਲ', 'ਗੰਭੀਰ ਸੁਣਨ ਸ਼ਕਤੀ ਦੇ ਨੁਕਸਾਨ ਲਈ BTE ਅਤੇ RIC', 'ਕੁਦਰਤੀ ਆਵਾਜ਼ ਲਈ ਡਿਜੀਟਲ ਸਿਗਨਲ ਪ੍ਰੋਸੈਸਿੰਗ', 'ਸਾਰੇ ਮਾਡਲਾਂ ‘ਤੇ ਟ੍ਰਾਇਲ ਪੀਰੀਅਡ ਉਪਲਬਧ ਹੈ', 'ਸਾਰੇ ਪ੍ਰਮੁੱਖ ਬ੍ਰਾਂਡ ਉਪਲਬਧ ਹਨ'],
        hi: ['रिचार्जेबल हियरिंग एड्स — छोटी बैटरियों की कोई झंझट नहीं', 'अदृश्य सीआईसी (कान के अंदर) मॉडल', 'गंभीर सुनवाई हानि के लिए बीटीई और आरआईसी', 'प्राकृतिक ध्वनि के लिए डिजिटल सिग्नल प्रोसेसिंग', 'सभी मॉडलों पर परीक्षण अवधि (ट्रायल) उपलब्ध', 'सभी प्रमुख ब्रांड उपलब्ध और सर्विस किए जाते हैं']
      },
      rev: false,
    },
    {
      id: 'speech-therapy',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
      title: { en: 'Speech Therapy for Children', pa: 'ਬੱਚਿਆਂ ਲਈ ਬੋਲਣ ਦੀ ਥੈਰੇਪੀ', hi: 'बच्चों के लिए स्पीच थेरेपी' },
      image: '/images/speech_therapy.png',
      desc: {
        en: 'Children with delayed speech, articulation errors, or language disorders thrive with our play-based, evidence-backed therapy conducted by certified speech-language pathologists.',
        pa: 'ਬੋਲਣ ਵਿੱਚ ਦੇਰੀ, ਉਚਾਰਨ ਦੀਆਂ ਗਲਤੀਆਂ, ਜਾਂ ਭਾਸ਼ਾ ਦੇ ਵਿਕਾਰਾਂ ਵਾਲੇ ਬੱਚੇ ਸਾਡੇ ਪ੍ਰਮਾਣਿਤ ਸਪੀਚ ਥੈਰੇਪਿਸਟਾਂ ਦੁਆਰਾ ਦਿੱਤੀ ਜਾਂਦੀ ਖੇਡ-ਅਧਾਰਿਤ ਥੈਰੇਪੀ ਨਾਲ ਬਹੁਤ ਜਲਦੀ ਸਿੱਖਦੇ ਹਨ।',
        hi: 'बोलने में देरी, उच्चारण त्रुटियों, या भाषा विकारों वाले बच्चे हमारे प्रमाणित स्पीच थेरेपी विशेषज्ञों द्वारा आयोजित खेल-आधारित थेरेपी से बहुत आगे बढ़ते हैं।'
      },
      bullets: {
        en: ['Delayed speech and language development', 'Articulation and phonological disorders', 'Autism spectrum communication support', 'Cleft palate speech rehabilitation', 'Bilingual therapy (Punjabi/Hindi/English)', 'Parent guidance and home exercise programs'],
        pa: ['ਬੋਲਣ ਅਤੇ ਭਾਸ਼ਾ ਦੇ ਵਿਕਾਸ ਵਿੱਚ ਦੇਰੀ', 'ਉਚਾਰਨ ਅਤੇ ਧੁਨੀ ਸੰਬੰਧੀ ਵਿਕਾਰ', 'ਔਟਿਜ਼ਮ ਸਪੈਕਟ੍ਰਮ ਸੰਚਾਰ ਸਹਾਇਤਾ', 'ਕੱਟੇ ਹੋਏ ਤਾਲੂ ਦੀ ਸਪੀਚ ਰੀਹੈਬਲੀਟੇਸ਼ਨ', 'ਦੋਭਾਸ਼ੀ ਥੈਰੇਪੀ (ਪੰਜਾਬੀ/ਹਿੰਦੀ/ਅੰਗਰੇਜ਼ੀ)', 'ਮਾਪਿਆਂ ਲਈ ਮਾਰਗਦਰਸ਼ਨ ਅਤੇ ਘਰੇਲੂ ਕਸਰਤ ਪ੍ਰੋਗਰਾਮ'],
        hi: ['बोलने और भाषा के विकास में देरी', 'उच्चारण और ध्वनि संबंधी विकार', 'ऑटिज्म स्पेक्ट्रम संचार सहायता', 'कटे हुए तालू का वाक् पुनर्वास', 'द्विभाषी थेरेपी (पंजाबी/हिंदी/अंग्रेजी)', 'अभिभावक मार्गदर्शन और घरेलू व्यायाम कार्यक्रम']
      },
      rev: true,
    },
    {
      id: 'audiological-eval',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
      title: { en: 'Audiological Evaluation', pa: 'ਆਡੀਓਲੌਜੀਕਲ ਮੁਲਾਂਕਣ', hi: 'ऑडियोलॉजिकल मूल्यांकन' },
      image: '/images/hero_clinic.png',
      desc: {
        en: 'A complete hearing assessment is the first step to better hearing. Our clinic is equipped with state-of-the-art testing equipment for accurate diagnosis.',
        pa: 'ਸੁਣਨ ਸ਼ਕਤੀ ਦਾ ਮੁਕੰਮਲ ਮੁਲਾਂਕਣ ਬਿਹਤਰ ਸੁਣਨ ਵੱਲ ਪਹਿਲਾ ਕਦਮ ਹੈ। ਸਾਡਾ ਕਲੀਨਿਕ ਸਹੀ ਨਿਦਾਨ ਲਈ ਆਧੁਨਿਕ ਜਾਂਚ ਉਪਕਰਣਾਂ ਨਾਲ ਲੈਸ ਹੈ।',
        hi: 'सुनने की क्षमता का पूर्ण मूल्यांकन बेहतर सुनने की दिशा में पहला कदम है। हमारा क्लिनिक सटीक निदान के लिए आधुनिक परीक्षण उपकरणों से लैस है।'
      },
      bullets: {
        en: ['Pure Tone Audiometry (PTA)', 'Speech Audiometry & Word Recognition Score', 'Tympanometry & Middle Ear Testing', 'OAE for newborns', 'BERA testing', 'Pediatric & adult protocols'],
        pa: ['ਪਿਊਰ ਟੋਨ ਆਡੀਓਮੈਟਰੀ (PTA)', 'ਸਪੀਚ ਆਡੀਓਮੈਟਰੀ ਅਤੇ ਵਰਡ ਰੈਕੋਗਨੀਸ਼ਨ', 'ਟੈਂਪਨੋਮੈਟਰੀ ਅਤੇ ਮੱਧ ਕੰਨ ਦੀ ਜਾਂਚ', 'ਨਵਜੰਮੇ ਬੱਚਿਆਂ ਲਈ OAE', 'BERA ਟੈਸਟਿੰਗ', 'ਬੱਚਿਆਂ ਅਤੇ ਬਾਲਗਾਂ ਲਈ ਵਿਸ਼ੇਸ਼ ਟੈਸਟ'],
        hi: ['प्योर टोन ऑडियोमेट्री (PTA)', 'स्पीच ऑडियोमेट्री और वर्ड रिकग्निशन', 'टाइम्पैनोमेट्री और मध्य कान का परीक्षण', 'नवजात शिशुओं के लिए OAE', 'BERA परीक्षण', 'बच्चों और वयस्कों के लिए विशेष प्रोटोकॉल']
      },
      rev: false,
    },
    {
      id: 'voice',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>',
      title: { en: 'Voice Therapy', pa: 'ਆਵਾਜ਼ ਥੈਰੇਪੀ', hi: 'वॉइस थेरेपी' },
      image: '/images/about_team.png',
      desc: {
        en: 'Hoarseness, vocal fatigue, or voice loss can affect teachers, singers, and professionals. Our specialists rehabilitate all voice disorders.',
        pa: 'ਆਵਾਜ਼ ਦਾ ਬੈਠਣਾ, ਵੋਕਲ ਥਕਾਵਟ, ਜਾਂ ਆਵਾਜ਼ ਦਾ ਚਲੇ ਜਾਣਾ ਅਧਿਆਪਕਾਂ, ਗਾਇਕਾਂ ਅਤੇ ਪੇਸ਼ੇਵਰਾਂ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰ ਸਕਦਾ ਹੈ। ਸਾਡੇ ਮਾਹਰ ਸਾਰੇ ਆਵਾਜ਼ ਵਿਕਾਰਾਂ ਦਾ ਇਲਾਜ ਕਰਦੇ ਹਨ।',
        hi: 'आवाज का बैठना, वोकल थकान, या आवाज का चले जाना शिक्षकों, गायकों और पेशेवरों को प्रभावित कर सकता है। हमारे विशेषज्ञ सभी आवाज विकारों का उपचार करते हैं।'
      },
      bullets: {
        en: ['Vocal nodules & polyp management', 'Puberphonia treatment', 'Professional voice care for teachers', 'Laryngeal cancer voice rehab', 'Resonance and pitch therapy', 'Vocal hygiene counselling'],
        pa: ['ਵੋਕਲ ਨੋਡਿਊਲਜ਼ ਅਤੇ ਪੋਲਿਪ ਪ੍ਰਬੰਧਨ', 'ਪਿਊਬਰਫੋਨੀਆ (ਜ਼ਨਾਨੀ ਆਵਾਜ਼) ਦਾ ਇਲਾਜ', 'ਅਧਿਆਪਕਾਂ ਲਈ ਪੇਸ਼ੇਵਰ ਆਵਾਜ਼ ਦੀ ਦੇਖਭਾਲ', 'ਲੈਰੀਨਜਿਅਲ ਕੈਂਸਰ ਤੋਂ ਬਾਅਦ ਆਵਾਜ਼ ਦਾ ਮੁੜ-ਵਿਕਾਸ', 'ਰੇਜ਼ੋਨੈਂਸ ਅਤੇ ਪਿੱਚ ਥੈਰੇਪੀ', 'ਵੋਕਲ ਹਾਈਜੀਨ ਕਾਉਂਸਲਿੰਗ'],
        hi: ['वोकल नोड्यूल्स और पॉलिप प्रबंधन', 'प्यूबरफोनिया (पतली आवाज) का उपचार', 'शिक्षकों के लिए पेशेवर आवाज की देखभाल', 'लैरिंगियल कैंसर के बाद आवाज का पुनर्वास', 'रेजोनेंस और पिच थेरेपी', 'वोकल हाइजीन काउंसलिंग']
      },
      rev: true,
    },
    {
      id: 'stuttering',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
      title: { en: 'Stuttering & Fluency', pa: 'ਹਕਲਾਹਟ ਥੈਰੇਪੀ', hi: 'हकलाहट थेरेपी' },
      image: '/images/speech_therapy.png',
      desc: {
        en: 'Stuttering can profoundly affect confidence. We use the Lidcombe Program for children and evidence-based techniques for adults.',
        pa: 'ਹਕਲਾਉਣਾ ਆਤਮਵਿਸ਼ਵਾਸ ਨੂੰ ਬਹੁਤ ਪ੍ਰਭਾਵਿਤ ਕਰ ਸਕਦਾ ਹੈ। ਅਸੀਂ ਬੱਚਿਆਂ ਲਈ ਲਿਡਕੌਂਬ ਪ੍ਰੋਗਰਾਮ ਅਤੇ ਬਾਲਗਾਂ ਲਈ ਵਿਗਿਆਨਕ ਤਕਨੀਕਾਂ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਾਂ।',
        hi: 'हकलाना आत्मविश्वास को गहराई से प्रभावित कर सकता है। हम बच्चों के लिए लिडकॉम्ब प्रोग्राम और वयस्कों के लिए विज्ञान आधारित तकनीकों का उपयोग करते हैं।'
      },
      bullets: {
        en: ['Lidcombe Program for young children', 'Fluency shaping for adults', 'Stuttering modification & acceptance', 'Confidence & public speaking coaching', 'Group therapy available', 'Telehealth sessions on request'],
        pa: ['ਛੋਟੇ ਬੱਚਿਆਂ ਲਈ ਲਿਡਕੌਂਬ ਪ੍ਰੋਗਰਾਮ', 'ਬਾਲਗਾਂ ਲਈ ਫਲੂਐਂਸੀ ਸ਼ੇਪਿੰਗ', 'ਹਕਲਾਹਟ ਸੋਧ ਅਤੇ ਸਵੀਕਾਰਤਾ', 'ਆਤਮਵਿਸ਼ਵਾਸ ਅਤੇ ਪਬਲਿਕ ਸਪੀਕਿੰਗ ਕੋਚਿੰਗ', 'ਗਰੁੱਪ ਥੈਰੇਪੀ ਉਪਲਬਧ', 'ਬੇਨਤੀ ‘ਤੇ ਆਨਲਾਈਨ ਸੈਸ਼ਨ'],
        hi: ['छोटे बच्चों के लिए लिडकॉम्ब प्रोग्राम', 'वयस्कों के लिए प्रवाह (फ्लूएंसी) शेपिंग', 'हकलाहट संशोधन और स्वीकार्यता', 'आत्मविश्वास और पब्लिक स्पीकिंग कोचिंग', 'ग्रुप थेरेपी उपलब्ध', 'अनुरोध पर ऑनलाइन सत्र']
      },
      rev: false,
    },
    {
      id: 'tinnitus',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12.5C5 7 10 4 12 4s7 3 10 8.5C19 17 14 20 12 20S5 17 2 12.5z"/><circle cx="12" cy="12.5" r="3"/></svg>',
      title: { en: 'Tinnitus Management', pa: 'ਟਿੰਨੀਟਸ ਪ੍ਰਬੰਧਨ', hi: 'टिनिटस प्रबंधन' },
      image: '/images/hearing_aid.png',
      desc: {
        en: 'Constant ringing or buzzing in the ears can be debilitating. We offer sound therapy, hearing aids with masking features, and counselling.',
        pa: 'ਕੰਨਾਂ ਵਿੱਚ ਲਗਾਤਾਰ ਘੰਟੀ ਵੱਜਣਾ ਜਾਂ ਗੂੰਜਣਾ ਬਹੁਤ ਪਰੇਸ਼ਾਨ ਕਰ ਸਕਦਾ ਹੈ। ਅਸੀਂ ਸਾਊਂਡ ਥੈਰੇਪੀ, ਮਾਸਕਿੰਗ ਵਾਲੇ ਹੀਅਰਿੰਗ ਏਡਜ਼ ਅਤੇ ਕਾਉਂਸਲਿੰਗ ਪੇਸ਼ ਕਰਦੇ ਹਾਂ।',
        hi: 'कानों में लगातार घंटी बजना या गूंजना बहुत परेशान कर सकता है। हम साउंड थेरेपी, मास्किंग वाले हियरिंग एड्स और काउंसलिंग प्रदान करते हैं।'
      },
      bullets: {
        en: ['Tinnitus Retraining Therapy (TRT)', 'Sound masking strategies', 'Hearing aids with tinnitus masker', 'Psychological impact support', 'Lifestyle counselling', 'Long-term management plan'],
        pa: ['ਟਿੰਨੀਟਸ ਰੀਟ੍ਰੇਨਿੰਗ ਥੈਰੇਪੀ (TRT)', 'ਸਾਊਂਡ ਮਾਸਕਿੰਗ ਰਣਨੀਤੀਆਂ', 'ਟਿੰਨੀਟਸ ਮਾਸਕਰ ਵਾਲੇ ਹੀਅਰਿੰਗ ਏਡਜ਼', 'ਮਾਨਸਿਕ ਪ੍ਰਭਾਵ ਲਈ ਸਹਾਇਤਾ', 'ਜੀਵਨ ਸ਼ੈਲੀ ਕਾਉਂਸਲਿੰਗ', 'ਲੰਬੇ ਸਮੇਂ ਦੀ ਪ੍ਰਬੰਧਨ ਯੋਜਨਾ'],
        hi: ['टिनिटस रिट्रेनिंग थेरेपी (TRT)', 'साउंड मास्किंग रणनीतियाँ', 'टिनिटस मास्कर वाले हियरिंग एड्स', 'मानसिक प्रभाव के लिए सहायता', 'जीवन शैली परामर्श', 'दीर्घकालिक प्रबंधन योजना']
      },
      rev: true,
    },
    {
      id: 'cochlear',
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
      title: { en: 'Cochlear Implant Rehab', pa: 'ਕੋਕਲੀਅਰ ਇਮਪਲਾਂਟ ਰੀਹੈਬ', hi: 'कॉक्लियर इम्प्लांट रिहैब' },
      image: '/images/hero_clinic.png',
      desc: {
        en: 'A cochlear implant is just the beginning. Post-implant auditory-verbal therapy is crucial for the brain to learn to interpret new sounds.',
        pa: 'ਕੋਕਲੀਅਰ ਇਮਪਲਾਂਟ ਸਿਰਫ ਸ਼ੁਰੂਆਤ ਹੈ। ਇਮਪਲਾਂਟ ਤੋਂ ਬਾਅਦ ਦਿਮਾਗ ਨੂੰ ਨਵੀਆਂ ਆਵਾਜ਼ਾਂ ਸਮਝਣ ਵਿੱਚ ਮਦਦ ਕਰਨ ਲਈ ਆਡੀਟੋਰੀ-ਵਰਬਲ ਥੈਰੇਪੀ ਬਹੁਤ ਜ਼ਰੂਰੀ ਹੈ।',
        hi: 'कॉक्लियर इम्प्लांट केवल शुरुआत है। इम्प्लांट के बाद मस्तिष्क को नई आवाज़ें समझने में मदद करने के लिए ऑडिटरी-वर्बल थेरेपी अत्यंत महत्वपूर्ण है।'
      },
      bullets: {
        en: ['Post-implant auditory training', 'Speech & language development', 'Auditory-Verbal Therapy (AVT)', 'Mapping session support', 'Family training & home practice', 'School integration support'],
        pa: ['ਇਮਪਲਾਂਟ ਤੋਂ ਬਾਅਦ ਸੁਣਨ ਦੀ ਸਿਖਲਾਈ', 'ਬੋਲਣ ਅਤੇ ਭਾਸ਼ਾ ਦਾ ਵਿਕਾਸ', 'ਆਡੀਟੋਰੀ-ਵਰਬਲ ਥੈਰੇਪੀ (AVT)', 'ਮੈਪਿੰਗ ਸੈਸ਼ਨ ਸਹਾਇਤਾ', 'ਪਰਿਵਾਰਕ ਸਿਖਲਾਈ ਅਤੇ ਘਰੇਲੂ ਅਭਿਆਸ', 'ਸਕੂਲ ਏਕੀਕਰਣ ਸਹਾਇਤਾ'],
        hi: ['इम्प्लांट के बाद सुनने का प्रशिक्षण', 'बोलने और भाषा का विकास', 'ऑडिटरी-वर्बल थेरेपी (AVT)', 'मैपिंग सत्र सहायता', 'पारिवारिक प्रशिक्षण और घरेलू अभ्यास', 'स्कूल एकीकरण सहायता']
      },
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
  <title>{t[lang].title} | SRI Speech & Hearing Aid Centre, Ludhiana</title>
  <meta name="description" content={serviceMetaDesc[lang]} />

  <!-- Social Open Graph Overrides -->
  <meta property="og:title" content="{t[lang].title} | SRI Speech & Hearing Aid Centre, Ludhiana" />
  <meta property="og:description" content={serviceMetaDesc[lang]} />
  <meta name="twitter:title" content="{t[lang].title} | SRI Speech & Hearing Aid Centre, Ludhiana" />
  <meta name="twitter:description" content={serviceMetaDesc[lang]} />

  <!-- Schema.org JSON-LD Structured Data for Services -->
  {@html `<script type="application/ld+json">
    ${JSON.stringify({
      "@context": "https://schema.org",
      "@graph": services.map(svc => ({
        "@type": "Service",
        "@id": `https://www.srihearing.in${getLangUrl('/services', lang)}#${svc.id}`,
        "name": svc.title[lang],
        "description": svc.desc[lang],
        "provider": {
          "@type": "MedicalClinic",
          "name": "SRI Speech & Hearing Aid Centre",
          "telephone": "+91-79860-29544",
          "url": "https://www.srihearing.in"
        }
      }))
    })}
  </script>`}
</svelte:head>

<!-- Hero -->
<section class="sec" style="padding-top: calc(var(--nav-h) + 3rem);">
  <div class="wrap fade-in" style="text-align:center; max-width:720px; margin-inline:auto;">
    <p class="t-label">{t[lang].label}</p>
    <h1 class="t-h2" style="margin:0.75rem 0;">{t[lang].title}</h1>
    <p class="t-body-lg" style="margin-top:1rem;">{t[lang].sub}</p>
  </div>
</section>

<!-- Service Detail Cards -->
<section style="padding-bottom: 4rem;">
  <div class="wrap">
    {#each services as svc, i}
      <div id={svc.id} class="card svc-detail fade-in" class:rev={svc.rev} style="transition-delay:{i * 50}ms; margin-bottom: 2rem;">
        <div class="svc-detail-body">
          <div class="svc-icon">{@html svc.svg}</div>
          <h2 class="t-h2" style="font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 700;">{svc.title[lang]}</h2>
          <p class="t-body">{svc.desc[lang]}</p>
          <ul style="display:flex; flex-direction:column; gap:0.5rem;">
            {#each svc.bullets[lang] as b}
              <li class="svc-check">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {b}
              </li>
            {/each}
          </ul>
          <div><a href="tel:+917986029544" class="btn btn-green">{t[lang].bookBtn}</a></div>
        </div>
        <div class="svc-detail-img">
          <img src={svc.image} alt={svc.title[lang]} loading="lazy" />
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- CTA -->
<div class="wrap fade-in" style="padding-bottom: 4rem;">
  <div class="cta-b">
    <p class="t-label" style="color:rgba(255,255,255,0.5);">{t[lang].guidanceLabel}</p>
    <h2 class="t-h2" style="color:white; margin:0.75rem 0 0.5rem;">{t[lang].guidanceTitle}</h2>
    <p class="t-body" style="color:rgba(255,255,255,0.65); max-width:460px; margin:0 auto;">{t[lang].guidanceSub}</p>
    <div class="cta-acts">
      <a href="tel:+917986029544" class="btn btn-cream btn-lg">{t[lang].guidanceCall}</a>
      <a href="https://wa.me/917986029544" class="btn btn-ghost btn-lg">{t[lang].guidanceWa}</a>
    </div>
  </div>
</div>
