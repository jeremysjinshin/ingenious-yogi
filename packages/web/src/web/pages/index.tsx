import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";

// ─── Store Products ───────────────────────────────────────────────
const products = [
  {
    id: 1,
    name: "Premium Artisanal Breath of Swami J",
    description: "Collected at peak exhale during a 90-minute pranayama session, each vial contains one complete exhalation of pure cosmic wisdom. Notes of cardamom, silence, and unshakeable certainty.",
    price: "$111",
    status: "SOLD OUT",
    image: "/lung-breath.png",
    imageStyle: { objectFit: 'contain' as const, background: 'transparent' },
  },
  {
    id: 2,
    name: "Crow Pose Sweat Reserve — 2026 Vintage",
    description: "Three (3) beads of authentic perspiration captured from the sacred brow of Swami J during an extended Bakasana hold. Vintage: extended morning practice, humid season, full moon. Certified organic.",
    price: "$222",
    status: "SOLD OUT",
    image: "/crow-pose.png",
    imageStyle: { objectFit: 'cover' as const, objectPosition: 'center' },
  },
  {
    id: 3,
    name: "High-Vibration River Rocks",
    description: "Each stone was held in the healing hands of Swami J for 36 cycles of complete exhalations while thinking lovely thoughts. May improve your energy and attract abundance. Great to use as a sentimental paperweight.",
    price: "$333",
    status: "SOLD OUT",
    image: "/river-rocks.png",
    imageStyle: { objectFit: 'cover' as const, objectPosition: 'center' },
  },
  {
    id: 4,
    name: "Beard Trimmings of Timeless Wisdom",
    description: "A small velvet pouch containing authentic trimmings from the sacred beard of Swami J, harvested at the new moon following a period of extended meditation. Place under your pillow, tuck into your wallet, or simply hold them and feel something.",
    price: "$444",
    status: "SOLD OUT",
    image: null,
    imageStyle: {},
    emoji: "✂️",
  },
  {
    id: 5,
    name: "Reserve Your Droplets",
    description: `3 Sacred Beads of Perspiration from the 108th Sun Salutation during next year's vernal equinox practice. Only $108 to reserve your vial. Tiny print: non-refundable pre-payment, even if Swami J never does the practice because he has something better to do.`,
    disclaimer: null,
    price: "$108",
    status: "RESERVE YOUR DROPLETS",
    isReal: true,
    stripeLink: "https://buy.stripe.com/placeholder",
    image: null,
    imageStyle: {},
    emoji: "🙏",
  },
];

// ─── Q&As ─────────────────────────────────────────────────────────
const qaItems = [
  {
    handle: "@soundhealinggongbanger",
    question: "Swami Young Ol' Lil Big J, if you are so wise, can you tell me the secret chord that David played to please the Lord?",
    answer: "Well hallelujah — what a question. You either really care about music, or you think you can stump me. The secret chord that David played to please the Lord isn't a secret to those who truly know Om. If you're playing in the key of C — the original key — it goes like this: the 4th, the 5th, the minor fall, the major lift, and into the dominant third. Which would be an E7. You're welcome. Hallelujah.",
  },
  {
    handle: "@trendyyogagoddess8675309",
    question: "When I'm in downward-facing dog and my teacher says 'take a deep breath'...",
    answer: "Let's stop right there. If your yoga teacher is still saying 'take a deep breath,' they don't understand the first thing about breath. We cannot take breath. Where exactly are we going to take it? We receive breath. We are being breathed by the cosmic source. Simply exhale completely and receive unlimited cosmic abundance. Then maybe find a new teacher.",
  },
  {
    handle: "@seekingenlightenment_probably",
    question: "What is it like to be enlightened?",
    answer: "There are no enlightened people. Only enlightened actions. Stop this video now and go do something nice for someone. I mean it. Right now. Close the tab.",
  },
];

// ─── Ornament Component ────────────────────────────────────────────
function Ornament() {
  return (
    <div className="flex items-center justify-center gap-4 my-2">
      <div className="h-px flex-1 max-w-24" style={{ background: '#B8963E' }} />
      <span style={{ color: '#B8963E', fontSize: '18px' }}>✦</span>
      <div className="h-px flex-1 max-w-24" style={{ background: '#B8963E' }} />
    </div>
  );
}

