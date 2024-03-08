import React, { ReactElement } from "react";
import fileShareImage from "./../../assets/features/fileshare.png";
import pwaImage from "./../../assets/features/Pwa-image.png";
import hashLink from "./../../assets/features/hashlink-image.png";
import collaborateImage from "./../../assets/features/collaborate-image.png";
import cloudStorageImage from "./../../assets/features/cloudStorage-image.png";

function Features() {
  return (
    <div
      className="features space-y-14 md:space-0 block-container"
      id="features"
    >
      <h2 className="block-container__heading highlight">
        Application Features
      </h2>
      <Feature
        heading="File Sharing"
        image={fileShareImage}
        content={
          <p>
            Seemless sharing of filesbetween users and you can also make friends
            where the <b>public files</b> you store is seen and accessible by
            your friends
          </p>
        }
      />
      <Feature
        heading="Group Collaboration"
        image={collaborateImage}
        content={
          <p>
            Create groups for streamlined file sharing, ensuring instant access
            for all group members.
          </p>
        }
      />
      <Feature
        heading="Hashed Links"
        image={hashLink}
        content={
          <p>
            Generate unique <b>hashed links</b> which can be shared and accessed
            by anyone with ability to create special restriction and
            customizable access controls. Set user limits, define access
            periods, and secure links with passwords for tailored sharing
            experiences.
          </p>
        }
      />
      <Feature
        heading="Progressive Web App (PWA)"
        image={pwaImage}
        content={
          <p>
            Experience unparalleled convenience with our <b>PWA</b>, enabling{" "}
            <b>offline</b> functionality, faster initial load times, and instant
            accessibility from any device.
          </p>
        }
      />
      <Feature
        heading="Smart Storage Management"
        image={cloudStorageImage}
        content={
          <p>
            Optimize storage by automatically deleting files older than{" "}
            <b>7 days</b>, ensuring the application's seamless functionality.
            Users receive a timely alert <b> three days </b> prior to any
            deletion.
          </p>
        }
      />
    </div>
  );
}
function Feature({
  heading,
  content,
  image,
}: {
  heading: string;
  content: ReactElement | string;
  image: string;
}) {
  return (
    <div
      className={`feature mx-auto w-[90%] h-fit py-5 px-4 rounded-lg hover:shadow-lg md:max-w-[40vw]`}
    >
      <span className="feature__image">
        <img loading="lazy" src={image} alt="" />
      </span>
      <div className="heading capitalize rounded-full bg-primary px-4 py-2 w-fit font-bold tracking-wide">
        {heading}
      </div>
      <div className="content capitalize mt-2">{content}</div>
    </div>
  );
}
export default Features;
