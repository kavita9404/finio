import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSummaryStats } from "../store/selectors/transactionSelectors";

const CardDetails = () => {
  const { balance } = useSelector(selectSummaryStats);

  const displayBalance = balance > 0
    ? balance.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    : "5,756";

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-base md:text-[1.375rem] leading-[1.625rem] text-custom-primary-1 font-semibold">
          My Cards
        </p>
        <Link
          to="/creditcards"
          className="text-sm md:text-[1.0625rem] leading-[1.25rem] text-custom-primary-1 font-semibold hover:underline"
        >
          See All
        </Link>
      </div>
      <div className="md:grid grid-cols-1 md:grid-cols-2 gap-12 hidden">
        <Card
          cardHolder="Eddy Cusuma"
          cardNumber="3778 **** **** 1234"
          balance={displayBalance}
          expiryDate="12/26"
          variant="dark"
        />
        <Card
          cardHolder="Eddy Cusuma"
          cardNumber="3778 **** **** 1234"
          balance="2,120"
          expiryDate="08/27"
          variant="light"
        />
      </div>
      <div className="md:hidden">
        <Swiper
          spaceBetween={20}
          slidesPerView="auto"
          breakpoints={{ 768: { slidesPerView: 2, spaceBetween: 12 } }}
          className="!overflow-visible w-full md:hidden"
        >
          <SwiperSlide className="!w-auto">
            <Card
              cardHolder="Eddy Cusuma"
              cardNumber="3778 **** **** 1234"
              balance={displayBalance}
              expiryDate="12/26"
              variant="dark"
            />
          </SwiperSlide>
          <SwiperSlide className="!w-auto">
            <Card
              cardHolder="Eddy Cusuma"
              cardNumber="3778 **** **** 1234"
              balance="2,120"
              expiryDate="08/27"
              variant="light"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default CardDetails;
