export const portfolioData = {
  name: "Ray Cogliano",
  bio: "Creative developer & producer building audio-tech and web experiences.",
  sections: [
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
      title: "Projects",
      items: [
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
          media: [],
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
