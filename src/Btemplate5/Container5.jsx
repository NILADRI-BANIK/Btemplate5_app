import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../components/Hooks/axios";
import { defaultPostData } from "../redux/store";
import styles from "./Btemplate5.module.scss";
import "./Btemplate5.scss";
import MobileCorousel from "./components/MobileCarousel";
import Posts from "./components/Posts";

const responsive1 = {
	0: { items: 2 },
};
function Container5() {
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	const { userId } = useSelector((state) => state.auth);
	const [postData, setPostData] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		function handelResize() {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
		}
		window.addEventListener("resize", handelResize);
		return () => window.removeEventListener("resize", handelResize);
	}, [width, height]);

	const paddingRightVW = 30;
	const paddingRightPixel = (width * paddingRightVW) / 100;
	useEffect(() => {
		if (userId === "") return setPostData(defaultPostData);
		axios
			.get(`/post/${userId}`)
			.then(({ data }) => {
				if (data.length === 0) setPostData(defaultPostData);
				else setPostData(data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, [userId]);

	const items = postData.map((post) => <Posts key={post.id} data={post} />);
	return (
		<section className={styles.Container5}>
			<div className={styles.topSection}>
				<h2>Our Gallery</h2>
				<p onClick={() => navigate("/Gallery")}>View All</p>
			</div>
			<div className={styles.carousel} id="carousel2">
				{width < 950 && height > 600 ? (
					<MobileCorousel data={defaultPostData} />
				) : (
					// need fixing here
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
			<div className={styles.thankYou}>
				<p>Thank you ! Visit Again</p>
			</div>
		</section>
	);
}

export default Container5;
