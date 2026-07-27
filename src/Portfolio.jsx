import React, { useEffect, useMemo, useRef, useState } from "react";
import { portfolioData } from "./data/portfolioData";
import headshotImage from "./rayheadshot.webp";
import eternaLogo from "./eterna-logo.png";
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

        setActiveNavSection(currentSection);
      });
    };
    const resizeObserver = new ResizeObserver(updateScrollState);

    resizeObserver.observe(content);
    content
      .querySelectorAll(".section")
      .forEach((section) => resizeObserver.observe(section));
    content.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    updateScrollState();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      content.removeEventListener("scroll", updateScrollState);
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
              className="section section-open"
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

function MusicCoverFlow({
  items,
  isSectionOpen,
  activeItemId,
  onSelect,
}) {
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
  const trackRef = useRef(null);
  const layoutFrameRef = useRef(0);
  const scrollEndTimerRef = useRef(0);
  const selectedIndexRef = useRef(0);
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const activeIndex = displayItems.findIndex(
      (item) => item.id === activeItemId
    );
    const initialIndex =
      activeIndex >= 0 ? activeIndex : Math.floor(displayItems.length / 2);
    selectedIndexRef.current = initialIndex;
    return initialIndex;
  });

  useEffect(() => {
    const activeIndex = displayItems.findIndex(
      (item) => item.id === activeItemId
    );
    if (activeIndex >= 0) {
      selectedIndexRef.current = activeIndex;
      setSelectedIndex(activeIndex);
    }
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
  }, [isSectionOpen, displayItems.length]);

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
    onSelect(displayItems[index].id);
  };

  const stepCover = (direction) => {
    const nextIndex =
      (selectedIndexRef.current + direction + displayItems.length) %
      displayItems.length;
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

  const selectedItem = displayItems[selectedIndex];
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
          {displayItems.map((item, index) => {
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
  isResumeShowcase,
  isWorkShowcase,
  isResearchShowcase,
  showItemChevron,
}) {
  const isEmployer =
    item.logoStyle === "mercor" || item.logoStyle === "jujube";
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
          src={item.showcaseEmbed}
          title={item.showcaseEmbedTitle || `${item.title} preview`}
          loading="lazy"
          scrolling={item.logoStyle === "tmlne" ? "yes" : undefined}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
      {hasMedia && (
        <div className="media-grid">
          {item.media.map((media, index) => (
            <MediaBlock
              key={`${item.id}-${media.type}-${media.uniqueId || media.src || index}`}
              media={media}
            />
          ))}
        </div>
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
      {!hasMedia && !hasHighlights && !hasCourseGroups ? (
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
a,button,[role="button"],summary{cursor:url("${xpPointer}") 7 1,pointer}

/* Layout */
.container{display:grid;grid-template-columns:minmax(260px,.78fr) minmax(0,2.22fr);width:100%;height:100vh;height:100dvh;min-height:0;overflow:hidden}
.sidebar{position:relative;z-index:2;height:100%;padding:1.25rem;border-right:1px solid rgba(70,105,130,.18);background-color:rgba(233,245,255,.86);isolation:isolate;overflow:hidden}
.content-shell{position:relative;min-width:0;height:100%;overflow:hidden}
.content{min-width:0;height:100%;padding:2rem;background:none;overflow-x:hidden;overflow-y:scroll;overflow-anchor:none;overscroll-behavior:contain;scrollbar-gutter:stable}
.content{scrollbar-width:thin;scrollbar-color:rgba(85,105,130,.65) rgba(85,105,130,.12)}
.content::-webkit-scrollbar{width:9px}
.content::-webkit-scrollbar-track{background:rgba(85,105,130,.12)}
.content::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:999px;background:rgba(85,105,130,.62);background-clip:padding-box}
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
.section-jump-button.is-current .section-jump-line{width:32px;height:3px;opacity:1}
.section-jump-button:focus-visible{outline:2px solid rgba(60,118,255,.65);outline-offset:2px;border-radius:4px}
.section-jump-label{position:absolute;top:50%;right:54px;padding:.34rem .6rem;border-radius:6px;background:rgba(235,243,248,.94);box-shadow:0 3px 14px rgba(20,35,55,.14);font-family:'Syne',sans-serif;font-size:1.65rem;font-weight:700;line-height:1;white-space:nowrap;opacity:0;pointer-events:none;transform:translate(5px,-50%);transition:opacity .15s ease,transform .15s ease}
.section-jump-button:hover .section-jump-label,
.section-jump-button:focus-visible .section-jump-label{opacity:1;transform:translate(0,-50%)}

/* Typography */
.name{display:flex;align-items:center;gap:.55rem;font-size:2rem;margin:0 0 1rem}
.online-status{display:inline-block;width:11px;height:11px;flex:0 0 auto;border:2px solid #26323a;border-radius:50%;background:#31a24c}
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
.item-showcase{padding:0;border-bottom:1px solid rgba(17,17,17,.16)}
.item-showcase:first-child{border-top:1px solid rgba(17,17,17,.16)}
.item-showcase:last-child{border-bottom:0}
.item-showcase-row{display:grid;grid-template-columns:minmax(220px,.8fr) minmax(320px,1.2fr);gap:clamp(1.25rem,3vw,3.5rem);min-height:230px;padding:1.25rem 0;align-items:stretch}
.item-showcase .item-button{position:relative;display:flex;min-height:230px;padding:0;justify-content:center}
.item-showcase-copy{display:flex;min-width:0;flex-direction:column;gap:.45rem;padding-left:clamp(.25rem,1vw,1rem)}
.item-showcase .item-heading-row{align-items:flex-start}
.item-showcase .item-title{align-items:center;font-size:1.3rem;line-height:1.2}
.item-showcase .item-chevron{position:absolute;z-index:2;bottom:.85rem;left:.85rem;width:30px;height:30px;border:1px solid rgba(17,17,17,.2);border-radius:50%;background:rgba(235,243,248,.9);font-size:1rem;box-shadow:0 2px 8px rgba(20,35,55,.12)}
.item-showcase .project-logo-employer img{width:30px;height:30px;margin:0}
.item-showcase .project-logo-school img{width:42px;height:42px;margin:0}
.item-showcase .project-logo-employer-mercor img{width:26px;height:26px;margin:2px}
.item-showcase.item-employer .item-title,
.item-showcase.item-work .item-title,
.item-showcase.item-school .item-title,
.item-showcase.item-research .item-title,
.item-showcase.item-project .item-title{font-size:1.58rem}
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
.resume-showcase-visual{position:relative;display:grid;width:100%;height:clamp(230px,27vw,350px);min-width:0;overflow:hidden;place-items:center;background:rgba(255,255,255,.24)}
.resume-showcase-photo img{display:block;width:100%;height:100%;object-fit:cover}
.resume-showcase-contain img{object-fit:contain}
.resume-showcase-embed iframe{display:block;width:100%;height:100%;border:0;background:rgba(255,255,255,.35)}
.resume-showcase-embed-widescreen{height:auto;aspect-ratio:var(--showcase-aspect-ratio,16 / 9);align-self:center;background:#111}
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
.theme-dark .item-timeframe,
.theme-dark .item-location{color:#aeb8c5}
.theme-dark .item-timeframe{font-weight:700}
.theme-dark .sidebar-contact a:hover,
.theme-dark .bio-coordinates:hover,
.theme-dark .sketch-title:hover,
.theme-dark .section-toggle:hover,
.theme-dark .section-toggle:focus,
.theme-dark .item:hover .item-button,
.theme-dark .item-button:hover,
.theme-dark .item.active .item-button{color:#fff}
.theme-dark .section-toggle,
.theme-dark .item-button,
.theme-dark .sketch-title{color:#f2f5fa}
.theme-dark .item-title{color:#aeb8c5}
.theme-dark .item:hover .item-title,
.theme-dark .item.active .item-title{color:#dce3ec}
.theme-dark .online-status{border-color:rgba(255,255,255,.9)}
.theme-dark .course-group{border-color:rgba(255,255,255,.18)}
.theme-dark .sidebar{border-right-color:rgba(255,255,255,.16);background-color:rgba(23,26,32,.86)}
.theme-dark .content{scrollbar-color:rgba(190,205,225,.62) rgba(190,205,225,.12)}
.theme-dark .content::-webkit-scrollbar-track{background:rgba(190,205,225,.12)}
.theme-dark .content::-webkit-scrollbar-thumb{background:rgba(190,205,225,.62);background-clip:padding-box}
.theme-dark .resume-scroll-cue{border-color:rgba(255,255,255,.24);background:rgba(24,29,38,.94);box-shadow:0 5px 18px rgba(0,0,0,.35);color:#f2f5fa}
.theme-dark .resume-scroll-cue.is-visible:hover{background:#252d39}
.theme-dark .section-jump-button{color:#dce4ef}
.theme-dark .section-jump-label{background:rgba(23,26,32,.94);box-shadow:0 3px 14px rgba(0,0,0,.35)}
.theme-dark .item-showcase{border-color:rgba(255,255,255,.18)}
.theme-dark .item-showcase .item-chevron{border-color:rgba(255,255,255,.22);background:rgba(23,26,32,.9)}
.theme-dark .resume-showcase-visual{background:rgba(8,10,17,.24)}
.theme-dark .resume-showcase-placeholder{color:#c7ced8}
.theme-dark .item-link{border-color:rgba(255,255,255,.28);background:rgba(8,10,17,.58);color:#e7ebf1}
.theme-dark .item-link:hover{border-color:#fff;color:#fff}
.theme-dark .media-audio{border-color:rgba(255,255,255,.18);background:rgba(8,10,17,.2)}
.theme-dark .item-details-placeholder{color:#aab2bf}
.theme-dark .sketch-frame,
.theme-dark .sketch-placeholder{background:rgba(255,255,255,.08)}
.theme-dark .coverflow-card{color:#f2f5fa}

@media (max-width:900px){
  .container{grid-template-columns:1fr;height:auto;min-height:100vh;overflow:visible}
  .sidebar{height:auto;border-right:none;border-bottom:1px solid #e6e6e6;overflow:visible}
  .content-shell{height:auto;overflow:visible}
  .content{height:auto;overflow:visible}
  .resume-scroll-cue,
  .section-jump-nav{display:none}
  .theme-dark .sidebar{border-bottom-color:rgba(255,255,255,.16)}
  .sketch-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:600px){
  .sketch-grid{grid-template-columns:1fr}
  .item-showcase-row{grid-template-columns:1fr;gap:.8rem;padding:1rem 0}
  .item-showcase .item-button{min-height:170px}
  .item-showcase-copy{padding:0}
  .resume-showcase-visual{height:210px}
  .school-thumbnail{width:44px;height:32px;margin-left:0}
  .music-coverflow,.coverflow-track{min-height:270px;height:270px}
  .coverflow-track{padding-top:34px;padding-bottom:16px}
  .coverflow-arrow{width:34px;height:46px}
}
@media (min-width:901px) and (max-height:680px){
  .sidebar{padding:1rem}
  .name{margin-bottom:.5rem;font-size:1.7rem}
  .profile-image{width:min(100%,22vh);margin-bottom:.5rem}
  .bio{font-size:.82rem;line-height:1.35}
  .sidebar-contact{gap:0;margin-top:.6rem}
  .sidebar-contact h2{margin-bottom:.1rem;font-size:.9rem}
  .sidebar-contact a{font-size:.75rem;line-height:1.25}
}
/* Remove dark spots (ensure consistent background) */
header, footer, html, body, #root { background: transparent !important; box-shadow: none !important; }
`}</style>
  );
}
