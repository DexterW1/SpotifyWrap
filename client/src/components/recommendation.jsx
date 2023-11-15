import Reccard from "./reccard";
import "./recommendation.css";
import { Scrollbar } from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
export default function Recommendation({ data }) {
  console.log(data);
  return (
    <>
      <div className="rec-container">
        <Swiper
          slidesPerView={4}
          spaceBetween={0}
          // pagination={{
          //   clickable: true,
          // }}
          scrollbar={{
            draggable: true,
            dragSize: "100px",
            snapOnRelease: true,
          }}
          navigation={true}
          modules={[Scrollbar]}
          // scrollbar={{ draggable: true }}
          className="mySwiper"
        >
          {data.map((item) => (
            <SwiperSlide>
              <Reccard
                image={item.album.images[1]}
                name={item.name}
                artist_name={item.artists}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
