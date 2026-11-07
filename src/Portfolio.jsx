import React, { useEffect, useMemo, useRef, useState } from "react";
import { portfolioData } from "./data/portfolioData";
import headshotImage from "./rayheadshot.webp";
import eternaLogo from "./eterna-logo.png";
import blubluLogo from "./blublu-logo.avif";
import jujubeLogo from "./jujube-logo.webp";
import mercorLogo from "./mercor-logo.webp";
import mercorShowcaseLogo from "./mercor-showcase.webp";
import nyuLogo from "./nyu-symbol.webp";
import berkleeLogo from "./berklee-natural.webp";
import xpCursor from "./xp-cursor.webp";
import xpPointer from "./xp-pointer-large.webp";

const sketchPreviews = import.meta.glob("./p5-previews/*.png", {
  eager: true,
  import: "default",
});

export default function Portfolio() {
  const data = useMemo(() => {
    const courseSections = new Map(
      portfolioData.sections
        .filter((section) => section.title.endsWith(" Courses"))
        .map((section) => [section.title, section.items])
    );
    const nestedCourseSections = new Set(
      portfolioData.sections
        .flatMap((section) => section.items)
        .map((item) => item.courseSection)
        .filter(Boolean)
    );

    return {
      ...portfolioData,
      sections: portfolioData.sections
        .filter((section) => !nestedCourseSections.has(section.title))
        .map((section) => ({
          ...section,
          items: section.items.map((item) =>
            item.courseSection
              ? {
                  ...item,
                  courseGroups: courseSections.get(item.courseSection) || [],
                }
              : item
          ),
        })),
    };
  }, []);
  const [activeItemId, setActiveItemId] = useState(null);
  const [footerAlbumId, setFooterAlbumId] = useState(
    () =>
      data.sections
        .find((section) => section.title === "Music")
        ?.items.find((item) => item.coverFlowStart)?.id || null
  );
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [activeNavSection, setActiveNavSection] = useState(
    data.sections[0]?.title || ""
  );
  const contentRef = useRef(null);
  const sectionRefs = useRef(new Map());

  const handleSelect = (itemId) => {
    setActiveItemId((prev) => (prev === itemId ? null : itemId));
  };

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return undefined;

    let animationFrame = 0;
    const updateScrollState = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const isMobile = window.matchMedia("(max-width: 900px)").matches;
        const sidebar = document.querySelector(".sidebar");
        const musicFooter = document.querySelector(".music-footer");
        const scrollPosition = isMobile ? window.scrollY : content.scrollTop;
        const scrollRange = isMobile
          ? document.documentElement.scrollHeight - window.innerHeight
          : content.scrollHeight - content.clientHeight;
        const scrollProgress = Math.min(
          1,
          Math.max(0, scrollPosition / Math.max(1, scrollRange))
        );
        const indicatorRange = Math.max(
          0,
          ((isMobile ? sidebar?.clientWidth : sidebar?.clientHeight) || 46) -
            48 -
            (isMobile ? 0 : musicFooter?.offsetHeight || 0)
        );
        const rawIndicatorPosition = scrollProgress * indicatorRange;
        const dividerDotSpacing = 8;
        const indicatorStep = Math.min(
          indicatorRange,
          Math.floor(rawIndicatorPosition / dividerDotSpacing) *
            dividerDotSpacing
        );
        const stepProgress =
          (rawIndicatorPosition - indicatorStep) / dividerDotSpacing;
        document.documentElement.style.setProperty(
          "--portfolio-scroll-position",
          `${indicatorStep}px`
        );
        const dotSizesAtCurrentStep = [1.2, 1.6, 2.6, 1.6, 1.2, 1];
        const dotSizesAtNextStep = [1, 1.2, 1.6, 2.6, 1.6, 1.2];
        dotSizesAtCurrentStep.forEach((size, index) => {
          const interpolatedSize =
            size +
            (dotSizesAtNextStep[index] - size) * stepProgress;
          document.documentElement.style.setProperty(
            `--portfolio-dot-size-${index + 1}`,
            `${interpolatedSize}px`
          );
        });

        const hasMoreBelow =
          content.scrollTop + content.clientHeight < content.scrollHeight - 4;
        setCanScrollDown(hasMoreBelow);

        const contentTop = content.getBoundingClientRect().top;
        const readingLine = contentTop + Math.min(content.clientHeight * 0.28, 180);
        let currentSection = data.sections[0]?.title || "";

        sectionRefs.current.forEach((element, title) => {
          if (element.getBoundingClientRect().top <= readingLine) {
            currentSection = title;
          }
        });

        if (!hasMoreBelow) {
          currentSection = data.sections.at(-1)?.title || currentSection;
        }

        setActiveNavSection(currentSection);
      });
    };
    const resizeObserver = new ResizeObserver(updateScrollState);

    resizeObserver.observe(content);
    content
      .querySelectorAll(".section")
      .forEach((section) => resizeObserver.observe(section));
    content.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    updateScrollState();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.documentElement.style.removeProperty("--portfolio-scroll-position");
      for (let index = 1; index <= 6; index += 1) {
        document.documentElement.style.removeProperty(
          `--portfolio-dot-size-${index}`
        );
      }
      resizeObserver.disconnect();
      content.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [data.sections]);

  const scrollResumeDown = () => {
    contentRef.current?.scrollBy({
      top: contentRef.current.clientHeight * 0.78,
      behavior: "smooth",
    });
  };

  const navigateToSection = (sectionTitle) => {
    const content = contentRef.current;
    const section = sectionRefs.current.get(sectionTitle);
    if (!content || !section) return;

    const contentTop = content.getBoundingClientRect().top;
    const sectionTop = section.getBoundingClientRect().top;

    content.scrollTo({
      top: content.scrollTop + sectionTop - contentTop - 12,
      behavior: "smooth",
    });
  };

  const musicSection = data.sections.find(
    (section) => section.title === "Music"
  );
  const footerAlbum =
    musicSection?.items.find((item) => item.id === footerAlbumId) ||
    musicSection?.items[0];
  const handleSidebarMusicSelect = (itemId) => {
    setActiveItemId(itemId);
    window.requestAnimationFrame(() => navigateToSection("Music"));
  };

  const handleFooterMusicSelect = (itemId) => {
    setActiveItemId(itemId);
    setFooterAlbumId(itemId);
  };

  return (
    <div className="container">
      <StyleTag />
      <aside className="sidebar">
        <h1 className="name">
          <span>{data.name}</span>
          <span
            className="online-status"
            role="img"
            aria-label="Online"
            title="Online"
          />
        </h1>
        <div className="profile-image">
          <img
            src={headshotImage}
            alt="Ray Cogliano"
            className="headshot-image"
            width="680"
            height="680"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <p className="bio">
          {data.bio}.
          <br />
          <a
            className="bio-coordinates"
            href={data.coordinatesUrl}
            target="_blank"
            rel="noreferrer"
          >
            <strong>{data.coordinates}</strong>
          </a>
        </p>
        <div className="sidebar-contact">
          <h2>Contact</h2>
          <a href="mailto:ray@inanimate.space">
            <MailIcon />
            <span>ray@inanimate.space</span>
          </a>
          <a
            href="https://www.linkedin.com/in/raycogliano"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/Ray2"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
            <span>GitHub</span>
          </a>
          <a
            href="https://soundcloud.com/raymuzic"
            target="_blank"
            rel="noreferrer"
          >
            <SoundCloudIcon />
            <span>SoundCloud</span>
          </a>
          <a
            href="https://www.imdb.com/name/nm15600981/?ref_=ttfc_fcr_11_4"
            target="_blank"
            rel="noreferrer"
          >
            <IMDbIcon />
            <span>IMDb</span>
          </a>
        </div>
      </aside>
      <div className="content-shell">
        <main className="content" ref={contentRef}>
          {data.sections.map((section) => {
          const isSectionOpen = true;
          return (
            <section
              key={section.title}
              className={`section section-open${
                section.title === "Music" ? " section-music" : ""
              }`}
              ref={(element) => {
                if (element) {
                  sectionRefs.current.set(section.title, element);
                } else {
                  sectionRefs.current.delete(section.title);
                }
              }}
            >
              <h2 className="section-title">{section.title}</h2>
              {section.title === "Creative Coding" ? (
                <SketchGrid items={section.items} isSectionOpen={isSectionOpen} />
              ) : section.title === "Music" ? (
                <MusicCoverFlow
                  items={section.items}
                  isSectionOpen={isSectionOpen}
                  activeItemId={activeItemId}
                  onSelect={handleSelect}
                />
              ) : (
                <ul className="list" aria-hidden={!isSectionOpen}>
                  {section.items.map((item) => {
                    const isActive = item.id === activeItemId;
                    return (
                      <PortfolioListItem
                        key={item.id}
                      item={item}
                      isActive={isActive}
                      onSelect={handleSelect}
                      isSectionOpen={isSectionOpen}
                      alignTimeframeRight={
                        section.title === "Work" ||
                        section.title === "Education" ||
                        section.title === "Projects" ||
                        section.title === "Research"
                      }
                      isProjectSection={section.title === "Projects"}
                      isResumeShowcase={
                        section.title === "Work" ||
                        section.title === "Education" ||
                        section.title === "Research" ||
                        section.title === "Projects"
                      }
                      isWorkShowcase={section.title === "Work"}
                      isResearchShowcase={section.title === "Research"}
                      showItemChevron={
                        section.title === "Work" ||
                        section.title === "Projects" ||
                        section.title === "Education" ||
                        section.title === "Research"
                      }
                    />
                    );
                  })}
                </ul>
              )}
            </section>
          );
          })}
        </main>
        <nav className="section-jump-nav" aria-label="Jump to a section">
          {data.sections.map((section) => {
            const isCurrent = activeNavSection === section.title;
            return (
              <button
                key={`jump-${section.title}`}
                type="button"
                className={`section-jump-button${isCurrent ? " is-current" : ""}`}
                aria-label={`Jump to ${section.title}`}
                aria-current={isCurrent ? "location" : undefined}
                title={section.title}
                onClick={() => navigateToSection(section.title)}
              >
                <span className="section-jump-label">{section.title}</span>
                <span className="section-jump-line" aria-hidden="true" />
              </button>
            );
          })}
        </nav>
        <button
          type="button"
          className={`resume-scroll-cue${canScrollDown ? " is-visible" : ""}`}
          aria-label="Scroll résumé down"
          onClick={scrollResumeDown}
          tabIndex={canScrollDown ? 0 : -1}
        >
          <ScrollDownIcon />
        </button>
      </div>
      {musicSection && (
        <footer className="music-footer" aria-label="Music releases">
          <div className="music-footer-coverflow">
            <MusicCoverFlow
              items={musicSection.items}
              isSectionOpen
              activeItemId={footerAlbum?.id || activeItemId}
              onSelect={handleFooterMusicSelect}
              onNavigate={handleSidebarMusicSelect}
              compact
              showDetails={false}
            />
          </div>
          <AlbumTrackBrowser album={footerAlbum} />
        </footer>
      )}
    </div>
  );
}

