import React, { useState } from "react";

export default function LoanHeroBanner() {
  const [openForm, setOpenForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: ""
  });

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
      <section className="relative w-full h-[95vh] overflow-hidden py-37">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="../src/assets/images/herobnr1.jpg"
            alt="Loan background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 sm:px-10 lg:px-16">
          <div className="ml-auto w-full max-w-3xl">
            <h1 className="text-white font-extrabold leading-[1.05] text-[2.2rem] sm:text-[3.2rem] md:text-[4.3rem] lg:text-[4rem]">
              See How Much You
              <br />
              Qualify for Today!
            </h1>

            <p className="mt-6 max-w-2xl text-white/90 text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] leading-relaxed">
              No cost or obligation to draw funds.
              <br className="hidden sm:block" />
              Take only what you need, when you need it.
            </p>

            <div className="mt-8 sm:mt-10">
              <button
                onClick={() => setOpenForm(true)}
                className="group inline-flex items-center overflow-hidden bg-[#fbcf4e] text-black transition-all duration-300 hover:brightness-95 shadow-lg"
              >
                <span className="px-6 py-4 sm:px-10 sm:py-5 text-sm sm:text-base font-semibold">
                  Apply Right Now
                </span>
                <span className="flex items-center justify-center border-l border-black/10 px-5 sm:px-6 py-4 sm:py-5 text-xl transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
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