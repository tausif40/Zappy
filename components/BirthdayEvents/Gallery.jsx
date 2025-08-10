import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const Gallery = ({ images }) => {
  return (
    <div style={{ padding: 20 }}>
      {/* Large banner/main image */}
      <PhotoProvider>
        <div style={{ marginBottom: 20 }}>
          <PhotoView src={images[ 0 ]}>
            <img
              src={images[ 0 ]}
              alt="Main"
              style={{
                width: '100%',
                height: 350,
                objectFit: 'cover',
                borderRadius: 14,
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
              }}
            />
          </PhotoView>
        </div>

        {/* Thumbnails */}
        <div style={{
          display: 'flex',
          gap: 20
        }}>
          {images.slice(1).map((img, idx) => (
            <PhotoView src={img} key={idx}>
              <img
                src={img}
                alt={`thumb-${idx}`}
                style={{
                  width: 140,
                  height: 80,
                  objectFit: 'cover',
                  borderRadius: 8,
                  background: '#f3f3f3',
                  cursor: 'pointer'
                }}
              />
            </PhotoView>
          ))}
        </div>
      </PhotoProvider>
    </div>
  );
};

export default Gallery;
