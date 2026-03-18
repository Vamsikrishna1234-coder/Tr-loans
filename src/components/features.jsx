import { useState } from "react";

const features = [
  {
    title: "LOWER RATES",
    desc: "Predatory lending is a form of abuse in the granting of loan."
  },
  {
    title: "QUICK AND EASY",
    desc: "The most typical payment type is fully amortizing payment."
  },
  {
    title: "NO PAYMENT PENALTY",
    desc: "A subsidized loan is reduced by a explicit or hidden subsidy."
  },
  {
    title: "SECURE PROCESS",
    desc: "The duration of the loan period is much shorter to the use."
  },
  {
    title: "5-MINUTE APPLICATION",
    desc: "A loan taken to purchase a car may be secured by the car."
  },
  {
    title: "ONLY 3% INTEREST",
    desc: "Unsecured loans are not secured against borrower’s assets."
  }
];

export default function FeaturesSection() {
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
      <section className="w-full bg-white py-35">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-stretch">
          <div className="bg-[#fbcf4e] text-white p-10 lg:w-1/3 flex flex-col justify-center relative z-10">
            <p className="text-xm tracking-[0.3em] mb-4 opacity-100">
              OUR FEATURES
            </p>

            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-black">
              Quick <br /> Easy <br /> Flexible
            </h2>

            <button
              onClick={() => setOpenForm(true)}
              className="mt-8 w-fit bg-black text-white px-6 py-3 font-semibold text-sm uppercase tracking-wide hover:bg-gray-800 transition"
            >
              Apply Loan
            </button>
          </div>

          <div className="bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full shadow-lg">
            {features.map((item, index) => (
              <div
                key={index}
                className="p-8 border border-gray-200 hover:bg-gray-50 transition"
              >
                <div className="mb-4 text-[#fbcf4e] text-2xl">●</div>

                <h3 className="text-sm font-bold tracking-wide mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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