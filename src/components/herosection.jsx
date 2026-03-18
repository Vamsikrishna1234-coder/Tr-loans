import img1 from "../assets/images/ploan.png"
import img2 from "../assets/images/hloan.png"
import img3 from "../assets/images/bloan.png"
import img4 from "../assets/images/eloan.png"


import { useEffect, useState } from "react";

const slides = [
  {
    img: img1,
    title: "Personal Loans",
    desc: "Quick and flexible personal loans for your immediate needs."
  },
  {
    img: img2,
    title: "Home Loans",
    desc: "Turn your dream home into reality with easy financing."
  },
  {
    img: img3,
    title: "Business Loans",
    desc: "Grow your business with fast and reliable funding."
  },
  {
    img: img4,
    title: "Education Loans",
    desc: "Invest in your future with affordable education loans."
  }
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: ""
  });

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

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
      <section className="relative w-full h-[100vh] overflow-hidden">
        {/* Images */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 z-20"></div>

        {/* Content */}
        <div className="absolute inset-0 z-30 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {slides[current].title}
            </h1>

            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-200">
              {slides[current].desc}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setOpenForm(true)}
                className="px-10 sm:px-12 md:px-15 py-3 bg-[#fbcf4e] hover:bg-yellow-400 text-black text-sm md:text-base font-semibold rounded transition"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-40 bg-[#fbcf4e] hover:bg-black/60 hover:text-white text-white p-3 sm:p-4 rounded-full transition"
        >
          ❮
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-40 bg-[#fbcf4e] hover:bg-black/60 hover:text-white text-white p-3 sm:p-4 rounded-full transition"
        >
          ❯
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 rounded-full transition ${
                i === current ? "bg-[#fbcf4e] w-6" : "bg-white/70 w-2.5"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Modal Form */}
      {openForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
          <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl p-5 sm:p-6 md:p-8">
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
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">
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
              <div className="text-center py-8 sm:py-10">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
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