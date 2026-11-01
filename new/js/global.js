/* ================================================
   FRANCISCA BOATENG — GLOBAL JAVASCRIPT
================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- NAVBAR SCROLL EFFECT ---- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ---- MOBILE NAV TOGGLE ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- REVEAL ON SCROLL ---- */
  const revealEls = document.querySelectorAll(
    '.pillar-card, .impact-item, .origin-text, .origin-portrait, .portrait-text, .portrait-image, .faith-inner, .testimonial-card'
  );
  revealEls.forEach(el => el.classList.add('reveal'));
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---- SPEAKLIFE WIDGET ---- */
  const verses = [
    { text: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13" },
    { text: "For I know the plans I have for you, declares the Lord — plans to prosper you and not to harm you, plans to give you hope and a future.", ref: "Jeremiah 29:11" },
    { text: "The Lord is my light and my salvation — whom shall I fear?", ref: "Psalm 27:1" },
    { text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", ref: "Joshua 1:9" },
    { text: "Now faith is confidence in what we hope for and assurance about what we do not see.", ref: "Hebrews 11:1" },
    { text: "Trust in the Lord with all your heart and lean not on your own understanding.", ref: "Proverbs 3:5" },
    { text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.", ref: "Isaiah 40:31" },
    { text: "For God has not given us a spirit of fear, but of power and of love and of a sound mind.", ref: "2 Timothy 1:7" },
    { text: "Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you.", ref: "Deuteronomy 31:6" },
    { text: "Commit to the Lord whatever you do, and he will establish your plans.", ref: "Proverbs 16:3" },
    { text: "And we know that in all things God works for the good of those who love him.", ref: "Romans 8:28" },
    { text: "No weapon forged against you will prevail, and you will refute every tongue that accuses you.", ref: "Isaiah 54:17" },
    { text: "Blessed is she who has believed that the Lord would fulfil his promises to her.", ref: "Luke 1:45" },
    { text: "The Lord your God is in your midst, a mighty one who will save; he will rejoice over you with gladness.", ref: "Zephaniah 3:17" },
    { text: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.", ref: "Matthew 7:7" },
    { text: "She is clothed with strength and dignity; she can laugh at the days to come.", ref: "Proverbs 31:25" },
    { text: "May the God of hope fill you with all joy and peace as you trust in him.", ref: "Romans 15:13" },
    { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", ref: "Philippians 4:6" },
    { text: "The righteous person may have many troubles, but the Lord delivers them from them all.", ref: "Psalm 34:19" },
    { text: "Your word is a lamp for my feet, a light on my path.", ref: "Psalm 119:105" },
    { text: "Be still, and know that I am God.", ref: "Psalm 46:10" },
    { text: "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit.", ref: "John 15:5" },
    { text: "The Spirit you received does not make you slaves, so that you live in fear again; rather, the Spirit you received brought about your adoption to sonship.", ref: "Romans 8:15" },
    { text: "Come to me, all you who are weary and burdened, and I will give you rest.", ref: "Matthew 11:28" },
    { text: "I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.", ref: "John 16:33" },
    { text: "Everything is possible for one who believes.", ref: "Mark 9:23" },
    { text: "The Lord will fight for you; you need only to be still.", ref: "Exodus 14:14" },
    { text: "See, I am doing a new thing! Now it springs up; do you not perceive it?", ref: "Isaiah 43:19" },
    { text: "And my God will meet all your needs according to the riches of his glory in Christ Jesus.", ref: "Philippians 4:19" },
    { text: "For with God nothing will be impossible.", ref: "Luke 1:37" },
    { text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.", ref: "Galatians 6:9" }
  ];

  const widget = document.getElementById('speaklifeWidget');
  const toggleBtn = document.getElementById('speaklifeToggle');
  const card = document.getElementById('speaklifeCard');
  const closeBtn = document.getElementById('speaklifeClose');
  const verseEl = document.getElementById('speaklifeVerse');
  const refEl = document.getElementById('speaklifeRef');
  const shareBtn = document.getElementById('speaklifeShare');
  const nextBtn = document.getElementById('speaklifeNext');

  if (toggleBtn && card) {
    // Get daily verse (changes by day of year)
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    let verseIdx = dayOfYear % verses.length;

    function showVerse(idx) {
      if (verseEl) verseEl.textContent = '"' + verses[idx].text + '"';
      if (refEl) refEl.textContent = '— ' + verses[idx].ref;
    }
    showVerse(verseIdx);

    toggleBtn.addEventListener('click', () => {
      card.classList.toggle('open');
    });
    if (closeBtn) closeBtn.addEventListener('click', () => card.classList.remove('open'));

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        verseIdx = (verseIdx + 1) % verses.length;
        showVerse(verseIdx);
        verseEl.style.animation = 'none';
        void verseEl.offsetWidth;
        verseEl.style.animation = 'fadeIn 0.5s ease';
      });
    }
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        const text = `"${verses[verseIdx].text}" — ${verses[verseIdx].ref}`;
        if (navigator.share) {
          navigator.share({ title: 'SpeakLife Daily Word', text }).catch(() => {});
        } else if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => {
            shareBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => { shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share'; }, 2000);
          });
        }
      });
    }

    // Auto-show after 8 seconds, once per session
    if (!sessionStorage.getItem('speaklife_shown')) {
      setTimeout(() => {
        card.classList.add('open');
        sessionStorage.setItem('speaklife_shown', '1');
      }, 8000);
    }
  }

  /* ---- WHATSAPP WIDGET ---- */
  const waBtn = document.getElementById('whatsappButton');
  const waChat = document.getElementById('whatsappChat');
  const waClose = document.getElementById('closeChat');
  const waSend = document.getElementById('sendBtn');
  const waStart = document.getElementById('startChatBtn');
  const waInput = document.getElementById('messageInput');

  const WHATSAPP_NUMBER = '17039309011';

  if (waBtn && waChat) {
    waBtn.addEventListener('click', () => {
      waChat.classList.toggle('open');
    });
    if (waClose) waClose.addEventListener('click', () => waChat.classList.remove('open'));

    function sendToWhatsApp() {
      const msg = waInput ? waInput.value.trim() : '';
      const url = `https://wa.me/${WHATSAPP_NUMBER}${msg ? '?text=' + encodeURIComponent(msg) : ''}`;
      window.open(url, '_blank');
    }
    if (waSend) waSend.addEventListener('click', sendToWhatsApp);
    if (waStart) waStart.addEventListener('click', sendToWhatsApp);
    if (waInput) {
      waInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendToWhatsApp(); } });
    }
  }

  /* ---- SMOOTH SCROLL FOR HASH LINKS ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
