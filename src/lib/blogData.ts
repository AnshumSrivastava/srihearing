export interface BlogPost {
  id: string;
  tag: { en: string; pa: string; hi: string };
  svg: string;
  title: { en: string; pa: string; hi: string };
  excerpt: { en: string; pa: string; hi: string };
  date: { en: string; pa: string; hi: string };
  readTime: { en: string; pa: string; hi: string };
  content: {
    en: string[];
    pa: string[];
    hi: string[];
  };
}

export const posts: BlogPost[] = [
  {
    id: 'signs-child-needs-speech-therapy',
    tag: { en: 'Speech Therapy', pa: 'ਬੋਲਣ ਦੀ ਥੈਰੇਪੀ', hi: 'स्पीच थेरेपी' },
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    title: {
      en: '5 Signs Your Child May Need Speech Therapy',
      pa: '5 ਸੰਕੇਤ ਕਿ ਤੁਹਾਡੇ ਬੱਚੇ ਨੂੰ ਸਪੀਚ ਥੈਰੇਪੀ ਦੀ ਲੋੜ ਹੋ ਸਕਦੀ ਹੈ',
      hi: '5 लक्षण जो बताते हैं कि आपके बच्चे को स्पीच थेरेपी की आवश्यकता हो सकती है'
    },
    excerpt: {
      en: "Many parents wonder if their child's speech development is on track. Here are five clear warning signs.",
      pa: 'ਬਹੁਤ ਸਾਰੇ ਮਾਪੇ ਸੋਚਦੇ ਹਨ ਕਿ ਕੀ ਉਨ੍ਹਾਂ ਦੇ ਬੱਚੇ ਦੇ ਬੋਲਣ ਦਾ ਵਿਕਾਸ ਸਹੀ ਰਸਤੇ ‘ਤੇ ਹੈ। ਇੱਥੇ ਪੰਜ ਸਪੱਸ਼ਟ ਸੰਕੇਤ ਹਨ।',
      hi: 'कई माता-पिता सोचते हैं कि क्या उनके बच्चे का बोलना सही तरीके से विकसित हो रहा है। यहाँ पाँच स्पष्ट चेतावनी संकेत दिए गए हैं।'
    },
    date: { en: 'May 2025', pa: 'ਮਈ 2025', hi: 'मई 2025' },
    readTime: { en: '4 min read', pa: '4 ਮਿੰਟ ਪੜ੍ਹਨ ਦਾ ਸਮਾਂ', hi: '4 मिनट का पाठ' },
    content: {
      en: [
        "Speech and language milestones help track if a child is developing communication skills at an expected pace. However, every child is unique, and minor variations are normal. If you notice persistent struggles, early intervention is key.",
        "1. Lack of Vocalization or Gestures (by 12 months): If your child isn't babbling, using gestures like pointing, waving, or attempting to communicate by their first birthday, it's a sign to seek guidance.",
        "2. Difficulty Understanding Simple Commands (by 18-24 months): A child should be able to follow simple, everyday instructions like 'bring the toy' or 'come here' by age two. Difficulty doing so might indicate receptive language issues.",
        "3. Unclear Speech (by age 3): By three, family members should understand at least 75% of what the child says. If their speech is mostly unintelligible to those who spend the most time with them, speech therapy can help structure articulation.",
        "4. Struggling to Combine Words (by age 2.5): If your child is not combining at least two words together (e.g., 'more milk', 'go park') by 30 months, a checkup is recommended.",
        "5. Social Communication Challenges: Avoiding eye contact, not responding to their name, or not showing interest in interacting with other children can also point to developmental language delays.",
        "If your child shows one or more of these signs, consider speaking with an RCI-certified speech-language pathologist. Early intervention can make a monumental difference in their school and life success."
      ],
      pa: [
        "ਬੋਲਣ ਅਤੇ ਭਾਸ਼ਾ ਦੇ ਮੀਲ ਪੱਥਰ ਇਹ ਟਰੈਕ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦੇ ਹਨ ਕਿ ਕੀ ਇੱਕ ਬੱਚਾ ਉਮੀਦ ਕੀਤੀ ਗਤੀ ਨਾਲ ਸੰਚਾਰ ਦੇ ਹੁਨਰ ਵਿਕਸਿਤ ਕਰ ਰਿਹਾ ਹੈ। ਹਾਲਾਂਕਿ, ਹਰ ਬੱਚਾ ਵਿਲੱਖਣ ਹੁੰਦਾ ਹੈ ਅਤੇ ਮਾਮੂਲੀ ਅੰਤਰ ਆਮ ਹੁੰਦਾ ਹੈ। ਜੇ ਤੁਹਾਨੂੰ ਲਗਾਤਾਰ ਦੇਰੀ ਦਿਖਾਈ ਦਿੰਦੀ ਹੈ, ਤਾਂ ਜਲਦੀ ਇਲਾਜ ਬਹੁਤ ਜ਼ਰੂਰੀ ਹੈ।",
        "1. ਇਸ਼ਾਰਿਆਂ ਜਾਂ ਆਵਾਜ਼ਾਂ ਦੀ ਘਾਟ (12 ਮਹੀਨੇ ਤੱਕ): ਜੇਕਰ ਤੁਹਾਡਾ ਬੱਚਾ ਆਪਣੇ ਪਹਿਲੇ ਜਨਮਦਿਨ ਤੱਕ ਆਵਾਜ਼ਾਂ ਨਹੀਂ ਕੱਢ ਰਿਹਾ ਜਾਂ ਇਸ਼ਾਰਾ ਨਹੀਂ ਕਰ ਰਿਹਾ, ਤਾਂ ਇਹ ਸਲਾਹ ਲੈਣ ਦਾ ਸਮਾਂ ਹੈ।",
        "2. ਸਧਾਰਨ ਨਿਰਦੇਸ਼ਾਂ ਨੂੰ ਸਮਝਣ ਵਿੱਚ ਮੁਸ਼ਕਲ (18-24 ਮਹੀਨਿਆਂ ਤੱਕ): ਬੱਚੇ ਨੂੰ ਦੋ ਸਾਲ ਦੀ ਉਮਰ ਤੱਕ ਸਧਾਰਨ ਨਿਰਦੇਸ਼ਾਂ ਜਿਵੇਂ 'ਖਿਡੌਣਾ ਲਿਆਓ' ਜਾਂ 'ਇੱਥੇ ਆਓ' ਦੀ ਪਾਲਣਾ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ।",
        "3. ਅਸਪੱਸ਼ਟ ਬੋਲਣਾ (3 ਸਾਲ ਦੀ ਉਮਰ ਤੱਕ): ਤਿੰਨ ਸਾਲ ਦੀ ਉਮਰ ਤੱਕ, ਪਰਿਵਾਰਕ ਮੈਂਬਰਾਂ ਨੂੰ ਬੱਚੇ ਦੀ ਬੋਲੀ ਦਾ ਘੱਟੋ-ਘੱਟ 75% ਹਿੱਸਾ ਸਮਝਣਾ ਚਾਹੀਦੀ ਹੈ। ਜੇਕਰ ਬੋਲੀ ਅਸਪੱਸ਼ਟ ਹੈ, ਤਾਂ ਥੈਰੇਪੀ ਮਦਦ ਕਰ ਸਕਦੀ ਹੈ।",
        "4. ਸ਼ਬਦਾਂ ਨੂੰ ਜੋੜਨ ਵਿੱਚ ਮੁਸ਼ਕਲ (2.5 ਸਾਲ ਦੀ ਉਮਰ ਤੱਕ): ਜੇਕਰ ਤੁਹਾਡਾ ਬੱਚਾ 30 ਮਹੀਨਿਆਂ ਤੱਕ ਦੋ ਸ਼ਬਦਾਂ ਨੂੰ ਇਕੱਠਾ ਨਹੀਂ ਜੋੜ ਰਿਹਾ (ਜਿਵੇਂ 'ਦੁੱਧ ਦਿਓ', 'ਬਾਹਰ ਜਾਓ'), ਤਾਂ ਚੈੱਕਅਪ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।",
        "5. ਸਮਾਜਿਕ ਸੰਚਾਰ ਵਿੱਚ ਚੁਣੌਤੀਆਂ: ਅੱਖਾਂ ਦਾ ਸੰਪਰਕ ਨਾ ਬਣਾਉਣਾ, ਆਪਣੇ ਨਾਮ ਦਾ ਜਵਾਬ ਨਾ ਦੇਣਾ, ਜਾਂ ਦੂਜਿਆਂ ਨਾਲ ਗੱਲਬਾਤ ਕਰਨ ਵਿੱਚ ਦਿਲਚਸਪੀ ਨਾ ਦਿਖਾਉਣਾ ਵੀ ਦੇਰੀ ਦੇ ਸੰਕੇਤ ਹੋ ਸਕਦੇ ਹਨ।",
        "ਜੇਕਰ ਤੁਹਾਡਾ ਬੱਚਾ ਇਨ੍ਹਾਂ ਵਿੱਚੋਂ ਇੱਕ ਜਾਂ ਵੱਧ ਸੰਕੇਤ ਦਿਖਾਉਂਦਾ ਹੈ, ਤਾਂ ਇੱਕ RCI-ਪ੍ਰਮਾਣਿਤ ਸਪੀਚ ਥੈਰੇਪਿਸਟ ਨਾਲ ਸੰਪਰਕ ਕਰਨ 'ਤੇ ਵਿਚਾਰ ਕਰੋ। ਜਲਦੀ ਸ਼ੁਰੂ ਕੀਤਾ ਇਲਾਜ ਬੱਚੇ ਦੇ ਭਵਿੱਖ ਲਈ ਬਹੁਤ ਮਦਦਗਾਰ ਹੁੰਦਾ ਹੈ।"
      ],
      hi: [
        "भाषण और भाषा के मील के पत्थर यह ट्रैक करने में मदद करते हैं कि क्या बच्चा अपेक्षित गति से संचार कौशल विकसित कर रहा है। हालांकि, हर बच्चा अनोखा होता है और थोड़े अंतर सामान्य होते हैं। यदि आपको लगातार समस्या दिखाई दे रही है, तो सही समय पर उपचार महत्वपूर्ण है।",
        "1. आवाज या इशारों की कमी (12 महीने तक): यदि आपका बच्चा अपने पहले जन्मदिन तक आवाज नहीं निकाल रहा है या इशारे नहीं कर रहा है, तो यह सलाह लेने का समय है।",
        "2. सरल निर्देशों को समझने में कठिनाई (18-24 महीने तक): बच्चे को दो साल की उम्र तक सरल निर्देशों जैसे 'खिलौना लाओ' या 'यहाँ आओ' का पालन करने में सक्षम होना चाहिए।",
        "3. अस्पष्ट बोलना (3 वर्ष की आयु तक): तीन साल की उम्र तक, परिवार के सदस्यों को बच्चे की कम से कम 75% बातें समझ में आनी चाहिए। यदि उनकी बोली ज्यादातर समझ से बाहर है, तो स्पीच थेरेपी मदद कर सकती है।",
        "4. शब्दों को जोड़ने में कठिनाई (2.5 वर्ष की आयु तक): यदि आपका बच्चा 30 महीने तक कम से कम दो शब्दों को एक साथ नहीं जोड़ रहा है (जैसे 'दूध दो', 'बाहर जाओ'), तो चेकअप की सिफारिश की जाती है।",
        "5. सामाजिक संचार में चुनौतियाँ: आँखें न मिलाना, अपने नाम का जवाब न देना, या दूसरों के साथ बातचीत करने में रुचि न दिखाना भी भाषा में देरी के संकेत हो सकते हैं।",
        "यदि आपका बच्चा इनमें से एक या अधिक लक्षण दिखाता है, तो एक RCI-प्रमाणित स्पीच थेरेपिस्ट से परामर्श करने पर विचार करें। प्रारंभिक उपचार बच्चे के स्कूल और जीवन की सफलता में बड़ा बदलाव ला सकता है।"
      ]
    }
  },
  {
    id: 'rechargeable-vs-disposable-hearing-aids',
    tag: { en: 'Hearing Aids', pa: 'ਹੀਅਰਿੰਗ ਏਡ', hi: 'हियरिंग एड' },
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
    title: {
      en: 'Rechargeable vs. Disposable Battery Hearing Aids',
      pa: 'ਰਿਚਾਰਜਯੋਗ ਬਨਾਮ ਡਿਸਪੋਜ਼ੇਬਲ ਬੈਟਰੀ ਹੀਅਰਿੰਗ ਏਡਜ਼',
      hi: 'रिचार्जेबल बनाम डिस्पोजेबल बैटरी हियरिंग एड्स'
    },
    excerpt: {
      en: 'We break down the pros, cons, and real-world costs of rechargeable vs. traditional battery-powered devices.',
      pa: 'ਅਸੀਂ ਰਿਚਾਰਜਯੋਗ ਅਤੇ ਰਵਾਇਤੀ ਬੈਟਰੀ ਨਾਲ ਚੱਲਣ ਵਾਲੇ ਹੀਅਰਿੰਗ ਏਡਜ਼ ਦੇ ਫਾਇਦੇ, ਨੁਕਸਾਨ ਅਤੇ ਅਸਲ ਖਰਚਿਆਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਦੇ ਹਾਂ।',
      hi: 'हम रिचार्जेबल और पारंपरिक बैटरी से चलने वाले हियरिंग एड्स के फायदे, नुकसान और वास्तविक लागतों का विश्लेषण करते हैं।'
    },
    date: { en: 'April 2025', pa: 'ਅਪ੍ਰੈਲ 2025', hi: 'अप्रैल 2025' },
    readTime: { en: '5 min read', pa: '5 ਮਿੰਟ ਪੜ੍ਹਨ ਦਾ ਸਮਾਂ', hi: '5 मिनट का पाठ' },
    content: {
      en: [
        "Choosing a hearing aid is a significant decision. With the rapid evolution of technology, one of the first choices patients must make is selecting between rechargeable batteries or traditional disposable zinc-air batteries.",
        "Rechargeable hearing aids are powered by built-in lithium-ion batteries. You simply place them in a charging dock overnight, and they run for 18 to 24 hours. The main advantage is convenience: no need to buy, carry, or change tiny batteries every few days. This makes them ideal for individuals with dexterity issues or poor eyesight.",
        "Disposable battery models, on the other hand, require replacing the small batteries every 3 to 10 days. The primary benefit here is flexibility: if you travel or experience power cuts, you can immediately replace the battery without waiting for a charge. They also have a lower initial purchase cost.",
        "Cost-wise, while rechargeable hearing aids have a higher upfront cost (which includes the charger), you save money in the long run by not buying hundreds of disposable batteries over the device's 5-6 year lifespan.",
        "At SRI Speech & Hearing clinic, we stock and provide trials for both options from world-class brands like Signia, Oticon, and ReSound. Visit us near ESI Hospital in Ludhiana to experience both options and find the perfect fit for your lifestyle."
      ],
      pa: [
        "ਹੀਅਰਿੰਗ ਏਡ ਦੀ ਚੋਣ ਕਰਨਾ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਫੈਸਲਾ ਹੈ। ਤਕਨਾਲੋਜੀ ਦੇ ਤੇਜ਼ੀ ਨਾਲ ਵਿਕਾਸ ਦੇ ਨਾਲ, ਮਰੀਜ਼ਾਂ ਨੂੰ ਪਹਿਲਾ ਫੈਸਲਾ ਰਿਚਾਰਜਯੋਗ ਜਾਂ ਰਵਾਇਤੀ ਡਿਸਪੋਜ਼ੇਬਲ ਬੈਟਰੀਆਂ ਵਿਚਕਾਰ ਕਰਨਾ ਪੈਂਦਾ ਹੈ।",
        "ਰਿਚਾਰਜਯੋਗ ਹੀਅਰਿੰਗ ਏਡਜ਼ ਲਿਥੀਅਮ-ਆਇਨ ਬੈਟਰੀਆਂ ਦੁਆਰਾ ਚੱਲਦੇ ਹਨ। ਤੁਸੀਂ ਬਸ ਉਹਨਾਂ ਨੂੰ ਰਾਤ ਨੂੰ ਚਾਰਜਿੰਗ ਡੌਕ 'ਤੇ ਰੱਖੋ ਅਤੇ ਉਹ 18 ਤੋਂ 24 ਘੰਟੇ ਚੱਲਦੇ ਹਨ। ਮੁੱਖ ਫਾਇਦਾ ਸਹੂਲਤ ਹੈ: ਹਰ ਕੁਝ ਦਿਨਾਂ ਬਾਅਦ ਛੋਟੀਆਂ ਬੈਟਰੀਆਂ ਖਰੀਦਣ, ਚੁੱਕਣ ਜਾਂ ਬਦਲਣ ਦੀ ਕੋਈ ਲੋੜ ਨਹੀਂ ਹੈ। ਇਹ ਹੱਥਾਂ ਦੀ ਕਮਜ਼ੋਰੀ ਜਾਂ ਘੱਟ ਨਜ਼ਰ ਵਾਲੇ ਲੋਕਾਂ ਲਈ ਵਧੀਆ ਹੈ।",
        "ਦੂਜੇ ਪਾਸੇ, ਡਿਸਪੋਜ਼ੇਬਲ ਬੈਟਰੀ ਮਾਡਲਾਂ ਵਿੱਚ ਹਰ 3 ਤੋਂ 10 ਦਿਨਾਂ ਵਿੱਚ ਛੋਟੀਆਂ ਬੈਟਰੀਆਂ ਨੂੰ ਬਦਲਣ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ। ਇਸਦਾ ਫਾਇਦਾ ਇਹ ਹੈ ਕਿ ਜੇਕਰ ਤੁਸੀਂ ਯਾਤਰਾ ਕਰ ਰਹੇ ਹੋ ਜਾਂ ਬਿਜਲੀ ਬੰਦ ਹੋ ਜਾਂਦੀ ਹੈ, ਤਾਂ ਤੁਸੀਂ ਚਾਰਜ ਦੀ ਉਡੀਕ ਕੀਤੇ ਬਿਨਾਂ ਬੈਟਰੀ ਬਦਲ ਸਕਦੇ ਹੋ। ਉਹਨਾਂ ਦੀ ਸ਼ੁਰੂਆਤੀ ਕੀਮਤ ਵੀ ਘੱਟ ਹੁੰਦੀ ਹੈ।",
        "ਕੀਮਤ ਦੇ ਪੱਖ ਤੋਂ, ਹਾਲਾਂਕਿ ਰਿਚਾਰਜਯੋਗ ਹੀਅਰਿੰਗ ਏਡਜ਼ ਦੀ ਸ਼ੁਰੂਆਤੀ ਲਾਗਤ ਵੱਧ ਹੁੰਦੀ ਹੈ, ਪਰ ਤੁਸੀਂ ਡਿਵਾਈਸ ਦੇ 5-6 ਸਾਲਾਂ ਦੇ ਜੀਵਨ ਦੌਰਾਨ ਸੈਂਕੜੇ ਡਿਸਪੋਜ਼ੇਬਲ ਬੈਟਰੀਆਂ ਨਾ ਖਰੀਦ ਕੇ ਲੰਬੇ ਸਮੇਂ ਵਿੱਚ ਪੈਸੇ ਬਚਾਉਂਦੇ ਹੋ।",
        "SRI ਸਪੀਚ ਐਂਡ ਹੀਅਰਿੰਗ ਕਲੀਨਿਕ ਵਿੱਚ, ਅਸੀਂ ਸਿਗਨੀਆ, ਓਟੀਕਾਨ ਅਤੇ ਰੀਸਾਊਂਡ ਵਰਗੇ ਬ੍ਰਾਂਡਾਂ ਦੇ ਦੋਵੇਂ ਵਿਕਲਪਾਂ ਦਾ ਟ੍ਰਾਇਲ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਾਂ। ਲੁਧਿਆਣਾ ਵਿੱਚ ਸਾਡੇ ਕੋਲ ਆ ਕੇ ਇਸਦਾ ਅਨੁਭਵ ਕਰੋ।"
      ],
      hi: [
        "हियरिंग एड चुनना एक महत्वपूर्ण निर्णय है। प्रौद्योगिकी के तेजी से विकास के साथ, रोगियों को पहला निर्णय रिचार्जेबल या पारंपरिक डिस्पोजेबल बैटरियों के बीच करना पड़ता है।",
        "रिचार्जेबल हियरिंग एड्स इन-बिल्ट लिथियम-आयन बैटरी द्वारा संचालित होते हैं। आप बस उन्हें रात में चार्जिंग डॉक पर रख देते हैं और वे 18 से 24 घंटे चलते हैं। मुख्य लाभ सुविधा है: हर कुछ दिनों में छोटी बैटरी खरीदने, ले जाने या बदलने की कोई आवश्यकता नहीं है। यह हाथों की कमजोरी या कमजोर दृष्टि वाले लोगों के लिए आदर्श है।",
        "दूसरी ओर, डिस्पोजेबल बैटरी मॉडल में हर 3 से 10 दिनों में छोटी बैटरी को बदलने की आवश्यकता होती है। इसका मुख्य लाभ यह है कि यदि आप यात्रा कर रहे हैं या बिजली कट जाती है, तो आप चार्ज की प्रतीक्षा किए बिना तुरंत बैटरी बदल सकते हैं। उनका शुरुआती मूल्य भी कम होता है।",
        "लागत के मामले में, हालांकि रिचार्जेबल हियरिंग एड्स की शुरुआती लागत अधिक होती है, लेकिन आप डिवाइस के 5-6 साल के जीवनकाल में सैकड़ों डिस्पोजेबल बैटरी न खरीदकर लंबे समय में पैसे बचाते हैं।",
        "SRI स्पीच एंड हियरिंग क्लिनिक में, हम सिगनिया, ओटिकॉन और रीसाउंड जैसे ब्रांडों के दोनों विकल्पों का परीक्षण प्रदान करते हैं। लुधियाना में हमारे पास आकर इसका अनुभव करें।"
      ]
    }
  },
  {
    id: 'what-is-tinnitus',
    tag: { en: 'Hearing Health', pa: 'ਸੁਣਨ ਦੀ ਸਿਹਤ', hi: 'सुनने का स्वास्थ्य' },
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12.5C5 7 10 4 12 4s7 3 10 8.5C19 17 14 20 12 20S5 17 2 12.5z"/><circle cx="12" cy="12.5" r="3"/></svg>`,
    title: {
      en: 'What Is Tinnitus? Causes, Symptoms & Treatments',
      pa: 'ਟਿੰਨੀਟਸ ਕੀ ਹੈ? ਕਾਰਨ, ਲੱਛਣ ਅਤੇ ਇਲਾਜ',
      hi: 'टिनिटस क्या है? कारण, लक्षण और उपचार'
    },
    excerpt: {
      en: 'Ringing in the ears affects 1 in 8 people. We explain what causes tinnitus and which treatments help.',
      pa: 'ਕੰਨਾਂ ਵਿੱਚ ਘੰਟੀ ਵੱਜਣਾ ਹਰ 8 ਵਿੱਚੋਂ 1 ਵਿਅਕਤੀ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰਦਾ ਹੈ। ਅਸੀਂ ਸਮਝਾਉਂਦੇ ਹਾਂ ਕਿ ਟਿੰਨੀਟਸ ਦਾ ਕੀ ਕਾਰਨ ਹੈ ਅਤੇ ਕਿਹੜੇ ਇਲਾਜ ਮਦਦ ਕਰਦੇ ਹਨ।',
      hi: 'कानों में घंटी बजना हर 8 में से 1 व्यक्ति को प्रभावित करता है। हम समझाते हैं कि टिनिटस का क्या कारण है और कौन से उपचार मदद करते हैं।'
    },
    date: { en: 'March 2025', pa: 'ਮਾਰਚ 2025', hi: 'मार्च 2025' },
    readTime: { en: '6 min read', pa: '6 ਮਿੰਟ ਪੜ੍ਹਨ ਦਾ ਸਮਾਂ', hi: '6 मिनट का पाठ' },
    content: {
      en: [
        "Tinnitus is the medical term for hearing noises in your ears when there is no external sound source. It is often described as a 'ringing in the ears,' but it can also sound like buzzing, hissing, roaring, clicking, or whistling.",
        "It is important to understand that tinnitus is not a disease itself, but a symptom of an underlying condition. Common causes include age-related hearing loss, exposure to loud noises (like machinery or music), earwax blockages, and changes in ear bones.",
        "For many people, tinnitus is a minor annoyance. However, for others, it can cause severe distress, difficulty sleeping, anxiety, and trouble concentrating.",
        "While there is no single 'cure' for most cases of chronic tinnitus, there are highly effective management strategies. These include sound therapy (using white noise or hearing aid maskers to make tinnitus less noticeable), Tinnitus Retraining Therapy (TRT) to habituate the brain to the sound, and counseling to reduce the emotional impact.",
        "If you are experiencing ringing or buzzing in your ears, a comprehensive audiological evaluation is the crucial first step. At SRI Speech & Hearing Clinic, Ludhiana, we design custom tinnitus management plans tailored to your specific hearing profile."
      ],
      pa: [
        "ਟਿੰਨੀਟਸ ਕੰਨਾਂ ਵਿੱਚ ਅਜਿਹੀਆਂ ਆਵਾਜ਼ਾਂ ਸੁਣਨ ਦੀ ਸਥਿਤੀ ਹੈ ਜਿਸਦਾ ਬਾਹਰੋਂ ਕੋਈ ਸਰੋਤ ਨਹੀਂ ਹੁੰਦਾ। ਇਸਨੂੰ ਅਕਸਰ 'ਕੰਨਾਂ ਵਿੱਚ ਘੰਟੀ ਵੱਜਣਾ' ਕਿਹਾ ਜਾਂਦਾ ਹੈ, ਪਰ ਇਹ ਭਿਣਭਿਣਾਹਟ, ਸੀਟੀ ਜਾਂ ਗੂੰਜ ਵਰਗਾ ਵੀ ਹੋ ਸਕਦਾ ਹੈ।",
        "ਇਹ ਸਮਝਣਾ ਮਹੱਤਵਪੂਰਨ ਹੈ ਕਿ ਟਿੰਨੀਟਸ ਕੋਈ ਬਿਮਾਰੀ ਨਹੀਂ ਹੈ, ਬਲਕਿ ਕਿਸੇ ਹੋਰ ਸਮੱਸਿਆ ਦਾ ਲੱਛਣ ਹੈ। ਆਮ ਕਾਰਨਾਂ ਵਿੱਚ ਉਮਰ ਦੇ ਨਾਲ ਸੁਣਨ ਸ਼ਕਤੀ ਦੀ ਕਮੀ, ਉੱਚੀ ਆਵਾਜ਼ ਦਾ ਸਾਹਮਣਾ ਕਰਨਾ, ਕੰਨ ਦੀ ਮੈਲ ਦਾ ਜਮ੍ਹਾਂ ਹੋਣਾ ਅਤੇ ਕੰਨ ਦੀਆਂ ਹੱਡੀਆਂ ਵਿੱਚ ਬਦਲਾਅ ਸ਼ਾਮਲ ਹਨ।",
        "ਕਈਆਂ ਲਈ ਇਹ ਮਾਮੂਲੀ ਸਮੱਸਿਆ ਹੋ ਸਕਦੀ ਹੈ, ਪਰ ਦੂਜਿਆਂ ਲਈ ਇਹ ਨੀਂਦ ਦੀ ਕਮੀ, ਚਿੰਤਾ ਅਤੇ ਇਕਾਗਰਤਾ ਵਿੱਚ ਮੁਸ਼ਕਲ ਦਾ ਕਾਰਨ ਬਣ ਸਕਦੀ ਹੈ।",
        "ਹਾਲਾਂਕਿ ਇਸਦਾ ਕੋਈ ਇੱਕ ਪੱਕਾ 'ਇਲਾਜ' ਨਹੀਂ ਹੈ, ਪਰ ਪ੍ਰਬੰਧਨ ਦੀਆਂ ਕਈ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਵਿਧੀਆਂ ਹਨ। ਇਹਨਾਂ ਵਿੱਚ ਸਾਊਂਡ ਥੈਰੇਪੀ (ਮਾਸਕਿੰਗ), ਟਿੰਨੀਟਸ ਰੀਟ੍ਰੇਨਿੰਗ ਥੈਰੇਪੀ (TRT) ਅਤੇ ਕਾਉਂਸਲਿੰਗ ਸ਼ਾਮਲ ਹਨ।",
        "ਜੇਕਰ ਤੁਸੀਂ ਕੰਨਾਂ ਵਿੱਚ ਅਜਿਹੀ ਆਵਾਜ਼ ਮਹਿਸੂਸ ਕਰਦੇ ਹੋ, ਤਾਂ ਸਾਡੇ ਕਲੀਨਿਕ ਵਿੱਚ ਆ ਕੇ ਜਾਂਚ ਕਰਵਾਓ। ਅਸੀਂ ਤੁਹਾਡੀ ਸਹੂਲਤ ਲਈ ਵਿਸ਼ੇਸ਼ ਟਿੰਨੀਟਸ ਪ੍ਰਬੰਧਨ ਯੋਜਨਾ ਤਿਆਰ ਕਰਦੇ ਹਾਂ।"
      ],
      hi: [
        "टिनिटस कानों में बाहरी आवाज के स्रोत के बिना आवाजें सुनाई देने की स्थिति है। इसे अक्सर 'कानों में घंटी बजना' कहा जाता है, लेकिन यह भनभनाहट, फुफकार या सीटी जैसी आवाज भी हो सकती है।",
        "यह समझना महत्वपूर्ण है कि टिनिटस अपने आप में कोई बीमारी नहीं है, बल्कि एक अंतर्निहित स्थिति का लक्षण है। आम कारणों में उम्र से संबंधित सुनवाई हानि, तेज आवाज का प्रभाव, कान के मैल का जमा होना और कान की हड्डियों में बदलाव शामिल हैं।",
        "कई लोगों के लिए यह मामूली परेशानी हो सकती है, लेकिन दूसरों के लिए यह नींद की कमी, चिंता और एकाग्रता में कठिनाई का कारण बन सकती है।",
        "हालांकि टिनिटस का कोई एक पक्का 'इलाज' नहीं है, लेकिन इसके प्रबंधन के कई प्रभावी तरीके हैं। इनमें साउंड थेरेपी (मास्किंग), टिनिटस रिट्रेनिंग थेरेपी (TRT) और उचित परामर्श शामिल हैं।",
        "यदि आप कानों में ऐसी आवाजें महसूस करते हैं, तो हमारे क्लिनिक में आकर जांच करवाएं। हम आपकी सुविधा के लिए विशेष टिनिटस प्रबंधन योजना तैयार करते हैं।"
      ]
    }
  },
  {
    id: 'stuttering-myths',
    tag: { en: 'Stuttering', pa: 'ਹਕਲਾਹਟ', hi: 'हकलाहट' },
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    title: {
      en: '7 Common Myths About Stuttering — Debunked',
      pa: 'ਹਕਲਾਉਣ ਬਾਰੇ 7 ਆਮ ਭਰਮ — ਸੱਚਾਈ ਕੀ ਹੈ',
      hi: 'हकलाने के बारे में 7 सामान्य भ्रम — सच्चाई क्या है'
    },
    excerpt: {
      en: '"He\'ll grow out of it." We bust the most persistent myths about stuttering and explain what science says.',
      pa: '"ਉਹ ਆਪਣੇ ਆਪ ਠੀਕ ਹੋ ਜਾਵੇਗਾ।" ਅਸੀਂ ਹਕਲਾਉਣ ਬਾਰੇ ਸਭ ਤੋਂ ਵੱਧ ਪ੍ਰਚਲਿਤ ਭਰਮਾਂ ਨੂੰ ਤੋੜਦੇ ਹਾਂ ਅਤੇ ਦੱਸਦੇ ਹਾਂ ਕਿ ਵਿਗਿਆਨ ਕੀ ਕਹਿੰਦਾ ਹੈ।',
      hi: '"वह अपने आप ठीक हो जाएगा।" हम हकलाने के बारे में सबसे आम भ्रमों को दूर करते हैं और बताते हैं कि विज्ञान क्या कहता है।'
    },
    date: { en: 'February 2025', pa: 'ਫਰਵਰੀ 2025', hi: 'फरवरी 2025' },
    readTime: { en: '5 min read', pa: '5 ਮਿੰਟ ਪੜ੍ਹਨ ਦਾ ਸਮਾਂ', hi: '5 मिनट का पाठ' },
    content: {
      en: [
        "Stuttering (also known as stammering) is a speech disorder characterized by repetition of sounds, syllables, or words, prolongation of sounds, and interruptions in speech, known as blocks. Despite being a widely recognized condition, many misconceptions persist.",
        "Myth 1: People stutter because they are nervous. Truth: Nervousness does not cause stuttering, although stuttering can make a person feel anxious in social settings. Stuttering is a neurological condition.",
        "Myth 2: Stuttering is caused by bad parenting. Truth: Stuttering is not caused by parents. It has a strong genetic link, with about 60% of people who stutter having a family member who also stutters.",
        "Myth 3: Children will always grow out of stuttering. Truth: While many children experience a period of developmental stuttering that resolves, early intervention is critical. If stuttering persists for more than 6-12 months, professional speech therapy is highly recommended.",
        "Myth 4: People who stutter are less intelligent. Truth: There is absolutely no link between stuttering and intelligence. Famous achievers like Winston Churchill, Emily Blunt, and Hrithik Roshan have all successfully managed stuttering.",
        "Speech therapy helps individuals develop fluency, change their speech patterns, and build strong communication confidence. At SRI Speech & Hearing Clinic, we offer specialized programs (including the Lidcombe Program for young children) to help restore natural speech flow."
      ],
      pa: [
        "ਹਕਲਾਉਣਾ (ਸਟਟਰਿੰਗ) ਇੱਕ ਬੋਲਣ ਦਾ ਵਿਕਾਰ ਹੈ ਜਿਸ ਵਿੱਚ ਆਵਾਜ਼ਾਂ, ਉਚਾਰਖੰਡਾਂ ਜਾਂ ਸ਼ਬਦਾਂ ਦਾ ਦੁਹਰਾਓ, ਅਤੇ ਬੋਲਣ ਵਿੱਚ ਰੁਕਾਵਟਾਂ ਸ਼ਾਮਲ ਹੁੰਦੀਆਂ ਹਨ। ਇਸ ਸਥਿਤੀ ਬਾਰੇ ਕਈ ਗਲਤ ਧਾਰਨਾਵਾਂ ਪ੍ਰਚਲਿਤ ਹਨ।",
        "ਭਰਮ 1: ਲੋਕ ਘਬਰਾਹਟ ਕਾਰਨ ਹਕਲਾਉਂਦੇ ਹਨ। ਸੱਚਾਈ: ਘਬਰਾਹਟ ਹਕਲਾਉਣ ਦਾ ਕਾਰਨ ਨਹੀਂ ਬਣਦੀ, ਹਾਲਾਂਕਿ ਹਕਲਾਉਣ ਕਾਰਨ ਵਿਅਕਤੀ ਸਮਾਜਿਕ ਸਥਿਤੀਆਂ ਵਿੱਚ ਚਿੰਤਤ ਹੋ ਸਕਦਾ ਹੈ। ਇਹ ਇੱਕ ਨਿਊਰੋਲੌਜੀਕਲ ਸਥਿਤੀ ਹੈ।",
        "ਭਰਮ 2: ਮਾਪਿਆਂ ਦੀ ਗਲਤੀ ਕਾਰਨ ਬੱਚਾ ਹਕਲਾਉਂਦਾ ਹੈ। ਸੱਚਾਈ: ਇਸਦਾ ਪਾਲਣ-ਪੋਸ਼ਣ ਨਾਲ ਕੋਈ ਸਬੰਧ ਨਹੀਂ ਹੈ। ਇਸਦਾ ਇੱਕ ਮਜ਼ਬੂਤ ਜੈਨੇਟਿਕ ਸਬੰਧ ਹੁੰਦਾ ਹੈ।",
        "ਭਰਮ 3: ਬੱਚੇ ਹਮੇਸ਼ਾ ਆਪਣੇ ਆਪ ਹਕਲਾਉਣ ਤੋਂ ਠੀਕ ਹੋ ਜਾਂਦੇ ਹਨ। ਸੱਚਾਈ: ਹਾਲਾਂਕਿ ਕੁਝ ਬੱਚੇ ਆਪਣੇ ਆਪ ਠੀਕ ਹੋ ਜਾਂਦੇ ਹਨ, ਪਰ ਜੇਕਰ ਸਮੱਸਿਆ 6-12 ਮਹੀਨਿਆਂ ਤੋਂ ਵੱਧ ਰਹਿੰਦੀ ਹੈ, ਤਾਂ ਪੇਸ਼ੇਵਰ ਥੈਰੇਪੀ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ।",
        "ਭਰਮ 4: ਹਕਲਾਉਣ ਵਾਲੇ ਲੋਕ ਘੱਟ ਬੁੱਧੀਮਾਨ ਹੁੰਦੇ ਹਨ। ਸੱਚਾਈ: ਹਕਲਾਉਣ ਅਤੇ ਬੁੱਧੀ ਵਿਚਕਾਰ ਕੋਈ ਸਬੰਧ ਨਹੀਂ ਹੈ। ਰਿਤਿਕ ਰੋਸ਼ਨ ਅਤੇ ਐਮਿਲੀ ਬਲੰਟ ਵਰਗੇ ਕਈ ਸਫਲ ਲੋਕ ਹਕਲਾਉਣ ਦੀ ਸਮੱਸਿਆ ਦਾ ਸਾਹਮਣਾ ਕਰ ਚੁੱਕੇ ਹਨ।",
        "ਸਪੀਚ ਥੈਰੇਪੀ ਬੱਚਿਆਂ ਅਤੇ ਬਾਲਗਾਂ ਵਿੱਚ ਬੋਲਣ ਦੇ ਵਿਸ਼ਵਾਸ ਨੂੰ ਵਧਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦੀ ਹੈ। ਸਾਡੇ ਕਲੀਨਿਕ ਵਿੱਚ ਅਸੀਂ ਮਾਹਿਰਾਂ ਦੁਆਰਾ ਥੈਰੇਪੀ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਾਂ।"
      ],
      hi: [
        "हकलाना एक भाषण विकार है जिसमें ध्वनियों, अक्षरों या शब्दों का दोहराव, और बोलने में रुकावटें शामिल होती हैं। इस स्थिति के बारे में कई गलत धारणाएं आज भी समाज में मौजूद हैं।",
        "भ्रम 1: लोग घबराहट के कारण हकलाते हैं। सच्चाई: घबराहट हकलाने का कारण नहीं बनती है, हालांकि हकलाने के कारण व्यक्ति सामाजिक परिस्थितियों में चिंतित महसूस कर सकता है। यह एक न्यूरोलॉजिकल स्थिति है।",
        "भ्रम 2: माता-पिता की गलती के कारण बच्चा हकलाता है। सच्चाई: इसका लालन-पालन से कोई संबंध नहीं है। इसका एक मजबूत आनुवंशिक (जेनेटिक) संबंध होता है।",
        "भ्रम 3: बच्चे हमेशा अपने आप हकलाने से ठीक हो जाते हैं। सच्चाई: हालांकि कुछ बच्चे समय के साथ ठीक हो जाते हैं, लेकिन यदि समस्या 6-12 महीनों से अधिक बनी रहती है, तो पेशेवर स्पीच थेरेपी की आवश्यकता होती है।",
        "भ्रम 4: हकलाने वाले लोग कम बुद्धिमान होते हैं। सच्चाई: हकलाने और बुद्धिमत्ता के बीच कोई संबंध नहीं है। ऋतिक रोशन और एमिली ब्लंट जैसे कई प्रसिद्ध लोग हकलाने का सफलतापूर्वक सामना कर चुके हैं।",
        "स्पीच थेरेपी बच्चों और वयस्कों में बोलने के आत्मविश्वास को बढ़ाने में मदद करती है। हमारे क्लिनिक में हम विशेषज्ञों द्वारा अनुकूलित थेरेपी प्रदान करते हैं।"
      ]
    }
  },
  {
    id: 'cochlear-implant-rehab',
    tag: { en: 'Cochlear Implant', pa: 'ਕੋਕਲੀਅਰ ਇਮਪਲਾਂਟ', hi: 'कॉक्लियर इम्प्लांट' },
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
    title: {
      en: 'Life After a Cochlear Implant: Why Rehab Matters',
      pa: 'ਕੋਕਲੀਅਰ ਇਮਪਲਾਂਟ ਤੋਂ ਬਾਅਦ ਦੀ ਜ਼ਿੰਦਗੀ: ਰੀਹੈਬ ਕਿਉਂ ਜ਼ਰੂਰੀ ਹੈ',
      hi: 'कॉक्लियर इम्प्लांट के बाद का जीवन: रिहैब क्यों महत्वपूर्ण है'
    },
    excerpt: {
      en: 'Getting a cochlear implant is only half the journey. Post-implant therapy determines outcomes.',
      pa: 'ਕੋਕਲੀਅਰ ਇਮਪਲਾਂਟ ਕਰਵਾਉਣਾ ਸਿਰਫ ਅੱਧਾ ਸਫ਼ਰ ਹੈ। ਇਮਪਲਾਂਟ ਤੋਂ ਬਾਅਦ ਦੀ ਥੈਰੇਪੀ ਹੀ ਨਤੀਜੇ ਤੈਅ ਕਰਦੀ ਹੈ।',
      hi: 'कॉक्लियर इम्प्लांट प्राप्त करना केवल आधी यात्रा है। इम्प्लांट के बाद की थेरेपी ही परिणाम तय करती है।'
    },
    date: { en: 'January 2025', pa: 'ਜਨਵਰੀ 2025', hi: 'जनवरी 2025' },
    readTime: { en: '7 min read', pa: '7 ਮਿੰਟ ਪੜ੍ਹਨ ਦਾ ਸਮਾਂ', hi: '7 मिनट का पाठ' },
    content: {
      en: [
        "A cochlear implant is a life-changing electronic device that bypasses damaged parts of the inner ear to provide sound signals directly to the brain. It is a brilliant medical marvel, but activating the device is only the first step in the journey to hearing.",
        "Unlike hearing aids, which amplify sounds, cochlear implants send electrical pulses that the brain must learn to interpret as sound. This process is not automatic. The brain needs structured training to associate these new electrical signals with meaningful language and sounds.",
        "This is where Auditory-Verbal Therapy (AVT) and post-implant rehabilitation become critical. For young children born deaf, AVT helps them learn to listen, speak, and communicate naturally, allowing them to join mainstream schools and realize their full potential.",
        "For adults who lost their hearing later in life, rehab helps accelerate the adjustment period, helping them recognize voices, enjoy music, and communicate confidently in noisy environments.",
        "Rehabilitation includes listening exercises, mapping sessions (where the implant settings are customized by an audiologist), and home-based practice guided by family members. At SRI Speech & Hearing Clinic, our certified AVT therapists support patients through every stage of implant rehabilitation."
      ],
      pa: [
        "ਕੋਕਲੀਅਰ ਇਮਪਲਾਂਟ ਇੱਕ ਜੀਵਨ ਬਦਲਣ ਵਾਲਾ ਇਲੈਕਟ੍ਰਾਨਿਕ ਉਪਕਰਣ ਹੈ ਜੋ ਸੁਣਨ ਸ਼ਕਤੀ ਦੀ ਗੰਭੀਰ ਸਮੱਸਿਆ ਵਾਲੇ ਮਰੀਜ਼ਾਂ ਦੀ ਮਦਦ ਕਰਦਾ ਹੈ। ਪਰ ਇਮਪਲਾਂਟ ਕਰਵਾਉਣਾ ਸਿਰਫ ਪਹਿਲਾ ਕਦਮ ਹੈ।",
        "ਹੀਅਰਿੰਗ ਏਡਜ਼ ਦੇ ਉਲਟ, ਕੋਕਲੀਅਰ ਇਮਪਲਾਂਟ ਦਿਮਾਗ ਨੂੰ ਸਿੱਧੇ ਇਲੈਕਟ੍ਰੀਕਲ ਸਿਗਨਲ ਭੇਜਦੇ ਹਨ। ਦਿਮਾਗ ਨੂੰ ਇਹਨਾਂ ਨਵੇਂ ਸਿਗਨਲਾਂ ਨੂੰ ਆਵਾਜ਼ ਦੇ ਰੂਪ ਵਿੱਚ ਸਮਝਣਾ ਸਿੱਖਣ ਲਈ ਸਿਖਲਾਈ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ। ਇਹ ਪ੍ਰਕਿਰਿਆ ਆਪਣੇ ਆਪ ਨਹੀਂ ਹੁੰਦੀ।",
        "ਇਸ ਲਈ ਆਡੀਟੋਰੀ-ਵਰਬਲ ਥੈਰੇਪੀ (AVT) ਅਤੇ ਇਮਪਲਾਂਟ ਤੋਂ ਬਾਅਦ ਦਾ ਪੁਨਰਵਾਸ (ਰੀਹੈਬ) ਬਹੁਤ ਜ਼ਰੂਰੀ ਹੈ। ਬੋਲ਼ੇ ਪੈਦਾ ਹੋਏ ਬੱਚਿਆਂ ਲਈ, AVT ਉਹਨਾਂ ਨੂੰ ਸੁਣਨਾ, ਬੋਲਣਾ ਅਤੇ ਕੁਦਰਤੀ ਤੌਰ 'ਤੇ ਸੰਚਾਰ ਕਰਨਾ ਸਿੱਖਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
        "ਬਾਲਗਾਂ ਲਈ, ਰੀਹੈਬ ਉਹਨਾਂ ਦੇ ਸਮਾਯੋਜਨ ਸਮੇਂ ਨੂੰ ਤੇਜ਼ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ, ਜਿਸ ਨਾਲ ਉਹ ਆਵਾਜ਼ਾਂ ਨੂੰ ਪਛਾਣ ਸਕਦੇ ਹਨ ਅਤੇ ਭੀੜ ਵਾਲੇ ਮਾਹੌਲ ਵਿੱਚ ਆਤਮਵਿਸ਼ਵਾਸ ਨਾਲ ਗੱਲਬਾਤ ਕਰ ਸਕਦੇ ਹਨ।",
        "SRI ਸਪੀਚ ਐਂਡ ਹੀਅਰਿੰਗ ਕਲੀਨਿਕ ਵਿੱਚ, ਸਾਡੇ ਪ੍ਰਮਾਣਿਤ AVT ਥੈਰੇਪਿਸਟ ਇਮਪਲਾਂਟ ਰੀਹੈਬਲੀਟੇਸ਼ਨ ਦੇ ਹਰ ਪੜਾਅ 'ਤੇ ਮਰੀਜ਼ਾਂ ਦੀ ਸਹਾਇਤਾ ਕਰਦੇ ਹਨ।"
      ],
      hi: [
        "कॉक्लियर इम्प्लांट एक जीवन बदलने वाला इलेक्ट्रॉनिक उपकरण है जो गंभीर श्रवण हानि वाले रोगियों की मदद करता है। लेकिन इम्प्लांट सर्जरी करवाना यात्रा का केवल पहला कदम है।",
        "हियरिंग एड के विपरीत, कॉक्लियर इम्प्लांट मस्तिष्क को सीधे इलेक्ट्रिकल सिग्नल भेजते हैं। मस्तिष्क को इन नए संकेतों को ध्वनि के रूप में समझने के लिए संरचित प्रशिक्षण की आवश्यकता होती है। यह प्रक्रिया स्वतः नहीं होती है।",
        "यही कारण है कि ऑडिटरी-वर्बल थेरेपी (AVT) और इम्प्लांट के बाद का पुनर्वास (रिहैब) अत्यंत महत्वपूर्ण हो जाता है। जन्म से न सुन पाने वाले बच्चों के लिए, AVT उन्हें सुनना, बोलना और स्वाभाविक रूप से संवाद करना सीखने में मदद करता है।",
        "वयस्कों के लिए, रिहैब उनके अभ्यस्त होने की अवधि को तेज करता है, जिससे वे आवाज़ों को पहचान सकते हैं और शोरगुल वाले वातावरण में आत्मविश्वास से बातचीत कर सकते हैं।",
        "SRI स्पीच एंड हियरिंग क्लिनिक में, हमारे प्रमाणित AVT थेरेपिस्ट इम्प्लांट रिहैबिलिटेशन के हर चरण में रोगियों का मार्गदर्शन करते हैं।"
      ]
    }
  },
  {
    id: 'voice-care-teachers',
    tag: { en: 'Voice Therapy', pa: 'ਆਵਾਜ਼ ਥੈਰੇਪੀ', hi: 'वॉइस थेरेपी' },
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>`,
    title: {
      en: 'Voice Care for Teachers: 8 Daily Habits',
      pa: 'ਅਧਿਆਪਕਾਂ ਲਈ ਆਵਾਜ਼ ਦੀ ਦੇਖਭਾਲ: 8 ਰੋਜ਼ਾਨਾ ਆਦਤਾਂ',
      hi: 'शिक्षकों के लिए आवाज की देखभाल: 8 दैनिक आदतें'
    },
    excerpt: {
      en: 'Teachers use their voice more than almost any profession. Practical habits to prevent vocal fatigue.',
      pa: 'ਅਧਿਆਪਕ ਲਗਭਗ ਕਿਸੇ ਵੀ ਹੋਰ ਪੇਸ਼ੇ ਨਾਲੋਂ ਵੱਧ ਆਪਣੀ ਆਵਾਜ਼ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਨ। ਆਵਾਜ਼ ਦੀ ਥਕਾਵਟ ਨੂੰ ਰੋਕਣ ਲਈ ਵਿਹਾਰਕ ਆਦਤਾਂ।',
      hi: 'शिक्षक लगभग किसी भी अन्य पेशे की तुलना में अपनी आवाज का सबसे अधिक उपयोग करते हैं। आवाज की थकान को रोकने के लिए व्यावहारिक आदतें।'
    },
    date: { en: 'December 2024', pa: 'ਦਸੰਬਰ 2024', hi: 'दिसंबर 2024' },
    readTime: { en: '4 min read', pa: '4 ਮਿੰਟ ਪੜ੍ਹਨ ਦਾ ਸਮਾਂ', hi: '4 मिनट का पाठ' },
    content: {
      en: [
        "Teachers are occupational voice users. Speaking loudly for hours every day, often over background noise, puts immense strain on the vocal cords, leading to hoarseness, vocal fatigue, or even vocal nodules.",
        "To protect your voice and keep it strong, practicing good vocal hygiene is essential. Here are some simple, highly effective daily habits:",
        "1. Stay Hydrated: Drink plenty of water throughout the day. Your vocal cords need moisture to vibrate smoothly and prevent friction.",
        "2. Use a Voice Amplifier: If you teach in large classrooms, consider using a lightweight portable microphone and speaker to reduce the need to yell.",
        "3. Rest Your Voice: Take short 'voice breaks' during the day. Avoid talking during breaks between classes and limit throat clearing.",
        "4. Avoid Whispering: Whispering actually puts more stress on your vocal cords than normal speech. Speak in a soft, supported voice instead.",
        "5. Practice Warm-ups: Gently hum or perform lip trills for 2-3 minutes before starting your first class to warm up your laryngeal muscles.",
        "If hoarseness or voice loss persists for more than two weeks, seek professional help. At SRI Speech & Hearing Clinic, we provide specialized voice therapy and vocal training to rehabilitate vocal cords and help professionals use their voice safely."
      ],
      pa: [
        "ਅਧਿਆਪਕ ਪੇਸ਼ੇਵਰ ਤੌਰ 'ਤੇ ਆਪਣੀ ਆਵਾਜ਼ ਦੀ ਬਹੁਤ ਵਰਤੋਂ ਕਰਦੇ ਹਨ। ਹਰ ਰੋਜ਼ ਘੰਟਿਆਂਬੱਧੀ ਉੱਚੀ ਬੋਲਣ ਨਾਲ ਉਹਨਾਂ ਦੇ ਵੋਕਲ ਕੋਰਡਜ਼ 'ਤੇ ਬਹੁਤ ਦਬਾਅ ਪੈਂਦਾ ਹੈ, ਜਿਸ ਨਾਲ ਆਵਾਜ਼ ਦਾ ਬੈਠਣਾ ਜਾਂ ਥਕਾਵਟ ਹੋ ਸਕਦੀ ਹੈ।",
        "ਆਪਣੀ ਆਵਾਜ਼ ਨੂੰ ਸੁਰੱਖਿਅਤ ਅਤੇ ਮਜ਼ਬੂਤ ਰੱਖਣ ਲਈ, ਵੋਕਲ ਹਾਈਜੀਨ ਦੀ ਪਾਲਣਾ ਕਰਨਾ ਜ਼ਰੂਰੀ ਹੈ। ਇੱਥੇ ਕੁਝ ਆਸਾਨ ਅਤੇ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਆਦਤਾਂ ਹਨ:",
        "1. ਹਾਈਡਰੇਟਿਡ ਰਹੋ: ਦਿਨ ਭਰ ਖੂਬ ਪਾਣੀ ਪੀਓ। ਵੋਕਲ ਕੋਰਡਜ਼ ਨੂੰ ਨਰਮ ਰਹਿਣ ਲਈ ਨਮੀ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ।",
        "2. ਵੌਇਸ ਐਂਪਲੀਫਾਇਰ ਦੀ ਵਰਤੋਂ ਕਰੋ: ਜੇਕਰ ਕਲਾਸਰੂਮ ਵੱਡਾ ਹੈ, ਤਾਂ ਮਾਈਕ੍ਰੋਫੋਨ ਦੀ ਵਰਤੋਂ ਕਰੋ ਤਾਂ ਜੋ ਉੱਚੀ ਬੋਲਣ ਦੀ ਲੋੜ ਨਾ ਪਵੇ।",
        "3. ਆਵਾਜ਼ ਨੂੰ ਆਰਾਮ ਦਿਓ: ਕਲਾਸਾਂ ਦੇ ਵਿਚਕਾਰ ਛੋਟੇ ਵੋਕਲ ਬ੍ਰੇਕ ਲਓ।",
        "4. ਫੁਸਫੁਸਾਉਣ ਤੋਂ ਬਚੋ: ਫੁਸਫੁਸਾਉਣਾ ਆਮ ਬੋਲਣ ਨਾਲੋਂ ਵੋਕਲ ਕੋਰਡਜ਼ 'ਤੇ ਜ਼ਿਆਦਾ ਦਬਾਅ ਪਾਉਂਦਾ ਹੈ।",
        "5. ਵੋਕਲ ਵਾਰਮ-ਅੱਪ ਕਰੋ: ਕਲਾਸ ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ 2-3 ਮਿੰਟ ਗੁਣਗੁਣਾਓ।",
        "ਜੇਕਰ ਆਵਾਜ਼ ਦਾ ਬੈਠਣਾ ਦੋ ਹਫ਼ਤਿਆਂ ਤੋਂ ਵੱਧ ਰਹਿੰਦਾ ਹੈ, ਤਾਂ ਸਾਡੇ ਕਲੀਨਿਕ ਵਿੱਚ ਆ ਕੇ ਜਾਂਚ ਕਰਵਾਓ। ਅਸੀਂ ਆਵਾਜ਼ ਦੀ ਦੇਖਭਾਲ ਲਈ ਵਿਸ਼ੇਸ਼ ਥੈਰੇਪੀ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਾਂ।"
      ],
      hi: [
        "शिक्षक पेशेवर रूप से अपनी आवाज का बहुत अधिक उपयोग करते हैं। हर दिन घंटों तेज आवाज में बोलने से वोकल कॉर्ड्स पर भारी दबाव पड़ता है, जिससे आवाज बैठना या थकान हो सकती है।",
        "अपनी आवाज को सुरक्षित और मजबूत रखने के लिए, अच्छी वोकल हाइजीन का पालन करना आवश्यक है। यहाँ कुछ सरल और प्रभावी आदतें दी गई हैं:",
        "1. हाइड्रेटेड रहें: दिन भर खूब पानी पिएं। वोकल कॉर्ड्स को सुचारू रूप से कार्य करने के लिए नमी की आवश्यकता होती है।",
        "2. वॉइस एम्पलीफायर का उपयोग करें: यदि क्लास बड़ी है, तो हल्के माइक और स्पीकर का उपयोग करें ताकि चिल्लाना न पड़े।",
        "3. आवाज को आराम दें: कक्षाओं के बीच में छोटे वोकल ब्रेक लें।",
        "4. फुसफुसाने से बचें: फुसफुसाने से वोकल कॉर्ड्स पर सामान्य रूप से बोलने से अधिक दबाव पड़ता है।",
        "5. वोकल वार्म-अप करें: क्लास शुरू करने से पहले 2-3 मिनट गुनगुनाएं।",
        "यदि आवाज का बैठना दो सप्ताह से अधिक समय तक बना रहता है, तो हमारे क्लिनिक में आकर जांच करवाएं। हम आवाज की देखभाल के लिए विशेष वॉयस थेरेपी प्रदान करते हैं।"
      ]
    }
  }
];
