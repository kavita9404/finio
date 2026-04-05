import { useSelector } from "react-redux";
import { selectAllTransactions } from "../store/selectors/transactionSelectors";
import { formatDate } from "../utils/constants";

const RecentTransactions = () => {
  const allTransactions = useSelector(selectAllTransactions);

  const transactions = [...allTransactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <div>
      <p className="text-base md:text-[1.375rem] leading-[1.625rem] text-custom-primary-1 font-semibold mb-4">
        Recent Transactions
      </p>
      <div className="space-y-4 p-6 bg-white rounded-[1.5625rem] pb-8">
        {transactions.length === 0 ? (
          <p className="text-center text-[#718EBF] py-6 text-sm">No transactions yet.</p>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img
                  src={transaction.icon || "/assets/icons/cash-icon.svg"}
                  alt="transaction icon"
                  className="w-[3.125rem] h-[3.125rem] md:w-[3.4375rem] md:h-[3.4375rem]"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm md:text-[1rem] text-black leading-5 font-medium">
                    {transaction.description}
                  </p>
                  <p className="text-xs md:text-[0.9375rem] leading-[1.125rem] text-custom-primary-2">
                    {formatDate(transaction.date)}
                  </p>
                </div>
              </div>
              <p className={`text-[0.6875rem] md:text-[1rem] leading-5 font-semibold
                ${transaction.type === "expense" ? "text-[#FF4B4A]" : "text-[#41D4A8]"}
              `}>
                {transaction.type === "expense"
                  ? `- $${transaction.amount.toLocaleString()}`
                  : `+ $${transaction.amount.toLocaleString()}`}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
