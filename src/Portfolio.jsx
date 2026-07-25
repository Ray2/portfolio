import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { portfolioData } from "./data/portfolioData";
import headshotImage from "./rayheadshot.webp";
import eternaLogo from "./eterna-logo.png";
import jujubeLogo from "./jujube-logo.webp";
import mercorLogo from "./mercor-logo.webp";
import nyuLogo from "./nyu-symbol.webp";
import berkleeLogo from "./berklee-natural.webp";
import xpCursor from "./xp-cursor.webp";
import xpPointer from "./xp-pointer.webp";

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
  const [manuallyOpenSections, setManuallyOpenSections] = useState(() =>
    Object.fromEntries(
      data.sections.map((section) => [
        section.title,
        section.title === "Work" || section.title === "Education",
      ])
    )
  );
  const pendingScrollPosition = useRef(null);

  const handleSelect = (itemId) => {
    setActiveItemId((prev) => (prev === itemId ? null : itemId));
  };

  const handleToggleSection = (section) => {
    pendingScrollPosition.current = window.scrollY;

    setManuallyOpenSections((prev) => ({
      ...prev,
      [section.title]: !prev[section.title],
    }));

    setActiveItemId(null);
  };

  useLayoutEffect(() => {
    if (pendingScrollPosition.current === null) {
      return;
    }

    window.scrollTo({ top: pendingScrollPosition.current, left: 0 });
    pendingScrollPosition.current = null;
  }, [manuallyOpenSections, activeItemId]);

  return (
    <div className="container">
      <StyleTag />
      <aside className="sidebar">
        <h1 className="name">{data.name}</h1>
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
        <p className="bio">{data.bio}</p>
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
      <main className="content">
        {data.sections.map((section) => {
          const isSectionOpen = !!manuallyOpenSections[section.title];
          return (
            <section
              key={section.title}
              className={`section${isSectionOpen ? " section-open" : ""}`}
            >
              <h2 className="section-title">
                <button
                  type="button"
                  className={`section-toggle${
                    isSectionOpen ? " open" : ""
                  }`}
                  aria-expanded={isSectionOpen}
                  onClick={() => handleToggleSection(section)}
                >
                  <span>{section.title}</span>
                  <span className="section-chevron" aria-hidden="true">
                    ›
                  </span>
                </button>
              </h2>
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
                      showItemChevron={
                        section.title === "Projects" ||
                        section.title === "Education"
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
    </div>
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
        x="2"
        y="5"
        width="20"
        height="14"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4.4 8.2h1.8v7.6H4.4V8.2Zm2.8 0h2.5l.45 3.55.44-3.55h2.5v7.6h-1.55v-5.03l-.7 5.03H9.46l-.7-5.03v5.03H7.2V8.2Zm6.9 0h2.72c1.73 0 2.28.54 2.28 2.24v3.12c0 1.7-.55 2.24-2.28 2.24H14.1V8.2Zm1.78 1.3v5h.56c.68 0 .86-.2.86-.94v-3.12c0-.74-.18-.94-.86-.94h-.56Zm4.05-1.3h1.67v2.4c.3-.4.7-.6 1.13-.6.78 0 1.27.58 1.27 1.55v2.9c0 .98-.49 1.55-1.27 1.55-.48 0-.9-.23-1.2-.7v.5h-1.6V8.2Zm1.67 3.4v2.8c0 .32.12.48.37.48.24 0 .36-.16.36-.48v-2.8c0-.32-.12-.48-.36-.48-.25 0-.37.16-.37.48Z"
        fill="currentColor"
        transform="scale(.85) translate(1.7 1.05)"
      />
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
      <path
        fill="currentColor"
        d="M1.4 13.1c-.2 0-.3.2-.4.5L.6 16l.4 2.3c.1.3.2.5.4.5s.4-.2.4-.5l.5-2.3-.5-2.4c0-.3-.2-.5-.4-.5Zm1.7-1.3c-.3 0-.4.2-.5.6L2 16l.6 3.5c.1.3.2.5.5.5s.4-.2.5-.5l.6-3.5-.6-3.6c-.1-.4-.2-.6-.5-.6Zm1.9-1c-.3 0-.5.3-.5.7L4 16l.5 4.4c.1.4.2.7.5.7s.5-.3.6-.7l.5-4.4-.5-4.5c-.1-.4-.3-.7-.6-.7Zm2-3.1c-.4 0-.6.3-.7.8L5.8 16l.5 4.9c.1.5.3.8.7.8s.6-.3.7-.8l.6-4.9-.6-7.5c-.1-.5-.3-.8-.7-.8Zm2.1-1c-.4 0-.7.3-.7.9L7.9 16l.5 4.9c.1.5.3.9.7.9s.7-.4.7-.9l.6-4.9-.6-8.4c0-.6-.3-.9-.7-.9Zm7.4 5.1a4.7 4.7 0 0 0-1.8.4 5.7 5.7 0 0 0-5.6-4.7h-.3v13.4h7.7a4.6 4.6 0 1 0 0-9.1Z"
      />
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
  const link = item.links?.[0];
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
      {link ? (
        <a
          className="sketch-title"
          href={link.url}
          target="_blank"
          rel="noreferrer"
        >
          {item.title}
        </a>
      ) : (
        <span className="sketch-title">{item.title}</span>
      )}
    </li>
  );
}

function MusicCoverFlow({
  items,
  isSectionOpen,
  activeItemId,
  onSelect,
}) {
  const trackRef = useRef(null);
  const layoutFrameRef = useRef(0);
  const scrollEndTimerRef = useRef(0);
  const selectedIndexRef = useRef(0);
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const activeIndex = items.findIndex((item) => item.id === activeItemId);
    const initialIndex = activeIndex >= 0 ? activeIndex : 0;
    selectedIndexRef.current = initialIndex;
    return initialIndex;
  });

  useEffect(() => {
    const activeIndex = items.findIndex((item) => item.id === activeItemId);
    if (activeIndex >= 0) {
      selectedIndexRef.current = activeIndex;
      setSelectedIndex(activeIndex);
    }
  }, [activeItemId, items]);

  useEffect(() => {
    if (!isSectionOpen) return undefined;

    const animationFrame = window.requestAnimationFrame(() => {
      const closestIndex = updateCoverFlowLayout(trackRef.current);
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
  }, [isSectionOpen, items.length]);

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
    onSelect(items[index].id);
  };

  const stepCover = (direction) => {
    const nextIndex =
      (selectedIndexRef.current + direction + items.length) % items.length;
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

  const selectedItem = items[selectedIndex];
  const showDetails = selectedItem?.id === activeItemId;

  return (
    <div
      className={`music-flow-shell${isSectionOpen ? " is-open" : ""}`}
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
          {items.map((item, index) => {
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
                key={item.id}
                aria-pressed={item.id === activeItemId}
                tabIndex={isSectionOpen ? 0 : -1}
                onClick={() => chooseCover(index)}
              >
                <span
                  className={`coverflow-art${
                    item.coverStyle ? ` coverflow-art-${item.coverStyle}` : ""
                  }`}
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
      {showDetails && (
        <div className="music-flow-details">
          <ItemDetails item={selectedItem} />
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
  showItemChevron,
}) {
  const meta = [
    item.role,
    item.location,
    alignTimeframeRight ? null : item.timeframe,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <li
      className={`item${item.logoStyle ? " item-branded" : ""}${
        isProjectSection ? " item-project" : ""
      }${showItemChevron ? " item-expandable" : ""}${
        isActive ? " active" : ""
      }`}
      aria-hidden={!isSectionOpen}
    >
      <button
        type="button"
        className="item-button"
        tabIndex={isSectionOpen ? 0 : -1}
        onClick={() => onSelect(item.id)}
      >
        <span className="item-heading-row">
          <span className="item-title">
            <ProjectTitle item={item} />
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
      </button>
      {isActive && <ItemDetails item={item} />}
    </li>
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
      <span className="project-logo project-logo-school">
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

  if (item.logoStyle === "jujube" || item.logoStyle === "mercor") {
    const employerLogo =
      item.logoStyle === "mercor" ? mercorLogo : jujubeLogo;

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
      <img
        className="project-logo project-logo-eterna"
        src={eternaLogo}
        alt={item.title}
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
          >
            {TMLNE_DOT_LETTERS[letter].flatMap((row, rowIndex) =>
              Array.from(row).map((dot, dotIndex) => (
                <span
                  className={`tmlne-logo-dot ${dot === "1" ? "is-on" : "is-off"}`}
                  key={`${rowIndex}-${dotIndex}`}
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

function ItemDetails({ item }) {
  const description =
    item.description || "Add a description for this item by editing the data.";
  const hasLinks = Array.isArray(item.links) && item.links.length > 0;
  const hasMedia = Array.isArray(item.media) && item.media.length > 0;
  const hasHighlights = Array.isArray(item.highlights) && item.highlights.length > 0;
  const hasCourseGroups =
    Array.isArray(item.courseGroups) && item.courseGroups.length > 0;

  return (
    <div className="item-details">
      {item.role && !item.timeframe && (
        <p className="item-role">{item.role}</p>
      )}
      <p className="item-description">{description}</p>
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
      {hasMedia ? (
        <div className="media-grid">
          {item.media.map((media, index) => (
            <MediaBlock
              key={`${item.id}-${media.type}-${media.uniqueId || media.src || index}`}
              media={media}
            />
          ))}
        </div>
      ) : !hasHighlights && !hasCourseGroups ? (
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
        <details className="course-group" key={group.id}>
          <summary>{group.title}</summary>
          <div className="course-group-content">
            {group.description && <p>{group.description}</p>}
            {Array.isArray(group.highlights) && group.highlights.length > 0 && (
              <ul>
                {group.highlights.map((course, index) => (
                  <li key={`${group.id}-course-${index}`}>{course}</li>
                ))}
              </ul>
            )}
          </div>
        </details>
      ))}
    </div>
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
          style={{
            width: normalizedWidthStyle,
            height: normalizedHeightStyle,
            border: 0,
          }}
          allow={media.allow || "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}
          loading="lazy"
          allowFullScreen
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
        allowFullScreen
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
a,button,[role="button"],summary{cursor:url("${xpPointer}") 5 1,pointer}

/* Layout */
.container{display:grid;grid-template-columns:1fr 2fr;min-height:1000px}
.sidebar{padding:2rem;border-right:1px solid #e6e6e6;background:none}
.content{min-width:0;padding:2rem;background:none;overflow-anchor:none}

/* Typography */
.name{font-size:2rem;margin:0 0 1rem}
.profile-image{width:min(100%,340px);margin:0 0 1rem}
.headshot-image{display:block;width:100%;height:auto}
.bio{color:#444;margin:0}
.sidebar-contact{display:flex;flex-direction:column;align-items:flex-start;gap:.25rem;margin-top:1.5rem}
.sidebar-contact h2{margin:0 0 .25rem;font-size:1rem}
.sidebar-contact a{display:inline-flex;align-items:center;gap:.45rem;color:#333;font-size:.9rem;text-decoration:none}
.contact-icon{width:17px;height:17px;flex:0 0 auto}
.sidebar-contact a:hover{color:#777;text-decoration:underline}
.section{margin-bottom:.1rem}
.section.section-open{margin-bottom:.65rem}
.section-title{font-size:2rem;margin:0}
.section-toggle{width:100%;padding:.35rem 0;border:0;background:none;display:flex;align-items:center;justify-content:flex-start;gap:.45rem;font:inherit;color:#111;cursor:pointer;transition:color .15s ease}
.section-chevron{display:inline-grid;width:1.1em;height:1.1em;flex:0 0 auto;place-items:center;font-family:Arial,sans-serif;font-size:.72em;font-weight:400;line-height:1;transform:rotate(0deg);transform-origin:center;transition:transform .2s ease}
.section-toggle.open .section-chevron{transform:rotate(90deg)}
.section-toggle:hover,
.section-toggle:focus{color:#555}
.section-toggle:focus{outline:none}
.section-toggle:focus-visible{outline:2px solid rgba(60,118,255,.45);outline-offset:2px;border-radius:.5rem}
.list{list-style:none;margin:0;padding:0;max-height:0;overflow:hidden;opacity:0;transform:translateY(-.4rem);transition:max-height .45s ease, opacity .3s ease, transform .45s ease;pointer-events:none}
.section.section-open .list{margin:.35rem 0 0;max-height:2000px;opacity:1;transform:translateY(0);pointer-events:auto}
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
.coverflow-title{display:block;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center}
.coverflow-arrow{position:absolute;z-index:50;top:50%;translate:0 -50%;display:grid;width:38px;height:54px;padding:0;border:1px solid rgba(255,255,255,.22);border-radius:999px;place-items:center;background:rgba(0,0,0,.72);color:#fff;cursor:pointer;transition:background .15s ease,transform .15s ease}
.coverflow-chevron{position:absolute;top:50%;left:50%;display:block;width:12px;height:20px;transform:translate(-50%,-50%);overflow:visible}
.coverflow-arrow:hover{background:rgba(0,0,0,.82);transform:scale(1.06)}
.coverflow-arrow:focus-visible{outline:2px solid #fff;outline-offset:2px}
.coverflow-arrow-left{left:10px}
.coverflow-arrow-right{right:10px}
.music-flow-details{padding:.25rem .1rem 0}
.item{padding:.25rem 0}
.item-branded{padding:.4rem 0}
.item-button{width:100%;padding:0;border:0;margin:0;background:none;text-align:left;font-size:1.05rem;display:flex;flex-direction:column;gap:.25rem;cursor:pointer;transition:color .15s ease;color:#111;font-family:'Syne', sans-serif}
.item-button:focus{outline:none}
.item-button:focus-visible{outline:2px solid rgba(60,118,255,.45);outline-offset:2px}
.item:hover .item-button,
.item-button:hover{color:#777}
.item.active .item-button{color:#555}
.item-heading-row{display:flex;width:100%;align-items:flex-start;justify-content:space-between;gap:1rem}
.item-title{min-width:0;font-weight:600}
.item-timeframe{flex:0 0 auto;white-space:nowrap;color:#555;font-size:.875rem;font-weight:400}
.item-project .item-heading-row{align-items:center}
.item-project .item-title{display:flex;min-height:1.5rem;align-items:center;gap:.4rem}
.item-expandable .item-title{display:flex;align-items:center;gap:.4rem}
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
.project-logo-eterna{display:block;width:60px;height:auto;aspect-ratio:925/114;object-fit:contain;filter:brightness(0) saturate(100%) invert(40%) sepia(11%) saturate(1174%) hue-rotate(168deg) brightness(91%) contrast(85%)}
.project-logo-tmlne{--dot-size:1.5px;--dot-gap:.5px;gap:3px}
.tmlne-dot-letter{display:grid;grid-template-columns:repeat(5,var(--dot-size));grid-template-rows:repeat(7,var(--dot-size));gap:var(--dot-gap)}
.tmlne-logo-dot{width:var(--dot-size);height:var(--dot-size);border-radius:50%;background:currentColor}
.tmlne-logo-dot.is-off{opacity:0}
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
.course-groups{margin:.75rem 0;display:grid;gap:.35rem}
.course-group{border-top:1px solid rgba(17,17,17,.15)}
.course-group:last-child{border-bottom:1px solid rgba(17,17,17,.15)}
.course-group summary{padding:.55rem 0;font-weight:600;cursor:pointer;list-style-position:inside}
.course-group-content{padding:0 0 .65rem 1.1rem}
.course-group-content p{margin:0 0 .5rem;color:#444}
.course-group-content ul{margin:0;padding-left:1.25rem;color:#333}
.course-group-content li{margin:.45rem 0;font-size:.95rem;line-height:1.5}
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

/* Dark theme */
.theme-dark .container{color:#f2f5fa}
.theme-dark .sidebar{border-color:rgba(255,255,255,.16)}
.theme-dark .bio,
.theme-dark .sidebar-contact a,
.theme-dark .item-timeframe,
.theme-dark .item-meta,
.theme-dark .item-role,
.theme-dark .item-description,
.theme-dark .item-highlights,
.theme-dark .course-group-content p,
.theme-dark .course-group-content ul,
.theme-dark .media-caption{color:#c7ced8}
.theme-dark .sidebar-contact a:hover,
.theme-dark .sketch-title:hover,
.theme-dark .section-toggle:hover,
.theme-dark .section-toggle:focus,
.theme-dark .item:hover .item-button,
.theme-dark .item-button:hover,
.theme-dark .item.active .item-button{color:#fff}
.theme-dark .section-toggle,
.theme-dark .item-button,
.theme-dark .sketch-title{color:#f2f5fa}
.theme-dark .course-group{border-color:rgba(255,255,255,.18)}
.theme-dark .item-link{border-color:rgba(255,255,255,.28);background:rgba(8,10,17,.58);color:#e7ebf1}
.theme-dark .item-link:hover{border-color:#fff;color:#fff}
.theme-dark .media-audio{border-color:rgba(255,255,255,.18);background:rgba(8,10,17,.2)}
.theme-dark .item-details-placeholder{color:#aab2bf}
.theme-dark .sketch-frame,
.theme-dark .sketch-placeholder{background:rgba(255,255,255,.08)}
.theme-dark .project-logo-eterna{filter:none}
.theme-dark .coverflow-card{color:#f2f5fa}

@media (max-width:900px){
  .container{grid-template-columns:1fr}
  .sidebar{border-right:none;border-bottom:1px solid #e6e6e6}
  .theme-dark .sidebar{border-bottom-color:rgba(255,255,255,.16)}
  .sketch-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:600px){
  .sketch-grid{grid-template-columns:1fr}
  .music-coverflow,.coverflow-track{min-height:270px;height:270px}
  .coverflow-track{padding-top:34px;padding-bottom:16px}
  .coverflow-arrow{width:34px;height:46px}
}

/* Remove dark spots (ensure consistent background) */
header, footer, html, body, #root { background: transparent !important; box-shadow: none !important; }
`}</style>
  );
}
