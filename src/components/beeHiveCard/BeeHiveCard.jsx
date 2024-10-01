import { useParams } from "react-router-dom";
import { useHive } from "../../hooks/useHives";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Імпортуйте стилі Swiper

export const BeeHiveCard = () => {
  const hiveId = useParams();
  const { data: hive, isLoading, error } = useHive(hiveId); // завантажуємо дані про вулик  console.log(hive);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <h2>"I'm a BeehiveCard"</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
      >
        {hive.images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Hive Image ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
