interface CardProps {
  cardHolder: string;
  cardNumber: string;
  balance: string;
  expiryDate: string;
  variant: "light" | "dark";
}

const Card = ({
  cardHolder,
  cardNumber,
  balance,
  expiryDate,
  variant,
}: CardProps) => {
  return (
    <div
      className={`w-[16.5625rem] md:w-full font-lato rounded-[1.5625rem] ${
        variant === "dark"
          ? "bg-gradient-to-br from-[#5B5A6F] to-[#000000] text-white"
          : "bg-white text-custom-primary-1 border border-[#DFEAF2]"
      }`}
    >
      <div className="flex flex-col w-full gap-4 md:gap-8 p-6 pb-6 md:pb-12">
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-xs leading-[0.9rem]">Balance</p>
            <p className="text-base md:text-[1.25rem] md:leading-[1.5rem] font-semibold">
              ${balance}
            </p>
          </div>
          <img
            src={`${
              variant === "dark"
                ? "/assets/icons/chip-card-white.svg"
                : "/assets/icons/chip-card-black.svg"
            }`}
            alt="Chip Card"
            className="w-[1.8125rem] h-[1.8125rem] md:w-[2.173125rem] md:h-[2.173125rem]"
          />
        </div>

        <div className="flex justify-between items-center w-[70%]">
          <div className="space-y-1">
            <p className="text-[0.625rem] md:text-xs leading-[0.9rem] uppercase opacity-70">
              CARD HOLDER
            </p>
            <p className="text-[0.8125rem] md:text-[0.9375rem] leading-[1.125rem] font-semibold">
              {cardHolder}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[0.625rem] md:text-xs leading-[0.9rem] uppercase opacity-70">
              VALID THRU
            </p>
            <p className="text-[0.8125rem] md:text-[0.9375rem] leading-[1.125rem] font-semibold">
              {expiryDate}
            </p>
          </div>
        </div>
      </div>
      <div
        className={`flex justify-between items-center px-6 py-5 ${
          variant === "dark"
            ? "bg-gradient-to-b from-[rgba(255,255,255,0.15)] to-[rgba(255,255,255,0)]"
            : "border-t border-[#DFEAF2]"
        }`}
      >
        <p className="text-[0.9375rem] md:text-[1.375rem] leading-[1.65rem]">{cardNumber}</p>
        <img
          src={`${
            variant === "dark"
              ? "/assets/icons/master-card-white.svg"
              : "/assets/icons/master-card-black.svg"
          }`}
          alt="Master Card"
          className="w-[1.6875rem] h-[1.125rem] md:w-[2.75rem] md:h-[1.875rem] rounded-full"
        />
      </div>
    </div>
  );
};

export default Card;