// ─── Nav ───────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { href: '#about', label: 'The Swami' },
    { href: '#ascension', label: 'The Teachings' },
    { href: '#sound-healing', label: 'The Octave' },
    { href: '#spiritual-name', label: 'Spiritual Name' },
    { href: '#store', label: 'Sacred Store' },
    { href: '#support', label: 'Support' },
    { href: '#chariot', label: 'The Chariot' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(250, 247, 242, 0.97)' : 'transparent',
        borderBottom: scrolled ? '1px solid #E8DDD0' : 'none',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 600, color: '#1A1A1A', textDecoration: 'none', letterSpacing: '0.02em' }}>
          The Ingenious Yogi
        </a>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 400, color: '#5A5047', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#C87941'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = '#5A5047'}>
              {l.label}
            </a>
          ))}
        </div>
        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1A1A1A' }}>
          <div style={{ width: '22px', height: '2px', background: '#1A1A1A', marginBottom: '5px' }} />
          <div style={{ width: '22px', height: '2px', background: '#1A1A1A', marginBottom: '5px' }} />
          <div style={{ width: '22px', height: '2px', background: '#1A1A1A' }} />
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden" style={{ background: '#FAF7F2', borderTop: '1px solid #E8DDD0', padding: '16px 24px' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ display: 'block', fontFamily: 'Jost, sans-serif', fontSize: '14px', color: '#5A5047', textDecoration: 'none', padding: '10px 0', borderBottom: '1px solid #E8DDD0', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle background texture */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(200, 121, 65, 0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
        {/* Profile image */}
        <div style={{ width: '160px', height: '160px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 32px', border: '3px solid #B8963E', boxShadow: '0 0 0 6px rgba(184, 150, 62, 0.12)' }}>
          <img src="/swami-profile.jpg" alt="Swami Young Ol' Lil Big J" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        </div>

        <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8963E', marginBottom: '16px' }}>
          The Official Presence of
        </div>

        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, lineHeight: 1.1, color: '#C87941', marginBottom: '24px', letterSpacing: '-0.01em' }}>
          <span style={{ fontSize: 'clamp(52px, 8.5vw, 88px)', display: 'block' }}>Swami</span>
          <span style={{ fontSize: 'clamp(32px, 5vw, 56px)', display: 'block' }}>Young Ol' Lil Big J</span>
        </h1>

        <Ornament />

        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(16px, 2.5vw, 20px)', fontStyle: 'italic', fontWeight: 700, color: '#5A5047', margin: '24px 0 8px', lineHeight: 1.8 }}>
          Cosmic Physio-Philosopher · Meridian Theory Savant · Yoga Guru<br />
          Pulse-Listening Meditation Teacher · Sound Sculptor · Amateur Pianist
        </p>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '15px', color: '#5A5047', marginBottom: '40px', lineHeight: 1.8, maxWidth: '480px', margin: '12px auto 24px' }}>
          Dedicated to helping you become aware and in control of the universal forces which are within your personal field of life experience.
        </p>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C87941', marginBottom: '32px' }}>
          E-RYT 500 · 100hr Yin TTC · YACEP · Yoga Alliance Certified
        </p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center', marginBottom: '32px' }}>
          <img src="/badge-eryt500.png" alt="E-RYT 500" style={{ height: '72px', width: 'auto' }} />
          <img src="/badge-yacep.png" alt="YACEP" style={{ height: '72px', width: 'auto' }} />
        </div>


      </div>
    </section>
  );
}

