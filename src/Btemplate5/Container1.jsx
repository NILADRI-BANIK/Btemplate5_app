import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { socket } from "../socket";
import dialer from "../assets/business/svg/dialer.svg";
import location from "../assets/business/svg/location.svg";
import message from "../assets/business/svg/message.svg";
import store from "../assets/business/svg/store.svg";
import whatsapp from "../assets/business/svg/whatsapp.svg";
import EditTextIcon from "../assets/images/EditTextIcon.svg";
import rating from "../assets/images/rating.png";
import {
  ContentEditableDiv,
  CreateSanitizeCallback,
} from "../components/ContentEditable/ContentEditable";
import ImageRender from "../components/EditingTool/ImageRender";
import axios from "../components/Hooks/axios";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import { fetchCurrentData } from "../redux/slice/authSlice";
import line from "../Btemplate5/assets/line.svg";
import styles from "./Btemplate5.module.scss";
import cover1 from "./assets/cover1.png";
import cover2 from "./assets/cover2.png";
import cover4 from "./assets/cover4.png";

function Container1({
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
  isSubscribed,
}) {
  const onContentBlur = CreateSanitizeCallback(setBusinessName);
  const { userId, user, currentUserId, currentUser, width, height } =
    useSelector((state) => state.auth);
  const [followData, setFollowData] = useState("Subscribe");
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser === null) return;
    const result = currentUser?.followingData?.filter((id) => id === userId);
    if (result?.length === 1) setFollowData("Subscribed");
    else setFollowData("Subscribe");
  }, [currentUser, userId]);

  const handelFollow = () => {
    let sd = {
      notification_from: currentUserId,
      notification_to: userId,
      notification: {},
      title: "Subscribe",
      message: `${
        currentUser.displayName || currentUser.username
      } started subscribing to you`,
    };

    const raw = JSON.stringify({
      following: userId,
    });

    axios
      .post(`/auth/follow`, raw, {
        headers: { "Content-Type": "application/json" },
      })
      .then(({ data }) => {
        if (data.message === "follow") {
          setFollowData("Subscribed");
          socket.emit("notification", sd);
        }
        if (data.message === "unfollow") setFollowData("Subscribe");
        dispatch(fetchCurrentData(currentUserId));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handelMessage = () => {
    if (userId === currentUserId) {
      window.open(`${process.env.REACT_APP_SOCIAL_MEDIA_URL}/Chat`, "_self");
    } else {
      axios
        .get(`/conversations/find/${userId}/${currentUserId}`)
        .then(({ data }) => {
          if (data === null) {
            createConversations();
          } else {
            chatPageRouting();
          }
        });
    }

    const createConversations = () => {
      const raw = JSON.stringify({
        senderId: currentUserId,
        receiverId: userId,
      });

      if (user?.is_private === "Yes") {
        axios
          .post("/chat_setting/createRequest", raw, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            toast.success(
              `Message request sent successfully to ${user?.username}`
            );
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        axios
          .post("/conversations/", raw, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            chatPageRouting();
          })
          .catch(({ response: { data } }) => {
            console.log(data);
          });
      }
    };

    const chatPageRouting = () => {
      axios
        .get(`/conversations/${currentUserId}`)
        .then(({ data }) => {
          data.forEach((conv, index) => {
            conv.data.members.filter((id) => {
              if (id === userId) {
                window.open(
                  `${process.env.REACT_APP_SOCIAL_MEDIA_URL}/Chat/${index}`,
                  "_self"
                );
              }
            });
          });
        })
        .catch(({ response: { data } }) => {
          console.log(data);
        });
    };
  };

  return (
    <div className={styles.Container1}>
      <div className={styles.section1}>
        <div className={styles.logo}>
          <img src={businessLogo} alt="LOGO" />
        </div>
        <div className={styles.hero}>
          <div className={styles.backImage}>
            {!editable && (
              <ImageUpload
                className={styles.landingChangeIcon}
                setImageMobile={setCoverImageMobile}
                setImage={setCoverImage}
                imageMobile={coverImageMobile}
                image={coverImage}
                activeId={"coverImgPosition"}
                initialPosition={coverImgPosition}
                setInitialPosition={setCoverImgPosition}
              />
            )}
            <ImageRender
              initialPosition={coverImgPosition}
              editable={editable}
              currentId={"coverImgPosition"}
            >
              {width < 931 && height > 600 ? (
                <img src={coverImageMobile} alt="coverImageMobile" />
              ) : (
                <img src={coverImage} alt="coverImage" />
              )}
            </ImageRender>
          </div>

          <div className={styles.nameActions}>
            {!editable && (
              <img src={EditTextIcon} alt="" className={styles.EditTextIcon} />
            )}
            <ContentEditableDiv
              className={styles.businessName}
              text={businessName}
              onChange={onContentBlur}
              contentEditable={!editable}
            />
            <div className={styles.buttons}>
              {userId === currentUserId ? (
                <button
                  className={styles.subscribe}
                  onClick={() => {
                    window.open(
                      `${process.env.REACT_APP_SOCIAL_MEDIA_URL}/FollowList`,
                      "_self"
                    );
                  }}
                >
                  Subscribers
                </button>
              ) : (
                <button onClick={handelFollow}>{followData}</button>
              )}
              <button onClick={handelMessage}>Message</button>
            </div>
          </div>

          <div className={styles.logosContainer}>
            {companyLogos?.active && (
              <marquee
                direction="left"
                behavior="scroll"
                scrollamount="10"
                className={styles.brand1}
              >
                {companyLogos?.logos.map((data, index) => (
                  <img src={data} key={index} alt="logo" />
                ))}
              </marquee>
            )}
          </div>
        </div>
      </div>

      <div className={styles.section2}>
        <div className={styles.postSubscriber}>
          <div className={styles.post}>
            <h2>{postCount}</h2>
            <p>Post</p>
          </div>
          <div className={styles.subscriber}>
            <h2>{subscriberCount}</h2>
            <p>Subscribers</p>
          </div>
          <div
            className={styles.RatingContainer}
            onClick={() => setShowRating(true)}
          >
            <img src={rating} alt="" />
            <p>{ratingData}</p>
          </div>
        </div>

        <div className={styles.socialContainer}>
          <div className={styles.reachUs}>Reach us</div>
          <div className={styles.line}>
            <img src={line} alt="" />
          </div>
          <div className={styles.socials}>
            {iconData?.whatsapp?.active && <img src={whatsapp} alt="" />}
            {iconData?.call?.active && <img src={dialer} alt="" />}
            {iconData?.email?.active && <img src={message} alt="" />}
            {iconData?.location?.active && <img src={location} alt="" />}
            {iconData?.storeUrl?.active && <img src={store} alt="" />}
          </div>
        </div>
      </div>

      <div className={styles.section3}>
        <div className={styles.postContainer}>
          <img src={cover1} alt="" />
          <img src={cover2} alt="" />
          <img src={cover1} alt="" />
          <img src={cover4} alt="" />
          <img src={cover2} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Container1;
