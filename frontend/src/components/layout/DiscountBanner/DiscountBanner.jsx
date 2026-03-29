import { useState } from "react";
import axios from "axios";
import { PatternFormat } from "react-number-format";
import { toast } from "react-toastify";
import s from "./DiscountBanner.module.css";
import Pets from "../../../images/img/sale_banner.png";

function DiscountBanner() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email) {
      toast.warn("Please fill in all fields!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3333/sale/send",
        formData,
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Discount request successfully sent!", {
          style: { backgroundColor: "#0D50FF", color: "#FFFFFF" },
        });
        setFormData({ name: "", phone: "", email: "" });
      }
    } catch (error) {
      console.error("Sending error:", error);
      toast.error("An error occurred. Please try again later");
    }
  };

  return (
    <section>
      <div className={`wrapper ${s.banner_container}`}>
        <h2 className={s.title}>5% off on the first order</h2>

        <div className={s.content}>
          <div className={s.image_block}>
            <img src={Pets} alt="Pets" />
          </div>

          <div className={s.form_block}>
            <form onSubmit={handleSubmit} className={s.form}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={s.input}
                required
              />

              <PatternFormat
                format="+49 ### ########"
                mask="_"
                name="phone"
                value={formData.phone}
                onValueChange={(values) => {
                  setFormData({ ...formData, phone: values.formattedValue });
                }}
                className={s.input}
                placeholder="Phone number"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={s.input}
                required
              />

              <button type="submit" className={s.submit_btn}>
                Get a discount
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DiscountBanner;
