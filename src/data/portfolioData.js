export const portfolioData = {
  name: "Ray Cogliano",
  bio: "Creative developer & producer building audio-tech and web experiences.",
  sections: [
    {
      title: "Work",
      items: [
        {
          id: "jujube-entertainment",
          title: "Jujube Entertainment",
          role: "Operations Manager / Creative Producer",
          location: "Cambridge, MA",
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
              label: "Project Portfolio",
              url: "https://www.otis-zheng.com/",
            },
          ],
        },
        {
          id: "nyu-research",
          title: "New York University",
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
          links: [],
        },
        {
          id: "nyu-admin",
          title: "New York University",
          role: "Administration Aide & Website Administrator",
          location: "Brooklyn, NY",
          timeframe: "2025",
          description:
            "Supported departmental operations and maintained digital touchpoints for faculty, staff, and students.",
          highlights: [
            "Supported department operations, documentation, and internal communications.",
            "Maintained and updated websites with HTML/CSS while ensuring accessibility and usability compliance.",
          ],
          media: [],
          links: [],
        },
      ],
    },
    {
      title: "Education",
      items: [
        {
          id: "nyu-itp",
          title: "NYU – MPS, Interactive Telecommunications Program",
          timeframe: "2023–2025",
          description:
            "Graduate work exploring interactive systems, sonic interfaces, and collaborative media prototypes.",
          media: [],
          links: [],
        },
        {
          id: "berklee-epd",
          title:
            "Berklee College of Music – B.M. Electronic Production & Design",
          timeframe: "2019–2022",
          description:
            "Focused on acoustics, electronics, and producing immersive audiovisual experiences.",
          media: [],
          links: [],
        },
      ],
    },
    {
      title: "Projects",
      items: [
        {
          id: "tmlne",
          title: "TMLNE",
          description: "Web project and experience at tmlne.com.",
          highlights: [],
          media: [
            {
              type: "embed",
              title: "TMLNE Site Preview",
              src: "https://tmlne.com",
              width: "100%",
              height: 750,
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
          description:
            "React/Web Audio DJ mixing platform exploring networked performance futures.",
          highlights: [
            "Built waveform visualization, pitch shifting, looping, beat detection, and synchronized crossfader controls.",
            "Architected a backend with MongoDB, AWS S3/CloudFront/Amplify, and custom REST APIs.",
          ],
          media: [],
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
          description:
            "Retro-inspired photo web app transforming live webcam feeds into pixel art.",
          highlights: [
            "Implemented real-time pixelation filters, palette mapping, and export tooling with p5.js and Canvas.",
            "Deployed the experience via AWS S3 with global delivery through Cloudflare.",
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
          id: "arduino-player-piano",
          title: "Arduino Player Piano",
          description:
            "MIDI-driven player piano prototype bridging hardware, firmware, and bespoke sequencing tools.",
          highlights: [
            "Programmed Arduino microcontrollers to translate MIDI data into solenoid actuation for piano keys.",
            "Developed control software to manage velocity curves, playback queuing, and live performance overrides.",
          ],
          media: [],
          links: [],
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
      title: "Research",
      items: [
        {
          id: "icassp-paper",
          title:
            "Multimodal Machine Learning Can Predict Videoconference Fluidity and Enjoyment",
          description:
            "ICASSP 2025 paper exploring multimodal signals to forecast meeting quality.",
          media: [],
          links: [
            {
              label: "IEEE Xplore",
              url: "https://ieeexplore.ieee.org/abstract/document/10889480",
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
          id: "people-watching-people",
          title: "People Watching People",
          role: "Mix Engineer",
          description:
            "Feature film mix engineering, contributing to spatial sound design and final mix prep.",
          media: [],
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
