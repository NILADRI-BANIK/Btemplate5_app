import React, { useEffect, useRef, useState } from "react";
import comment from "../../assets/business/image/comment.svg";
import heart from "../../assets/business/image/heartLike.svg";
import share from "../../assets/business/image/share.svg";
import styles from "../Btemplate5.module.scss";

function VerticalCarousel({ data }) {
	const [activePost, setActivePost] = useState(data[0]);
	const allItemsRef = useRef(null);
	const autoplayIntervalRef = useRef(null);

	const handleNext = () => {
		const currentIndex = data.findIndex((post) => post.id === activePost.id);
		const nextIndex = (currentIndex + 1) % data.length;

		if (nextIndex === 0) {
			allItemsRef.current.scrollTop = 0;
		} else {
			const offset = (16 * window.innerHeight * nextIndex) / 100;
			allItemsRef.current.scrollTop = offset;
		}

		setActivePost(data[nextIndex]);
	};

	const handlePostClick = (post) => {
		const currentIndex = data.findIndex((p) => p.id === post.id);
		const offset = (16 * window.innerHeight * currentIndex) / 100;
		allItemsRef.current.scrollTop = offset;

		setActivePost(post);
	};

	const startAutoplay = () => {
		autoplayIntervalRef.current = setInterval(() => {
			handleNext();
		}, 3000);
	};

	const stopAutoplay = () => {
		clearInterval(autoplayIntervalRef.current);
	};

	const handleMouseEnter = () => {
		stopAutoplay();
	};

	const handleMouseLeave = () => {
		startAutoplay();
	};

	useEffect(() => {
		startAutoplay();

		return () => {
			clearInterval(autoplayIntervalRef.current);
		};
	}, [activePost]);

	return (
		<div className={styles.verticalCarousel}>
			<div className={styles.activeItem} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				<div className={styles.backImg}>
					<img src={activePost.mediaUrl} alt="" />
				</div>
				<div className={styles.details}>
					<div className={styles.name}>{activePost.productName}</div>
					<div className={styles.actions}>
						<div className={styles.like}>
							<img src={heart} alt="" />
						</div>
						<div className={styles.comment}>
							<img src={comment} alt="" />
						</div>
						<div className={styles.share}>
							<img src={share} alt="" />
						</div>
					</div>
				</div>
			</div>
			<div className={styles.allItems} ref={allItemsRef}>
				{[...data, data[0]].map((post) => (
					<div key={post.id} id={`post-${post.id}`} className={styles.postCards} onClick={() => handlePostClick(post)}>
						<div className={styles.backImage}>
							<img src={post.mediaUrl} alt="" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default VerticalCarousel;
