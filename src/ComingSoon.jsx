import React from 'react';
import './App.css';  // Assuming you already have this CSS

function ComingSoon() {
  return (
    <div className="coming-soon">
      {/* Add your logo here */}
      <div className="z-20" style={{ transform: "none" }}>
        <a href="/" className="sm:w-36 w-28 h-auto inline-block">
          <div className="gatsby-image-wrapper gatsby-image-wrapper-constrained">
            <div style={{ maxWidth: "468px", display: "block" }}>
              <img
                alt=""
                role="presentation"
                aria-hidden="true"
                src="data:image/svg+xml;charset=utf-8,%3Csvg%20height='124'%20width='468'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E"
                style={{ maxWidth: "100%", display: "block", position: "static" }}
              />
            </div>
            <div
              aria-hidden="true"
              data-placeholder-image=""
              style={{
                opacity: 0,
                transition: "opacity 500ms linear",
                backgroundColor: "rgb(8, 8, 8)",
                position: "absolute",
                inset: 0
              }}
            />
            <picture>
              <source
                type="image/webp"
                sizes="(min-width: 468px) 468px, 100vw"
                srcSet="/static/7b0e84a041f5ca63fa554a809ede08be/b8421/logo.webp 117w, /static/7b0e84a041f5ca63fa554a809ede08be/c5c4a/logo.webp 234w, /static/7b0e84a041f5ca63fa554a809ede08be/fb9f8/logo.webp 468w"
              />
              <img
                loading="lazy"
                alt="logo img"
                sizes="(min-width: 468px) 468px, 100vw"
                src="/static/7b0e84a041f5ca63fa554a809ede08be/26956/logo.png"
                srcSet="/static/7b0e84a041f5ca63fa554a809ede08be/af81e/logo.png 117w, /static/7b0e84a041f5ca63fa554a809ede08be/15654/logo.png 234w, /static/7b0e84a041f5ca63fa554a809ede08be/26956/logo.png 468w"
                style={{ opacity: 1 }}
              />
            </picture>
          </div>
        </a>
      </div>
      
      {/* Coming Soon Text */}
      <h1>Coming Soon</h1>
      <p>We're working hard to finish the development of this site. Stay tuned!</p>
      <p>Launching soon...</p>
    </div>
  );
}

export default ComingSoon;
