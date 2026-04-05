import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../store/slices/transactionsSlice";
import { selectRole } from "../store/selectors/transactionSelectors";

interface Contact {
  id: number;
  name: string;
  role: string;
  image: string;
}

const contacts: Contact[] = [
  { id: 1, name: "Livia Bator",  role: "CEO",      image: "/assets/images/livia-image.png" },
  { id: 2, name: "Randy Press",  role: "Director",  image: "/assets/images/randy-image.png" },
  { id: 3, name: "Workman",      role: "Designer",  image: "/assets/images/workman-image.png" },
];

const QuickTransfer = () => {
  const dispatch = useDispatch();
  const role = useSelector(selectRole);
  const isAdmin = role === "admin";

  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSend = () => {
    if (!isAdmin) { setError("Viewer mode: transfers are disabled."); return; }
    if (!selectedContactId) { setError("Please select a contact first."); return; }
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) { setError("Enter a valid amount."); return; }

    const contact = contacts.find((c) => c.id === selectedContactId);
    dispatch(addTransaction({
      date: new Date().toISOString().split("T")[0],
      description: `Transfer to ${contact?.name}`,
      category: "Other",
      type: "expense",
      amount: amt,
      icon: "/assets/icons/send-icon.svg",
    }));

    setSent(true);
    setAmount("");
    setSelectedContactId(null);
    setError("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div>
      <p className="text-base md:text-[1.375rem] leading-[1.625rem] text-custom-primary-1 font-semibold mb-4">
        Quick Transfer
      </p>
      <div className="flex flex-col gap-4 w-full bg-white rounded-[1.5625rem] p-4 sm:p-8">

        {/* Contacts */}
        <div className="flex items-center gap-4">
          {contacts.map((contact) => (
            <div key={contact.id}
              className={`flex flex-col items-center gap-3 cursor-pointer p-2 rounded-xl transition-all ${selectedContactId === contact.id ? "bg-[#EEF0FA] scale-105" : "hover:bg-[#F5F7FA]"}`}
              onClick={() => { setSelectedContactId(contact.id); setError(""); }}>
              <div className="flex flex-col items-center gap-1">
                <img className="w-[3.125rem] h-[3.125rem] md:w-[4.375rem] md:h-[4.375rem] rounded-full mb-2"
                  src={contact.image} alt={contact.name} />
                <p className={`text-black text-xs whitespace-nowrap md:text-base ${selectedContactId === contact.id ? "font-bold" : "font-semibold"}`}>
                  {contact.name}
                </p>
                <p className="text-[0.9375rem] leading-[1.125rem] text-custom-primary-2">{contact.role}</p>
              </div>
            </div>
          ))}
          <div className="h-[3.125rem] w-[3.125rem] flex justify-center items-center rounded-full shadow-[4px_4px_18px_-2px_#E7E4E8CC]">
            <img src="/assets/icons/arrow-right-icon.svg" alt="arrow right icon" className="w-[0.40625rem] h-[0.8125rem]" />
          </div>
        </div>

        {/* Amount input */}
        <div className="flex items-center gap-6">
          <p className="text-xs md:text-base whitespace-nowrap text-custom-primary-2">Write Amount</p>
          <div className="relative w-full md:w-[15.9375rem]">
            <input
              className="text-xs md:text-base px-8 py-4 w-full h-12 pr-14 flex shadow-none bg-custom-primary-3 rounded-full self-stretch gap-2 items-center focus:outline-none text-[#8BA3CB]"
              placeholder="525.50"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => { setAmount(e.target.value); setError(""); }}
            />
            <button
              onClick={handleSend}
              className="absolute inset-y-0 right-0 flex items-center justify-center gap-3 w-fit px-4 md:px-6 h-12 rounded-full bg-black hover:bg-gray-800 transition-colors"
            >
              <p className="text-xs md:text-base font-medium text-white">Send</p>
              <img src="/assets/icons/send-icon.svg" alt="send icon" className="w-[1rem] h-[0.875rem] md:w-[1.625rem] md:h-[1.4125rem]" />
            </button>
          </div>
        </div>

        {/* Feedback messages */}
        {error && <p className="text-xs text-[#FF4B4A] font-medium px-1">{error}</p>}
        {sent && (
          <div className="flex items-center gap-2 bg-[#EDFAF6] border border-[#41D4A8] rounded-[0.9375rem] px-4 py-2">
            <span className="text-[#41D4A8] font-bold">✓</span>
            <p className="text-xs text-[#0F6E56] font-medium">Transfer sent and recorded in your transactions!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickTransfer;
