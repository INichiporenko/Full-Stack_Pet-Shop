import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSaleProducts } from "../../../redux/ProductsSlice/productsSlice";
import SaleBannerItem from "../SaleBannerItem/SaleBannerItem";
import s from "./SaleBanner.module.css";
import Button from "../../ui/Button/Button";

function SaleBanner() {
  const dispatch = useDispatch();
  const { list = [], status } = useSelector((state) => state.sale || {});

  useEffect(() => {
    dispatch(fetchSaleProducts());
  }, [dispatch]);

  const saleItems = list.length > 0 ? list.slice(0, 4) : [];

  return (
    <section className="wrapper">
      <div className={s.header}>
        <h2 className={s.title}>Sale</h2>
        <div className={s.line}></div>
        <Button variant="Link" styleVariant="outline" to="/sale">
          All sales
        </Button>
      </div>

      <div className="catalog">
        {status === "loading" && <p>Loading...</p>}
        {status === "error" && <p>Error loading products</p>}
        {status === "success" &&
          saleItems.map((item) => (
            <SaleBannerItem key={item.id} product={item} />
          ))}
      </div>
    </section>
  );
}

export default SaleBanner;
