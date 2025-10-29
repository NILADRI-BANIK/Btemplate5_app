import React from "react";
import EditTextIcon from "../assets/images/EditTextIcon.svg";
import { ContentEditableDiv, CreateSanitizeCallback } from "../components/ContentEditable/ContentEditable";
import ImageRender from "../components/EditingTool/ImageRender";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import styles from "./Btemplate5.module.scss";
import line from "./assets/line.svg";
import { useSelector } from "react-redux";

function Container2({
	editable,
	aboutCompanyText,
	aboutCompanyImg,
	aboutCompanyImgMObile,
	setAboutCompanyText,
	setAboutCompanyImg,
	setAboutCompanyImgMobile,
	aboutCompanyImgPosition,
	setAboutCompanyImgPosition,
}) {
	const onContentBlur = CreateSanitizeCallback(setAboutCompanyText);
	const { width, height } = useSelector((state) => state.auth);
	return (
		<div className={styles.Container2}>
			<div className={styles.heroImage}>
				{!editable && (
					<ImageUpload
						className={styles.aboutImageChangeIcon}
						setImage={setAboutCompanyImg}
						setImageMobile={setAboutCompanyImgMobile}
						image={aboutCompanyImg}
						imageMobile={aboutCompanyImgMObile}
						activeId={"aboutCompanyImgPosition"}
						initialPosition={aboutCompanyImgPosition}
						setInitialPosition={setAboutCompanyImgPosition}
					/>
				)}
				<ImageRender initialPosition={aboutCompanyImgPosition} editable={editable} currentId={"aboutCompanyImgPosition"}>
					{width < 631 && height > 600 ? (
						<img src={aboutCompanyImgMObile} alt="aboutCompanyImgMObile" />
					) : (
						<img src={aboutCompanyImg} alt="aboutCompanyImg" />
					)}
				</ImageRender>
			</div>
			<div className={styles.aboutDesc}>
				<h2>About Company</h2>
				{!editable && <img src={EditTextIcon} alt="" className={styles.EditTextIcon} />}
				<ContentEditableDiv
					className={styles.aboutusText}
					text={aboutCompanyText}
					onChange={onContentBlur}
					contentEditable={!editable}
				/>
				<div className={styles.line}>
					<img src={line} alt="" />
				</div>
				<button>We're Hiring</button>
			</div>
		</div>
	);
}

export default Container2;
