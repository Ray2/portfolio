import React, { useEffect, useMemo, useState } from "react";
import { portfolioData } from "./data/portfolioData";

export default function Portfolio() {
  const data = useMemo(() => portfolioData, []);
  const [activeItemId, setActiveItemId] = useState(null);
  const [openSections, setOpenSections] = useState(() =>
    Object.fromEntries(data.sections.map((section) => [section.title, false]))
  );

  const handleSelect = (itemId) => {
    setActiveItemId((prev) => (prev === itemId ? null : itemId));
  };

  const handleToggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section.title]: !prev[section.title],
    }));
    setActiveItemId(null);
  };

  return (
    <div className="container">
      <StyleTag />
      <aside className="sidebar">
        <h1 className="name">{data.name}</h1>
        <p className="bio">{data.bio}</p>
      </aside>
      <main className="content">
        {data.sections.map((section) => (
          <section
            key={section.title}
            className={`section${openSections[section.title] ? " section-open" : ""}`}
          >
            <h2 className="section-title">
              <button
                type="button"
                className={`section-toggle${
                  openSections[section.title] ? " open" : ""
                }`}
                aria-expanded={openSections[section.title] || false}
                onClick={() => handleToggleSection(section)}
              >
                <span>{section.title}</span>
              </button>
            </h2>
            {openSections[section.title] && (
              <ul className="list">
                {section.items.map((item) => {
                  const isActive = item.id === activeItemId;
                  return (
                    <PortfolioListItem
                      key={item.id}
                      item={item}
                      isActive={isActive}
                      onSelect={handleSelect}
                    />
                  );
                })}
              </ul>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}

function PortfolioListItem({ item, isActive, onSelect }) {
  const meta = [item.role, item.location, item.timeframe]
    .filter(Boolean)
    .join(" · ");

  return (
    <li className={`item${isActive ? " active" : ""}`}>
      <button
        type="button"
        className="item-button"
        onClick={() => onSelect(item.id)}
      >
        <span className="item-title">{item.title}</span>
        {meta && <span className="item-meta">{meta}</span>}
      </button>
      {isActive && <ItemDetails item={item} />}
    </li>
  );
}

function ItemDetails({ item }) {
  const description =
    item.description || "Add a description for this item by editing the data.";
  const hasLinks = Array.isArray(item.links) && item.links.length > 0;
  const hasMedia = Array.isArray(item.media) && item.media.length > 0;
  const hasHighlights = Array.isArray(item.highlights) && item.highlights.length > 0;

  return (
    <div className="item-details">
      {item.role && !item.timeframe && (
        <p className="item-role">{item.role}</p>
      )}
      <p className="item-description">{description}</p>
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
      ) : !hasHighlights ? (
        <p className="item-details-placeholder">
          Add photos, videos, or embeds by inserting entries into this item's
          media array.
        </p>
      ) : null}
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
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&display=swap');
*{box-sizing:border-box}
html,body,#root{height:100%}
body{margin:0;font-family:'Syne', sans-serif;background:rgb(248,248,248);color:#111;font-size:18px;line-height:1.6}

/* Layout */
.container{display:grid;grid-template-columns:1fr 2fr;min-height:100vh}
.sidebar{padding:2rem;border-right:1px solid #e6e6e6;background:none}
.content{padding:2rem;background:none}

/* Typography */
.name{font-size:2rem;margin:0 0 1rem}
.bio{color:#444;margin:0}
.section{margin-bottom:.1rem}
.section.section-open{margin-bottom:.65rem}
.section-title{font-size:2rem;margin:0}
.section-toggle{width:100%;padding:.35rem 0;border:0;background:none;display:flex;align-items:center;justify-content:flex-start;font:inherit;color:#111;cursor:pointer;transition:color .15s ease}
.section-toggle:hover,
.section-toggle:focus{color:#555}
.section-toggle:focus{outline:none}
.section-toggle:focus-visible{outline:2px solid rgba(60,118,255,.45);outline-offset:2px;border-radius:.5rem}
.list{list-style:none;margin:.25rem 0 0;padding:0}
.item{padding:.25rem 0}
.item-button{width:100%;padding:0;border:0;margin:0;background:none;text-align:left;font-size:1.05rem;display:flex;flex-direction:column;gap:.25rem;cursor:pointer;transition:color .15s ease;color:#111;font-family:'Syne', sans-serif}
.item-button:focus{outline:none}
.item-button:focus-visible{outline:2px solid rgba(60,118,255,.45);outline-offset:2px}
.item:hover .item-button,
.item-button:hover{color:#777}
.item.active .item-button{color:#555}
.item-title{font-weight:600}
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
.media-grid{display:grid;gap:1rem}
.media{width:100%;background:none;border-radius:0;overflow:hidden;border:0}
.media-image img{display:block;width:100%;height:auto}
.media-video video{width:100%;display:block;background:#000}
.media-embed iframe{width:100%;min-height:260px;border:0;display:block}
.media-caption{margin:0;padding:.5rem 0;font-size:.85rem;color:#555;background:none}

@media (max-width:900px){
  .container{grid-template-columns:1fr}
  .sidebar{border-right:none;border-bottom:1px solid #e6e6e6}
}

/* Remove dark spots (ensure consistent background) */
header, footer, html, body, #root { background: rgb(248,248,248) !important; box-shadow: none !important; }
`}</style>
  );
}
