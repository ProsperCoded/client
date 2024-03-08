import React, { useState } from "react";
import Page from "./Page";
import { Divider, Input, Segmented } from "antd";
import TextArea from "antd/es/input/TextArea";

function ContactUs() {
  const [contactMethod, setContactMethod] = useState<"Tel" | "Email">("Tel");
  return (
    <Page
      className={"contact-us"}
      pageTitle={
        <>
          Contact <span className="lg:block">Us</span>
        </>
      }
      displayContent1={
        <>
          Welcome to ParcelShare, where file sharing meets simplicity and
          collaboration!
          <Divider orientation="left">
            <h2 className="text-2xl "> Get in Touch with ParcelShare</h2>
          </Divider>
          We'd love to hear from you! Whether you have questions, feedback,
          complains, or just want to say hello, reaching out to ParcelShare is
          as easy as a click. Feel free to drop us a message below, and our
          dedicated team will get back to you promptly.
        </>
      }
      displayRightColumn={
        <div className="h-full flex flex-col justify-center">
          <ul className="flex gap-5 px-4 flex-wrap md:flex-nowrap list-disc text-lg">
            <li className="flex flex-col gap-2">
              <h3 className="heading-sm">Contact Information</h3>
              <p className="email">
                <b>Email:</b>{" "}
                <a href="mailto:contact@parcelshare.com">
                  contact@parcelshare.com
                </a>
              </p>
              <p className="tel">
                <b>Phone:</b>
                <a href="tel:+2349155004456">+2349155004456</a>
              </p>
            </li>
            <li className="flex flex-col gap-2">
              <h3 className="heading-sm">Our Office</h3>
              <p className="headquarters">ParcelShare Headquarters</p>
              <p className="address">123 Main Street Anytown, USA</p>
              <p className="zip-code">
                <b>Zip Code:</b>
                98765
              </p>
            </li>
            <li className="flex flex-col gap-2">
              <h3 className="heading-sm">Social Media</h3>
              <a
                href="http://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a
                href="http://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
              <a
                href="http://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="http://linkin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      }
    >
      <>
        <div className="dm block-container">
          <h1 className="block-container__heading highlight">Direct Message</h1>
          <div className="dm__fields">
            <Input
              type="text"
              name="name"
              id="name"
              addonBefore="Name: "
              placeholder="Your name"
              required
            />
            <div>
              <p style={{ fontSize: "0.8em", marginBottom: "0.5rem" }}>
                How Should i Contact you(Optional)
              </p>
              <Segmented
                defaultValue="center"
                style={{ marginBottom: 8 }}
                onChange={(value) =>
                  setContactMethod(value!.toString() as "Tel" | "Email")
                }
                // default={"Tel"}
                value={contactMethod}
                options={["Tel", "Email"]}
              />
            </div>
            {contactMethod === "Tel" ? (
              <Input type="tel" name="tel" required addonBefore="Tel: " />
            ) : (
              <Input type="email" name="email" addonBefore="Email: " required />
            )}
            <label htmlFor="message">Message : </label>

            <TextArea
              name="message"
              id="message"
              placeholder="Message"
              required
              autoSize={{ minRows: 4, maxRows: 7 }}
            />
            <button className="btn btn--primary mt-3 w-full rounded-md cursor-pointer">
              Send
            </button>
          </div>
        </div>
        <p className=" text-center max-w-lg mx-auto mt-10 font-serif italic font-light">
          We look forward to connecting with you and making your ParcelShare
          experience exceptional!
        </p>
      </>
    </Page>
  );
}

export default ContactUs;
