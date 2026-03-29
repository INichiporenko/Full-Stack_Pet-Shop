import instagram from "../../../images/icons/ins.svg";
import whatsapp from "../../../images/icons/ws.svg";
import s from "./Footer.module.css";

function Footer() {
  return (
    <footer>
      <div className={`wrapper ${s.footer_conteiner}`}>
        <h1>Contact</h1>
        <div className={s.contact_section}>
          <div className={s.contact_info}>
            <div className={s.info_phone}>
              <p>Phone</p>
              <h4>+49 30 915-88492</h4>
            </div>
            <div className={s.info_social}>
              <p>Socials</p>
              <div className={s.social}>
                <a href="">
                  <img src={instagram} alt="instagram" />
                </a>
                <a href="#">
                  <img src={whatsapp} alt="whatsapp" />
                </a>
              </div>
            </div>
          </div>
          <div className={s.contact_info}>
            <div className={s.info_address}>
              <p>Address</p>
              <h4>Wallstraẞe 9-13, 10179 Berlin, Deutschland</h4>
            </div>
            <div className={s.info_working}>
              <p>Working Hours</p>
              <h4>24 hours a day</h4>
            </div>
          </div>
        </div>
        <div className={s.map}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2956.8414995046005!2d13.356000876986302!3d52.502287137540364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84fb0e85329a1%3A0xa141f1e83418ee88!2sIT%20Career%20Hub!5e1!3m2!1sru!2sde!4v1770398247250!5m2!1sru!2sde"
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
