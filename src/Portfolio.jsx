import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { portfolioData } from "./data/portfolioData";
import headshotImage from "./rayheadshot.webp";
import eternaLogo from "./eterna-logo.png";

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
    Object.fromEntries(data.sections.map((section) => [section.title, false]))
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
                </button>
              </h2>
              {section.title === "Creative Coding" ? (
                <SketchGrid items={section.items} isSectionOpen={isSectionOpen} />
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
  const media = item.media?.[0];
  const link = item.links?.[0];
  const preview = sketchPreviews[`./p5-previews/${item.id}.png`];

  return (
    <li className="sketch-card">
      <div className="sketch-frame">
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

function PortfolioListItem({ item, isActive, onSelect, isSectionOpen }) {
  const meta = [item.role, item.location, item.timeframe]
    .filter(Boolean)
    .join(" · ");

  return (
    <li
      className={`item${isActive ? " active" : ""}`}
      aria-hidden={!isSectionOpen}
    >
      <button
        type="button"
        className="item-button"
        tabIndex={isSectionOpen ? 0 : -1}
        onClick={() => onSelect(item.id)}
      >
        <span className="item-title">
          <ProjectTitle item={item} />
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
html,body,#root{height:100%}
body{margin:0;font-family:'Syne', sans-serif;background:transparent;color:#111;font-size:18px;line-height:1.6}
.app-shell{position:relative}

/* Layout */
.container{display:grid;grid-template-columns:1fr 2fr;min-height:1000px}
.sidebar{padding:2rem;border-right:1px solid #e6e6e6;background:none}
.content{padding:2rem;background:none;overflow-anchor:none}

/* Typography */
.name{font-size:2rem;margin:0 0 1rem}
.profile-image{width:min(100%,340px);margin:0 0 1rem}
.headshot-image{display:block;width:100%;height:auto}
.bio{color:#444;margin:0}
.section{margin-bottom:.1rem}
.section.section-open{margin-bottom:.65rem}
.section-title{font-size:2rem;margin:0}
.section-toggle{width:100%;padding:.35rem 0;border:0;background:none;display:flex;align-items:center;justify-content:flex-start;font:inherit;color:#111;cursor:pointer;transition:color .15s ease}
.section-toggle:hover,
.section-toggle:focus{color:#555}
.section-toggle:focus{outline:none}
.section-toggle:focus-visible{outline:2px solid rgba(60,118,255,.45);outline-offset:2px;border-radius:.5rem}
.list{list-style:none;margin:0;padding:0;max-height:0;overflow:hidden;opacity:0;transform:translateY(-.4rem);transition:max-height .45s ease, opacity .3s ease, transform .45s ease;pointer-events:none}
.section.section-open .list{margin:.35rem 0 0;max-height:2000px;opacity:1;transform:translateY(0);pointer-events:auto}
.section.section-open .sketch-grid{max-height:none;margin:0}
.sketch-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0}
.sketch-card{min-width:0;padding:0}
.sketch-frame{aspect-ratio:1/1;width:100%;overflow:hidden;background:rgba(255,255,255,.35)}
.sketch-frame iframe{display:block;width:100%;height:100%;border:0}
.sketch-placeholder{position:relative;display:block;width:100%;height:100%;padding:0;border:0;background:rgba(255,255,255,.35);color:#fff;font:600 .85rem 'Syne',sans-serif;cursor:pointer;overflow:hidden}
.sketch-preview{display:block;width:100%;height:100%;object-fit:cover;transition:transform .2s ease,filter .2s ease}
.sketch-play-label{position:absolute;inset:50% auto auto 50%;translate:-50% -50%;padding:.35rem .65rem;border-radius:999px;background:rgba(0,0,0,.7);color:#fff}
.sketch-placeholder:hover .sketch-preview{transform:scale(1.025);filter:brightness(.85)}
.sketch-placeholder:focus-visible{outline:3px solid rgba(60,118,255,.75);outline-offset:-3px}
.sketch-title{display:block;margin:0;padding:.3rem .4rem;color:#111;font-size:.75rem;font-weight:600;text-decoration:none}
.sketch-title:hover{color:#777}
.item{padding:.25rem 0}
.item-button{width:100%;padding:0;border:0;margin:0;background:none;text-align:left;font-size:1.05rem;display:flex;flex-direction:column;gap:.25rem;cursor:pointer;transition:color .15s ease;color:#111;font-family:'Syne', sans-serif}
.item-button:focus{outline:none}
.item-button:focus-visible{outline:2px solid rgba(60,118,255,.45);outline-offset:2px}
.item:hover .item-button,
.item-button:hover{color:#777}
.item.active .item-button{color:#555}
.item-title{font-weight:600}
.project-logo{display:inline-flex;align-items:center}
.project-logo-pixelcam{font-family:'Pixelcam Logo',monospace;font-size:1.1rem;font-weight:400;letter-spacing:0;text-transform:uppercase}
.project-logo-eterna{display:block;width:92px;height:auto;aspect-ratio:925/114;object-fit:contain;filter:brightness(0) saturate(100%) invert(40%) sepia(11%) saturate(1174%) hue-rotate(168deg) brightness(91%) contrast(85%)}
.project-logo-tmlne{--dot-size:1.4px;--dot-gap:1.45px;gap:4px}
.tmlne-dot-letter{display:grid;grid-template-columns:repeat(5,var(--dot-size));grid-template-rows:repeat(7,var(--dot-size));gap:var(--dot-gap)}
.tmlne-logo-dot{width:var(--dot-size);height:var(--dot-size);border-radius:2px;background:currentColor}
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
.media-grid{display:grid;gap:1rem}
.media{width:100%;background:none;border-radius:0;overflow:hidden;border:0}
.media-image img{display:block;width:100%;height:auto}
.media-video video{width:100%;display:block;background:#000}
.media-embed iframe{width:100%;min-height:260px;border:0;display:block}
.media-caption{margin:0;padding:.5rem 0;font-size:.85rem;color:#555;background:none}

@media (max-width:900px){
  .container{grid-template-columns:1fr}
  .sidebar{border-right:none;border-bottom:1px solid #e6e6e6}
  .sketch-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:600px){
  .sketch-grid{grid-template-columns:1fr}
}

/* Remove dark spots (ensure consistent background) */
header, footer, html, body, #root { background: transparent !important; box-shadow: none !important; }
`}</style>
  );
}