function ScrollDownIcon() {
  return (
    <svg viewBox="0 0 20 12" aria-hidden="true">
      <path
        d="m2 2 8 8 8-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      className="contact-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M5.1 3.5A1.8 1.8 0 1 1 5.1 7a1.8 1.8 0 0 1 0-3.5ZM3.6 8.5h3v11.9h-3V8.5Zm5 0h2.9v1.6h.1c.4-.8 1.4-2 3.5-2 3.7 0 4.4 2.4 4.4 5.6v6.7h-3v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v6h-3V8.5Z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      className="contact-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      className="contact-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.55 9.55 0 0 1 12 6.82c.85 0 1.7.11 2.5.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function IMDbIcon() {
  return (
    <svg
      className="contact-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="5.5"
        width="21"
        height="13"
        rx="2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <text
        x="12"
        y="14.7"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Arial Black, Arial, sans-serif"
        fontSize="7.2"
        fontWeight="900"
        letterSpacing="-.45"
      >
        IMDb
      </text>
    </svg>
  );
}

function SoundCloudIcon() {
  return (
    <svg
      className="contact-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <g fill="currentColor">
        <rect x="1.5" y="11.5" width="1.25" height="5" rx=".625" />
        <rect x="3.7" y="9.5" width="1.25" height="7" rx=".625" />
        <rect x="5.9" y="7.5" width="1.25" height="9" rx=".625" />
        <rect x="8.1" y="8.7" width="1.25" height="7.8" rx=".625" />
        <path d="M10.3 16.5V8.2a5.5 5.5 0 0 1 8.8 3.7h.35a2.3 2.3 0 1 1 0 4.6H10.3Z" />
      </g>
    </svg>
  );
}

function SketchGrid({ items, isSectionOpen }) {
  const [activeSketchId, setActiveSketchId] = useState(null);

  return (
    <ul
      className="list sketch-grid"
      aria-hidden={!isSectionOpen}
    >
      {isSectionOpen &&
        items.map((item) => (
          <SketchCard
            item={item}
            isActive={activeSketchId === item.id}
            onActivate={() => setActiveSketchId(item.id)}
            key={item.id}
          />
        ))}
    </ul>
  );
}

function SketchCard({ item, isActive, onActivate }) {
  const frameRef = useRef(null);
  const media = item.media?.[0];
  const preview = sketchPreviews[`./p5-previews/${item.id}.png`];

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) {
      return undefined;
    }

    const updateScale = () => {
      frame.style.setProperty(
        "--sketch-scale",
        `${frame.clientWidth / 640}`
      );
    };

    updateScale();

    if (!("ResizeObserver" in window)) {
      window.addEventListener("resize", updateScale);
      return () => window.removeEventListener("resize", updateScale);
    }

    const observer = new ResizeObserver(updateScale);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <li className="sketch-card">
      <div className="sketch-frame" ref={frameRef}>
        {isActive && media ? (
          <iframe
            title={media.title || item.title}
            src={media.src}
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            className="sketch-placeholder"
            onClick={onActivate}
            aria-label={`Play ${item.title}`}
          >
            {preview && (
              <img
                className="sketch-preview"
                src={preview}
                alt=""
                aria-hidden="true"
              />
            )}
            <span className="sketch-play-label">Play</span>
          </button>
        )}
      </div>
    </li>
  );
}

function AlbumTrackBrowser({ album, context = "footer" }) {
  const audioRef = useRef(null);
  const trackListRef = useRef(null);
  const tracks = useMemo(
    () => album?.media?.filter((media) => media.type === "audio") || [],
    [album]
  );
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);
  const [durations, setDurations] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [scrollbar, setScrollbar] = useState({
    visible: false,
    thumbHeight: 0,
    thumbTop: 0,
  });

  const updateTrackScrollbar = () => {
    const list = trackListRef.current;
    if (!list) return;
    const maxScroll = list.scrollHeight - list.clientHeight;
    const visible = maxScroll > 1;
    const thumbHeight = visible
      ? Math.max(24, (list.clientHeight / list.scrollHeight) * list.clientHeight)
      : 0;
    const thumbTravel = Math.max(0, list.clientHeight - thumbHeight);
    const thumbTop = visible ? (list.scrollTop / maxScroll) * thumbTravel : 0;
    setScrollbar({ visible, thumbHeight, thumbTop });
  };

  useEffect(() => {
    const list = trackListRef.current;
    if (!list) return undefined;
    const frame = window.requestAnimationFrame(updateTrackScrollbar);
    const observer = new ResizeObserver(updateTrackScrollbar);
    observer.observe(list);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [tracks.length]);

  const startScrollbarDrag = (event) => {
    const list = trackListRef.current;
    if (!list) return;
    event.preventDefault();
    const startY = event.clientY;
    const startScrollTop = list.scrollTop;
    const scrollTravel = list.scrollHeight - list.clientHeight;
    const thumbTravel = list.clientHeight - scrollbar.thumbHeight;

    const handlePointerMove = (moveEvent) => {
      if (thumbTravel <= 0) return;
      list.scrollTop =
        startScrollTop +
        ((moveEvent.clientY - startY) / thumbTravel) * scrollTravel;
    };
    const finishDrag = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", finishDrag);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", finishDrag, { once: true });
  };

  useEffect(() => {
    let cancelled = false;
    const probes = new Set();
    setSelectedTrackIndex(null);
    setDurations({});
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute("src");
      audioRef.current.load();
    }

    const readDuration = (track, index) =>
      new Promise((resolve) => {
        const probe = new Audio();
        probes.add(probe);
        probe.preload = "metadata";
        const finish = (duration) => {
          probes.delete(probe);
          probe.removeAttribute("src");
          if (!cancelled && Number.isFinite(duration)) {
            setDurations((current) => ({ ...current, [index]: duration }));
          }
          resolve();
        };
        probe.addEventListener("loadedmetadata", () => finish(probe.duration), {
          once: true,
        });
        probe.addEventListener("error", () => finish(null), { once: true });
        probe.src = track.src;
      });

    const workers = Array.from({ length: Math.min(4, tracks.length) }, (_, worker) =>
      (async () => {
        for (let index = worker; index < tracks.length; index += 4) {
          if (cancelled) return;
          await readDuration(tracks[index], index);
        }
      })()
    );
    Promise.all(workers).catch(() => undefined);

    return () => {
      cancelled = true;
      probes.forEach((probe) => {
        probe.removeAttribute("src");
        probe.load();
      });
      probes.clear();
    };
  }, [tracks]);

  const playTrack = (index) => {
    const audio = audioRef.current;
    if (!audio || !tracks[index]) return;

    if (selectedTrackIndex !== index) {
      audio.src = tracks[index].src;
      setSelectedTrackIndex(index);
    }
    audio.play().catch(() => undefined);
  };

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (selectedTrackIndex === null) {
      if (tracks.length > 0) playTrack(0);
      return;
    }
    if (audio.paused) audio.play().catch(() => undefined);
    else audio.pause();
  };

  const playNextTrack = () => {
    if (selectedTrackIndex === null || tracks.length === 0) return;
    playTrack((selectedTrackIndex + 1) % tracks.length);
  };

  return (
    <section
      className={`album-track-browser ${context}-track-browser`}
      aria-label="Album tracks"
    >
      <header className="track-browser-titlebar">
        <span className="track-browser-folder" aria-hidden="true" />
        <strong>{album?.title || "Select an album"}</strong>
        <span>{tracks.length ? `${tracks.length} tracks` : "No local tracks"}</span>
      </header>
      <div className="track-browser-columns" aria-hidden="true">
        <span>#</span>
        <span>Name</span>
        <span>Time</span>
      </div>
      <div className="track-browser-scroll-area">
        <div
          className="track-browser-list"
          ref={trackListRef}
          onScroll={updateTrackScrollbar}
        >
          {tracks.length > 0 ? (
            tracks.map((track, index) => (
              <button
                type="button"
                className={`track-browser-row${
                  selectedTrackIndex === index ? " is-playing" : ""
                }`}
                key={track.src}
                onClick={() => playTrack(index)}
              >
                <span>{selectedTrackIndex === index ? "▶" : index + 1}</span>
                <span title={track.title}>{track.title}</span>
                <span>{formatTrackDuration(durations[index])}</span>
              </button>
            ))
          ) : (
            <p className="track-browser-empty">
              Select a streamed album to browse its files.
            </p>
          )}
        </div>
        {scrollbar.visible && (
          <div className="track-browser-scrollbar" aria-hidden="true">
            <span
              className="track-browser-scroll-thumb"
              style={{
                height: `${scrollbar.thumbHeight}px`,
                transform: `translateY(${scrollbar.thumbTop}px)`,
              }}
              onPointerDown={startScrollbarDrag}
            />
          </div>
        )}
      </div>
      <div className="footer-playback-controls" aria-label="Playback controls">
        <button
          type="button"
          className="footer-play-button"
          aria-label={isPlaying ? "Pause track" : "Play track"}
          onClick={togglePlayback}
        >
          {isPlaying ? "Ⅱ" : "▶"}
        </button>
        <div className="footer-seek-control">
          <input
            type="range"
            min="0"
            max={
              selectedTrackIndex === null
                ? 0
                : durations[selectedTrackIndex] || 0
            }
            step="0.1"
            value={currentTime}
            aria-label="Track position"
            onChange={(event) => {
              const nextTime = Number(event.target.value);
              setCurrentTime(nextTime);
              if (audioRef.current) audioRef.current.currentTime = nextTime;
            }}
          />
          <span>
            {formatTrackDuration(currentTime)} / {" "}
            {formatTrackDuration(
              selectedTrackIndex === null
                ? null
                : durations[selectedTrackIndex]
            )}
          </span>
        </div>
        <label className="footer-volume-control">
          <span aria-hidden="true">VOL</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.02"
            value={volume}
            aria-label="Volume"
            onChange={(event) => {
              const nextVolume = Number(event.target.value);
              setVolume(nextVolume);
              if (audioRef.current) audioRef.current.volume = nextVolume;
            }}
          />
        </label>
      </div>
      <audio
        ref={audioRef}
        className="track-browser-player"
        controls
        preload="metadata"
        onEnded={playNextTrack}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => {
          const duration = event.currentTarget.duration;

          if (selectedTrackIndex !== null && Number.isFinite(duration)) {
            setDurations((current) => ({
              ...current,
              [selectedTrackIndex]: duration,
            }));
          }
        }}
      />
    </section>
  );
}

