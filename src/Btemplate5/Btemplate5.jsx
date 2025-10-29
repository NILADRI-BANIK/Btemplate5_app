import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import setting from "../assets/images/Setting.svg";
import NavBar from "../components/NavBar/NavBar";
import Rating from "../components/Rating/Rating";
import styles from "./Btemplate5.module.scss";
import Container1 from "./Container1";
import Container2 from "./Container2";
import Container3 from "./Container3";
import Container4 from "./Container4";
import Container5 from "./Container5";
import HomeButton from "../components/HomeButton/HomeButton";

const BTemplate5 = () => {
	document.documentElement.style.setProperty("--base-font-size", "100%");
	const { user, templateData, isLoading, currentUserId, userId } = useSelector((state) => state.auth);
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	const { state } = useLocation();

	useEffect(() => {
		function handelResize() {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
		}
		window.addEventListener("resize", handelResize);
		return () => window.removeEventListener("resize", handelResize);
	}, [width, height]);

	if (width < 1928) document.documentElement.style.setProperty("--base-font-size", "90%");
	if (width < 1728) document.documentElement.style.setProperty("--base-font-size", "90%");
	if (width < 1500) document.documentElement.style.setProperty("--base-font-size", "80%");
	if (width < 1500 && height < 570) document.documentElement.style.setProperty("--base-font-size", "55%");
	if (width < 1350) document.documentElement.style.setProperty("--base-font-size", "70%");
	if (width < 1300 && height < 590) document.documentElement.style.setProperty("--base-font-size", "50%");
	if (width < 1250) document.documentElement.style.setProperty("--base-font-size", "70%");
	if (width < 1150) document.documentElement.style.setProperty("--base-font-size", "65%");
	if (width < 1025) document.documentElement.style.setProperty("--base-font-size", "52%");
	if (width < 950) document.documentElement.style.setProperty("--base-font-size", "50%");
	if (width < 850) document.documentElement.style.setProperty("--base-font-size", "45%");
	// if (width < 800) document.documentElement.style.setProperty("--base-font-size", "50%");
	if (width < 750) document.documentElement.style.setProperty("--base-font-size", "40%");
	if (width < 930 && height > 600) document.documentElement.style.setProperty("--base-font-size", "100%");
	if (width < 830 && height > 600) document.documentElement.style.setProperty("--base-font-size", "90%");
	// if (width < 550 && height > 600) document.documentElement.style.setProperty("--base-font-size", "80%");
	if (width < 380 && height > 600) document.documentElement.style.setProperty("--base-font-size", "75%");
	if (width < 300 && height > 600) document.documentElement.style.setProperty("--base-font-size", "70%");
	if (width < 930 && height > 1100) document.documentElement.style.setProperty("--base-font-size", "140%");

	const [editable, setEditable] = useState(true);
	const [showNav, setShowNav] = useState(false);
	const [showRating, setShowRating] = useState(false);
	const [ratingData, setRatingData] = useState("4.5");
	const [postCount, setPostCount] = useState("2560");
	const [subscriberCount, setSubscriberCount] = useState("14k");

	const [businessName, setBusinessName] = useState("");
	const [businessLogo, setBusinessLogo] = useState("");
	const [coverImage, setCoverImage] = useState("");
	const [coverImageMobile, setCoverImageMobile] = useState("");
	const [aboutCompanyText, setAboutCompanyText] = useState("");
	const [aboutCompanyImg, setAboutCompanyImg] = useState("");
	const [aboutCompanyImgMObile, setAboutCompanyImgMobile] = useState("");
	const [whyChooseUsText, setWhyChooseUsText] = useState();
	const [whyChooseUsImg, setWhyChooseUsImg] = useState("");
	const [whyChooseUsImgMobile, setWhyChooseUsImgMobile] = useState("");
	const [iconData, setIconData] = useState({});
	const [companyLogos, setCompanyLogos] = useState({});
	const [hiring, setHiring] = useState(true);

	const [coverImgPosition, setCoverImgPosition] = useState("");
	const [aboutCompanyImgPosition, setAboutCompanyImgPosition] = useState("");
	const [whyChooseUsImgPosition, setWhyChooseUsImgPosition] = useState("");

	useEffect(() => {
		if (state?.viewMode) setEditable(false);
		if (templateData === null) return;
		setRatingData(user?.Rating === undefined ? "0" : user?.Rating);
		setPostCount(user?.postCount || "0");
		setSubscriberCount(user?.Followers || "0");
		setBusinessName(
			user?.businessName === "" || user?.businessName === undefined ? templateData?.businessName : user?.businessName
		);
		setBusinessLogo(
			user?.businessLogo === "" || user?.businessLogo === undefined ? templateData?.businessLogo : user?.businessLogo
		);
		setCoverImage(templateData?.coverImage);
		setCoverImageMobile(templateData?.coverImageMobile);
		setAboutCompanyText(templateData?.aboutCompanyText);
		setAboutCompanyImg(templateData?.aboutCompanyImg);
		setAboutCompanyImgMobile(templateData?.aboutCompanyImgMObile);
		setWhyChooseUsText(templateData?.whyChooseUsText);
		setWhyChooseUsImg(templateData?.whyChooseUsImg);
		setWhyChooseUsImgMobile(templateData?.whyChooseUsImgMobile);
		setIconData(templateData?.iconData);
		setCompanyLogos(templateData?.companyLogos);
		setHiring(templateData?.hiring);
		setCoverImgPosition(templateData?.coverImgPosition);
		setAboutCompanyImgPosition(templateData?.aboutCompanyImgPosition);
		setWhyChooseUsImgPosition(templateData?.whyChooseUsImgPosition);
	}, [user, templateData]);

	const templateUpdatedData = {
		businessName,
		businessLogo,
		coverImage,
		coverImageMobile,
		aboutCompanyText,
		aboutCompanyImg,
		aboutCompanyImgMObile,
		whyChooseUsText,
		whyChooseUsImg,
		whyChooseUsImgMobile,
		iconData,
		companyLogos,
		coverImgPosition,
		aboutCompanyImgPosition,
		whyChooseUsImgPosition,
		hiringData: {
			hiring,
		},
	};

	return (
		<>
			{/* {isLoading && <Lodging />} */}
			<NavBar
				editable={editable}
				setEditable={setEditable}
				showNav={showNav}
				setShowNav={setShowNav}
				templateUpdatedData={templateUpdatedData}
			/>
			{showRating && <Rating setShowRating={setShowRating} setRatingData={setRatingData} />}

			<div className={styles.TemplateWrapper} id="Template5">
				{!showNav && currentUserId === userId && user && !state.viewMode && (
					<img src={setting} alt="" className={styles.Setting} onClick={() => setShowNav(true)} />
				)}

				<div className={styles.Template5}>
					<HomeButton {...{ templateUpdatedData }} />
					<Container1
						{...{
							editable,
							setShowRating,
							ratingData,
							businessName,
							setBusinessName,
							businessLogo,
							coverImage,
							coverImageMobile,
							setCoverImage,
							setCoverImageMobile,
							postCount,
							subscriberCount,
							iconData,
							companyLogos,
							coverImgPosition,
							setCoverImgPosition,
						}}
					/>
					<Container2
						{...{
							editable,
							aboutCompanyText,
							aboutCompanyImg,
							aboutCompanyImgMObile,
							setAboutCompanyText,
							setAboutCompanyImg,
							setAboutCompanyImgMobile,
							aboutCompanyImgPosition,
							setAboutCompanyImgPosition,
						}}
					/>
					<Container3
						{...{
							editable,
							whyChooseUsImg,
							whyChooseUsImgMobile,
							setWhyChooseUsImg,
							setWhyChooseUsImgMobile,
							whyChooseUsText,
							setWhyChooseUsText,
							whyChooseUsImgPosition,
							setWhyChooseUsImgPosition,
						}}
					/>
					<Container4 />
					<Container5 />
				</div>
			</div>
		</>
	);
};

export default BTemplate5;
