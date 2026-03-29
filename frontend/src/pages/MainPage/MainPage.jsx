import CategoriesBanner from "../../components/layout/CategoriesBanner/CategoriesBanner";
import DiscountBanner from "../../components/layout/DiscountBanner/DiscountBanner";
import SaleBanner from "../../components/layout/SaleBanner/SaleBanner";
import s from "./MainPage.module.css";
import { NavLink } from "react-router-dom";

function MainPage() {
  return (
    <main className={s.main_conteiner}>
      <section className={s.section_one}>
        <div className={`wrapper ${s.title}`}>
          <h1>Amazing Discounts on Pets Products!</h1>
          <NavLink to="/sale" className={s.btn}>
            Check out
          </NavLink>
        </div>
      </section>
      <CategoriesBanner />
      <DiscountBanner />
      <SaleBanner />
    </main>
  );
}

export default MainPage;
