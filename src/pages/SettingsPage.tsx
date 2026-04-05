import { useState } from "react";
import { Formik, Form } from "formik";
import { ProfileSettingsSchema } from "../utils/Yup";
import DashboardLayout from "../components/DashboardLayout";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

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
    // Handle form submission
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-[1.5625rem] mx-auto p-6">
        <div className="border-b border-b[#F4F5F7] md:text-base text-[0.8125rem] mb-8">
          <div className="flex justify-between md:justify-normal md:gap-14">
            <button
              onClick={() => setActiveTab("profile")}
              className={`relative p-3 text-center flex ${
                activeTab === "profile"
                  ? " text-black"
                  : "text-custom-primary-2"
              }`}
            >
              Edit Profile
              {activeTab === "profile" && (
                <div className="absolute left-0 bottom-0  w-full h-[0.1875rem] bg-black rounded-t-[0.375rem]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("preferences")}
              className={`relative p-3 text-center flex ${
                activeTab === "preferences"
                  ? " text-black"
                  : "text-custom-primary-2"
              }`}
            >
              Preferences
              {activeTab === "preferences" && (
                <div className="absolute left-0 bottom-0  w-full h-[0.1875rem] bg-black rounded-t-[0.375rem]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`relative p-3 text-center flex ${
                activeTab === "security"
                  ? " text-black"
                  : "text-custom-primary-2"
              }`}
            >
              Security
              {activeTab === "security" && (
                <div className="absolute left-0 bottom-0  w-full h-[0.1875rem] bg-black rounded-t-[0.375rem]" />
              )}
            </button>
          </div>
        </div>

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
                        alt="Profile"
                        className="w-[0.9375rem] h-[0.9375rem] object-cover"
                      />
                    </button>
                  </div>
                </div>
                {/* Form Fields */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                  <div className="flex flex-col gap-2">
                    <p className="text-black text-[0.8125rem] md:text-[1rem] leading-[1.25rem]">
                      Your Name
                    </p>
                    <input
                      className=" flex shadow-none text-[0.75rem] md:text-[0.9375rem] px-4 py-3 bg-transparent placeholder:text-custom-primary-2 text-custom-primary-2 rounded-[0.9375rem] border border-[#DFEAF2] self-stretch gap-2 items-center"
                      type="text"
                      onChange={(e) => setFieldValue("name", e.target.value)}
                      placeholder="Charlene Reed"
                    />
                    {errors && errors.name && (
                      <p className="text-[12px] mt-1 text-custom-danger font-medium">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-black text-[0.8125rem] md:text-[1rem] leading-[1.25rem]">
                      User Name
                    </p>
                    <input
                      className=" flex shadow-none text-[0.75rem] md:text-[0.9375rem] px-4 py-3 bg-transparent placeholder:text-custom-primary-2 text-custom-primary-2 rounded-[0.9375rem] border border-[#DFEAF2] self-stretch gap-2 items-center"
                      type="text"
                      onChange={(e) =>
                        setFieldValue("userName", e.target.value)
                      }
                      placeholder="Charlene Reed"
                    />
                    {errors && errors.userName && (
                      <p className="text-[12px] mt-1 text-custom-danger font-medium">
                        {errors.userName}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-black text-[0.8125rem] md:text-[1rem] leading-[1.25rem]">
                      Email
                    </p>
                    <input
                      className=" flex shadow-none text-[0.75rem] md:text-[0.9375rem] px-4 py-3 bg-transparent placeholder:text-custom-primary-2 text-custom-primary-2 rounded-[0.9375rem] border border-[#DFEAF2] self-stretch gap-2 items-center"
                      type="email"
                      onChange={(e) => setFieldValue("email", e.target.value)}
                      placeholder="charlenereed@gmail.com "
                    />
                    {errors && errors.email && (
                      <p className="text-[12px] mt-1 text-custom-danger font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-black text-[0.8125rem] md:text-[1rem] leading-[1.25rem]">
                      Password
                    </p>
                    <input
                      className=" flex shadow-none text-[0.75rem] md:text-[0.9375rem] px-4 py-3 bg-transparent placeholder:text-custom-primary-2 text-custom-primary-2 rounded-[0.9375rem] border border-[#DFEAF2] self-stretch gap-2 items-center"
                      type="password"
                      onChange={(e) =>
                        setFieldValue("password", e.target.value)
                      }
                      placeholder="**********"
                    />
                    {errors && errors.password && (
                      <p className="text-[12px] mt-1 text-custom-danger font-medium">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-black text-[0.8125rem] md:text-[1rem] leading-[1.25rem]">
                      Date of Birth
                    </p>
                    <input
                      className="flex shadow-none text-[0.75rem] md:text-[0.9375rem] px-4 py-3 bg-transparent placeholder:text-custom-primary-2 text-custom-primary-2 rounded-[0.9375rem] border border-[#DFEAF2] self-stretch gap-2 items-center"
                      type="date"
                      onChange={(e) =>
                        setFieldValue("dateOfBirth", e.target.value)
                      }
                      placeholder="25 January 1990"
                    />
                    {errors && errors.dateOfBirth && (
                      <p className="text-[12px] mt-1 text-custom-danger font-medium">
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-black text-[0.8125rem] md:text-[1rem] leading-[1.25rem]">
                      Present Address
                    </p>
                    <input
                      className=" flex shadow-none text-[0.75rem] md:text-[0.9375rem] px-4 py-3 bg-transparent placeholder:text-custom-primary-2 text-custom-primary-2 rounded-[0.9375rem] border border-[#DFEAF2] self-stretch gap-2 items-center"
                      type="text"
                      onChange={(e) =>
                        setFieldValue("presentAddress", e.target.value)
                      }
                      placeholder="San Jose, California, USA"
                    />
                    {errors && errors.presentAddress && (
                      <p className="text-[12px] mt-1 text-custom-danger font-medium">
                        {errors.presentAddress}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-black text-[0.8125rem] md:text-[1rem] leading-[1.25rem]">
                      Permanent Address
                    </p>
                    <input
                      className=" flex shadow-none text-[0.75rem] md:text-[0.9375rem] px-4 py-3 bg-transparent placeholder:text-custom-primary-2 text-custom-primary-2 rounded-[0.9375rem] border border-[#DFEAF2] self-stretch gap-2 items-center"
                      type="text"
                      onChange={(e) =>
                        setFieldValue("permanentAddress", e.target.value)
                      }
                      placeholder="San Jose, California, USA"
                    />
                    {errors && errors.permanentAddress && (
                      <p className="text-[12px] mt-1 text-custom-danger font-medium">
                        {errors.permanentAddress}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-black text-[0.8125rem] md:text-[1rem] leading-[1.25rem]">
                      City
                    </p>
                    <input
                      className=" flex shadow-none text-[0.75rem] md:text-[0.9375rem] px-4 py-3 bg-transparent placeholder:text-custom-primary-2 text-custom-primary-2 rounded-[0.9375rem] border border-[#DFEAF2] self-stretch gap-2 items-center"
                      type="text"
                      onChange={(e) => setFieldValue("city", e.target.value)}
                      placeholder="San Joe"
                    />
                    {errors && errors.city && (
                      <p className="text-[12px] mt-1 text-custom-danger font-medium">
                        {errors.city}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-black text-[0.8125rem] md:text-[1rem] leading-[1.25rem]">
                      Postal Code
                    </p>
                    <input
                      className=" flex shadow-none text-[0.75rem] md:text-[0.9375rem] px-4 py-3 bg-transparent placeholder:text-custom-primary-2 text-custom-primary-2 rounded-[0.9375rem] border border-[#DFEAF2] self-stretch gap-2 items-center"
                      type="text"
                      onChange={(e) =>
                        setFieldValue("postalCode", e.target.value)
                      }
                      placeholder="45962"
                    />
                    {errors && errors.postalCode && (
                      <p className="text-[12px] mt-1 text-custom-danger font-medium">
                        {errors.postalCode}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-black text-[0.8125rem] md:text-[1rem] leading-[1.25rem]">
                      Country
                    </p>
                    <input
                      className=" flex shadow-none text-[0.75rem] md:text-[0.9375rem] px-4 py-3 bg-transparent placeholder:text-custom-primary-2 text-custom-primary-2 rounded-[0.9375rem] border border-[#DFEAF2] self-stretch gap-2 items-center"
                      type="text"
                      onChange={(e) => setFieldValue("country", e.target.value)}
                      placeholder="USA"
                    />
                    {errors && errors.country && (
                      <p className="text-[12px] mt-1 text-custom-danger font-medium">
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>
              </div>

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
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
