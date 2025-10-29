import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { defaultProductData } from "../redux/store";
import styles from "./Btemplate5.module.scss";
import "./Btemplate5.scss";
import ProductCard from "./components/ProductCard";
import VerticalCarousel from "./components/VerticalCarousel";

const items = defaultProductData.map((post) => <ProductCard key={post.id} product={post} />);
const responsive1 = {
	0: { items: 2 },
};

function Container4() {
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);

	useEffect(() => {
		function handelResize() {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
		}
		window.addEventListener("resize", handelResize);
		return () => window.removeEventListener("resize", handelResize);
	}, [width, height]);

	const paddingRightVW = 40;
	const paddingRightPixel = (width * paddingRightVW) / 100;
	return (
		<section className={styles.Container4}>
			<div className={styles.topSection}>
				<h2>Our Product</h2>
				<p>View All</p>
			</div>
			<div className={styles.progress}>
				<div className={styles.white}></div>
				<div className={styles.grey}></div>
			</div>
			<div className={styles.carousel} id="carousel">
				{width < 950 && height > 600 ? (
					<VerticalCarousel data={defaultProductData} />
				) : (
					<AliceCarousel
						items={items}
						responsive={responsive1}
						autoPlay
						autoPlayInterval={1000}
						animationDuration={1000}
						paddingRight={paddingRightPixel}
						infinite
					/>
				)}
			</div>
		</section>
	);
}

export default Container4;
