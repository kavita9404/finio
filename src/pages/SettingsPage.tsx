import { useState } from "react";
import { Formik, Form } from "formik";
import { ProfileSettingsSchema } from "../utils/Yup";
import DashboardLayout from "../components/DashboardLayout";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const initialValues = {
    name: "",
    userName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    presentAddress: "",
    permanentAddress: "",
    city: "",
    postalCode: "",
    country: "",
  };

  const handleSubmit = (values: any) => {
    console.log(values);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const inputCls =
    "flex shadow-none text-[0.75rem] md:text-[0.9375rem] px-4 py-3 bg-transparent placeholder:text-custom-primary-2 text-custom-primary-2 rounded-[0.9375rem] border border-[#DFEAF2] self-stretch gap-2 items-center focus:outline-none focus:border-[#343C6A] w-full";

  return (
    <DashboardLayout>
      <div className="bg-white rounded-[1.5625rem] mx-auto p-6">
        {/* Tabs */}
        <div className="border-b border-b[#F4F5F7] md:text-base text-[0.8125rem] mb-8">
          <div className="flex justify-between md:justify-normal md:gap-14">
            {["profile", "preferences", "security"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative p-3 text-center flex capitalize ${
                  activeTab === tab ? "text-black" : "text-custom-primary-2"
                }`}
              >
                {tab === "profile" ? "Edit Profile" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute left-0 bottom-0 w-full h-[0.1875rem] bg-black rounded-t-[0.375rem]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Edit Profile Tab */}
        {activeTab === "profile" && (
          <Formik
            initialValues={initialValues}
            validationSchema={ProfileSettingsSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, setFieldValue }) => (
              <Form>
                <div className="flex flex-col md:flex-row items-start w-full gap-6">
                  {/* Profile Image */}
                  <div className="mx-auto md:mx-8">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                        <img
                          src="/assets/images/profile1.png"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        title="edit"
                        type="button"
                        className="absolute bottom-0 right-0 w-8 h-8 bg-black rounded-full border shadow-sm flex items-center justify-center"
                      >
                        <img
                          src="/assets/icons/pencil-icon.svg"
                          alt="Edit"
                          className="w-[0.9375rem] h-[0.9375rem] object-cover"
                        />
                      </button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                    {[
                      { label: "Your Name", field: "name", type: "text", placeholder: "Charlene Reed" },
                      { label: "User Name", field: "userName", type: "text", placeholder: "Charlene Reed" },
                      { label: "Email", field: "email", type: "email", placeholder: "charlenereed@gmail.com" },
                      { label: "Password", field: "password", type: "password", placeholder: "**********" },
                      { label: "Date of Birth", field: "dateOfBirth", type: "date", placeholder: "25 January 1990" },
                      { label: "Present Address", field: "presentAddress", type: "text", placeholder: "San Jose, California, USA" },
                      { label: "Permanent Address", field: "permanentAddress", type: "text", placeholder: "San Jose, California, USA" },
                      { label: "City", field: "city", type: "text", placeholder: "San Jose" },
                      { label: "Postal Code", field: "postalCode", type: "text", placeholder: "45962" },
                      { label: "Country", field: "country", type: "text", placeholder: "USA" },
                    ].map(({ label, field, type, placeholder }) => (
                      <div key={field} className="flex flex-col gap-2">
                        <p className="text-black text-[0.8125rem] md:text-[1rem] leading-[1.25rem]">{label}</p>
                        <input
                          className={inputCls}
                          type={type}
                          onChange={(e) => setFieldValue(field, e.target.value)}
                          placeholder={placeholder}
                        />
                        {errors && (errors as any)[field] && (
                          <p className="text-[12px] mt-1 text-custom-danger font-medium">
                            {(errors as any)[field]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Success message */}
                {saveSuccess && (
                  <div className="mt-4 flex items-center gap-2 bg-[#EDFAF6] border border-[#41D4A8] rounded-[0.9375rem] px-5 py-3">
                    <span className="text-[#41D4A8] font-bold text-lg">✓</span>
                    <p className="text-sm font-medium text-[#0F6E56]">Profile saved successfully!</p>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex md:justify-end mt-8">
                  <button
                    type="submit"
                    className="bg-black text-white px-2 py-2 w-full md:w-[11.875rem] h-[3.125rem] text-[0.9375rem] md:text-[1.125rem] leading-[1.375rem] rounded-[0.9375rem] hover:bg-gray-800 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}

        {/* Preferences Tab */}
        {activeTab === "preferences" && (
          <div className="flex flex-col gap-6 max-w-xl">
            <div className="flex flex-col gap-2">
              <p className="text-black text-[0.8125rem] md:text-[1rem] font-medium">Currency</p>
              <select className={inputCls}>
                <option>USD — US Dollar</option>
                <option>EUR — Euro</option>
                <option>GBP — British Pound</option>
                <option>INR — Indian Rupee</option>
                <option>JPY — Japanese Yen</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-black text-[0.8125rem] md:text-[1rem] font-medium">Time Zone</p>
              <select className={inputCls}>
                <option>GMT+0 — London</option>
                <option>GMT+5:30 — India Standard Time</option>
                <option>GMT-5 — Eastern Time (US)</option>
                <option>GMT-8 — Pacific Time (US)</option>
                <option>GMT+8 — Singapore / China</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-black text-[0.8125rem] md:text-[1rem] font-medium">Notification Preferences</p>
              <div className="flex flex-col gap-3">
                {[
                  "Email me for new transactions",
                  "Email me for monthly reports",
                  "Push notifications for large transactions",
                  "Weekly spending summary",
                ].map((pref) => (
                  <label key={pref} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#343C6A]" />
                    <span className="text-[0.875rem] text-[#343C6A]">{pref}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-black text-[0.8125rem] md:text-[1rem] font-medium">Language</p>
              <select className={inputCls}>
                <option>English</option>
                <option>Hindi</option>
                <option>French</option>
                <option>Spanish</option>
                <option>German</option>
              </select>
            </div>
            <div className="flex md:justify-end mt-2">
              <button
                onClick={() => { setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 3000); }}
                className="bg-black text-white px-2 py-2 w-full md:w-[11.875rem] h-[3.125rem] text-[0.9375rem] md:text-[1.125rem] leading-[1.375rem] rounded-[0.9375rem] hover:bg-gray-800 transition-colors"
              >
                Save
              </button>
            </div>
            {saveSuccess && (
              <div className="flex items-center gap-2 bg-[#EDFAF6] border border-[#41D4A8] rounded-[0.9375rem] px-5 py-3">
                <span className="text-[#41D4A8] font-bold text-lg">✓</span>
                <p className="text-sm font-medium text-[#0F6E56]">Preferences saved successfully!</p>
              </div>
            )}
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="flex flex-col gap-6 max-w-xl">
            <div className="flex flex-col gap-2">
              <p className="text-black text-[0.8125rem] md:text-[1rem] font-medium">Current Password</p>
              <input className={inputCls} type="password" placeholder="Enter current password" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-black text-[0.8125rem] md:text-[1rem] font-medium">New Password</p>
              <input className={inputCls} type="password" placeholder="Enter new password" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-black text-[0.8125rem] md:text-[1rem] font-medium">Confirm New Password</p>
              <input className={inputCls} type="password" placeholder="Confirm new password" />
            </div>

            <div className="bg-[#F5F7FA] rounded-[0.9375rem] p-4 flex flex-col gap-3">
              <p className="text-sm font-semibold text-[#343C6A]">Two-Factor Authentication</p>
              <p className="text-xs text-[#718EBF]">Add an extra layer of security to your account.</p>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-[#343C6A]" />
                <span className="text-[0.875rem] text-[#343C6A]">Enable two-factor authentication</span>
              </label>
            </div>

            <div className="bg-[#FFF0F0] rounded-[0.9375rem] p-4 flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#FF4B4A]">Danger Zone</p>
              <p className="text-xs text-[#718EBF]">These actions are irreversible. Please be careful.</p>
              <button className="mt-2 text-sm text-[#FF4B4A] border border-[#FF4B4A] rounded-[0.9375rem] px-4 py-2 hover:bg-[#FF4B4A] hover:text-white transition-colors w-fit">
                Delete Account
              </button>
            </div>

            <div className="flex md:justify-end mt-2">
              <button
                onClick={() => { setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 3000); }}
                className="bg-black text-white px-2 py-2 w-full md:w-[11.875rem] h-[3.125rem] text-[0.9375rem] md:text-[1.125rem] leading-[1.375rem] rounded-[0.9375rem] hover:bg-gray-800 transition-colors"
              >
                Update Password
              </button>
            </div>
            {saveSuccess && (
              <div className="flex items-center gap-2 bg-[#EDFAF6] border border-[#41D4A8] rounded-[0.9375rem] px-5 py-3">
                <span className="text-[#41D4A8] font-bold text-lg">✓</span>
                <p className="text-sm font-medium text-[#0F6E56]">Password updated successfully!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;