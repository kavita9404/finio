import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css';

const CardDetails = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <p className="text-base md:text-[1.375rem] leading-[1.625rem] text-custom-primary-1 font-semibold">
          My Cards
        </p>
        <button className="text-sm md:text-[1.0625rem] leading-[1.25rem] text-custom-primary-1 font-semibold">
          See All
        </button>
      </div>
      <div className="md:grid grid-cols-1 md:grid-cols-2 gap-12 hidden">
        <Card
          cardHolder="Eddy Cusuma"
          cardNumber="3778 **** **** 1234"
          balance="5,756"
          expiryDate="12/24"
          variant="dark"
        />
        <Card
          cardHolder="Eddy Cusuma"
          cardNumber="3778 **** **** 1234"
          balance="5,756"
          expiryDate="12/24"
          variant="light"
        />
      </div>
      <div className="md:hidden">
        <Swiper
          spaceBetween={20}
          slidesPerView="auto"
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
          }}
          className="!overflow-visible w-full md:hidden"
        >
          <SwiperSlide className="!w-auto">
            <Card
              cardHolder="Eddy Cusuma"
              cardNumber="3778 **** **** 1234"
              balance="5,756"
              expiryDate="12/24"
              variant="dark"
            />
          </SwiperSlide>
          <SwiperSlide className="!w-auto">
            <Card
              cardHolder="Eddy Cusuma"
              cardNumber="3778 **** **** 1234"
              balance="5,756"
              expiryDate="12/24"
              variant="light"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default CardDetails;
