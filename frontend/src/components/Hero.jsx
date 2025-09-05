import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { motion } from "motion/react";

const Hero = () => {
  const { navigate } = useContext(AppContext);

  const slides = [
    {
      title: "Premium Online Store for Fruits & Vegges",
      img: assets.hero_img1,
      btn1: "SHOP NOW",
      btn2: "LEARN MORE",
    },
    {
      title: "Fresh and organic Groceries Delivered",
      img: assets.hero_img2,
      btn1: "ORDER NOW",
      btn2: "FREE DElIVEREY",
    },
    {
      title: "Your daily needs at best prices",
      img: assets.hero_img3,
      btn1: "START SHOPPING",
      btn2: "SPECIAL DEALS",
    },
  ];
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      className="w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="bg-[#D8E7C7] h-[600px] bg-cover bg-center  flex flex-col md:flex-row  
          items-center justify-center gap-4"
            style={{ backgroundImage: `url(${assets.leef_layer_bg})` }}
          >
            <div className="flex flex-col items-center">
              <img src={assets.banner} alt="" />
              <h1 className="max-w-2xl  text-3xl md:text-5xl font-extrabold text-center capitalize ">
                {slide.title}
              </h1>
              <div className="flex gap-5 mt-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="px-6 md:px-10 py-2 cursor-pointer bg-primary text-white hover:bg-secondary 
                  transform-all ease-in-out duration-300"
                >
                  {slide.btn1}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="px-6 md:px-10 py-2 cursor-pointer bg-secondary text-white hover:bg-primary 
                  transform-all ease-in-out duration-300"
                >
                  {slide.btn2}
                </motion.button>
              </div>
            </div>
            <div>
              <motion.div
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 3, type: "spring", repeat: Infinity, repeatDelay:2}}
                className="mt-8 md:mt-0"
              >
                <img src={slide.img} alt="" className="h-[300px] md:h-[500px] " />
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
