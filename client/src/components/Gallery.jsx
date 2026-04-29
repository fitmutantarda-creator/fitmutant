import React from "react";

const Gallery = ({ images = [] }) => {
  return (
    <section
      style={{
        width: "100vw",
        position: "relative",
        backgroundColor: "rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          maxWidth: "100%",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >

        <div
          className="fitmutant-gallery-scroll"
          style={{
            display: "flex",
            gap: "20px",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            paddingBottom: "10px",
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              style={{
                scrollSnapAlign: "center",
                flex: "0 0 auto",
                width: "min(280px, 80vw)",
                aspectRatio: "3 / 4",
                borderRadius: "28px",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "rgba(0,0,0,0.06)",
                boxShadow: "0 20px 45px rgba(0,0,0,0.18)",
                transition: "transform 0.3s ease, filter 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.filter = "brightness(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.filter = "brightness(1)";
              }}
            >
              <img
                src={encodeURI(image)}
                alt={`FitMutant Gallery ${index + 1}`}
                style={{
                  width: "100%",
                  height: "90%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
