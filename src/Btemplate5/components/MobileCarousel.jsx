import React, { useState } from "react";
import comment from "../../assets/business/image/comment.svg";
import heart from "../../assets/business/image/heartLike.svg";
import share from "../../assets/business/image/share.svg";
import styles from "../Btemplate5.module.scss";

function MobileCarousel({ data }) {
	const [activePost, setActivePost] = useState(data[0]);
	const handlePostClick = (post) => {
		setActivePost(post);
	};

	return (
		<div className={styles.mobileCarousel}>
			<div className={styles.activeItem}>
				<div className={styles.backImg}>
					<img src={activePost.mediaUrl} alt="" />
				</div>
				<div className={styles.profile}>
					<img src={activePost.profilePic} alt="" />
					<div className={styles.nameDetail}>
						<h3>{activePost.name}</h3>
						<p>{activePost.userName}</p>
					</div>
				</div>
				<div className={styles.details}>
					<div className={styles.desc}>{activePost.postDesc}</div>
					<div className={styles.actions}>
						<div className={styles.like}>
							<img src={heart} alt="" />
							<p>26</p>
						</div>
						<div className={styles.comment}>
							<img src={comment} alt="" />
							<p>06</p>
						</div>
						<div className={styles.share}>
							<img src={share} alt="" />
							<p>26</p>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.allItems}>
				{data &&
					data.map((post,i) => (
						<div key={i} className={styles.postCards} onClick={() => handlePostClick(post)}>
							<div className={styles.backImage}>
								<img src={post.mediaUrl} alt="" />
							</div>
							<div className={styles.profile}>
								<img src={post.profilePic} alt="" />
								<div className={styles.nameDetail}>
									<h3>{post.name}</h3>
									<p>{post.userName}</p>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}

export default MobileCarousel;
