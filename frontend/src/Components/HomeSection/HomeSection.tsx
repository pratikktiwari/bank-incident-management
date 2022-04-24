import React from "react";
import customerImage from "../../images/kindpng_743103.png";
import { AiOutlineBell } from "react-icons/ai";
import { FaMobileAlt } from "react-icons/fa";
import { BsLaptop } from "react-icons/bs";
import { GiFlatTire } from "react-icons/gi";
import { IoMdHappy } from "react-icons/io";
import { BsFillGearFill } from "react-icons/bs";
import style from "./HomeSectionStyle.module.css";
class HomeSection extends React.Component {
  render() {
    return (
      <div className={style.homeSectionMain}>
        <h1>We are here to resolve your issues</h1>
        <p>
          Please contact us on the above mentioned channels or create an
          incident using the incidence button.
        </p>
        <br />
        <div className={style.cardWrapper}>
          <div className={style.cardContainer}>
            <div className={style.cardIcon}>
              <AiOutlineBell />
            </div>
            <div className={style.cardContent}>
              <h3>Get outage notification</h3>
              <p>
                We will send notification whenever there is a bank level crisis.
              </p>
            </div>
          </div>
          <div className={style.cardContainer}>
            <div className={style.cardIcon}>
              <FaMobileAlt />
            </div>
            <div className={style.cardContent}>
              <h3>Mobile responsiveness</h3>
              <p>
                Our web portal is fully mobile responsive and thus ensures fully
                flexed mobile internet banking.
              </p>
            </div>
          </div>
          <div className={style.cardContainer}>
            <div className={style.cardIcon}>
              <BsLaptop />
            </div>
            <div className={style.cardContent}>
              <h3>Fully Compatible</h3>
              <p>
                Easily access out web application on any device or any operating
                system like macOS, Windows, Linux.
              </p>
            </div>
          </div>
          <div className={style.cardContainer}>
            <div className={style.cardIcon}>
              <GiFlatTire />
            </div>
            <div className={style.cardContent}>
              <h3>Easy to use </h3>
              <p>Log incidents easily within a button's click.</p>
            </div>
          </div>
          <div className={style.cardContainer}>
            <div className={style.cardIcon}>
              <IoMdHappy />
            </div>
            <div className={style.cardContent}>
              <h3>Happy customers</h3>
              <p>
                Our customers are able to log their issues and resolve them.
              </p>
            </div>
          </div>
          <div className={style.cardContainer}>
            <div className={style.cardIcon}>
              <BsFillGearFill />
            </div>
            <div className={style.cardContent}>
              <h3>Got an issue?</h3>
              <p>Contact us on any mode.</p>
            </div>
          </div>
        </div>
        <div className={style.sectionTwo}>
          <div className={style.leftSection}>
            <h1>Angry and sad customers</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Veritatis cum facere quis eaque tenetur architecto perferendis
              consectetur, ut id quae necessitatibus adipisci modi eos
              perspiciatis qui, tempore pariatur ipsa expedita. Lorem ipsum
              dolor sit amet consectetur, adipisicing elit. Veritatis cum facere
              quis eaque tenetur architecto perferendis consectetur, ut id quae
              necessitatibus adipisci modi eos perspiciatis qui, tempore
              pariatur ipsa expedita.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Veritatis cum facere quis eaque tenetur architecto perferendis
              consectetur, ut id quae necessitatibus adipisci modi eos
              perspiciatis qui, tempore pariatur ipsa expedita.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Veritatis cum facere quis eaque tenetur architecto perferendis
              consectetur, ut id quae necessitatibus adipisci modi eos
              perspiciatis qui, tempore pariatur ipsa expedita.
            </p>
          </div>
          <div className={style.twoModuleSection}>
            <img src={customerImage} alt="happy customers" />
          </div>
        </div>
      </div>
    );
  }
}
export default HomeSection;
