import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const images = [
  'https://yourdomain.com/image1.jpg',
  'https://yourdomain.com/image2.jpg',
  'https://yourdomain.com/image3.jpg',
  // Add more image URLs as needed
];

const Gallery = () => {
  return (
    <div style={{ padding: 20 }}>
      {/* Large banner/main image */}
      <PhotoProvider>
        <div style={{ marginBottom: 20 }}>
          <PhotoView src={images[0]}>
            <img
              src={images[0]}
              alt="Main"
              style={{
                width: '100%',
                height: 350,
                objectFit: 'cover',
                borderRadius: 20,
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
                  width: 180,
                  height: 150,
                  objectFit: 'cover',
                  borderRadius: 12,
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
