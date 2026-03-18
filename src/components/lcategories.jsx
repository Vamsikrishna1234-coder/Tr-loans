const items = [
  {
    title: "Personal Loans",
    desc: "Quick and flexible personal loans for your immediate needs",
    img: "../src/assets/images/ploan.png",
    no: "01"
  },
  {
    title: "Home Improvement",
    desc: "Shower your home with a home improvement loan",
    img: "../src/assets/images/hloan.png",
    no: "02"
  },
  {
    title: "Small Business",
    desc: "The best idea for the first time new business and enough time",
    img: "../src/assets/images/bloan.png",
    no: "03"
  },
  {
    title: "Studying Abroad",
    desc: "Student loans may be offered as part of a total package",
    img: "../src/assets/images/eloan.png",
    no: "04"
  },
  {
    title: "Buying Dream Vehicle",
    desc: "Buy a dream vehicle? We can make it come true",
    img: "../src/assets/images/travel.jpg",
    no: "05"
  }
];

export default function LoanCategories() {
  return (
    <section className="w-full py-14 ">

      <div className="flex flex-col md:flex-row h-auto md:h-[80vh]">

        {items.map((item, index) => (
          <div
            key={index}
            className="relative group w-full md:w-1/5 h-[270px] md:h-full overflow-hidden"
          >
            {/* Image */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition"></div>

            {/* Content Wrapper */}
            <div className="absolute bottom-6 left-6 right-6 text-white z-10 transition-all duration-500 group-hover:bottom-14">

              {/* Number */}
              <p className="text-xs opacity-70 mb-2">{item.no}</p>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-semibold">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm mt-2 opacity-80">
                {item.desc}
              </p>
            </div>

            {/* Learn More Button (Hidden → Slide Up) */}
            <div className="absolute bottom-0 left-6 right-6 z-26 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">

              <button className="flex items-center gap-2 text-[#fbcf4e] font-semibold text-sm">
                Learn More
                <span className="text-lg">→</span>
              </button>

            </div>

            {/* Hover Border */}
            <div className="absolute inset-0 border border-transparent group-hover:border-[#fbcf4e] transition duration-300"></div>
          </div>
        ))}

      </div>

    </section>
  );
}