import peopleWatchingPeopleImage from "../PWP.webp";
import amoebaCover from "../amoeba-cover.jpg";
import ifIForgetCover from "../if-i-forget-cover.jpg";
import acesCover from "../aces-cover.jpg";
import pwpIntro from "../pwp-intro.mp3";
import pwpOutro from "../pwp-outro.mp3";
import itpSchoolImage from "../itp-school.webp";
import berkleeSchoolImage from "../berklee-school.webp";
import mercorShowcaseImage from "../mercor.svg";
import jujubeShowcaseImage from "../jujube2-showcase.webp";
import nyuPsychShowcaseImage from "../nyupsych-showcase.webp";
import nyuItpSiteShowcaseImage from "../nyuitpsite-showcase.webp";
import researchPaperPdf from "../research.pdf";

export const portfolioData = {
  name: "Ray Cogliano",
  bio: "Creative Developer & Producer\nbuilding audio-tech and web experiences, based\u00a0in\u00a0New\u00a0York\u00a0City",
  coordinates: "40.74344197625022, -73.98818390071976",
  coordinatesUrl:
    "https://www.google.com/maps?q=40.74344197625022,-73.98818390071976",
  sections: [
    {
      title: "Work",
      items: [
        {
          id: "mercor-ai-model-trainer",
          title: "Mercor",
          logoStyle: "mercor",
          showcaseImage: mercorShowcaseImage,
          showcaseImageAlt: "Mercor AI platform illustration",
          role: "AI Model Trainer (Music)",
          location: "Remote",
          timeframe: "2026 – Present",
          description:
            "Develop and evaluate expert music and audio tasks used to train and assess large language models.",
          highlights: [
            "Authored and reviewed music theory and technical audio evaluation tasks for AI model training and evaluation.",
            "Evaluated AI-generated responses for accuracy in music theory, harmonic analysis, and spectrogram interpretation.",
            "Wrote structured reference answers and annotations to improve large-language-model training data quality.",
          ],
          media: [],
          links: [],
        },
        {
          id: "jujube-entertainment",
          title: "Jujube Entertainment",
          logoStyle: "jujube",
          showcaseImage: jujubeShowcaseImage,
          showcaseImageAlt:
            "Artist performing in a Jujube Entertainment production",
          role: "Operations Manager /\nCreative Producer",
          location: "Cambridge, MA / Remote",
          timeframe: "2023 – Present",
          description:
            "Lead operations and creative production for cross-disciplinary artist partnerships and experiential campaigns.",
          highlights: [
            "Developed artist branding and identity for Otis Zheng.",
            "Directed creative production for music videos including Mango Sticky Rice, GOODBOY, and Asian Fever.",
            "Coordinated directors, labels, TikTok influencers, and contractors to manage cross-functional workflows.",
            "Oversaw five-figure social media marketing campaigns informed by analytics and outreach to 500+ influencers.",
          ],
          media: [
            {
              type: "iframe",
              title: "Jujube Entertainment – YouTube Reel 1",
              src: "https://www.youtube.com/embed/ZLFWl4IFDE4",
            },
            {
              type: "iframe",
              title: "Jujube Entertainment – YouTube Reel 2",
              src: "https://www.youtube.com/embed/SRYGYZi76CY",
            },
            {
              type: "iframe",
              title: "Jujube Entertainment – YouTube Reel 3",
              src: "https://www.youtube.com/embed/2C_FxFwhNIM",
            },
            {
              type: "tiktok",
              title: "Otis Zheng on TikTok",
              cite: "https://www.tiktok.com/@otis_zheng",
              uniqueId: "otis_zheng",
              creatorUrl: "https://www.tiktok.com/@otis_zheng?refer=creator_embed",
              creatorLabel: "@otis_zheng",
            },
          ],
          links: [
            {
              label: "otis-zheng.com",
              url: "https://www.otis-zheng.com/",
            },
          ],
        },
        {
          id: "nyu-admin",
          title: "New York University Tisch",
          logoStyle: "nyu",
          showcaseImage: nyuItpSiteShowcaseImage,
          showcaseImageAlt: "NYU ITP website homepage",
          showcaseFit: "contain",
          role: "Website Administrator /\nAdministration Aide",
          location: "Brooklyn, NY",
          timeframe: "2024 – 2025",
          description:
            "Supported departmental operations and maintained digital touchpoints for faculty, staff, and students.",
          highlights: [
            "Supported department operations, documentation, and internal communications.",
            "Maintained and updated websites with HTML/CSS while ensuring accessibility and usability compliance.",
          ],
          media: [],
          links: [
            {
              label: "ITP",
              url: "https://itp.nyu.edu/",
            },
            {
              label: "ITP at Tisch",
              url: "https://tisch.nyu.edu/itp",
            },
            {
              label: "Low-Residency ITP",
              url: "https://itp.nyu.edu/lowres/",
            },
            {
              label: "Interactive Media Arts",
              url: "https://itp.nyu.edu/ima/",
            },
          ],
        },
        {
          id: "nyu-research",
          title: "New York University Psychology",
          logoStyle: "nyu",
          showcaseImage: nyuPsychShowcaseImage,
          showcaseImageAlt:
            "NYU News feature about machine learning and videoconference fluidity",
          showcaseFit: "contain",
          role: "Research Collaborator",
          location: "New York, NY",
          timeframe: "2023 – 2024",
          description:
            "Collaborated on multimodal perception studies and tooling for large-scale audio/video analysis.",
          highlights: [
            "Co-authored a peer-reviewed ICASSP 2025 paper on multimodal machine learning for videoconferencing.",
            "Designed and executed human-subjects experiments with 2,900 participants using Qualtrics and Python pipelines.",
            "Implemented multimodal ML workflows leveraging VGGish, YAMNet, and Wav2Vec2 for audio/video feature extraction.",
            "Applied Git-based collaboration, code review practices, and Agile cadences across the research team.",
          ],
          media: [],
          links: [
            {
              label: "NYU News",
              url: "https://www.nyu.edu/about/news-publications/news/2025/march/can-ai-tell-us-if-those-zoom-calls-are-flowing-smoothly--new-stu.html?challenge=d06e90d7-4d8f-4b88-9d8c-10b73beb60f1",
            },
            {
              label: "IEEE Xplore",
              url: "https://ieeexplore.ieee.org/abstract/document/10889480",
            },
          ],
        },
      ],
    },
    {
      title: "Education",
      items: [
        {
          id: "nyu-itp",
          title: "New York University",
          role: "MPS, Interactive Telecommunications Program",
          logoStyle: "nyu",
          schoolImage: itpSchoolImage,
          schoolImageAlt: "NYU Interactive Telecommunications Program floor",
          location: "Brooklyn, NY",
          timeframe: "2023–2025",
          courseSection: "NYU Courses",
          description:
            "Graduate work exploring interactive systems, sonic interfaces, and collaborative media prototypes.",
          media: [],
          links: [],
        },
        {
          id: "berklee-epd",
          title: "Berklee College of Music",
          role: "B.M. Electronic Production & Design",
          logoStyle: "berklee",
          schoolImage: berkleeSchoolImage,
          schoolImageAlt: "Berklee College of Music recording studio",
          location: "Boston, MA",
          timeframe: "2019–2022",
          courseSection: "Berklee Courses",
          description:
            "Focused on acoustics, electronics, and producing immersive audiovisual experiences.",
          media: [],
          links: [],
        },
      ],
    },
    {
      title: "Berklee Courses",
      items: [
        {
          id: "berklee-electronic-production",
          title: "Electronic Production, Sound Design, and Music Technology",
          description:
            "Coursework in studio production, synthesis, sound design, creative coding, physical computing, and advanced electronic production.",
          highlights: [
            "EP-220 — Studio Technologies: Digital audio workflows, signal routing, recording, editing, mixing, critical listening, and professional studio equipment.",
            "EP-223 — Modular Functions and Signal Flow: Modular synthesis with oscillators, filters, amplifiers, envelopes, control voltage, and audio signal routing.",
            "EP-225 — Control Systems in Electronic Production: MIDI controllers, hardware and software synthesizers, digital audio, and sequencing within a DAW.",
            "EP-320 — Mixing Techniques for Electronic Music: Balance, EQ, dynamics, compression, reverb, delay, automation, and creative signal processing.",
            "EP-321 — Advanced Production Techniques and Control Systems: Advanced MIDI sequencing, synthesis, automation, modulation, audio manipulation, and hybrid workflows.",
            "EP-322 — Advanced Sound Design Techniques: Additive, subtractive, FM, granular, modular, and sampling-based synthesis.",
            "EP-337 — Csound: Sound Design and Composition: Programmed sounds and compositions using synthesis, waveshaping, granular, and physical-modeling techniques.",
            "EP-341 — Programming in Max: Built interactive audio and MIDI systems, interfaces, synthesizers, sequencers, processors, and performance tools in Max/MSP.",
            "EP-352 — Software Instrument Building: Built custom polyphonic software instruments using multiple synthesis methods and modular components.",
            "EP-354 — Sampling for Advanced Instrument Design: Created expressive digital instruments with original samples, articulations, velocity layers, and performance controls.",
            "EP-381 — Digital Audio Production and Design: Produced and mixed audio for visual media through editing, synchronization, effects, dialogue, ambience, and delivery.",
            "EP-391 — Circuit Bending and Physical Computing: Modified electronic devices and built interactive systems with microcontrollers, sensors, actuators, and audio electronics.",
            "EP-401 — Advanced Seminar: Researched and developed emerging electronic-production practices through experimentation, critique, and presentation.",
            "EP-413 — Digital Signal Processing: Composition and Sound Design: Applied synthesis, spectral transformation, filtering, modulation, delay, and algorithmic audio techniques.",
            "EP-491 — Advanced Projects in Electronic Production and Design: Completed an independent capstone project from creative direction through final presentation.",
            "MP-113 — Accelerated Pro Tools: Audio recording, MIDI sequencing, editing, routing, processing, automation, and in-the-box mixing.",
            "MTEC-111 — Introduction to Music Technology: Computer-based music production, MIDI, digital audio, sequencing, notation, and studio workflows.",
          ],
          media: [],
          links: [],
        },
        {
          id: "berklee-acoustics-engineering",
          title: "Acoustics, Electronics, and Studio Engineering",
          description:
            "Technical study of acoustics, audio electronics, microphones, critical-listening environments, and studio maintenance.",
          highlights: [
            "LMSC-209 — Architectural Acoustics: Sound, vibration, waves, reverberation, transmission, noise reduction, isolation, psychoacoustics, and instrument acoustics.",
            "LMSC-210 — Principles of Audio Electronics: DC and AC circuits, signal flow, passive components, transistors, op-amps, transformers, and power amplifiers.",
            "MTEC-351 — Applications of Microphone Design: Microphone transducers, circuitry, polar patterns, frequency response, placement, and practical recording.",
            "MTEC-360 — Architecture and Acoustics of Critical Listening Environments: Studio dimensions, isolation, reflections, monitoring, treatment, and listening accuracy.",
            "MTEC-383 — Studio Maintenance and Troubleshooting: Cables, connectors, grounding, patch bays, soldering, equipment faults, and preventative maintenance.",
          ],
          media: [],
          links: [],
        },
        {
          id: "berklee-performance",
          title: "Electronic Performance and Instrument Practice",
          description:
            "Ensemble, private-instruction, and instrumental coursework supporting electronic and acoustic performance.",
          highlights: [
            "ENEL-221 — Electronic Improvisation: Electronic-ensemble performance through improvisation, grooves, sound design, and extended techniques.",
            "ENEL-403 — Electronic Performance Workshop: Collaborative electronic and electroacoustic performance using controllers, processing, Max/MSP, and acoustic instruments.",
            "PIEL-111 — Private Instruction 1: Electronic Digital Instrument: Electronic-instrument technique, performance, sound design, interpretation, and repertoire.",
            "PIEL-112 — Private Instruction 2: Electronic Digital Instrument: Technical control, expression, improvisation, repertoire, and performance proficiency.",
            "PIEL-211 — Private Instruction 3: Electronic Digital Instrument: Advanced individualized work in technique, sound design, interpretation, and performance preparation.",
            "PIEL-212 — Private Instruction 4: Electronic Digital Instrument: Refined a personal performance system, repertoire, technical fluency, and artistic identity.",
            "ILEL-215 — Finger Drumming Techniques: Timing, coordination, velocity control, groove construction, and expressive pad performance.",
            "ILGT-115 — Guitar Performance Skills for the Non-Guitar Principal: Guitar technique, chord voicings, accompaniment, reading, rhythm, and songwriting.",
            "ILBS-110 — Electric Bass for Non-Bass Principals: Bass technique, rhythm, harmony, groove, and ensemble awareness.",
            "ISKB-211 — Basic Keyboard Techniques 1: Keyboard comping, harmonic continuity, chords, melody, accompaniment, song forms, and blues vocabulary.",
            "ILVC-210 — Elements of Vocal Technique for Non-Voice Principals: Breath management, intonation, tone, phrasing, and performance.",
          ],
          media: [],
          links: [],
        },
        {
          id: "berklee-composition",
          title: "Composition, Arranging, Harmony, and Conducting",
          description:
            "Coursework in contemporary and tonal harmony, composition, arranging, counterpoint, and ensemble leadership.",
          highlights: [
            "PW-110 — Music Fundamentals: Notation, rhythm, harmony, bass lines, chord quality, song form, and rhythm-section functions.",
            "PW-111 — Music Application and Theory: Song analysis through bass motion, chord function, harmony, rhythm, and form.",
            "HR-112 — Harmony 2: Dominants, guide-tone lines, minor-key harmony, blues progressions, melody, and form.",
            "HR-211 — Harmony 3: Modal interchange, diminished chords, modulation, reharmonization, and chord-scale relationships.",
            "HR-212 — Harmony 4: Extended tonal relationships, nonfunctional harmony, advanced reharmonization, and modal systems.",
            "CM-211 — Tonal Harmony and Composition 1: Voice leading, harmonic progression, phrase structure, cadences, motives, and form.",
            "CM-212 — Tonal Harmony and Composition 2: Chromatic harmony, modulation, expanded forms, advanced voice leading, and larger-scale development.",
            "AR-123 — Arranging 1 for Continuing Students: Rhythm-section and small-ensemble arranging, voicing, form, and score preparation.",
            "CP-210 — The Art of Counterpoint: Independent melodic lines, imitation, voice leading, rhythmic interaction, and contrapuntal techniques.",
            "COND-211 — Conducting 1: Baton technique, beat patterns, dynamics, articulation, cueing, score reading, and ensemble leadership.",
            "COND-212 — Conducting 2: Complex meters, expressive gesture, tempo changes, score analysis, rehearsal, and interpretation.",
          ],
          media: [],
          links: [],
        },
        {
          id: "berklee-ear-training",
          title: "Ear Training and Musicianship",
          description:
            "A progressive sequence in critical listening, sight-singing, dictation, solfège, rhythm, and musical memory.",
          highlights: [
            "ET-110 — Fundamentals of Ear Training: Musical memory, inner hearing, rhythmic and melodic sight-reading, solfège, conducting, and dictation.",
            "ET-111 — Ear Training 1: Melodic, interval, harmonic, and rhythmic recognition in major keys.",
            "ET-112 — Ear Training 2: Expanded dictation, solfège, conducting, sight-singing, minor keys, and advanced meters.",
            "ET-211 — Ear Training 3: Chromatic melody, advanced rhythmic reading, harmonic recognition, transcription, sight-singing, and dictation.",
            "ET-212 — Ear Training 4: Chromatic and modal melody, complex rhythm and meter, harmonic progression, transcription, and musical memory.",
          ],
          media: [],
          links: [],
        },
        {
          id: "berklee-culture-professional",
          title: "Music, Culture, History, and Professional Studies",
          description:
            "Humanities and professional coursework connecting music and art to culture, technology, history, society, and sustainable creative practice.",
          highlights: [
            "LENS-101 — Engaging with Artistic Space: How art is defined, created, performed, and experienced across physical and social spaces.",
            "LMAS-223 — Technomusicology: Relationships among music, technology, culture, identity, society, distribution, and community.",
            "LSOC-300 — City Blues: Blues as an urban cultural form shaped by musical language, history, migration, and social context.",
            "MHIS-221 — Music of the African Diaspora in the United States: Musical traditions, history, identity, community, resistance, and popular music.",
            "MHIS-203 — History of Music in the European Tradition: Composers, styles, forms, instruments, and musical developments in historical context.",
            "MHIS-331 — History of Film Music: Film music from silent cinema through contemporary scoring, technology, genre, and industry practice.",
            "LVIS-223 — Fairs, Festivals, and Fire: Visual culture, performance, spectacle, ritual, and temporary public space.",
            "LHUM-400 — Professional Development Seminar: Résumés, portfolios, networking, interviews, branding, entrepreneurship, and creative careers.",
            "PSH-238 — Awareness Training for Musicians: Posture, breathing, movement, tension reduction, injury prevention, and sustainable performance habits.",
          ],
          media: [],
          links: [],
        },
        {
          id: "uml-music-sound-technology",
          title: "Music, Sound, and Technology",
          description:
            "Coursework connecting music theory, audio production, and interactive sound implementation.",
          highlights: [
            "MUCM.4000 — Music and Sound for Games: Integrated original music, sound effects, and dialogue into game-engine software while exploring interactive audio, middleware, scripting, and coding concepts.",
            "MUTH.1100 — Basic Music Theory: Studied notation, rhythm, meter, intervals, scales, modes, key signatures, and triads as a foundation for composition and audio production.",
          ],
          media: [],
          links: [],
        },
        {
          id: "uml-technology-literature-history",
          title: "Technology, Literature, and History",
          description:
            "Humanities coursework examining technology, cultural values, historical interpretation, and research.",
          highlights: [
            "ENGL.2490 — Literature on Technology and Human Values: Analyzed fictional representations of technology and their relationships to cultural attitudes, ethics, and social values.",
            "HIST.3420 — Inquisition: Myth and Reality: Studied the medieval Inquisition, its development in Spain and Italy, historical interpretations, and selected research topics.",
          ],
          media: [],
          links: [],
        },
        {
          id: "uml-writing-research",
          title: "Writing and Research",
          description:
            "Academic writing coursework focused on analysis, research, revision, argumentation, and responsible source use.",
          highlights: [
            "ENGL.1010 — College Writing I: Developed expository and analytical writing through drafting, revision, rhetorical analysis, essay structure, critical thinking, and academic-integrity practices.",
            "ENGL.1020 — College Writing II: Produced research-based analytical essays by finding, evaluating, synthesizing, citing, and integrating primary and secondary sources.",
          ],
          media: [],
          links: [],
        },
        {
          id: "uml-mathematics-general-studies",
          title: "Mathematics and General Studies",
          description:
            "Foundational coursework in calculus and university-level academic, professional, and personal development.",
          highlights: [
            "MATH.1280 — Calculus IA: Studied algebra, trigonometry, limits, continuity, derivatives, the chain rule, implicit differentiation, and foundational calculus applications.",
            "FAHS.1090 — First-Year Experience Seminar: Liberal Arts: Developed skills in information literacy, technology, time management, financial planning, career preparation, wellness, and academic resources.",
          ],
          media: [],
          links: [],
        },
      ],
    },
    {
      title: "NYU Courses",
      items: [
        {
          id: "nyu-creative-coding-web-ml",
          title: "Creative Coding, Web Development, and Machine Learning",
          description:
            "Coursework in creative programming, full-stack web development, and machine learning for interactive media.",
          highlights: [
            "ITPG-GT 2233 — Introduction to Computational Media: Used JavaScript and p5.js to build interactive visual, audio, and screen-based projects while learning core programming concepts.",
            "ITPG-GT 3007 — Code Your Way: Advanced creative-coding practice through algorithms, pseudocode, debugging, refactoring, pair programming, version control, and independent development.",
            "ITPG-GT 2577 — Dynamic Web Development: Built dynamic applications using front-end and server-side programming, databases, APIs, asynchronous requests, authentication, and data-driven interfaces.",
            "DM-GY 9103 — Introduction to Machine Learning for Media: Prepared datasets, trained and evaluated models, and integrated classification, regression, and feature extraction into creative projects.",
          ],
          media: [],
          links: [],
        },
        {
          id: "nyu-physical-computing-networks-audio",
          title: "Physical Computing, Networks, and Audio Technology",
          description:
            "Technical coursework connecting interactive hardware, network infrastructure, and digital audio systems.",
          highlights: [
            "ITPG-GT 2301 — Introduction to Physical Computing: Designed interactive systems using microcontrollers, sensors, switches, motors, LEDs, serial communication, and basic electronics.",
            "ITPG-GT 2808 — Understanding Networks: Studied internet architecture, addressing, routing, protocols, clients, servers, packet analysis, APIs, MQTT, security, and telecommunications.",
            "MPATE-GE 2632 — Audio Streaming Technology: Studied psychoacoustics, codecs, noise masking, spatial localization, MPEG formats, compression, and streaming architectures.",
          ],
          media: [],
          links: [],
        },
        {
          id: "nyu-film-visual-generative-media",
          title: "Film, Visual Communication, and Generative Media",
          description:
            "Moving-image and visual-design coursework spanning experimental cinema, communication systems, and computational filmmaking.",
          highlights: [
            "ITPG-GT 2004 — Communications Lab: Hypercinema: Created experimental moving-image projects using video, sound, editing, animation, compositing, and nonlinear storytelling.",
            "ITPG-GT 2005 — Communications Lab: Visual Language: Applied composition, typography, color, hierarchy, visual systems, and graphic-design principles to interfaces and presentations.",
            "ITPG-GT 2379 — Algorithmic Filmmaking: Used code, procedural systems, generative processes, automation, and computational rules to create and edit moving-image work.",
          ],
          media: [],
          links: [],
        },
        {
          id: "nyu-3d-ar-virtual-environments",
          title: "3D Design, AR, and Virtual Environments",
          description:
            "Coursework in spatial design, augmented reality, real-time world-building, and performance in virtual spaces.",
          highlights: [
            "ITPG-GT 2086 — CAD for Virtual and Reality: Created optimized 3D assets and environments using modeling, materials, lighting, cameras, spatial composition, and interactive implementation.",
            "ITPG-GT 2368 — Through the Lens: Modalities of AR: Explored augmented reality across phones, headsets, image markers, spatial tracking, interface design, and situated storytelling.",
            "ITPG-GT 2379 — Expressive Environments: Building 3D Worlds: Designed real-time 3D environments through world-building, lighting, materials, spatial audio, interaction, narrative, and game-engine workflows.",
            "ITPG-GT 2999 — Performance in Virtual Space: Investigated live performance using avatars, motion, embodiment, spatial staging, digital scenography, and real-time interaction.",
          ],
          media: [],
          links: [],
        },
        {
          id: "nyu-ux-game-design",
          title: "UX and Game Design",
          description:
            "Human-centered interface and game-design study informed by research, prototyping, psychology, and behavioral decision-making.",
          highlights: [
            "ITPG-GT 3017 — User Experience Design: Designed interfaces through user research, personas, journey mapping, information architecture, wireframes, prototyping, testing, and iteration.",
            "ITPG-GT 3028 — Game Design and the Psychology of Choice: Applied cognitive psychology, behavioral economics, incentives, biases, feedback systems, and decision architecture to game design.",
          ],
          media: [],
          links: [],
        },
        {
          id: "nyu-creative-practice-project-development",
          title: "Creative Practice and Project Development",
          description:
            "Studio and thesis coursework supporting interdisciplinary research, experimentation, critique, production, documentation, and public presentation.",
          highlights: [
            "ITPG-GT 2000 — Applications: Examined creative, social, cultural, and ethical applications of emerging technology through projects, research, critique, and collaboration.",
            "ITPG-GT 2098 — Thesis Part 1: Research and Development: Defined a graduate thesis through precedent research, experimentation, proposals, prototypes, critique, documentation, and planning.",
            "ITPG-GT 2099 — Thesis Part 2: Production: Produced, tested, refined, documented, and publicly presented a graduate thesis integrating creative direction, interaction design, and technical implementation.",
            "ITPG-GT 2564 — Project Development Studio: Developed an independent project through ideation, prototyping, technical exploration, feedback, critique, iteration, and presentation.",
          ],
          media: [],
          links: [],
        },
      ],
    },
    {
      title: "Research",
      items: [
        {
          id: "icassp-paper",
          title: "New York University Psychology",
          role:
            "Multimodal Machine Learning Can Predict Videoconference Fluidity and Enjoyment",
          logoStyle: "nyu",
          showcaseEmbed: researchPaperPdf,
          showcaseEmbedTitle:
            "Multimodal Machine Learning Can Predict Videoconference Fluidity and Enjoyment PDF",
          timeframe: "2025",
          description:
            "Co-authored through the NYU Psychology Lab, this ICASSP 2025 study used audio embeddings, facial actions, and body-motion features from thousands of RoomReader videoconference clips to predict low conversational fluidity and enjoyment. The best multimodal models reached an ROC-AUC of 0.87, with audio features proving most predictive.",
          media: [
            {
              type: "embed",
              src: researchPaperPdf,
              title:
                "Multimodal Machine Learning Can Predict Videoconference Fluidity and Enjoyment PDF",
              width: "100%",
              height: 750,
            },
          ],
          links: [
            {
              label: "IEEE Xplore",
              url: "https://ieeexplore.ieee.org/abstract/document/10889480",
            },
            {
              label: "NYU News",
              url: "https://www.nyu.edu/about/news-publications/news/2025/march/can-ai-tell-us-if-those-zoom-calls-are-flowing-smoothly--new-stu.html?challenge=d06e90d7-4d8f-4b88-9d8c-10b73beb60f1",
            },
          ],
        },
      ],
    },
    {
      title: "Projects",
      items: [
        {
          id: "tmlne",
          title: "TMLNE",
          logoStyle: "tmlne",
          showcaseEmbed:
            "https://tmlne.com/tl/26n4ff?timeline=timelines%2Fnzj4EDfzqAgJNVHdbsrCfbgr3Fs2%2Fprojects%2FYJSKxNMDGAhVhNdcnDHf&embed=1",
          showcaseEmbedTitle: "TMLNE live site preview",
          showcaseAspectRatio: "16 / 9",
          timeframe: "2026",
          description:
            "Shareable timeline-building application developed with React and Firebase for arranging complex events across multiple synchronized rows.",
          highlights: [
            "Designed draggable and resizable segments for precise visual timeline editing.",
            "Built zoomable time ranges and synchronized multi-row organization.",
            "Implemented interval playback, sharing, and timeline export.",
          ],
          media: [
            {
              type: "embed",
              title: "TMLNE Site Preview",
              src: "https://tmlne.com/tl/26n4ff?timeline=timelines%2Fnzj4EDfzqAgJNVHdbsrCfbgr3Fs2%2Fprojects%2FYJSKxNMDGAhVhNdcnDHf&embed=1",
              width: "100%",
              height: 600,
            },
          ],
          links: [
            {
              label: "tmlne.com",
              url: "https://tmlne.com",
            },
          ],
        },
        {
          id: "eterna",
          title: "ETERNA",
          logoStyle: "eterna",
          showcaseEmbed: "https://et3rna.com",
          showcaseEmbedTitle: "ETERNA live site preview",
          showcaseAspectRatio: "16 / 9",
          timeframe: "2025",
          description:
            "Browser-based DJ mixing application developed with React and the Web Audio API for real-time performance and synchronized audio control.",
          highlights: [
            "Built interactive waveform visualization, pitch shifting, looping, and beat detection.",
            "Implemented crossfader mixing and synchronized playback controls.",
            "Developed custom REST APIs and a MongoDB backend supported by AWS S3, CloudFront, and Amplify.",
          ],
          links: [
            {
              label: "et3rna.com",
              url: "https://et3rna.com",
            },
          ],
          media: [
            {
              type: "embed",
              title: "ETERNA Site Preview",
              src: "https://et3rna.com",
              width: "100%",
              height: 750,
            },
          ],
        },
        {
          id: "pixelcam",
          title: "PIXELCAM",
          logoStyle: "pixelcam",
          showcaseEmbed: "https://pixelcam.space",
          showcaseEmbedTitle: "PIXELCAM live site preview",
          showcaseAspectRatio: "16 / 9",
          timeframe: "2024",
          description:
            "Retro-inspired camera and social platform developed with Expo, React Native Web, Firebase, and Cloudflare Workers and R2.",
          highlights: [
            "Created real-time pixel effects and custom color-palette tools.",
            "Built media uploads, user profiles, and social web-app functionality.",
            "Integrated RTMP live-stream support and Stripe-powered premium features.",
          ],
          media: [
            {
              type: "embed",
              title: "PIXELCAM Site Preview",
              src: "https://pixelcam.space",
              width: "100%",
              height: 750,
            },
          ],
          links: [
            {
              label: "pixelcam.space",
              url: "https://pixelcam.space",
            },
          ],
        },
        {
          id: "rc-707-drum-machine",
          title: "Rhythm Cartridge 707 (RC-707) Drum Machine",
          showcaseEmbed: "https://www.youtube.com/embed/oheIi9kkfik",
          showcaseEmbedTitle: "RC-707 Drum Machine video preview",
          showcaseAspectRatio: "16 / 9",
          timeframe: "2023–2024",
          description:
            "Compact cartridge-based drum machine with four hot-swappable sound generators and an eight-step, four-track sequencer.",
          highlights: [
            "Programmed the asynchronous control system in CircuitPython on an Adafruit Metro RP2040.",
            "Designed Live and Step modes with drum-pad performance, per-track sequencing, rotary BPM control, LED step and playhead feedback, and an alphanumeric display.",
            "Integrated I2C peripherals including an AW9523 LED driver, a Stemma QT rotary encoder, and an HT16K33-compatible display.",
            "Built retriggerable, one-time-programmable sound cartridges with PWM output smoothed through a custom low-pass filter.",
            "Prototyped and hand-soldered the compact enclosure, identifying future improvements for PCB design, labeling, cartridge selection, and accessibility.",
          ],
          media: [
            {
              type: "embed",
              title: "RC-707 Drum Machine Demo",
              src: "https://www.youtube.com/embed/oheIi9kkfik",
              width: "100%",
              height: 450,
            },
          ],
          links: [
            {
              label: "Watch Demo",
              url: "https://youtu.be/oheIi9kkfik",
            },
          ],
        },
        {
          id: "arduino-player-piano",
          title: "Arduino Powered Player Piano",
          showcaseEmbed: "https://www.youtube.com/embed/5REfPB5XNJc",
          showcaseEmbedTitle: "Arduino Powered Player Piano video preview",
          showcaseAspectRatio: "16 / 9",
          timeframe: "2022–2023",
          description:
            "MIDI-driven player piano prototype bridging hardware, firmware, and bespoke sequencing tools.",
          highlights: [
            "Programmed Arduino microcontrollers to translate MIDI data into solenoid actuation for piano keys.",
            "Developed control software to manage velocity curves, playback queuing, and live performance overrides.",
          ],
          media: [
            {
              type: "embed",
              title: "Arduino Powered Player Piano Demo",
              src: "https://www.youtube.com/embed/5REfPB5XNJc",
              width: "100%",
              height: 450,
            },
            {
              type: "embed",
              title: "Arduino Powered Player Piano – Project Presentation",
              src: "/arduino-powered-player-piano.pdf",
              width: "100%",
              height: 750,
            },
          ],
          links: [
            {
              label: "Watch Demo",
              url: "https://youtu.be/5REfPB5XNJc",
            },
            {
              label: "Open Project Presentation",
              url: "/arduino-powered-player-piano.pdf",
            },
          ],
        },
      ],
    },
    {
      title: "Creative Coding",
      items: [
        {
          id: "creative-coding-sketch-1",
          title: "p5.js Sketch",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch",
              src: "https://editor.p5js.org/xRayCx/full/Rcr3sowNS",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/Rcr3sowNS",
            },
          ],
        },
        {
          id: "creative-coding-sketch-2",
          title: "p5.js Sketch 2",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch 2",
              src: "https://editor.p5js.org/xRayCx/full/z93ocOSyX",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/z93ocOSyX",
            },
          ],
        },
        {
          id: "creative-coding-sketch-3",
          title: "p5.js Sketch 3",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch 3",
              src: "https://editor.p5js.org/xRayCx/full/KnF9Zi0j-",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/KnF9Zi0j-",
            },
          ],
        },
        {
          id: "creative-coding-sketch-4",
          title: "p5.js Sketch 4",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch 4",
              src: "https://editor.p5js.org/xRayCx/full/sE4PXbj_0",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/sE4PXbj_0",
            },
          ],
        },
        {
          id: "creative-coding-sketch-5",
          title: "p5.js Sketch 5",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch 5",
              src: "https://editor.p5js.org/xRayCx/full/K-rY9ellK",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/K-rY9ellK",
            },
          ],
        },
        {
          id: "creative-coding-sketch-6",
          title: "p5.js Sketch 6",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch 6",
              src: "https://editor.p5js.org/xRayCx/full/rAILV4v3B",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/rAILV4v3B",
            },
          ],
        },
        {
          id: "creative-coding-sketch-7",
          title: "p5.js Sketch 7",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch 7",
              src: "https://editor.p5js.org/xRayCx/full/NnYSDQRG1",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/NnYSDQRG1",
            },
          ],
        },
        {
          id: "creative-coding-sketch-8",
          title: "p5.js Sketch 8",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch 8",
              src: "https://editor.p5js.org/xRayCx/full/U8EFtHFoS",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/U8EFtHFoS",
            },
          ],
        },
        {
          id: "creative-coding-sketch-9",
          title: "p5.js Sketch 9",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch 9",
              src: "https://editor.p5js.org/xRayCx/full/J8EKMjBZa",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/J8EKMjBZa",
            },
          ],
        },
        {
          id: "creative-coding-sketch-10",
          title: "p5.js Sketch 10",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch 10",
              src: "https://editor.p5js.org/xRayCx/full/z6vNUvskc",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/z6vNUvskc",
            },
          ],
        },
        {
          id: "creative-coding-sketch-11",
          title: "p5.js Sketch 11",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch 11",
              src: "https://editor.p5js.org/xRayCx/full/8rbq4-FLa",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/8rbq4-FLa",
            },
          ],
        },
        {
          id: "creative-coding-sketch-12",
          title: "p5.js Sketch 12",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch 12",
              src: "https://editor.p5js.org/xRayCx/full/EiA_1K0_E",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/EiA_1K0_E",
            },
          ],
        },
        {
          id: "creative-coding-sketch-13",
          title: "p5.js Sketch 13",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch 13",
              src: "https://editor.p5js.org/xRayCx/full/1AbzDPZYi",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/1AbzDPZYi",
            },
          ],
        },
        {
          id: "creative-coding-sketch-14",
          title: "p5.js Sketch 14",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch 14",
              src: "https://editor.p5js.org/xRayCx/full/5Z2cG9J39",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/5Z2cG9J39",
            },
          ],
        },
        {
          id: "creative-coding-sketch-15",
          title: "p5.js Sketch 15",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch 15",
              src: "https://editor.p5js.org/xRayCx/full/TubG4f8va",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/TubG4f8va",
            },
          ],
        },
        {
          id: "creative-coding-sketch-16",
          title: "p5.js Sketch 16",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch 16",
              src: "https://editor.p5js.org/xRayCx/full/_cAzUVpbR",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/_cAzUVpbR",
            },
          ],
        },
        {
          id: "creative-coding-sketch-17",
          title: "p5.js Sketch 17",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch 17",
              src: "https://editor.p5js.org/xRayCx/full/Eq8Fd8wZQ",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/Eq8Fd8wZQ",
            },
          ],
        },
        {
          id: "creative-coding-sketch-18",
          title: "p5.js Sketch 18",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch 18",
              src: "https://editor.p5js.org/xRayCx/full/pgL3GwxBX",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/pgL3GwxBX",
            },
          ],
        },
        {
          id: "creative-coding-sketch-19",
          title: "p5.js Sketch 19",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch 19",
              src: "https://editor.p5js.org/xRayCx/full/jgGywPzFV",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/jgGywPzFV",
            },
          ],
        },
        {
          id: "creative-coding-sketch-20",
          title: "p5.js Sketch 20",
          description:
            "Embedded p5.js sketch from the p5 web editor.",
          media: [
            {
              type: "embed",
              title: "p5.js Sketch 20",
              src: "https://editor.p5js.org/xRayCx/full/TJUiKO2rB",
              width: "100%",
              height: 640,
            },
          ],
          links: [
            {
              label: "Open Sketch",
              url: "https://editor.p5js.org/xRayCx/full/TJUiKO2rB",
            },
          ],
        },
      ],
    },
    {
      title: "Music",
      items: [
        {
          id: "soundcloud-amoeba",
          title: "AMOEBA [raw]「2020-2021」⟨sliced⟩",
          coverFlowStart: true,
          cover: amoebaCover,
          description:
            "Playlist of experimental electronic sketches produced throughout the AMOEBA sessions.",
          media: [
            {
              type: "soundcloud",
              title: "SoundCloud – AMOEBA Playlist",
              src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2039241729&color=%231f1a1a&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
              artistUrl: "https://soundcloud.com/raymuzic",
              artistLabel: "Ray",
              playlistUrl: "https://soundcloud.com/raymuzic/sets/amoeba",
              playlistLabel: "AMOEBA [raw]「2020-2021」⟨sliced⟩",
            },
          ],
          links: [
            {
              label: "Ray on SoundCloud",
              url: "https://soundcloud.com/raymuzic",
            },
          ],
        },
        {
          id: "soundcloud-singles",
          title: "Singles",
          coverStyle: "singles",
          description:
            "Select single releases featuring collaborations and personal cuts.",
          media: [
            {
              type: "soundcloud",
              title: "SoundCloud – Singles Playlist",
              src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2104891283&color=%231f1a1a&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
              artistUrl: "https://soundcloud.com/raymuzic",
              artistLabel: "Ray",
              playlistUrl: "https://soundcloud.com/raymuzic/sets/singles",
              playlistLabel: "Singles",
            },
          ],
          links: [
            {
              label: "Singles Playlist",
              url: "https://soundcloud.com/raymuzic/sets/singles",
            },
          ],
        },
        {
          id: "soundcloud-prod",
          title: "Prod.",
          coverStyle: "prod",
          description:
            "Selected production work spanning collaborations and personal releases.",
          media: [
            {
              type: "soundcloud",
              title: "SoundCloud – Prod Playlist",
              src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2104338727&color=%23302c1f&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
              artistUrl: "https://soundcloud.com/raymuzic",
              artistLabel: "Ray",
              playlistUrl: "https://soundcloud.com/raymuzic/sets/prod",
              playlistLabel: "Prod.",
            },
          ],
          links: [
            {
              label: "Playlist",
              url: "https://soundcloud.com/raymuzic/sets/prod",
            },
          ],
        },
        {
          id: "spotify-aces",
          title: "Aces",
          role: "Production, Recording, Mixing & Mastering",
          cover: acesCover,
          description:
            "Production, recording, mixing, and mastering for Insight's 2018 six-track EP, Aces.",
          media: [
            {
              type: "embed",
              title: "Spotify – Aces by Insight",
              src: "https://open.spotify.com/embed/album/6R1kRvuTTQxbzHPb10Rfae?utm_source=generator",
              width: "100%",
              height: 352,
              allow:
                "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
            },
          ],
          links: [
            {
              label: "Open on Spotify",
              url: "https://open.spotify.com/album/6R1kRvuTTQxbzHPb10Rfae",
            },
          ],
        },
        {
          id: "spotify-if-i-forget",
          title: "If I Forget, It's Only Because I Forgot",
          role: "Additional Mixing",
          cover: ifIForgetCover,
          description:
            "Additional mixing for Celsius's 2020 five-track EP, If I Forget, It's Only Because I Forgot.",
          media: [
            {
              type: "embed",
              title:
                "Spotify – If I Forget, It's Only Because I Forgot by Celsius",
              src: "https://open.spotify.com/embed/album/1wYXIOQcsiCw78zhpSNZ2e?utm_source=generator",
              width: "100%",
              height: 352,
              allow:
                "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
            },
          ],
          links: [
            {
              label: "Open on Spotify",
              url: "https://open.spotify.com/album/1wYXIOQcsiCw78zhpSNZ2e",
            },
          ],
        },
        {
          id: "people-watching-people",
          title: "People Watching People",
          cover: peopleWatchingPeopleImage,
          role: "Mix Engineer",
          description:
            "Feature film mix engineering, contributing to spatial sound design and final mix prep.",
          media: [
            {
              type: "image",
              src: peopleWatchingPeopleImage,
              alt: "People Watching People film still in a park",
              caption: "People Watching People",
            },
            {
              type: "audio",
              src: pwpIntro,
              title: "People Watching People — Intro",
            },
            {
              type: "audio",
              src: pwpOutro,
              title: "People Watching People — Outro",
            },
          ],
          links: [
            {
              label: "IMDB",
              url: "https://www.imdb.com/title/tt30427965/",
            },
          ],
        },
      ],
    },
  ],
};
