'use client'
import { Carousel } from 'acme-carousel'

const Karusel = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Carousel
        items={[
          {
            id: 'slide1',
            content: (
              <>
                <div className="h-64 bg-red-500 flex items-center justify-center text-white text-2xl">
                  Slide 1
                </div>
                <div className="h-64 bg-amber-300 flex items-center justify-center text-white text-2xl">
                  Slide 2
                </div>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Karusel;