// ─── About Section ─────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ padding: '100px 24px', borderTop: '1px solid #E8DDD0' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8963E', marginBottom: '12px' }}>About</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 500, color: '#1A1A1A' }}>The Swami</h2>
          <Ornament />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '26px', fontStyle: 'italic', fontWeight: 700, color: '#C87941', lineHeight: 1.5, textAlign: 'center', letterSpacing: '0.02em' }}>
            Young at Heart &nbsp;~&nbsp; Ol' Soul &nbsp;~&nbsp; Lil' Salty &nbsp;~&nbsp; Big Jenius
          </p>

          <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '16px', color: '#3A3030', lineHeight: 1.9 }}>
            <p style={{ marginBottom: '20px' }}>
              Swami J is directly connected with the Main Central Universal Harmonizing Divine Cosmic Energy flowing between the Heavens and the Earth. He is astutely aware of how this powerful healing force flows through his left and right hands, which he lays on others to help bring them into alignment with Oneness.
            </p>
            <p style={{ marginBottom: '20px' }}>
              He muses lyrically about Heavenly stardust spiraling into Earthly matter to form our intelligently designed flesh and bone meat-sacks, and is supposed to be expressing through us as joy, laughter, and compassion.
            </p>
            <p style={{ marginBottom: '20px' }}>
              True, without falsehood: you were born with this cosmic awareness. When you arrived here, you did not recognize separateness from source energy for the first several months of your life. As you realised you were an individualised aspect of Universal Life Energy, it is natural to become preoccupied with your Self.
            </p>
            <p style={{ marginBottom: '20px' }}>
              Due to being born in an emotionally regressed society that glorifies consumption, material possessions, and hierarchical status, only your lower, minor forces have been developed. Don't be ashamed or embarrassed, this was Swami J's trajectory also. And just like a wise spiritual master appeared when Swami J was ready to awaken to self-actualisation, he is now here to help you kumbaya with the Cosmos.
            </p>
            <p>
              Swami J has 30 years of experience guiding people straight towards the Light like moths to a flame, and is certified by Yoga Alliance as a continuing education provider, so that makes all of this totally legit.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px', justifyContent: 'center' }}>
            {['E-RYT 500', '100hr Yin TTC', 'YACEP', 'Yoga Alliance Certified'].map(badge => (
              <span key={badge} style={{ fontFamily: 'Jost, sans-serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 14px', border: '1px solid #B8963E', color: '#B8963E', borderRadius: '2px' }}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Ascension Section ─────────────────────────────────────────────
function Ascension() {
  return (
    <section id="ascension" style={{ padding: '100px 24px', background: '#FAF7F2', borderTop: '1px solid #E8DDD0' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8963E', marginBottom: '12px' }}>Begin or Continue Your Ascension</div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 500, color: '#1A1A1A', marginBottom: '16px' }}>The Real Teachings</h2>
        <Ornament />

        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '16px', color: '#3A3030', lineHeight: 1.9, marginTop: '32px', marginBottom: '32px' }}>
          Swami J highly recommends taking this world-renowned online Yin Yoga &amp; Meridian Theory Teacher Training Course that illustrates and artfully articulates how your energetic blueprint mirrors the stars and is energetically tethered with your 12 major organ functions. Interspersed are demonstrations of how to use your hands as energetic conduits to help energy circulate and harmonize.
        </p>

        <a
          href="https://www.yinyogameridians.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '20px 48px',
            background: '#FFFFFF',
            color: '#1A1A1A',
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '28px',
            fontStyle: 'italic',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textDecoration: 'none',
            borderRadius: '2px',
            border: '4px solid #C87941',
            marginBottom: '48px',
          }}>
          yinyogameridians.com
        </a>

        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '16px', color: '#3A3030', lineHeight: 1.9 }}>
          Complete this highly enlightening course at your own pace and receive a Yoga Alliance approved 30-hour Teacher Training Certificate.
        </p>
      </div>
    </section>
  );
}

// ─── Sound Healing Section ─────────────────────────────────────────
function SoundHealing() {
  return (
    <section id="sound-healing" style={{ padding: '100px 24px', background: '#1A1A1A', borderTop: '1px solid #3A3030' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8963E', marginBottom: '12px' }}>The Music of the Spheres</div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 500, color: '#FAF7F2', marginBottom: '16px' }}>Sound Healing Sacred Vibrational Cosmic Attunement Course</h2>
        <Ornament />
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontStyle: 'italic', color: '#C87941', marginTop: '32px', marginBottom: '40px', letterSpacing: '0.02em' }}>
          To know the octave is to know the higher self. <span style={{ fontSize: '1.4em', verticalAlign: 'middle' }}>ॐ</span>
        </p>

        <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '16px', color: '#D4C4B0', lineHeight: 1.9, textAlign: 'left' }}>
          <p style={{ marginBottom: '24px', fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontStyle: 'italic', color: '#FAF7F2' }}>
            Before we made music, music made us. Sound is before the form.
          </p>
          <p style={{ marginBottom: '24px' }}>
            As the heavenly bodies whirl through space, they emit a specific tone, a frequency, determined by their size and speed. This is not metaphor. It's not a joke. This is physics. Your atoms and molecules are doing the same thing, whirling at various speeds and emitting specific frequencies. You are, at your most fundamental level, a chord. Stacked intervals of specific pitches spaced apart in mathematical perfection and geometrical beauty that mirrors the cosmos. As above, so below; as without, so within.
          </p>
          <p style={{ marginBottom: '24px' }}>
            You are vibrating quarks and stardust temporarily organised into the magnificent meat-sack you call your body, a mirror reflection of the Cosmos, humming with the same harmonic order that holds the planets in their orbits.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Whenever illness and disharmony appear in the physical body, your cellular vibrational frequencies have fallen out of tune with the Universe. The Cosmos did not change. You drifted.
          </p>
          <p style={{ marginBottom: '24px' }}>
            All you need for this course is your voice. Om along in the divine pre-recorded presence of Swami J as he intones each of the 12 sacred frequencies on the faux ebony and ivories and Oms along with you. Each of the 12 lessons includes a description of the spiritual, numerological, and energetic significance.
          </p>
          <p style={{ marginBottom: '24px' }}>
            The course begins on the sacred resonance of A=432 Hz. Each lesson descends through 12 equal temperaments of one octave ~ 8 ~ corresponding precisely with each of the 12 major organ energy meridians.
          </p>
          <p style={{ marginBottom: '40px', fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontStyle: 'italic', fontWeight: 700, color: '#C87941', textAlign: 'left' }}>
            Pick up some good vibrations and give yourself some excitations. You've got the music in you.
          </p>
        </div>

        {/* Course screenshot placeholder — swap in real image once filmed */}
        <div style={{ border: '2px dashed #3A3030', borderRadius: '2px', padding: '60px 40px', marginBottom: '40px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '26px', fontWeight: 700, color: '#D4C4B0' }}>
            Coming soon. Recording in process.
          </p>
        </div>

        {/* Purchase button placeholder */}
        <a
          href="https://buy.stripe.com/placeholder-sound-healing"
          style={{
            display: 'inline-block',
            padding: '16px 48px',
            background: '#C87941',
            color: '#1A1A1A',
            fontFamily: 'Jost, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: '2px',
          }}>
          Get Cosmically Attuned — $19.64
        </a>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#D4C4B0', marginTop: '16px', letterSpacing: '0.08em' }}>
          Lifetime Access.
        </p>
      </div>
    </section>
  );
}

