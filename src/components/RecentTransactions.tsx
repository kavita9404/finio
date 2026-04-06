import { useSelector } from "react-redux";
import { selectAllTransactions } from "../store/selectors/transactionSelectors";
import { formatDate } from "../utils/constants";
import { Link } from "react-router-dom";

const RecentTransactions = () => {
  const allTransactions = useSelector(selectAllTransactions);

  const transactions = [...allTransactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-base md:text-[1.375rem] leading-[1.625rem] text-custom-primary-1 font-semibold">
          Recent Transactions
        </p>
        <Link
          to="/transactions"
          className="text-sm md:text-[1.0625rem] leading-[1.25rem] text-custom-primary-1 font-semibold hover:underline"
        >
          See All
        </Link>
      </div>
      <div className="space-y-4 p-6 bg-white rounded-[1.5625rem] pb-8 min-h-[10rem]">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <p className="text-[#718EBF] text-sm text-center">No transactions yet.</p>
            <Link to="/transactions" className="text-xs text-[#343C6A] underline">
              Add your first transaction →
            </Link>
          </div>
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
              <p className={`text-[0.6875rem] md:text-[1rem] leading-5 font-semibold ${
                transaction.type === "expense" ? "text-[#FF4B4A]" : "text-[#41D4A8]"
              }`}>
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
