import { useState } from "react";

export default function HowItWorks() {
  const [openForm, setOpenForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: ""
  });

  const steps = [
    {
      number: "01",
      title: "Get a Free Quote",
      desc: "Lorem ipsum dolor sit amet, consectetur adip isicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      number: "02",
      title: "Get an Instant Decision",
      desc: "Lorem ipsum dolor sit amet, consectetur adip isicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      number: "03",
      title: "Get Funding Fast",
      desc: "Lorem ipsum dolor sit amet, consectetur adip isicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      loanType: ""
    });

    setTimeout(() => {
      setSubmitted(false);
      setOpenForm(false);
    }, 2500);
  };

  return (
    <>
      <section className="w-full bg-white py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          {/* Heading */}
          <div className="mb-14 sm:mb-16 md:mb-20">
            <h2 className="text-[38px] leading-none sm:text-[52px] md:text-[64px] font-light text-[#1f1f25] tracking-[-0.02em]">
              <span className="font-extrabold">How does</span>{" "}
              <span className="font-light">it Work</span>
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-y-14 sm:gap-y-16 md:grid-cols-2 md:gap-x-12 lg:grid-cols-3 lg:gap-x-16 xl:gap-x-20">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Background Number */}
                <span className="absolute -top-8 left-0 text-[90px] sm:text-[110px] md:text-[120px] font-extrabold text-white/50 leading-none select-none pointer-events-none">
                  {step.number}
                </span>

                {/* Content */}
                <div className="relative z-10 pt-8">
                  <h3 className="text-[28px] sm:text-[32px] md:text-[46px] font-light text-[#1f1f25] leading-tight">
                    {step.title}
                  </h3>

                  <p className="mt-8 max-w-[360px] text-[18px] sm:text-[19px] leading-[1.9] text-[#5a5f6a] font-light">
                    {step.desc}
                  </p>

                  <button
                    onClick={() => setOpenForm(true)}
                    className="group mt-10 inline-flex flex-col items-start"
                  >
                    <span className="text-[13px] sm:text-[14px] font-extrabold tracking-[0.28em] uppercase text-[#111]">
                      Learn More
                    </span>
                    <span className="mt-2 h-[2px] w-[98px] bg-[#fbcf4e] transition-all duration-300 group-hover:w-[120px]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Form */}
      {openForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl p-6 md:p-8">
            <button
              onClick={() => {
                setOpenForm(false);
                setSubmitted(false);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>

            {!submitted ? (
              <>
                <h3 className="text-2xl font-bold text-black mb-2">
                  Apply for a Loan
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Fill in your details and choose your loan type.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#fbcf4e]"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#fbcf4e]"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#fbcf4e]"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type of Loan
                    </label>
                    <select
                      name="loanType"
                      value={formData.loanType}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#fbcf4e]"
                    >
                      <option value="">Select a loan type</option>
                      <option value="Home Loan">Home Loan</option>
                      <option value="Education Loan">Education Loan</option>
                      <option value="Personal Loan">Personal Loan</option>
                      <option value="Vehicle Loan">Vehicle Loan</option>
                      <option value="Business Loan">Business Loan</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#fbcf4e] text-black font-semibold py-3 rounded-md hover:brightness-95 transition"
                  >
                    Submit
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-10">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600">
                  Your loan application has been submitted successfully.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}