// ─── Ask the Swami ─────────────────────────────────────────────────
function AskTheSwami() {
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: { name: string; question: string }) => {
      const res = await api['ask-swami'].$post({ json: data });
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      setName('');
      setQuestion('');
    },
  });

  return (
    <section id="ask" style={{ padding: '80px 24px', borderTop: '1px solid #E8DDD0' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8963E', marginBottom: '12px' }}>Seek Wisdom</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 500, color: '#1A1A1A' }}>Ask the Swami</h2>
          <Ornament />
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', color: '#5A5047', marginTop: '16px' }}>
            He knows everything. And if he doesn't, he'll make something up.
          </p>
        </div>

        {/* Submit form */}
        <div>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6A5A', textAlign: 'center', marginBottom: '24px', letterSpacing: '0.04em' }}>
            Your question may be answered in a future video. Or it may not. The universe decides.
          </p>

          {submitted ? (
            <div style={{ padding: '32px', background: '#F5E6D3', borderRadius: '2px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontStyle: 'italic', color: '#C87941', marginBottom: '8px' }}>
                The question has been received.
              </p>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', color: '#5A5047' }}>
                Swami J will consult the universe and respond when the time is cosmically appropriate.
              </p>
              <button onClick={() => setSubmitted(false)} style={{ marginTop: '16px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#C87941', textDecoration: 'underline' }}>
                Ask another question
              </button>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); if (name && question) mutation.mutate({ name, question }); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5A5047', display: 'block', marginBottom: '8px' }}>
                  Your Name or Handle
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="@yourusername or Your Name"
                  required
                  style={{ width: '100%', padding: '14px 16px', fontFamily: 'Jost, sans-serif', fontSize: '15px', border: '1px solid #E8DDD0', borderRadius: '2px', background: '#FFFFFF', color: '#1A1A1A', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5A5047', display: 'block', marginBottom: '8px' }}>
                  Your Question for the Swami
                </label>
                <textarea
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  placeholder="O great Swami, I humbly ask..."
                  required
                  rows={5}
                  style={{ width: '100%', padding: '14px 16px', fontFamily: 'Jost, sans-serif', fontSize: '15px', border: '1px solid #E8DDD0', borderRadius: '2px', background: '#FFFFFF', color: '#1A1A1A', outline: 'none', resize: 'vertical' }}
                />
              </div>
              {mutation.isError && (
                <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', color: '#c0392b' }}>
                  Something went wrong. The cosmos is unavailable. Please try again.
                </p>
              )}
              <button
                type="submit"
                disabled={mutation.isPending}
                style={{ padding: '14px 32px', background: mutation.isPending ? '#A8652F' : '#C87941', color: '#FFFFFF', fontFamily: 'Jost, sans-serif', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', borderRadius: '2px', cursor: mutation.isPending ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
                {mutation.isPending ? 'Transmitting to the cosmos...' : 'Submit Question'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Sacred Store ──────────────────────────────────────────────────
function SacredStore() {
  return (
    <section id="store" style={{ padding: '100px 24px', background: '#FFFFFF', borderTop: '1px solid #E8DDD0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8963E', marginBottom: '12px' }}>Curated Relics of Consciousness</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 500, color: '#1A1A1A' }}>The Sacred Store</h2>
          <Ornament />
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '15px', color: '#5A5047', marginTop: '16px', maxWidth: '540px', margin: '16px auto 0' }}>
            Authentic spiritual artifacts, ethically sourced from the practice of Swami J himself. Demand is extraordinary. Supply is limited.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {products.map(product => (
            <div key={product.id} style={{ background: '#FAF7F2', border: '1px solid #E8DDD0', borderRadius: '2px', padding: '0', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
              {/* Status badge */}
              <div style={{
                position: 'absolute', top: '12px', right: '12px', zIndex: 2,
                fontFamily: 'Jost, sans-serif', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '4px 10px', borderRadius: '2px',
                background: product.isReal ? '#C87941' : '#3A3030',
                color: '#FFFFFF',
              }}>
                {product.status}
              </div>

              {/* Image or emoji */}
              {product.image ? (
                <div style={{ width: '100%', height: product.id === 2 ? '220px' : '160px', overflow: 'hidden', background: product.id === 1 ? '#f0f7f0' : '#E8DDD0' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', ...product.imageStyle }} />
                </div>
              ) : (
                <div style={{ width: '100%', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
                  {product.emoji}
                </div>
              )}

              <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 600, color: '#1A1A1A', marginBottom: '12px', lineHeight: 1.3 }}>
                {product.name}
              </h3>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#5A5047', lineHeight: 1.7, flex: 1, marginBottom: '20px' }}>
                {product.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '26px', fontWeight: 600, color: '#C87941' }}>{product.price}</span>
                {product.isReal && (
                  <a
                    href={product.stripeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: '10px 20px', background: '#C87941', color: '#FFFFFF', fontFamily: 'Jost, sans-serif', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px' }}>
                    Reserve Droplets
                  </a>
                )}
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Support / Donation ────────────────────────────────────────────
function Support() {
  return (
    <section id="support" style={{ padding: '100px 24px', borderTop: '1px solid #E8DDD0' }}>
      <div style={{ maxWidth: '660px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8963E', marginBottom: '12px' }}>
          A Moment of Radical Honesty
        </div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 500, color: '#1A1A1A', marginBottom: '24px' }}>
          Support the Mission
        </h2>
        <Ornament />
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontStyle: 'italic', color: '#5A5047', margin: '32px 0 32px', lineHeight: 1.6 }}>
          "Pouring spiritual truth, not cheap intoxicating spirits."
        </p>

        <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '16px', color: '#3A3030', lineHeight: 1.9, textAlign: 'left' }}>
          <p style={{ marginBottom: '24px' }}>
            Just because Swami J <em>can</em> turn water into wine, even though he doesn't, because steady wine-drinking over multiple decades eventually dulls your Conscious Awareness and slowly dims your Inner Light, he does not yet have the ability to turn green paper into legal tender. And he cannot, in good conscience, charge a fee for dispensing cosmic wisdom that is already innate within you.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Swami J has experienced a series of unfortunate events while living out here in the Devil's Playground trying to enlighten all these heathens. Battling demons isn't cheap.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Swami J is seeking Angel Investors to Support the Mission of Uniting All Humanity on Spaceship Earth in Oneness with The Divine Love-Light Cosmic Orchestra.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Maybe you have been fortunate enough to spend the last few decades enjoying some of the finer things in life, like yearly wine club memberships, luxury cruises, wine trips to France, and haute cuisine, and are just now waking up to the realization that you have never really made a significant investment towards the betterment of humanity or the generations that come after you.
          </p>
          <p style={{ marginBottom: '40px' }}>
            Or perhaps you're an evolved, compassionate soul who enjoys giving to worthy causes and have a few bucks, or several hundred, or let's not limit ourselves here, the Universe is abundant. No amount is too small or too large.
          </p>
        </div>

        <a
          href="https://donate.stripe.com/3cI5kC0BfbgVfYM0Fr5ZC01"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-block', padding: '16px 48px', background: '#C87941', color: '#FFFFFF', fontFamily: 'Jost, sans-serif', fontSize: '14px', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px' }}>
          Be an Angel
        </a>

        <div style={{ marginTop: '48px', textAlign: 'left', borderTop: '1px solid #E8DDD0', paddingTop: '32px' }}>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B8963E', marginBottom: '16px' }}>
            Where the funds currently go
          </p>
          {[
            'Feeding stray cats',
            'Keeping the lights on in the Devil\'s Playground (Basic survival & shelter)',
            'Funding the tech behind the Music of the Spheres sound course',
            'Amplifying the broadcast to reach more souls across Spaceship Earth',
            'Would like to set up a system to feed the local street dogs',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <span style={{ color: '#C87941', fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', lineHeight: 1.5, flexShrink: 0 }}>✦</span>
              <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '15px', color: '#5A5047', lineHeight: 1.7, margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: '48px 24px', background: '#1A1A1A', color: '#9A8A7A', textAlign: 'center', borderTop: '3px solid #B8963E' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: 500, color: '#E8DDD0', marginBottom: '8px' }}>
          The Ingenious Yogi
        </p>
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6A5A', marginBottom: '24px', fontStyle: 'italic' }}>
          Swami Young Ol' Lil Big J · E-RYT 500 · YACEP · Yoga Alliance Certified
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <a href="https://www.yinyogameridians.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#B8963E', textDecoration: 'none', letterSpacing: '0.06em' }}>
            YinYogaMeridians.com
          </a>
          <a href="#store" style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6A5A', textDecoration: 'none', letterSpacing: '0.06em' }}>
            Sacred Store
          </a>
          <a href="https://www.youtube.com/@SwamiyoungoliLilBigJ" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#7A6A5A', textDecoration: 'none', letterSpacing: '0.06em' }}>
            YouTube
          </a>
        </div>

        <div style={{ height: '1px', background: '#2A2A2A', margin: '24px 0' }} />
        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#5A5047' }}>
          © 2026 The Ingenious Yogi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── Spiritual Name Section ────────────────────────────────────────
function SpiritualName() {
  const [showCert, setShowCert] = useState(false);

  return (
    <section id="spiritual-name" style={{ padding: '100px 24px', borderTop: '1px solid #E8DDD0' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8963E', marginBottom: '12px' }}>
            A Sacred Gift
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 500, color: '#1A1A1A', lineHeight: 1.15 }}>
            What's In a Spiritual Name?
          </h2>
          <Ornament />
        </div>

        {/* Story */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '48px' }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontStyle: 'italic', color: '#5A5047', lineHeight: 1.7, borderLeft: '3px solid #B8963E', paddingLeft: '24px' }}>
            "A name is not merely a label. It is a descriptor of your soul. A vibration. The sounds and syllables of your name reverberate with the Cosmic Frequencies, aligning you in attunement with the Angelic Symphony."
          </p>

          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '16px', color: '#3A3030', lineHeight: 1.9 }}>
            In the yogic and Vedic traditions, a spiritual name serves as a vehicle for transformation. When you receive a name calibrated to your birth chart, the exact moment the cosmos stamped itself onto your soul, you are given a new vibrational identity. You begin to inhabit it. You grow into it. People start to call you by it, and each time they do, the universe keeps you in alignment.
          </p>

          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '16px', color: '#3A3030', lineHeight: 1.9 }}>
            The name <em>Swami Young Ol' Lil Big J</em> was not chosen. It was received. Bestowed upon him by the spiritual elders of Rishikesh, when they heard Swami J pontificate on the process of how Universal Cosmic Life-Force Energy spirals into our stardust-encrusted intelligently designed meat-sacks as joy, laughter, and compassion, while demonstrating the miraculous magnetism of his healing hands.
          </p>

          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '16px', color: '#3A3030', lineHeight: 1.9 }}>
            Swami J is the perfect example and living proof of how receiving a Cosmically Aligned Spiritual Name transforms and purifies one's personality. Before receiving his spiritual name, he was just an ordinary average everyday all-around genuinely nice guy. And just look at him now.
          </p>

          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '16px', color: '#3A3030', lineHeight: 1.9 }}>
            Everyone who has requested a Spiritual Name from Swami J so far has reported a feeling of immediate elation. Some have reported life-changing transformations. These claims have not been scientifically verified. They are, however, cosmically plausible.
          </p>
        </div>

        {/* The Offer */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E8DDD0', borderTop: '3px solid #B8963E', borderRadius: '2px', padding: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 500, color: '#1A1A1A', lineHeight: 1.2, marginBottom: '16px' }}>
              Swami J Will Give You<br />
              <span style={{ color: '#C87941' }}>Your Spiritual Name</span><br />
              — For Free
            </h3>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '15px', color: '#5A5047', lineHeight: 1.8, maxWidth: '520px', margin: '0 auto' }}>
              Provide your <strong>date, time, and place of birth</strong> (or full birth chart) and Swami J will consult the cosmic frequencies, cross-reference the angelic overtones, and bestow upon you a name uniquely calibrated to your soul's journey. Delivered as a printable PDF certificate.
            </p>
          </div>

          {/* Certificate preview toggle */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <button
              onClick={() => setShowCert(!showCert)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Jost, sans-serif', fontSize: '13px', color: '#B8963E', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'underline' }}>
              {showCert ? 'Hide Sample Certificate' : 'View Sample Certificate'}
            </button>
          </div>

          {showCert && (
            <div style={{ marginBottom: '24px', border: '1px solid #E8DDD0', borderRadius: '2px', overflow: 'hidden' }}>
              <img src="/cert-preview.jpg" alt="Sample Certificate of Cosmic Harmonious Naming — Divine Megahertz Goddess" style={{ width: '100%', display: 'block' }} />
              <div style={{ padding: '12px 16px', background: '#FAF7F2', borderTop: '1px solid #E8DDD0', display: 'flex', justifyContent: 'center' }}>
                <a href="/sample-certificate.pdf" target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#C87941', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid #C87941' }}>
                  Download Sample PDF
                </a>
              </div>
            </div>
          )}

          {/* Pricing & CTA */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '18px', fontWeight: 500, color: '#5A5047', marginBottom: '4px' }}>
              Completely Free
            </p>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 600, color: '#1A1A1A', marginBottom: '24px', lineHeight: 1.2 }}>
              + $64.19 electronic earthly processing fee
            </p>
            <a
              href="https://buy.stripe.com/placeholder-naming"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', padding: '16px 40px', background: '#C87941', color: '#FFFFFF', fontFamily: 'Jost, sans-serif', fontSize: '14px', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px', marginBottom: '16px' }}>
              Receive Your Spiritual Name — $64.19
            </a>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#9A8A7A', fontStyle: 'italic', lineHeight: 1.7 }}>
              After payment, email your birth details to{' '}
              <a href="mailto:jeremy.meridianttc@gmail.com" style={{ color: '#C87941', textDecoration: 'none' }}>
                jeremy.meridianttc@gmail.com
              </a>
              .<br />
              Swami J will respond within 3–7 cosmic business days, or whenever the universe prompts him.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Chariot of Vibrational Enlightenment ─────────────────────────
function ChariotOfEnlightenment() {
  const tiers = [
    {
      amount: '$10',
      title: 'The Long-Distance High Five',
      description: 'Swami J will direct a focused beam of radiant loving-kindness toward your general direction immediately after the funds clear, from wherever he happens to be on the dirt roads of Kampot. You\'ll totally feel it.',
    },
    {
      amount: '$50',
      title: 'The Sharpie of Eternal Gratitude',
      description: 'Receive everything above and your normal name, or your cosmically aligned spiritual name, will be hand-written by Swami J in permanent marker on the interior ceiling of the Chariot of Vibrational Enlightenment. You\'ll always be along for the ride.',
    },
    {
      amount: '$250',
      title: 'The Golden Passenger Status',
      description: 'Receive everything above and three days of unlimited rides if you ever find yourself in the peppercorn capital of the world looking to spice up your life. Includes complimentary coconut water and unprompted life advice from Swami J, whether you want it or not.',
    },
    {
      amount: '$3,500',
      title: 'The Ultimate Cosmic Executive Benefactor',
      description: 'Receive everything from above and your portrait will be hand-painted on the mudflaps. Swami J will personally astral-travel to you and virtually shower you with blessings. You will be known as the Official Cosmic Patron of the Vibrational Enlightenment Mission. This is the highest honor available on this website.',
    },
  ];

  return (
    <section id="chariot" style={{ padding: '100px 24px', background: '#FAF7F2', borderTop: '1px solid #E8DDD0' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8963E', marginBottom: '12px' }}>
            A Crowdfunding Appeal of the Highest Order
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 500, color: '#1A1A1A', lineHeight: 1.15, marginBottom: '8px' }}>
            The Chariot of Vibrational Enlightenment
          </h2>
          <Ornament />
        </div>

        {/* Kenneth Copeland intro text */}
        <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '16px', color: '#3A3030', lineHeight: 1.9, marginBottom: '48px' }}>
          <p style={{ marginBottom: '24px' }}>
            If Kenneth Copeland can do it, Swami J can too. If televangelists and religious grifters can ask their gullible flocks with a straight face and without shame to crowdfund their multi-million dollar private jets to allegedly spread their teachings, Swami J can act like he is not ashamed. And Swami J doesn't even want a jet.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Kenneth Copeland has famously stated that he cannot fly commercial because airports are "a demonically infested place." Swami J keeps his feet firmly on Earth, walking amongst everyday people, facing any demons he encounters eye to eye. He is a humbler, more grounded servant of the cosmos. Swami J is crowdfunding to acquire a tuk tuk to expand the mission of spreading loving-kindness through the "Kingdom of Wonder," exposed to the elements, the dust, and yes, whatever demonic presences may be lurking along the roadside. He meets them head-on, with a coconut in one hand and a convincing message of universal peace.
          </p>
          <p style={{ marginBottom: '40px' }}>
            The vision is a Chariot worthy of the Mission. Vibrationally calibrated. Aesthetically aligned. Mechanically reliable enough to make it to the next yoga retreat without intervention from a higher power. This is where you come in.
          </p>

          {/* Side by side images */}
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '200px', maxWidth: '300px', textAlign: 'center' }}>
              <div style={{ border: '1px solid #E8DDD0', borderRadius: '2px', overflow: 'hidden', marginBottom: '10px' }}>
                <img
                  src="/kenneth-jet.png"
                  alt="Kenneth Copeland's Gulfstream V"
                  style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: '200px' }}
                />
              </div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontStyle: 'italic', fontWeight: 600, color: '#3A3030', lineHeight: 1.6 }}>
                Their gluttony.<br />
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 500, color: '#5A5047', letterSpacing: '0.04em' }}>Millions and millions.</span>
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', paddingTop: '60px' }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', color: '#B8963E' }}>~</span>
            </div>

            <div style={{ flex: '1', minWidth: '200px', maxWidth: '300px', textAlign: 'center' }}>
              <div style={{ border: '1px solid #E8DDD0', borderRadius: '2px', overflow: 'hidden', marginBottom: '10px' }}>
                <img
                  src="/tuk-tuk.jpg"
                  alt="The current chariot situation"
                  style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: '200px' }}
                />
              </div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontStyle: 'italic', fontWeight: 600, color: '#3A3030', lineHeight: 1.6 }}>
                Our humility.<br />
                <span style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', fontWeight: 500, color: '#C87941', letterSpacing: '0.04em' }}>Only $3,500.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Donation tiers */}
        <div style={{ marginBottom: '48px' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 500, color: '#1A1A1A', textAlign: 'center', marginBottom: '32px' }}>
            Choose Your Level of Cosmic Contribution
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {tiers.map((tier, i) => (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E8DDD0',
                  borderLeft: '4px solid #B8963E',
                  borderRadius: '2px',
                  padding: '28px 32px',
                  display: 'flex',
                  gap: '28px',
                  alignItems: 'flex-start',
                }}>
                <div style={{ flexShrink: 0, textAlign: 'center', minWidth: '72px' }}>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 600, color: '#C87941', display: 'block', lineHeight: 1 }}>
                    {tier.amount}
                  </span>
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 600, color: '#1A1A1A', marginBottom: '8px', lineHeight: 1.3 }}>
                    {tier.title}
                  </h4>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '14px', color: '#5A5047', lineHeight: 1.8, margin: 0 }}>
                    {tier.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Single CTA button */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontStyle: 'italic', color: '#5A5047', marginBottom: '28px', lineHeight: 1.6 }}>
            Kenneth Copeland did not get his jet by hoping. He asked. Swami J is asking.
          </p>
          <a
            href="https://donate.stripe.com/eVq3cufw9gBfaEs87T5ZC02"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '16px 48px',
              background: '#C87941',
              color: '#FFFFFF',
              fontFamily: 'Jost, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
            }}>
            Contribute to the Chariot
          </a>
          <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '12px', color: '#9A8A7A', marginTop: '16px', fontStyle: 'italic' }}>
            Pay what you feel. The cosmos is watching.
          </p>
        </div>

      </div>
    </section>
  );
}

// ─── Main Export ───────────────────────────────────────────────────
export default function IndexPage() {
  return (
    <div>
      <Nav />
      <Hero />
      <About />
      <Ascension />
      <SoundHealing />
      <SpiritualName />
      <SacredStore />
      <Support />
      <ChariotOfEnlightenment />
      <Footer />
    </div>
  );
}
