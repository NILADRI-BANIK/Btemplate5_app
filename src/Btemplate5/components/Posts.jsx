import styles from "../Btemplate5.module.scss";
const Posts = ({ data }) => {
	console.log(data);
	return (
		<div className={styles.postMainContainer}>
			<div className={styles.media}>
				<img src={data.mediaUrl} alt="" />
			</div>
			<div className={styles.profile}>
				<img src={data.profilePic} alt="" />
				<div className={styles.profileDetails}>
					<h4>{data.name}</h4>
					<h5>{data.userName}</h5>
				</div>
			</div>
			<div className={styles.details} id="details">
				<p>{data.postDesc}</p>
			</div>
		</div>
	);
};

export default Posts;
