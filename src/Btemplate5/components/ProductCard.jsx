import React from 'react';
import styles from "../Btemplate5.module.scss";
import comment from "../../assets/business/image/comment.svg";
import heart from "../../assets/business/image/heartLike.svg";
import share from "../../assets/business/image/share.svg";

function ProductCard({product}) {
  return (
		<div className={styles.ProductCard} id="productCard">
			<div className={styles.hero}>
				<img src={product.mediaUrl} alt="" />
			</div>
			<div className="details" id="details">
				<h2>{product.productName}</h2>
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
	);
}

export default ProductCard;