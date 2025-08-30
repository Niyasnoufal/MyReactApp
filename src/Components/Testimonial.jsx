import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';





const Testimonial = () => {
  return (
    <Swiper
    modules={[Navigation, Pagination, Autoplay]}
     spaceBetween={50}
     slidesPerView={1}
     navigation
     pagination={{clickable:true}}
     autoplay={{delay:2000, disableOnInteraction: false}}
     onSlideChange={() => console.log("slideChanged")} 
    onSwiper={(swiper) => console.log(swiper)}
    >

        <SwiperSlide>
            <div className="flex justify-center items-center mx-[150px] w-[800px] h-[300px] border-solid bg-orange-300">
               <h1>Slide1</h1>
            </div>
        </SwiperSlide>
        <SwiperSlide>
             <div className="flex justify-center items-center mx-[150px] w-[800px] h-[300px] border-solid bg-orange-300">
               <h1>Slide2</h1>
            </div>
        </SwiperSlide>
        <SwiperSlide>
             <div className="flex justify-center items-center mx-[150px] w-[800px] h-[300px] border-solid bg-orange-300">
               <h1>Slide3</h1>
            </div>
        </SwiperSlide>
        <SwiperSlide>
             <div className="flex justify-center items-center mx-[150px] w-[800px] h-[300px] border-solid bg-orange-300">
               <h1>Slide4</h1>
            </div>
        </SwiperSlide>


    </Swiper>
  )
}

export default Testimonial