function formatTrackDuration(duration) {
  if (!Number.isFinite(duration)) return "--:--";
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function MusicCoverFlow({
  items,
  isSectionOpen,
  activeItemId,
  onSelect,
  onNavigate,
  compact = false,
  showDetails: renderDetails = true,
}) {
  const loopGroupCount = 21;
  const middleLoopGroup = Math.floor(loopGroupCount / 2);
  const displayItems = useMemo(() => {
    const featuredIndex = items.findIndex((item) => item.coverFlowStart);
    if (featuredIndex < 0 || items.length < 2) return items;

    const middleIndex = Math.floor(items.length / 2);
    const firstIndex =
      (featuredIndex - middleIndex + items.length) % items.length;

    return Array.from(
      { length: items.length },
      (_, index) => items[(firstIndex + index) % items.length]
    );
  }, [items]);
  const loopedItems = useMemo(
    () =>
      displayItems.length > 1
        ? Array.from({ length: displayItems.length * loopGroupCount }, (_, index) => ({
            item: displayItems[index % displayItems.length],
            loopKey: `${Math.floor(index / displayItems.length)}-${
              displayItems[index % displayItems.length].id
            }`,
          }))
        : displayItems.map((item) => ({ item, loopKey: item.id })),
    [displayItems, loopGroupCount]
  );
  const trackRef = useRef(null);
  const layoutFrameRef = useRef(0);
  const scrollEndTimerRef = useRef(0);
  const selectedIndexRef = useRef(0);
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const activeIndex = displayItems.findIndex(
      (item) => item.id === activeItemId
    );
    const initialIndex =
      (displayItems.length > 1
        ? displayItems.length * middleLoopGroup
        : 0) +
      (activeIndex >= 0 ? activeIndex : Math.floor(displayItems.length / 2));
    selectedIndexRef.current = initialIndex;
    return initialIndex;
  });

  useEffect(() => {
    const activeIndex = displayItems.findIndex(
      (item) => item.id === activeItemId
    );
    if (activeIndex >= 0) {
      const loopedIndex =
        displayItems.length > 1
          ? Array.from(
              { length: loopGroupCount },
              (_, groupIndex) => groupIndex * displayItems.length + activeIndex
            )
              .reduce((closest, candidate) =>
                Math.abs(candidate - selectedIndexRef.current) <
                Math.abs(closest - selectedIndexRef.current)
                  ? candidate
                  : closest
              )
          : activeIndex;
      selectedIndexRef.current = loopedIndex;
      setSelectedIndex(loopedIndex);
      const animationFrame = window.requestAnimationFrame(() => {
        const track = trackRef.current;
        const cover = track?.querySelector(
          `[data-cover-index="${loopedIndex}"]`
        );
        if (!track || !cover) return;
        const targetLeft =
          cover.offsetLeft - (track.clientWidth - cover.offsetWidth) / 2;
        track.scrollTo({ left: targetLeft, behavior: "smooth" });
      });
      return () => window.cancelAnimationFrame(animationFrame);
    }
    return undefined;
  }, [activeItemId, displayItems]);

  useEffect(() => {
    if (!isSectionOpen) return undefined;

    const animationFrame = window.requestAnimationFrame(() => {
      const track = trackRef.current;
      const cover = track?.querySelector(
        `[data-cover-index="${selectedIndexRef.current}"]`
      );

      if (track && cover) {
        const targetLeft =
          cover.offsetLeft - (track.clientWidth - cover.offsetWidth) / 2;
        track.scrollTo({ left: targetLeft, behavior: "auto" });
      }

      const closestIndex = updateCoverFlowLayout(track);
      if (closestIndex >= 0) {
        selectedIndexRef.current = closestIndex;
        setSelectedIndex(closestIndex);
      }
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.cancelAnimationFrame(layoutFrameRef.current);
      window.clearTimeout(scrollEndTimerRef.current);
      document.documentElement.classList.remove("coverflow-scrolling");
    };
  }, [isSectionOpen, loopedItems.length]);

  const centerCover = (index, behavior = "smooth") => {
    const track = trackRef.current;
    const cover = track?.querySelector(
      `[data-cover-index="${index}"]`
    );
    if (!track || !cover) return;

    const targetLeft =
      cover.offsetLeft - (track.clientWidth - cover.offsetWidth) / 2;
    track.scrollTo({ left: targetLeft, behavior });
  };

  const chooseCover = (index) => {
    selectedIndexRef.current = index;
    setSelectedIndex(index);
    centerCover(index);
    onSelect(loopedItems[index].item.id);
  };

  const navigateFromCover = (event, index) => {
    event.preventDefault();
    chooseCover(index);
    onNavigate?.(loopedItems[index].item.id);
  };

  const stepCover = (direction) => {
    const nextIndex = selectedIndexRef.current + direction;
    chooseCover(nextIndex);
  };

  const handleTrackScroll = () => {
    document.documentElement.classList.add("coverflow-scrolling");
    window.clearTimeout(scrollEndTimerRef.current);

    scrollEndTimerRef.current = window.setTimeout(() => {
      document.documentElement.classList.remove("coverflow-scrolling");
      setSelectedIndex(selectedIndexRef.current);
    }, 110);

    if (layoutFrameRef.current) return;

    layoutFrameRef.current = window.requestAnimationFrame(() => {
      layoutFrameRef.current = 0;
      const closestIndex = updateCoverFlowLayout(trackRef.current);
      if (closestIndex >= 0) {
        selectedIndexRef.current = closestIndex;
      }
    });
  };

  const selectedItem = loopedItems[selectedIndex]?.item;
  const isDetailsOpen = selectedItem?.id === activeItemId;

  return (
    <div
      className={`music-flow-shell${isSectionOpen ? " is-open" : ""}${
        compact ? " is-compact" : ""
      }`}
      aria-hidden={!isSectionOpen}
    >
      <div className="music-coverflow">
        <button
          type="button"
          className="coverflow-arrow coverflow-arrow-left"
          aria-label="Previous release"
          tabIndex={isSectionOpen ? 0 : -1}
          onClick={() => stepCover(-1)}
        >
          <CoverFlowChevron direction="left" />
        </button>
        <div
          className="coverflow-track"
          ref={trackRef}
          onScroll={handleTrackScroll}
        >
          {loopedItems.map(({ item, loopKey }, index) => {
            const position =
              index === selectedIndex
                ? "is-selected"
                : index < selectedIndex
                ? "is-left"
                : "is-right";

            return (
              <button
                type="button"
                className={`coverflow-card ${position}`}
                data-cover-index={index}
                key={loopKey}
                aria-pressed={index === selectedIndex}
                tabIndex={isSectionOpen ? 0 : -1}
                onClick={() => chooseCover(index)}
                onContextMenu={(event) => navigateFromCover(event, index)}
              >
                <span
                  className={`coverflow-art${
                    item.coverStyle ? ` coverflow-art-${item.coverStyle}` : ""
                  }`}
                  style={
                    item.coverHue === undefined
                      ? undefined
                      : { "--album-hue": item.coverHue }
                  }
                >
                  {item.cover ? (
                    <img src={item.cover} alt={`${item.title} cover`} />
                  ) : (
                    <span className="coverflow-generated-cover">
                      <span className="coverflow-generated-artist">RAY</span>
                      <span className="coverflow-generated-title">
                        {item.title}
                      </span>
                    </span>
                  )}
                </span>
                <span className="coverflow-title">{item.title}</span>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="coverflow-arrow coverflow-arrow-right"
          aria-label="Next release"
          tabIndex={isSectionOpen ? 0 : -1}
          onClick={() => stepCover(1)}
        >
          <CoverFlowChevron direction="right" />
        </button>
      </div>
      {renderDetails && isDetailsOpen && (
        <div className="music-flow-details">
          <AlbumTrackBrowser album={selectedItem} context="section" />
          <ItemDetails item={selectedItem} excludeMediaTypes={["audio"]} />
        </div>
      )}
    </div>
  );
}

function updateCoverFlowLayout(track) {
  if (!track) return -1;

  const trackBounds = track.getBoundingClientRect();
  const trackCenter = trackBounds.left + track.clientWidth / 2;
  const covers = [...track.querySelectorAll("[data-cover-index]")];
  let closestIndex = -1;
  let closestDistance = Infinity;

  covers.forEach((cover) => {
    const coverCenter =
      trackBounds.left -
      track.scrollLeft +
      cover.offsetLeft +
      cover.offsetWidth / 2;
    const distance = coverCenter - trackCenter;
    const normalizedOffset = distance / Math.max(1, cover.offsetWidth * 0.82);
    const magnitude = Math.min(Math.abs(normalizedOffset), 2);
    const centerStrength = Math.max(0, 1 - magnitude);
    const rotation = Math.max(-58, Math.min(58, normalizedOffset * -46));
    const scale = 1 - Math.min(magnitude, 1.35) * 0.16;
    const overlap = Math.sign(normalizedOffset) * -18 * Math.min(magnitude, 1);
    const lift = -4 * centerStrength;

    cover.style.transform = `translate3d(${overlap}px, ${lift}px, 0) rotateY(${rotation}deg) scale(${scale})`;
    cover.style.opacity = `${0.68 + centerStrength * 0.32}`;
    cover.style.zIndex = `${Math.max(1, 20 - Math.round(magnitude * 8))}`;

    const absoluteDistance = Math.abs(distance);
    if (absoluteDistance < closestDistance) {
      closestDistance = absoluteDistance;
      closestIndex = Number(cover.dataset.coverIndex);
    }
  });

  return closestIndex;
}

function CoverFlowChevron({ direction }) {
  return (
    <svg
      className="coverflow-chevron"
      viewBox="0 0 12 20"
      aria-hidden="true"
    >
      <path
        d={direction === "left" ? "M10 2 2 10l8 8" : "m2 2 8 8-8 8"}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PortfolioListItem({
  item,
  isActive,
  onSelect,
  isSectionOpen,
  alignTimeframeRight,
  isProjectSection,
  isResumeShowcase,
  isWorkShowcase,
  isResearchShowcase,
  showItemChevron,
}) {
  const isEmployer =
    item.logoStyle === "mercor" ||
    item.logoStyle === "jujube" ||
    item.logoStyle === "blublu";
  const isSchool = isResumeShowcase && Boolean(item.schoolImage);
  const hasSeparateLocation =
    isEmployer ||
    isSchool ||
    (isWorkShowcase && item.logoStyle === "nyu");
  const meta = [
    item.role,
    hasSeparateLocation ? null : item.location,
    alignTimeframeRight ? null : item.timeframe,
  ]
    .filter(Boolean)
    .join(" · ");
  const itemHeading = (
    <>
      <span className="item-heading-row">
        <span className="item-title">
          <ProjectTitle item={item} />
          {item.schoolImage && !isResumeShowcase && (
            <img
              className="school-thumbnail"
              src={item.schoolImage}
              alt={item.schoolImageAlt || ""}
              loading="lazy"
              decoding="async"
            />
          )}
          {showItemChevron && (
            <span className="item-chevron" aria-hidden="true">
              ›
            </span>
          )}
        </span>
        {alignTimeframeRight && item.timeframe && (
          <span className="item-timeframe">{item.timeframe}</span>
        )}
      </span>
      {meta && <span className="item-meta">{meta}</span>}
      {hasSeparateLocation && item.location && (
        <span className="item-location">{item.location}</span>
      )}
    </>
  );

  return (
    <li
      className={`item${item.logoStyle ? " item-branded" : ""}${
        isProjectSection ? " item-project" : ""
      }${isResumeShowcase ? " item-showcase" : ""}${
        isEmployer ? " item-employer" : ""
      }${isSchool ? " item-school" : ""
      }${isWorkShowcase ? " item-work" : ""
      }${isResearchShowcase ? " item-research" : ""
      }${
        showItemChevron ? " item-expandable" : ""
      }${
        isActive ? " active" : ""
      }`}
      aria-hidden={!isSectionOpen}
    >
      {isResumeShowcase ? (
        <div className="item-showcase-row">
          <button
            type="button"
            className="item-button"
            tabIndex={isSectionOpen ? 0 : -1}
            onClick={() => onSelect(item.id)}
          >
            <span className="item-showcase-copy">{itemHeading}</span>
          </button>
          <ResumeShowcaseVisual item={item} />
        </div>
      ) : (
        <button
          type="button"
          className="item-button"
          tabIndex={isSectionOpen ? 0 : -1}
          onClick={() => onSelect(item.id)}
        >
          {itemHeading}
        </button>
      )}
      {isActive && <ItemDetails item={item} />}
    </li>
  );
}

function ResumeShowcaseVisual({ item }) {
  if (item.showcaseEmbed) {
    if (item.showcaseDesktopViewport) {
      return <DesktopShowcaseEmbed item={item} />;
    }

    return (
      <span
        className={`resume-showcase-visual resume-showcase-embed${
          item.showcaseAspectRatio ? " resume-showcase-embed-widescreen" : ""
        }`}
        style={
          item.showcaseAspectRatio
            ? { "--showcase-aspect-ratio": item.showcaseAspectRatio }
            : undefined
        }
      >
        <iframe
          src={
            item.showcaseEmbedFit === "page"
              ? `${item.showcaseEmbed}#page=1&zoom=page-fit`
              : item.showcaseEmbed
          }
          title={item.showcaseEmbedTitle || `${item.title} preview`}
          loading="lazy"
          scrolling={item.logoStyle === "tmlne" ? "yes" : undefined}
          allow={`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share${item.showcasePermissions ? `; ${item.showcasePermissions}` : ""}`}
          allowFullScreen
        />
      </span>
    );
  }

  if (item.showcaseImage) {
    return (
      <span
        className={`resume-showcase-visual resume-showcase-photo${
          item.showcaseFit === "contain" ? " resume-showcase-contain" : ""
        }`}
      >
        <img
          src={item.showcaseImage}
          alt={item.showcaseImageAlt || ""}
          loading="lazy"
          decoding="async"
        />
      </span>
    );
  }

  if (item.schoolImage) {
    return (
      <span className="resume-showcase-visual resume-showcase-photo">
        <img
          src={item.schoolImage}
          alt={item.schoolImageAlt || ""}
          loading="lazy"
          decoding="async"
        />
      </span>
    );
  }

  const logoByStyle = {
    mercor: mercorShowcaseLogo,
    jujube: jujubeLogo,
    nyu: nyuLogo,
    berklee: berkleeLogo,
  };
  const logo = logoByStyle[item.logoStyle];

  if (!logo) {
    return (
      <span className="resume-showcase-visual resume-showcase-placeholder">
        <span>{item.title}</span>
      </span>
    );
  }

  return (
    <span
      className={`resume-showcase-visual resume-showcase-logo resume-showcase-logo-${item.logoStyle}`}
    >
      <img src={logo} alt="" aria-hidden="true" />
    </span>
  );
}

function DesktopShowcaseEmbed({ item }) {
  const frameRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    const updateScale = () => {
      frame.style.setProperty(
        "--desktop-preview-scale",
        `${frame.clientWidth / 1920}`
      );
    };
    const resizeObserver = new ResizeObserver(updateScale);

    resizeObserver.observe(frame);
    updateScale();

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <span
      ref={frameRef}
      className="resume-showcase-visual resume-showcase-embed resume-showcase-embed-widescreen resume-showcase-desktop-window"
      style={{ "--showcase-aspect-ratio": item.showcaseAspectRatio || "16 / 9" }}
    >
      <iframe
        src={item.showcaseEmbed}
        title={item.showcaseEmbedTitle || `${item.title} preview`}
        loading="lazy"
        scrolling={item.logoStyle === "tmlne" ? "yes" : undefined}
        allow={`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share${item.showcasePermissions ? `; ${item.showcasePermissions}` : ""}`}
        allowFullScreen
      />
    </span>
  );
}

const TMLNE_DOT_LETTERS = {
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  M: ["10001", "11011", "10101", "10001", "10001", "10001", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
};

function ProjectTitle({ item }) {
  if (item.logoStyle === "nyu" || item.logoStyle === "berklee") {
    const schoolLogo = item.logoStyle === "nyu" ? nyuLogo : berkleeLogo;

    return (
      <span
        className={`project-logo project-logo-school project-logo-school-${item.logoStyle}`}
      >
        <img src={schoolLogo} alt="" aria-hidden="true" />
        <span className="project-logo-school-copy">
          <span>{item.title}</span>
          {item.subtitle && (
            <span className="project-title-subtitle">{item.subtitle}</span>
          )}
        </span>
      </span>
    );
  }

  if (
    item.logoStyle === "jujube" ||
    item.logoStyle === "mercor" ||
    item.logoStyle === "blublu"
  ) {
    const employerLogos = {
      blublu: blubluLogo,
      jujube: jujubeLogo,
      mercor: mercorLogo,
    };
    const employerLogo = employerLogos[item.logoStyle];

    return (
      <span
        className={`project-logo project-logo-employer project-logo-employer-${item.logoStyle}`}
      >
        <img src={employerLogo} alt="" aria-hidden="true" />
        <span>{item.title}</span>
      </span>
    );
  }

  if (item.logoStyle === "pixelcam") {
    return <span className="project-logo project-logo-pixelcam">{item.title}</span>;
  }

  if (item.logoStyle === "eterna") {
    return (
      <span
        className="project-logo project-logo-eterna"
        role="img"
        aria-label={item.title}
        style={{ "--eterna-logo": `url(${eternaLogo})` }}
      />
    );
  }

  if (item.logoStyle === "tmlne") {
    return (
      <span className="project-logo project-logo-tmlne" aria-label={item.title}>
        {Array.from(item.title).map((letter, letterIndex) => (
          <span
            className="tmlne-dot-letter"
            aria-hidden="true"
            key={`${letter}-${letterIndex}`}
            style={{ "--letter-delay": letterIndex * 240 }}
          >
            {TMLNE_DOT_LETTERS[letter].flatMap((row, rowIndex) =>
              Array.from(row).map((dot, dotIndex) => (
                <span
                  className={`tmlne-logo-dot ${dot === "1" ? "is-on" : "is-off"}`}
                  key={`${rowIndex}-${dotIndex}`}
                  style={{ "--dot-delay": (rowIndex * 5 + dotIndex) * 24 }}
                />
              ))
            )}
          </span>
        ))}
      </span>
    );
  }

  return item.title;
}

function ItemDetails({ item, excludeMediaTypes = [] }) {
  const description =
    item.description || "Add a description for this item by editing the data.";
  const showDescription = !/^\d+ streamed tracks?\.$/i.test(description.trim());
  const hasLinks = Array.isArray(item.links) && item.links.length > 0;
  const media = Array.isArray(item.media)
    ? item.media.filter((entry) => !excludeMediaTypes.includes(entry.type))
    : [];
  const hasAnyMedia = Array.isArray(item.media) && item.media.length > 0;
  const hasMedia = media.length > 0;
  const hasHighlights = Array.isArray(item.highlights) && item.highlights.length > 0;
  const hasCourseGroups =
    Array.isArray(item.courseGroups) && item.courseGroups.length > 0;

  return (
    <div className="item-details">
      {item.role && !item.timeframe && (
        <p className="item-role">{item.role}</p>
      )}
      {hasMedia && (
        <div className="media-grid">
          {media.map((media, index) => (
            <MediaBlock
              key={`${item.id}-${media.type}-${media.uniqueId || media.src || index}`}
              media={media}
            />
          ))}
        </div>
      )}
      {showDescription && <p className="item-description">{description}</p>}
      {hasCourseGroups && <CourseGroups groups={item.courseGroups} />}
      {hasHighlights && (
        <ul className="item-highlights">
          {item.highlights.map((highlight, index) => (
            <li key={`${item.id}-highlight-${index}`}>{highlight}</li>
          ))}
        </ul>
      )}
      {hasLinks && (
        <div className="item-links">
          {item.links.map((link) => (
            <a
              key={link.url}
              className="item-link"
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >
              {link.label || link.url}
            </a>
          ))}
        </div>
      )}
      {!hasAnyMedia && !hasHighlights && !hasCourseGroups ? (
        <p className="item-details-placeholder">
          Add photos, videos, or embeds by inserting entries into this item's
          media array.
        </p>
      ) : null}
    </div>
  );
}

function CourseGroups({ groups }) {
  return (
    <div className="course-groups">
      {groups.map((group) => (
        <details
          className="course-group"
          key={group.id}
          open={group.id === "nyu-3d-ar-virtual-environments"}
        >
          <summary>{group.title}</summary>
          <div className="course-group-content">
            {group.description && <p>{group.description}</p>}
            {group.id === "nyu-3d-ar-virtual-environments" && (
              <StlModelGallery models={group.models || []} />
            )}
            {Array.isArray(group.highlights) && group.highlights.length > 0 && (
              <ul>
                {group.highlights.map((course, index) => {
                  const courseText =
                    typeof course === "string" ? course : course.text;
                  const courseMedia =
                    typeof course === "object" && Array.isArray(course.media)
                      ? course.media
                      : [];
                  const courseLinks =
                    typeof course === "object" && Array.isArray(course.links)
                      ? course.links
                      : [];
                  const courseProjectTitle =
                    typeof course === "object" ? course.projectTitle : null;

                  return (
                    <li key={`${group.id}-course-${index}`}>
                      {courseText}
                      {courseProjectTitle && (
                        <h4 className="course-project-title">
                          {courseProjectTitle}
                        </h4>
                      )}
                      {courseMedia.length > 0 && (
                        <div className="course-media-grid">
                          {courseMedia.map((media, mediaIndex) => (
                            <MediaBlock
                              key={`${group.id}-course-${index}-media-${mediaIndex}`}
                              media={media}
                            />
                          ))}
                        </div>
                      )}
                      {courseLinks.length > 0 && (
                        <div className="course-downloads">
                          {courseLinks.map((link) => (
                            <a
                              className="item-link"
                              href={link.url}
                              download={link.download || undefined}
                              key={link.url}
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

function StlModelGallery({ models }) {
  const [localModels, setLocalModels] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const localUrlsRef = useRef([]);
  const trackRef = useRef(null);
  const displayModels = useMemo(
    () => [...models, ...localModels],
    [models, localModels]
  );

  useEffect(
    () => () => {
      localUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    },
    []
  );

  useEffect(() => {
    setSelectedIndex((current) =>
      Math.min(current, Math.max(0, displayModels.length - 1))
    );
  }, [displayModels.length]);

  useEffect(() => {
    const track = trackRef.current;
    const card = track?.querySelector(`[data-model-index="${selectedIndex}"]`);
    if (!track || !card) return;

    const targetLeft =
      card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    track.scrollTo({ left: targetLeft, behavior: "smooth" });
  }, [selectedIndex]);

  const addLocalModels = (files) => {
    const additions = Array.from(files || [])
      .filter((file) => /\.stl$/i.test(file.name))
      .map((file, index) => {
        const src = URL.createObjectURL(file);
        localUrlsRef.current.push(src);
        return {
          id: `local-stl-${Date.now()}-${index}`,
          title: file.name.replace(/\.stl$/i, ""),
          src,
          color: "#8bb8d8",
          isLocal: true,
        };
      });

    if (additions.length === 0) return;
    setLocalModels((current) => {
      const firstNewIndex = models.length + current.length;
      setSelectedIndex(firstNewIndex);
      return [...current, ...additions];
    });
  };

  const stepModel = (direction) => {
    if (displayModels.length === 0) return;
    setSelectedIndex(
      (current) =>
        (current + direction + displayModels.length) % displayModels.length
    );
  };

  const selectedModel = displayModels[selectedIndex];

  return (
    <div className="stl-gallery">
      <div className="stl-gallery-heading">
        <div>
          <h4>3D Models</h4>
          <p>Drag to rotate · scroll to zoom · right-drag to pan</p>
        </div>
        <label className="stl-upload-button">
          Preview STL files
          <input
            type="file"
            accept=".stl,model/stl"
            multiple
            onChange={(event) => {
              addLocalModels(event.target.files);
              event.target.value = "";
            }}
          />
        </label>
      </div>

      {selectedModel ? (
        <>
          <StlModelViewer model={selectedModel} />
          <div className="stl-coverflow">
            <button
              type="button"
              className="coverflow-arrow coverflow-arrow-left"
              aria-label="Previous 3D model"
              onClick={() => stepModel(-1)}
            >
              <CoverFlowChevron direction="left" />
            </button>
            <div className="stl-coverflow-track" ref={trackRef}>
              {displayModels.map((model, index) => {
                const position =
                  index === selectedIndex
                    ? "is-selected"
                    : index < selectedIndex
                    ? "is-left"
                    : "is-right";

                return (
                  <button
                    type="button"
                    className={`stl-coverflow-card ${position}`}
                    data-model-index={index}
                    aria-pressed={index === selectedIndex}
                    key={model.id || `${model.src}-${index}`}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <span className="stl-coverflow-art">
                      {model.preview ? (
                        <img src={model.preview} alt="" />
                      ) : (
                        <WireframeCubeIcon />
                      )}
                    </span>
                    <span className="stl-coverflow-title">{model.title}</span>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              className="coverflow-arrow coverflow-arrow-right"
              aria-label="Next 3D model"
              onClick={() => stepModel(1)}
            >
              <CoverFlowChevron direction="right" />
            </button>
          </div>
        </>
      ) : (
        <div className="stl-gallery-empty">
          <WireframeCubeIcon />
          <strong>STL viewer ready</strong>
          <span>
            Add model entries in portfolioData.js or preview multiple STL files
            from this device.
          </span>
        </div>
      )}
    </div>
  );
}

function StlModelViewer({ model }) {
  const shellRef = useRef(null);
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const shell = shellRef.current;
    const canvas = canvasRef.current;
    if (!shell || !canvas || !model?.src) return undefined;

    let active = true;
    let animationFrame = 0;
    let geometry = null;
    let mesh = null;
    let renderer = null;
    let scene = null;
    let controls = null;
    let resizeObserver = null;

    setStatus("loading");

    const initialize = async () => {
      try {
        const [THREE, { OrbitControls }, { STLLoader }] = await Promise.all([
          import("three"),
          import("three/addons/controls/OrbitControls.js"),
          import("three/addons/loaders/STLLoader.js"),
        ]);
        if (!active) return;

        renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setClearColor(0x000000, 0);

        scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 100);
        camera.position.set(2.7, 2.05, 3.2);

        controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;
        controls.dampingFactor = 0.07;
        controls.enablePan = true;
        controls.minDistance = 1.7;
        controls.maxDistance = 7;

        scene.add(new THREE.HemisphereLight(0xffffff, 0x26313d, 2.5));
        const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
        keyLight.position.set(4, 5, 3);
        scene.add(keyLight);
        const fillLight = new THREE.DirectionalLight(0x9fc8ff, 1.8);
        fillLight.position.set(-4, 1, -2);
        scene.add(fillLight);

        const resize = () => {
          const width = Math.max(1, shell.clientWidth);
          const height = Math.max(1, shell.clientHeight);
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(shell);
        resize();

        const loader = new STLLoader();
        loader.load(
          model.src,
          (loadedGeometry) => {
            if (!active) {
              loadedGeometry.dispose();
              return;
            }

            geometry = loadedGeometry;
            geometry.computeVertexNormals();
            geometry.center();
            geometry.computeBoundingSphere();
            const radius = Math.max(
              geometry.boundingSphere?.radius || 1,
              0.001
            );
            geometry.scale(1.25 / radius, 1.25 / radius, 1.25 / radius);

            const material = new THREE.MeshStandardMaterial({
              color: model.color || "#8bb8d8",
              roughness: 0.58,
              metalness: 0.08,
              side: THREE.DoubleSide,
            });
            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            controls.target.set(0, 0, 0);
            controls.update();
            setStatus("ready");
          },
          undefined,
          () => {
            if (active) setStatus("error");
          }
        );

        const render = () => {
          controls.update();
          renderer.render(scene, camera);
          animationFrame = window.requestAnimationFrame(render);
        };
        render();
      } catch {
        if (active) setStatus("error");
      }
    };

    initialize();

    return () => {
      active = false;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      controls?.dispose();
      if (mesh && scene) {
        scene.remove(mesh);
        mesh.material.dispose();
      }
      geometry?.dispose();
      renderer?.dispose();
    };
  }, [model]);

  return (
    <div className="stl-viewer-shell" ref={shellRef}>
      <canvas
        ref={canvasRef}
        aria-label={`Interactive 3D viewer for ${model.title}`}
      />
      <div className="stl-viewer-name">{model.title}</div>
      {status === "loading" && (
        <div className="stl-viewer-status">Loading model…</div>
      )}
      {status === "error" && (
        <div className="stl-viewer-status is-error">
          This STL model could not be loaded.
        </div>
      )}
    </div>
  );
}

function WireframeCubeIcon() {
  return (
    <svg
      className="wireframe-cube-icon"
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <path d="M32 5 55 18 32 31 9 18 32 5Z" />
      <path d="M9 18v27l23 14 23-14V18" />
      <path d="M32 31v28M9 45l23-14 23 14" />
    </svg>
  );
}

function MediaBlock({ media }) {
  if (media.type === "image") {
    return (
      <figure className="media media-image">
        <img src={media.src} alt={media.alt || media.title || "Portfolio"} />
        {media.caption && (
          <figcaption className="media-caption">{media.caption}</figcaption>
        )}
      </figure>
    );
  }

  if (media.type === "video") {
    return (
      <div className="media media-video">
        <video
          controls
          src={media.src}
          poster={media.poster}
          preload="metadata"
        />
        {media.caption && (
          <p className="media-caption">{media.caption}</p>
        )}
      </div>
    );
  }

  if (media.type === "audio") {
    return (
      <figure className="media media-audio">
        <figcaption className="media-audio-title">
          {media.title || "Audio"}
        </figcaption>
        <audio controls preload="metadata" src={media.src}>
          Your browser does not support embedded audio.
        </audio>
      </figure>
    );
  }

  if (media.type === "soundcloud") {
    return (
      <div className="media media-embed">
        <iframe
          title={media.title || "SoundCloud player"}
          width="100%"
          height="450"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={media.src}
        />
        <div
          style={{
            fontSize: "10px",
            color: "#cccccc",
            lineBreak: "anywhere",
            wordBreak: "normal",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            fontFamily:
              "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
            fontWeight: 100,
          }}
        >
          <a
            href={media.artistUrl}
            title={media.artistLabel}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#cccccc", textDecoration: "none" }}
          >
            {media.artistLabel || media.artistUrl}
          </a>{" "}
          ·{" "}
          <a
            href={media.playlistUrl}
            title={media.playlistLabel}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#cccccc", textDecoration: "none" }}
          >
            {media.playlistLabel || media.playlistUrl}
          </a>
        </div>
      </div>
    );
  }

  if (media.type === "embed") {
    const widthAttr = media.width || "100%";
    const heightAttr = media.height || "360";
    const isTimelineEmbed = /^https?:\/\/(?:www\.)?tmlne\.com\//i.test(
      media.src || ""
    );
    const normalizedWidthStyle =
      typeof widthAttr === "number" ? `${widthAttr}px` : widthAttr;
    const normalizedHeightStyle =
      typeof media.height === "number"
        ? `${media.height}px`
        : typeof media.height === "string"
        ? /[a-z%]/i.test(media.height)
          ? media.height
          : `${media.height}px`
        : "360px";
    const heightAttributeValue =
      typeof heightAttr === "number"
        ? heightAttr
        : `${heightAttr}`.replace(/px$/i, "");

    return (
      <div className="media media-embed">
        <iframe
          title={media.title || "Embedded preview"}
          src={media.src}
          width={widthAttr}
          height={heightAttributeValue}
          scrolling={isTimelineEmbed ? "yes" : undefined}
          style={{
            width: normalizedWidthStyle,
            height: normalizedHeightStyle,
            border: 0,
          }}
          allow={media.allow || "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}
          loading="lazy"
          allowFullScreen={!media.allow?.includes("fullscreen")}
        />
      </div>
    );
  }

  if (media.type === "tiktok") {
    return <TikTokEmbed media={media} />;
  }

  return (
    <div className="media media-embed">
      <iframe
        title={media.title || "Embedded media"}
        src={media.src}
        allow={
          media.allow ||
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        }
        loading="lazy"
        allowFullScreen={!media.allow?.includes("fullscreen")}
      />
      {media.caption && (
        <p className="media-caption">{media.caption}</p>
      )}
    </div>
  );
}

function TikTokEmbed({ media }) {
  useEffect(() => {
    const scriptSrc = "https://www.tiktok.com/embed.js";
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.onload = () => {
        if (window.tiktokEmbedLoaded) {
          window.tiktokEmbedLoaded();
        }
      };
      document.body.appendChild(script);
      return;
    }
    if (window.tiktokEmbedLoaded) {
      window.tiktokEmbedLoaded();
    }
  }, [media.uniqueId]);

  return (
    <div className="media media-embed">
      <blockquote
        className="tiktok-embed"
        cite={media.cite}
        data-embed-type="creator"
        data-unique-id={media.uniqueId}
        style={{ maxWidth: "780px", minWidth: "288px" }}
      >
        <section>
          <a
            href={media.creatorUrl}
            target="_blank"
            rel="noreferrer"
          >
            {media.creatorLabel || media.creatorUrl}
          </a>
        </section>
      </blockquote>
    </div>
  );
}

function StyleTag() {
  return (
    <style>{`
/* Base */
*{box-sizing:border-box}
html,body,#root{height:100%;max-width:100%;overflow-x:clip}
body{margin:0;font-family:'Syne', sans-serif;background:transparent;color:#111;font-size:18px;line-height:1.6;cursor:url("${xpCursor}") 1 2,auto}
.app-shell{position:relative}
a,button,[role="button"],summary{cursor:url("${xpPointer}") 7 1,pointer}

/* Layout */
.container{display:grid;grid-template-columns:minmax(260px,.78fr) minmax(0,2.22fr);width:100%;height:100vh;height:100dvh;min-height:0;overflow:hidden}
.sidebar{position:relative;z-index:2;height:100%;padding:2rem 1.25rem 1.25rem;border:0;background:transparent;isolation:isolate;overflow:hidden}
.sidebar::after{content:"";position:absolute;z-index:3;top:0;right:0;bottom:0;width:10px;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8'%3E%3Ccircle cx='5' cy='4' r='1' fill='%23566b7a' fill-opacity='.42'/%3E%3C/svg%3E");background-position:center top;background-repeat:repeat-y}
.sidebar::before{content:"";position:absolute;z-index:4;top:var(--portfolio-scroll-position,0px);right:0;width:10px;height:48px;background:radial-gradient(circle at 50% 4px,#566b7a 0 var(--portfolio-dot-size-1,1.2px),transparent calc(var(--portfolio-dot-size-1,1.2px) + .2px)),radial-gradient(circle at 50% 12px,#566b7a 0 var(--portfolio-dot-size-2,1.6px),transparent calc(var(--portfolio-dot-size-2,1.6px) + .2px)),radial-gradient(circle at 50% 20px,#566b7a 0 var(--portfolio-dot-size-3,2.6px),transparent calc(var(--portfolio-dot-size-3,2.6px) + .2px)),radial-gradient(circle at 50% 28px,#566b7a 0 var(--portfolio-dot-size-4,1.6px),transparent calc(var(--portfolio-dot-size-4,1.6px) + .2px)),radial-gradient(circle at 50% 36px,#566b7a 0 var(--portfolio-dot-size-5,1.2px),transparent calc(var(--portfolio-dot-size-5,1.2px) + .2px)),radial-gradient(circle at 50% 44px,#566b7a 0 var(--portfolio-dot-size-6,1px),transparent calc(var(--portfolio-dot-size-6,1px) + .2px));pointer-events:none}
.content-shell{position:relative;min-width:0;height:100%;overflow:hidden}
.content{min-width:0;height:100%;padding:2rem 4.5rem 17rem 2rem;background:none;overflow-x:hidden;overflow-y:scroll;overflow-anchor:none;overscroll-behavior:contain;scrollbar-gutter:stable}
.content{scrollbar-width:none}
.content::-webkit-scrollbar{display:none}
.resume-scroll-cue{position:absolute;z-index:20;left:50%;bottom:1rem;display:grid;width:42px;height:42px;padding:0;place-items:center;border:1px solid rgba(17,17,17,.2);border-radius:50%;background:rgba(207,213,219,.94);box-shadow:0 5px 18px rgba(20,35,55,.2);color:#111;opacity:0;pointer-events:none;transform:translate(-50%,12px);transition:opacity .2s ease,transform .2s ease,background-color .2s ease}
.resume-scroll-cue.is-visible{opacity:1;pointer-events:auto;transform:translate(-50%,0)}
.resume-scroll-cue.is-visible:hover{background:#e6eaee;transform:translate(-50%,-2px)}
.resume-scroll-cue:focus-visible{outline:2px solid rgba(60,118,255,.65);outline-offset:3px}
.resume-scroll-cue svg{display:block;width:18px;height:12px}
.section-jump-nav{position:absolute;z-index:18;top:50%;right:0;display:flex;flex-direction:column;align-items:flex-end;gap:.18rem;transform:translateY(-50%)}
.section-jump-button{position:relative;display:flex;width:46px;height:18px;padding:0;align-items:center;justify-content:flex-end;border:0;background:transparent;color:#26323a}
.section-jump-line{display:block;width:24px;height:2px;border-radius:999px;background:currentColor;opacity:.48;transition:width .18s ease,opacity .18s ease,transform .18s ease}
.section-jump-button:hover .section-jump-line,
.section-jump-button:focus-visible .section-jump-line{width:34px;opacity:.85}
.section-jump-button.is-current .section-jump-line{width:32px;height:3px;background:#e53935;opacity:1}
.section-jump-button:focus-visible{outline:2px solid rgba(60,118,255,.65);outline-offset:2px;border-radius:4px}
.section-jump-label{position:absolute;top:50%;right:54px;padding:.34rem .6rem;border-radius:6px;background:rgba(235,243,248,.94);box-shadow:0 3px 14px rgba(20,35,55,.14);font-family:'Syne',sans-serif;font-size:1.65rem;font-weight:700;line-height:1;white-space:nowrap;opacity:0;pointer-events:none;transform:translate(5px,-50%);transition:opacity .15s ease,transform .15s ease}
.section-jump-button:hover .section-jump-label,
.section-jump-button:focus-visible .section-jump-label{opacity:1;transform:translate(0,-50%)}

/* Typography */
.name{display:flex;align-items:center;gap:.55rem;margin:0 0 1rem;font-size:2rem;line-height:1.2}
.online-status{display:inline-block;width:11px;height:11px;flex:0 0 auto;border:0;border-radius:50%;background:#31a24c}
.profile-image{width:min(100%,220px,28vh);margin:0 0 1rem}
.headshot-image{display:block;width:100%;height:auto}
.bio{color:#444;margin:0;white-space:pre-line}
.bio-coordinates{display:inline-block;color:inherit;font-size:.72rem;white-space:nowrap;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:2px}
.bio-coordinates:hover{color:#111}
.sidebar-contact{display:flex;flex-direction:column;align-items:flex-start;gap:.25rem;margin-top:1.5rem}
.sidebar-contact h2{margin:0 0 .25rem;font-size:1rem}
.sidebar-contact a{display:inline-flex;align-items:center;gap:.45rem;color:#333;font-size:.9rem;text-decoration:none}
.contact-icon{width:17px;height:17px;flex:0 0 auto}
.sidebar-contact a:hover{color:#777;text-decoration:underline}
.music-footer{position:fixed;z-index:30;right:0;bottom:0;left:0;display:grid;width:100%;height:176px;box-sizing:border-box;grid-template-columns:minmax(300px,38%) minmax(0,1fr);grid-template-rows:minmax(0,1fr);padding-bottom:env(safe-area-inset-bottom);overflow:hidden;border-top:1px solid rgba(70,105,130,.18);background:rgba(233,245,255,.62);backdrop-filter:blur(14px)}
.music-footer-coverflow{min-width:0;min-height:0;overflow:hidden;padding-left:200px;border-right:1px dotted rgba(70,105,130,.4)}
.music-footer>.footer-track-browser{min-height:0;max-height:100%;overflow:hidden}
.music-footer .music-flow-shell.is-compact.is-open{height:176px;max-height:176px}
.music-footer .music-flow-shell.is-compact .music-coverflow,
.music-footer .music-flow-shell.is-compact .coverflow-track{height:176px;min-height:176px}
.music-footer .music-flow-shell.is-compact .coverflow-track{padding:25px calc(50% - 41px)}
.music-footer .music-flow-shell.is-compact .coverflow-card{flex-basis:82px}
.music-footer .music-flow-shell.is-compact .coverflow-arrow-left{left:max(12px,calc(50% - 210px))}
.music-footer .music-flow-shell.is-compact .coverflow-arrow-right{right:max(12px,calc(50% - 210px))}
.album-track-browser{display:grid;min-width:0;height:100%;box-sizing:border-box;grid-template-rows:auto auto minmax(0,1fr);padding:.45rem .55rem .5rem;background:rgba(220,238,252,.34);color:#20384d;font:12px/1.2 Tahoma,'Segoe UI',sans-serif}
.track-browser-titlebar{display:grid;grid-template-columns:18px minmax(0,1fr) auto;align-items:center;gap:.4rem;min-height:29px;padding:.25rem .45rem;border:1px solid;border-color:#fff #6687a5 #6687a5 #fff;background:linear-gradient(90deg,#5f91d4,#87b9ea);color:#fff;text-shadow:1px 1px #335b8a}
.track-browser-titlebar strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:.76rem}
.track-browser-titlebar>span:last-child{font-size:.65rem;white-space:nowrap}
.track-browser-folder{position:relative;width:15px;height:11px;border:1px solid #315b83;background:#f1ca58;box-shadow:inset 1px 1px rgba(255,255,255,.75)}
.track-browser-folder::before{content:"";position:absolute;top:-4px;left:1px;width:7px;height:4px;border:1px solid #315b83;border-bottom:0;background:#f5d879}
.track-browser-columns{display:grid;grid-template-columns:34px minmax(0,1fr) 58px;border-right:1px solid #8aa8c2;border-bottom:1px solid #8aa8c2;border-left:1px solid #fff;background:#e8f2fa;color:#496176}
.track-browser-columns span{padding:.22rem .4rem;border-right:1px solid #b5cada}
.track-browser-columns span:last-child{border-right:0;text-align:right}
.track-browser-scroll-area{position:relative;min-height:0;overflow:hidden;border-right:1px solid #8aa8c2;border-bottom:1px solid #8aa8c2;border-left:1px solid #fff;background:rgba(255,255,255,.68)}
.track-browser-list{height:100%;min-height:0;margin-right:14px;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;touch-action:pan-y;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.track-browser-list::-webkit-scrollbar{display:none}
.track-browser-scrollbar{position:absolute;z-index:3;top:0;right:0;bottom:0;width:14px;border-left:1px solid #8aa8c2;background:repeating-linear-gradient(135deg,#eaf4fb 0 2px,#d5e7f4 2px 4px);box-shadow:inset 1px 0 #fff}
.track-browser-scroll-thumb{position:absolute;top:0;right:0;left:0;display:block;min-height:24px;box-sizing:border-box;border:2px solid;border-color:#dceeff #3f6483 #3f6483 #dceeff;border-radius:0;background:linear-gradient(90deg,#a9cae3,#7099ba 55%,#98bad4);cursor:ns-resize;touch-action:none}
.track-browser-scroll-thumb:hover{background:linear-gradient(90deg,#c2ddf0,#7da8ca 55%,#aacbe2)}
.track-browser-row{display:grid;width:100%;grid-template-columns:34px minmax(0,1fr) 58px;padding:0;border:0;border-bottom:1px dotted rgba(74,102,126,.24);background:transparent;color:#263f54;font:inherit;text-align:left}
.track-browser-row>span{min-width:0;padding:.3rem .4rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.track-browser-row>span:first-child{color:#63809a;text-align:center}
.track-browser-row>span:last-child{text-align:right;font-variant-numeric:tabular-nums}
.track-browser-row:hover{background:#d9ebf9}
.track-browser-row.is-playing{background:#316ac5;color:#fff}
.track-browser-row.is-playing>span{color:inherit}
.track-browser-row:focus-visible{position:relative;z-index:1;outline:2px solid #1f4e8c;outline-offset:-2px}
.track-browser-empty{margin:0;padding:1rem;color:#60788d;text-align:center}
.track-browser-player{display:none}
.section-track-browser{position:relative;height:clamp(270px,42vh,390px);margin:.35rem 0 .8rem;padding:.6rem;background:rgba(220,238,252,.54);border:2px solid;border-color:#fff #6687a5 #6687a5 #fff;box-shadow:1px 1px 0 rgba(39,73,101,.7)}
.section-track-browser .footer-playback-controls{position:static;width:100%;grid-template-columns:42px minmax(120px,1fr) minmax(110px,.45fr);align-items:center;transform:none;margin-top:.45rem;box-sizing:border-box}
.section-track-browser .footer-play-button{grid-row:auto}
.footer-playback-controls{position:absolute;z-index:40;top:50%;left:10px;display:grid;width:178px;grid-template-columns:42px minmax(0,1fr);gap:.45rem;padding:.55rem;border:2px solid;border-color:#fff #486a8b #486a8b #fff;background:linear-gradient(135deg,rgba(235,247,255,.96),rgba(166,203,233,.94));box-shadow:1px 1px 0 #274965;transform:translateY(-50%);font:10px/1.15 Tahoma,'Segoe UI',sans-serif;color:#294d6b}
.footer-play-button{grid-row:1 / span 2;display:grid;width:42px;height:42px;padding:0;align-self:center;place-items:center;border:2px solid;border-color:#fff #486a8b #486a8b #fff;border-radius:0;background:linear-gradient(135deg,#eaf5ff,#8fb4d4);color:#294d6b;font:700 1rem Tahoma,'Segoe UI',sans-serif}
.footer-play-button:active{border-color:#486a8b #fff #fff #486a8b;background:#9dbed8}
.footer-play-button:focus-visible{outline:2px solid #1f4e8c;outline-offset:2px}
.footer-seek-control{display:grid;min-width:0;gap:.16rem}
.footer-seek-control input,.footer-volume-control input{width:100%;height:12px;margin:0;accent-color:#316ac5}
.footer-seek-control span{font-variant-numeric:tabular-nums;white-space:nowrap}
.footer-volume-control{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:.3rem}
.footer-volume-control span{font-size:8px;font-weight:700}
.section{margin-bottom:.1rem}
.section.section-open{margin-bottom:.65rem}
.section-music{margin-top:1.25rem;border:0}
.section-title{position:relative;margin:0 0 1rem;padding-bottom:1rem;font-size:2rem}
.section-title::after{content:"";position:absolute;right:0;bottom:-5px;left:0;height:10px;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='10' viewBox='0 0 48 10'%3E%3Cg fill='%23566b7a' fill-opacity='.42'%3E%3Ccircle cx='2' cy='5' r='1'/%3E%3Ccircle cx='8' cy='3' r='1'/%3E%3Ccircle cx='14' cy='2' r='1'/%3E%3Ccircle cx='20' cy='3' r='1'/%3E%3Ccircle cx='26' cy='5' r='1'/%3E%3Ccircle cx='32' cy='7' r='1'/%3E%3Ccircle cx='38' cy='8' r='1'/%3E%3Ccircle cx='44' cy='7' r='1'/%3E%3C/g%3E%3C/svg%3E");background-position:left center;background-repeat:repeat-x}
.section-toggle{width:100%;padding:.35rem 0;border:0;background:none;display:flex;align-items:center;justify-content:flex-start;gap:.45rem;font:inherit;color:#111;cursor:pointer;transition:color .15s ease}
.section-chevron{display:inline-grid;width:1.1em;height:1.1em;flex:0 0 auto;place-items:center;font-family:Arial,sans-serif;font-size:.72em;font-weight:400;line-height:1;transform:rotate(0deg);transform-origin:center;transition:transform .2s ease}
.section-toggle.open .section-chevron{transform:rotate(90deg)}
.section-toggle:hover,
.section-toggle:focus{color:#555}
.section-toggle:focus{outline:none}
.section-toggle:focus-visible{outline:2px solid rgba(60,118,255,.45);outline-offset:2px;border-radius:.5rem}
.list{list-style:none;margin:0;padding:0;max-height:0;overflow:hidden;opacity:0;transform:translateY(-.4rem);transition:max-height .45s ease, opacity .3s ease, transform .45s ease;pointer-events:none}
.section.section-open .list{margin:.35rem 0 0;max-height:10000px;opacity:1;transform:translateY(0);pointer-events:auto}
.section.section-open .sketch-grid{max-height:none;margin:0}
.sketch-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0}
.sketch-card{min-width:0;padding:0}
.sketch-frame{position:relative;aspect-ratio:1/1;width:100%;overflow:hidden;background:rgba(255,255,255,.35)}
.sketch-frame iframe{position:absolute;inset:0 auto auto 0;display:block;width:640px;height:640px;max-width:none;border:0;transform:scale(var(--sketch-scale,1));transform-origin:top left}
.sketch-placeholder{position:relative;display:block;width:100%;height:100%;padding:0;border:0;background:rgba(255,255,255,.35);color:#fff;font:600 .85rem 'Syne',sans-serif;cursor:pointer;overflow:hidden}
.sketch-preview{display:block;width:100%;height:100%;object-fit:cover;transition:transform .2s ease,filter .2s ease}
.sketch-play-label{position:absolute;inset:50% auto auto 50%;translate:-50% -50%;padding:.35rem .65rem;border-radius:999px;background:rgba(0,0,0,.7);color:#fff}
.sketch-placeholder:hover .sketch-preview{transform:scale(1.025);filter:brightness(.85)}
.sketch-placeholder:focus-visible{outline:3px solid rgba(60,118,255,.75);outline-offset:-3px}
.sketch-title{display:block;margin:0;padding:.3rem .4rem;color:#111;font-size:.75rem;font-weight:600;text-decoration:none}
.sketch-title:hover{color:#777}
.music-flow-shell{max-height:0;overflow:hidden;opacity:0;transform:translateY(-.4rem);transition:max-height .55s ease,opacity .3s ease,transform .45s ease;pointer-events:none}
.music-flow-shell.is-open{max-height:1800px;margin:.35rem 0 .8rem;opacity:1;transform:translateY(0);pointer-events:auto}
.music-flow-shell.is-compact.is-open{max-height:170px;margin:0}
.music-flow-shell.is-compact .music-coverflow,
.music-flow-shell.is-compact .coverflow-track{height:160px;min-height:160px}
.music-flow-shell.is-compact .coverflow-track{gap:.2rem;padding:4px calc(50% - 47px)}
.music-flow-shell.is-compact .coverflow-card{flex-basis:94px;gap:.25rem;font-size:.56rem}
.music-flow-shell.is-compact .coverflow-generated-cover{padding:10%}
.music-flow-shell.is-compact .coverflow-generated-artist{font-size:.48rem}
.music-flow-shell.is-compact .coverflow-generated-title{font-size:.78rem}
.music-flow-shell.is-compact .coverflow-arrow{width:28px;height:40px}
.music-flow-shell.is-compact .coverflow-arrow-left{left:2px}
.music-flow-shell.is-compact .coverflow-arrow-right{right:2px}
.music-flow-shell.is-compact .coverflow-chevron{width:9px;height:15px}
.music-coverflow{position:relative;isolation:isolate;overflow:hidden;min-height:310px;background:transparent}
.coverflow-track{display:flex;align-items:center;gap:clamp(.4rem,2vw,1.2rem);height:310px;padding:30px calc(50% - clamp(72px,13.5vw,105px)) 20px;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;scroll-behavior:smooth;overscroll-behavior-x:contain;perspective:900px;scrollbar-width:none}
.coverflow-track::-webkit-scrollbar{display:none}
.coverflow-card{position:relative;z-index:1;display:flex;flex:0 0 clamp(145px,27vw,210px);min-width:0;flex-direction:column;align-items:center;gap:.7rem;padding:0;border:0;background:transparent;color:#111;font:600 .72rem/1.25 'Syne',sans-serif;cursor:pointer;scroll-snap-align:center;transform-style:preserve-3d;will-change:transform,opacity;transition:opacity .08s linear}
.coverflow-card.is-left{transform:translateX(12%) rotateY(48deg) scale(.78);transform-origin:right center;opacity:.72}
.coverflow-card.is-right{transform:translateX(-12%) rotateY(-48deg) scale(.78);transform-origin:left center;opacity:.72}
.coverflow-card.is-selected{z-index:2;transform:translateY(-4px) scale(1);opacity:1}
.coverflow-card:focus-visible{outline:2px solid #fff;outline-offset:4px;border-radius:3px}
.coverflow-art{position:relative;display:block;width:100%;aspect-ratio:1;overflow:hidden;background:#20242a;box-shadow:0 12px 22px rgba(0,0,0,.58),0 2px 0 rgba(255,255,255,.3);transition:box-shadow .35s ease}
.coverflow-art::after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,rgba(255,255,255,.2),transparent 24%,transparent 70%,rgba(255,255,255,.06));pointer-events:none}
.coverflow-card.is-selected .coverflow-art{box-shadow:0 16px 30px rgba(0,0,0,.72),0 0 0 1px rgba(255,255,255,.24)}
.coverflow-art img{display:block;width:100%;height:100%;object-fit:cover}
.coverflow-generated-cover{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:space-between;padding:12%;text-align:left}
.coverflow-generated-artist{font-size:.62rem;letter-spacing:.3em}
.coverflow-generated-title{font-size:clamp(1rem,2.2vw,1.45rem);line-height:.92;text-transform:uppercase}
.coverflow-art-singles{background:radial-gradient(circle at 68% 28%,#fff 0 4%,transparent 4.5%),linear-gradient(145deg,#f0448b,#eb6a43 48%,#542ba4)}
.coverflow-art-singles .coverflow-generated-cover{color:#fff}
.coverflow-art-prod{background:repeating-linear-gradient(90deg,rgba(255,255,255,.06) 0 1px,transparent 1px 9px),linear-gradient(160deg,#162222,#315f53 55%,#d0b669)}
.coverflow-art-prod .coverflow-generated-cover{color:#f1e5bf}
.coverflow-art-local-album{background:radial-gradient(circle at 72% 24%,hsla(var(--album-hue),92%,82%,.9) 0 5%,transparent 5.5%),repeating-linear-gradient(135deg,hsla(var(--album-hue),80%,90%,.08) 0 1px,transparent 1px 10px),linear-gradient(150deg,hsl(var(--album-hue),58%,58%),hsl(calc(var(--album-hue) + 48),48%,24%))}
.coverflow-art-local-album .coverflow-generated-cover{color:#fff;text-shadow:0 1px 12px rgba(0,0,0,.32)}
.coverflow-title{display:block;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center;opacity:0;visibility:hidden;transition:opacity .18s ease}
.coverflow-card.is-selected .coverflow-title{opacity:1;visibility:visible}
.coverflow-arrow{position:absolute;z-index:50;top:50%;translate:0 -50%;display:grid;width:38px;height:54px;padding:0;border:2px solid;border-color:#fff #486a8b #486a8b #fff;border-radius:0;place-items:center;background:linear-gradient(135deg,#eaf5ff 0,#b8d5ee 48%,#8fb4d4 100%);color:#294d6b;box-shadow:1px 1px 0 #274965,-1px -1px 0 #cce3f5;cursor:pointer;transition:background .15s ease,transform .15s ease}
.coverflow-chevron{position:absolute;top:50%;left:50%;display:block;width:12px;height:20px;transform:translate(-50%,-50%);overflow:visible}
.coverflow-arrow:hover{background:linear-gradient(135deg,#fff 0,#cbe5f8 48%,#9fc5e3 100%);transform:scale(1.04)}
.coverflow-arrow:active{border-color:#486a8b #fff #fff #486a8b;background:linear-gradient(135deg,#87aac8,#bdd8ed);box-shadow:inset 1px 1px 1px rgba(31,65,92,.35)}
.coverflow-arrow:focus-visible{outline:2px solid #294d6b;outline-offset:3px}
.coverflow-arrow-left{left:10px}
.coverflow-arrow-right{right:10px}
.music-flow-details{padding:.25rem .1rem 0}
.item{padding:.25rem 0}
.item-branded{padding:.4rem 0}
.item-button{width:100%;padding:0;border:0;margin:0;background:none;text-align:left;font-size:1.05rem;display:flex;flex-direction:column;gap:.25rem;cursor:pointer;transition:color .15s ease;color:#111;font-family:'Syne', sans-serif}
.item-showcase{position:relative;padding:0;border:0}
.item-showcase::after{content:"";position:absolute;z-index:1;right:0;left:0;height:10px;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='10' viewBox='0 0 48 10'%3E%3Cg fill='%23566b7a' fill-opacity='.42'%3E%3Ccircle cx='2' cy='5' r='1'/%3E%3Ccircle cx='8' cy='3' r='1'/%3E%3Ccircle cx='14' cy='2' r='1'/%3E%3Ccircle cx='20' cy='3' r='1'/%3E%3Ccircle cx='26' cy='5' r='1'/%3E%3Ccircle cx='32' cy='7' r='1'/%3E%3Ccircle cx='38' cy='8' r='1'/%3E%3Ccircle cx='44' cy='7' r='1'/%3E%3C/g%3E%3C/svg%3E");background-position:left center;background-repeat:repeat-x}
.item-showcase::after{bottom:-5px}
.item-showcase:last-child::after{display:none}
.item-showcase-row{display:grid;grid-template-columns:minmax(220px,1fr) minmax(300px,400px);gap:clamp(1rem,2.4vw,2.75rem);height:324px;padding:.75rem 0;align-items:center;justify-content:space-between}
.item-showcase .item-button{position:relative;display:flex;height:100%;min-height:0;padding:1rem 0 3.75rem;justify-content:center}
.item-showcase-copy{display:flex;min-width:0;flex-direction:column;gap:.45rem;padding-left:clamp(.25rem,1vw,1rem)}
.item-showcase .item-heading-row{align-items:flex-start}
.item-showcase .item-title{align-items:center;font-size:1.3rem;line-height:1.2}
.item-showcase .item-chevron{position:absolute;z-index:2;bottom:.85rem;left:.85rem;width:32px;height:32px;border:2px solid;border-color:#fff #486a8b #486a8b #fff;border-radius:0;background:linear-gradient(135deg,#eaf5ff 0,#b8d5ee 48%,#8fb4d4 100%);color:#294d6b;font-family:Tahoma,'Segoe UI',sans-serif;font-size:1rem;font-weight:700;box-shadow:1px 1px 0 #274965,-1px -1px 0 #cce3f5}
.item-showcase .item-button:hover .item-chevron{background:linear-gradient(135deg,#fff 0,#cbe5f8 48%,#9fc5e3 100%)}
.item-showcase .item-button:active .item-chevron{border-color:#486a8b #fff #fff #486a8b;background:linear-gradient(135deg,#87aac8,#bdd8ed);box-shadow:inset 1px 1px 1px rgba(31,65,92,.35)}
.item-showcase .project-logo-employer img{width:30px;height:30px;margin:0}
.item-showcase .project-logo-school img{width:42px;height:42px;margin:0}
.item-showcase .project-logo-employer-mercor img{width:26px;height:26px;margin:2px}
.item-showcase.item-employer .item-title,
.item-showcase.item-work .item-title,
.item-showcase.item-school .item-title,
.item-showcase.item-research .item-title,
.item-showcase.item-project .item-title{font-size:1.45rem}
.item-showcase.item-employer .project-logo-employer img{width:42px;height:42px;margin:0}
.item-showcase.item-employer .project-logo-employer-mercor img{width:36px;height:36px;margin:3px 6px 3px 0}
.item-showcase.item-employer .project-logo-employer-jujube img{margin-left:-4px;margin-right:4px}
.item-showcase .project-logo-school-nyu img{margin-left:-8px}
.item-showcase.item-project .project-logo-pixelcam{width:auto;font-size:2.2rem}
.item-showcase.item-project .project-logo-eterna{width:auto;height:1.15rem}
.item-showcase.item-project .project-logo-tmlne{--dot-size:3px;--dot-gap:.75px;gap:4px}
.item-showcase .project-title-subtitle{font-size:.68em;line-height:1.25}
.item-showcase .item-meta{font-size:.84rem;font-weight:700;line-height:1.35;letter-spacing:.055em;text-transform:uppercase;white-space:pre-line}
.item-showcase .item-location{font-size:.78rem;font-weight:600;line-height:1.3;letter-spacing:.045em;text-transform:uppercase}
.resume-showcase-visual{position:relative;display:grid;width:100%;height:clamp(190px,20vw,270px);min-width:0;overflow:hidden;place-items:center;background:rgba(255,255,255,.24)}
.resume-showcase-visual.resume-showcase-photo{height:300px;background:transparent}
.resume-showcase-photo img{display:block;width:100%;height:100%;object-fit:contain}
.resume-showcase-contain img{object-fit:contain}
.resume-showcase-embed iframe{display:block;width:100%;height:100%;border:0;background:rgba(255,255,255,.35)}
.resume-showcase-embed-widescreen{height:auto;aspect-ratio:var(--showcase-aspect-ratio,16 / 9);align-self:center;background:#111}
.resume-showcase-visual.resume-showcase-desktop-window{height:auto}
.resume-showcase-desktop-window iframe{position:absolute;top:0;left:0;width:1920px;height:1080px;max-width:none;transform:scale(var(--desktop-preview-scale,1));transform-origin:top left}
.resume-showcase-logo img{display:block;width:auto;max-width:58%;height:auto;max-height:62%;object-fit:contain}
.resume-showcase-logo-mercor img{max-width:44%;max-height:70%}
.resume-showcase-logo-jujube img{max-width:42%;max-height:68%}
.resume-showcase-logo-nyu img{max-width:34%;max-height:68%}
.resume-showcase-placeholder{padding:2rem;color:#555;font-size:1.4rem;font-weight:700;text-align:center}
.item-button:focus{outline:none}
.item-button:focus-visible{outline:2px solid rgba(60,118,255,.45);outline-offset:2px}
.item:hover .item-button,
.item-button:hover{color:#777}
.item.active .item-button{color:#555}
.item-heading-row{display:flex;width:100%;align-items:flex-start;justify-content:space-between;gap:1rem}
.item-title{min-width:0;color:#56616c;font-weight:600;transition:color .15s ease}
.item:hover .item-title,
.item.active .item-title{color:#303a44}
.item-timeframe{flex:0 0 auto;white-space:nowrap;font-size:.86rem;font-weight:700}
.item-timeframe,.item-location{color:#56616c}
.item-project .item-heading-row{align-items:center}
.item-project .item-title{display:flex;min-height:1.5rem;align-items:center;gap:.4rem}
.item-expandable .item-title{display:flex;align-items:center;gap:.4rem}
.school-thumbnail{display:block;width:52px;height:38px;margin-left:.3rem;border-radius:3px;object-fit:cover;flex:0 0 auto}
.item-chevron{display:inline-grid;width:1em;height:1em;flex:0 0 auto;place-items:center;font-family:Arial,sans-serif;font-size:.85em;font-weight:400;line-height:1;transform:rotate(0deg);transform-origin:center;transition:transform .2s ease}
.item-expandable.active .item-chevron{transform:rotate(90deg)}
.project-logo{display:inline-flex;align-items:center}
.project-logo-school{gap:.4rem}
.project-logo-school img{display:block;width:22px;height:22px;object-fit:contain;flex:0 0 auto}
.project-logo-school-copy{display:flex;flex-direction:column;align-items:flex-start}
.project-title-subtitle{font-size:.9em;font-weight:500}
.project-logo-employer{gap:.4rem}
.project-logo-employer img{display:block;width:22px;height:22px;object-fit:contain;flex:0 0 auto}
.project-logo-employer-mercor img{width:16px;height:16px;margin:3px}
.project-logo-pixelcam{width:60px;font-family:'Pixelcam Logo',monospace;font-size:.95rem;font-weight:400;line-height:1;letter-spacing:0;text-transform:uppercase}
.project-logo-eterna{display:block;width:60px;height:auto;aspect-ratio:925/114;background:currentColor;-webkit-mask:var(--eterna-logo) center/contain no-repeat;mask:var(--eterna-logo) center/contain no-repeat;transition:background-color .15s ease}
.project-logo-tmlne{--dot-size:1.5px;--dot-gap:.5px;gap:3px}
.tmlne-dot-letter{display:grid;grid-template-columns:repeat(5,var(--dot-size));grid-template-rows:repeat(7,var(--dot-size));gap:var(--dot-gap)}
.tmlne-logo-dot{width:var(--dot-size);height:var(--dot-size);border-radius:50%;background:currentColor}
.tmlne-logo-dot.is-off{opacity:0}
.project-logo-tmlne:hover .tmlne-logo-dot.is-on,
.item-button:focus-visible .project-logo-tmlne .tmlne-logo-dot.is-on{opacity:0;animation:tmlne-dot-reveal .45s ease forwards;animation-delay:calc((var(--letter-delay, 0) * 1ms) + (var(--dot-delay, 0) * 1ms))}
@keyframes tmlne-dot-reveal{0%{opacity:0;transform:translateY(2px)}60%{opacity:.3}to{opacity:1;transform:translateY(0)}}
@media (prefers-reduced-motion:reduce){.project-logo-tmlne:hover .tmlne-logo-dot.is-on,.item-button:focus-visible .project-logo-tmlne .tmlne-logo-dot.is-on{opacity:1;animation:none}}
.item-meta{font-size:.875rem;color:#555}
.item-details{margin-top:.5rem;padding:.5rem 0;border:0;background:none}
.item-role{margin:0 0 .25rem;font-weight:600;color:#333}
.item-description{margin:0 0 .75rem;color:#333;line-height:1.5}
.item-highlights{margin:-.25rem 0 .75rem;padding-left:1.25rem;color:#333;line-height:1.5}
.item-highlights li{margin:.35rem 0;font-size:.95rem}
.item-links{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:.75rem}
.item-link{display:inline-flex;align-items:center;padding:.35rem .75rem;border-radius:999px;border:1px solid #d0d0d0;background:#fff;color:#333;font-size:.85rem;text-decoration:none;transition:border-color .15s ease, color .15s ease}
.item-link:hover{border-color:#111;color:#111}
.item-details-placeholder{margin:0;color:#777;font-size:.9rem}
.course-groups{min-width:0;margin:.75rem 0;display:grid;gap:.35rem}
.course-group{width:100%;min-width:0;max-width:100%;border-top:1px solid rgba(17,17,17,.15)}
.course-group:last-child{border-bottom:1px solid rgba(17,17,17,.15)}
.course-group summary{padding:.55rem 0;font-weight:600;cursor:pointer;list-style-position:inside}
.course-group-content{box-sizing:border-box;width:100%;min-width:0;max-width:100%;padding:0 0 .65rem 1.1rem}
.course-group-content p{margin:0 0 .5rem;color:#444}
.course-group-content ul{margin:0;padding-left:1.25rem;color:#333}
.course-group-content li{margin:.45rem 0;font-size:.95rem;line-height:1.5}
.course-project-title{margin:.75rem 0 .35rem;font-size:1rem}
.course-media-grid{display:grid;min-width:0;margin:.7rem 0 1rem;gap:.75rem}
.course-downloads{display:flex;flex-wrap:wrap;gap:.5rem;margin:.15rem 0 1rem}
.stl-gallery{box-sizing:border-box;width:100%;min-width:0;max-width:100%;margin:.8rem 0 1rem;padding:clamp(.8rem,2vw,1.2rem);overflow:hidden;border:1px solid rgba(17,17,17,.16);background:rgba(255,255,255,.24)}
.stl-gallery-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;margin-bottom:.8rem}
.stl-gallery-heading h4{margin:0;font-size:1rem}
.stl-gallery-heading p{margin:.2rem 0 0;color:#68727d;font-size:.72rem}
.stl-upload-button{display:inline-flex;flex:0 0 auto;align-items:center;padding:.4rem .72rem;border:1px solid rgba(17,17,17,.22);border-radius:999px;background:rgba(255,255,255,.65);color:#303a44;font-size:.72rem;font-weight:700;cursor:pointer}
.stl-upload-button:hover{border-color:#303a44}
.stl-upload-button:focus-within{outline:2px solid rgba(60,118,255,.55);outline-offset:2px}
.stl-upload-button input{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.stl-viewer-shell{position:relative;width:100%;height:clamp(300px,48vw,470px);overflow:hidden;background:radial-gradient(circle at 50% 36%,rgba(255,255,255,.92),rgba(204,216,226,.48) 58%,rgba(122,139,154,.28));box-shadow:inset 0 0 0 1px rgba(17,17,17,.1)}
.stl-viewer-shell canvas{display:block;width:100%;height:100%;touch-action:none;cursor:grab}
.stl-viewer-shell canvas:active{cursor:grabbing}
.stl-viewer-name{position:absolute;top:.65rem;left:.75rem;padding:.28rem .5rem;border-radius:999px;background:rgba(235,243,248,.82);color:#303a44;font-size:.7rem;font-weight:700;pointer-events:none}
.stl-viewer-status{position:absolute;inset:50% auto auto 50%;translate:-50% -50%;padding:.45rem .7rem;border-radius:999px;background:rgba(17,17,17,.72);color:#fff;font-size:.75rem;pointer-events:none}
.stl-viewer-status.is-error{background:rgba(122,32,32,.84)}
.stl-coverflow{position:relative;isolation:isolate;min-height:190px;margin-top:.55rem;overflow:hidden}
.stl-coverflow-track{display:flex;height:190px;align-items:center;gap:clamp(.35rem,1.5vw,.8rem);padding:18px calc(50% - 62px) 14px;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;scroll-behavior:smooth;overscroll-behavior-x:contain;perspective:800px;scrollbar-width:none}
.stl-coverflow-track::-webkit-scrollbar{display:none}
.stl-coverflow-card{display:flex;flex:0 0 124px;min-width:0;flex-direction:column;align-items:center;gap:.45rem;padding:0;border:0;background:transparent;color:#303a44;font:700 .68rem/1.2 'Syne',sans-serif;cursor:pointer;scroll-snap-align:center;transform-style:preserve-3d;transition:transform .25s ease,opacity .25s ease}
.stl-coverflow-card.is-left{transform:translateX(9%) rotateY(46deg) scale(.8);transform-origin:right center;opacity:.65}
.stl-coverflow-card.is-right{transform:translateX(-9%) rotateY(-46deg) scale(.8);transform-origin:left center;opacity:.65}
.stl-coverflow-card.is-selected{z-index:2;transform:translateY(-3px);opacity:1}
.stl-coverflow-card:focus-visible{outline:2px solid rgba(60,118,255,.7);outline-offset:3px}
.stl-coverflow-art{display:grid;width:112px;aspect-ratio:1;place-items:center;overflow:hidden;background:linear-gradient(145deg,#dce8f0,#8396a5);box-shadow:0 9px 18px rgba(20,35,55,.3)}
.stl-coverflow-card.is-selected .stl-coverflow-art{box-shadow:0 13px 24px rgba(20,35,55,.42),0 0 0 1px rgba(255,255,255,.7)}
.stl-coverflow-art img{display:block;width:100%;height:100%;object-fit:cover}
.stl-coverflow-title{display:block;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center}
.wireframe-cube-icon{display:block;width:56%;height:56%;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.stl-gallery-empty{display:grid;min-height:260px;padding:2rem;place-items:center;align-content:center;gap:.55rem;border:1px dashed rgba(17,17,17,.24);background:radial-gradient(circle at 50% 35%,rgba(255,255,255,.78),rgba(204,216,226,.35));color:#56616c;text-align:center}
.stl-gallery-empty .wireframe-cube-icon{width:72px;height:72px}
.stl-gallery-empty span{max-width:420px;color:#68727d;font-size:.78rem;line-height:1.45}
.media-grid{display:grid;min-width:0;max-width:100%;gap:1rem}
.media,.media iframe,.media img,.media video,.media audio{max-width:100%}
.media-audio{margin:0;padding:.8rem;border:1px solid rgba(17,17,17,.18);border-radius:.6rem;background:rgba(255,255,255,.2)}
.media-audio-title{margin:0 0 .45rem;font-size:.9rem;font-weight:600}
.media-audio audio{display:block;width:100%;height:40px}
.media{width:100%;background:none;border-radius:0;overflow:hidden;border:0}
.media-image img{display:block;width:100%;height:auto}
.media-video video{width:100%;display:block;background:#000}
.media-embed iframe{width:100%;min-height:260px;border:0;display:block}
.media-caption{margin:0;padding:.5rem 0;font-size:.85rem;color:#555;background:none}

@media (max-width:900px){
  .container{grid-template-columns:1fr;height:auto;min-height:100vh;overflow:visible}
  .music-footer-coverflow{padding-left:0}
  .footer-playback-controls{display:none}
  .sidebar{height:auto;border:0;overflow:visible}
  .sidebar::after{top:auto;right:0;bottom:-5px;left:0;width:auto;height:10px;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='10' viewBox='0 0 8 10'%3E%3Ccircle cx='4' cy='5' r='1' fill='%23566b7a' fill-opacity='.42'/%3E%3C/svg%3E");background-position:left center;background-repeat:repeat-x}
  .sidebar::before{top:auto;right:auto;bottom:-5px;left:var(--portfolio-scroll-position,0px);width:48px;height:10px;background:radial-gradient(circle at 4px 50%,#566b7a 0 var(--portfolio-dot-size-1,1.2px),transparent calc(var(--portfolio-dot-size-1,1.2px) + .2px)),radial-gradient(circle at 12px 50%,#566b7a 0 var(--portfolio-dot-size-2,1.6px),transparent calc(var(--portfolio-dot-size-2,1.6px) + .2px)),radial-gradient(circle at 20px 50%,#566b7a 0 var(--portfolio-dot-size-3,2.6px),transparent calc(var(--portfolio-dot-size-3,2.6px) + .2px)),radial-gradient(circle at 28px 50%,#566b7a 0 var(--portfolio-dot-size-4,1.6px),transparent calc(var(--portfolio-dot-size-4,1.6px) + .2px)),radial-gradient(circle at 36px 50%,#566b7a 0 var(--portfolio-dot-size-5,1.2px),transparent calc(var(--portfolio-dot-size-5,1.2px) + .2px)),radial-gradient(circle at 44px 50%,#566b7a 0 var(--portfolio-dot-size-6,1px),transparent calc(var(--portfolio-dot-size-6,1px) + .2px))}
  .content-shell{height:auto;overflow:visible}
  .content{height:auto;padding-right:2rem;overflow:visible}
  .item-showcase-row{height:auto}
  .resume-scroll-cue,
  .section-jump-nav{display:none}
  .sketch-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:600px){
  .sketch-grid{grid-template-columns:1fr}
  .item-showcase-row{grid-template-columns:1fr;gap:.8rem;padding:1rem 0}
  .item-showcase .item-button{min-height:170px}
  .item-showcase-copy{padding:0}
  .resume-showcase-visual{height:210px}
  .resume-showcase-visual.resume-showcase-photo{height:auto}
  .school-thumbnail{width:44px;height:32px;margin-left:0}
  .music-coverflow,.coverflow-track{min-height:270px;height:270px}
  .coverflow-track{padding-top:34px;padding-bottom:16px}
  .coverflow-arrow{width:34px;height:46px}
  .stl-gallery{padding:.65rem}
  .stl-gallery-heading{flex-direction:column}
  .stl-viewer-shell{height:300px}
  .stl-coverflow,.stl-coverflow-track{min-height:170px;height:170px}
}
@media (min-width:901px) and (max-height:800px){
  .sidebar{padding:1rem}
  .content{padding-top:1rem}
  .name{margin-bottom:.5rem;font-size:1.7rem}
  .profile-image{width:min(100%,22vh);margin-bottom:.5rem}
  .bio{font-size:.82rem;line-height:1.35}
  .sidebar-contact{gap:0;margin-top:.6rem}
  .sidebar-contact h2{margin-bottom:.1rem;font-size:.9rem}
  .sidebar-contact a{font-size:.75rem;line-height:1.25}
}
/* Remove dark spots (ensure consistent background) */
header, html, body, #root { background: transparent !important; box-shadow: none !important; }
`}</style>
  );
}
