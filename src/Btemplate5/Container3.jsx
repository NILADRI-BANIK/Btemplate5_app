import React from "react";
import EditTextIcon from "../assets/images/EditTextIcon.svg";
import { ContentEditableDiv, CreateSanitizeCallback } from "../components/ContentEditable/ContentEditable";
import ImageRender from "../components/EditingTool/ImageRender";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import styles from "./Btemplate5.module.scss";
import { useSelector } from "react-redux";

function Container3({
	editable,
	whyChooseUsImg,
	whyChooseUsImgMobile,
	setWhyChooseUsImg,
	setWhyChooseUsImgMobile,
	whyChooseUsText,
	setWhyChooseUsText,
	whyChooseUsImgPosition,
	setWhyChooseUsImgPosition,
}) {
	const onContentBlur = CreateSanitizeCallback(setWhyChooseUsText);
	const { width, height } = useSelector((state) => state.auth);
	return (
		<div className={styles.Container3}>
			<div className={styles.chooseusHero}>
				{!editable && (
					<ImageUpload
						className={styles.aboutusChangeIcon}
						setImage={setWhyChooseUsImg}
						setImageMobile={setWhyChooseUsImgMobile}
						image={whyChooseUsImg}
						imageMobile={whyChooseUsImgMobile}
						activeId={"whyChooseUsImgPosition"}
						initialPosition={whyChooseUsImgPosition}
						setInitialPosition={setWhyChooseUsImgPosition}
					/>
				)}
				<ImageRender initialPosition={whyChooseUsImgPosition} editable={editable} currentId={"whyChooseUsImgPosition"}>
					{width < 931 && height > 600 ? (
						<img src={whyChooseUsImgMobile} alt="whyChooseUsImgMobile" />
					) : (
						<img src={whyChooseUsImg} alt="whyChooseUsImg" />
					)}
				</ImageRender>
				<div className={styles.chooseusText}>
					<h2>Why Choose Us</h2>
					{!editable && <img src={EditTextIcon} alt="" className={styles.EditTextIcon} />}
					<ContentEditableDiv
						className={styles.chooseText}
						text={whyChooseUsText}
						onChange={onContentBlur}
						contentEditable={!editable}
					/>
				</div>
			</div>
		</div>
	);
}

export default Container3;
