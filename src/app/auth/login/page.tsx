"use client";

import React, { useState } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { ArrowRightIcon, ArrowLeftIcon } from "lucide-react";

// Overlay Images
import LeftOverlayImage from "@/assets/left-overlay.avif";
import RightOverlayImage from "@/assets/right-overlay.avif";

import { CardSlideWrapper } from "@/components/auth/card-slide-wrapper";
import { Terms } from "@/components/auth/terms";
import { OverlayContainer } from "@/components/auth/overlay-container";

const AuthPage = () => {
  const [toggle, setToggle] = useState<boolean>(true);

  return (
    <div className="bg-[#c9d6ff] bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff] flex items-center justify-center flex-col min-h-full w-full p-2">
      {/* Container */}
      <div className="bg-white max-w-[484px] md:min-w-[750px] md:max-w-[768px] p-2 rounded-md shadow-md overflow-hidden relative min-h-[550px] block w-full">
        {/* Sign Up Form Container */}
        <div
          className={`absolute -bottom-full md:bottom-0 h-3/5 w-full md:w-1/2 md:h-full duration-300 transition-all delay-75 md:top-0 left-0 z-[1] ${
            toggle !== true
              ? "bottom-0 md:translate-x-full md:translate-y-0 z-[5]"
              : ""
          }`}
        >
          <CardSlideWrapper
            headerLabel={"Get Started Now"}
            showSocial
            toggleButtonLabel={"SignIn"}
            toggleLabel={"Already a Member?"}
            setToggle={() => setToggle(true)}
          >
            <RegisterForm />
            <Terms />
          </CardSlideWrapper>
        </div>
        {/* Sign In Form Container */}
        <div
          className={`absolute bottom-0 duration-300 delay-75 w-full h-3/5 md:w-1/2 md:h-full transition-all md:top-0 left-0 z-[2] ${
            toggle !== true
              ? "bottom-full md:bottom-0 md:translate-x-full md:translate-y-0"
              : ""
          }`}
        >
          <CardSlideWrapper
            showSocial
            headerLabel={"Sign In"}
            toggleButtonLabel={"SignUp"}
            toggleLabel={"Not a Member?"}
            setToggle={() => setToggle(false)}
          >
            <LoginForm />
            <Terms />
          </CardSlideWrapper>
        </div>
        {/* Overlay Container */}
        <div
          className={`absolute top-0 right-0 left-0 h-2/5 w-full md:w-1/2 md:left-1/2 md:right-1/2 md:h-full overflow-hidden transition-all z-[5]  ${
            toggle !== true
              ? // CHANGED -translate-y-full
                "md:-translate-x-full rounded-br-[50px] rounded-bl-[50px] md:rounded-tr-[100px] md:rounded-br-[100px] md:rounded-bl-none"
              : "rounded-br-[50px] rounded-bl-[50px] md:rounded-tl-[100px] md:rounded-bl-[100px] md:rounded-br-none"
          }`}
        >
          {/* TODO: Overlay Container */}
          {/* Overlay */}
          <div
            className={`w-full bg-white top-0 text-white relative md:translate-x-0 transition-all md:-left-full h-full md:w-[200%]  ${
              toggle !== true ? "md:translate-x-1/2 top-0" : ""
            }`}
          >
            {/* Left Overlay Panel - Top Overlay Panel */}
            <div
              className={`absolute h-full w-full md:w-1/2 duration-300 md:h-full flex flex-col items-center justify-center text-center top-0 md:left-0 md:translate-x-0 transition-all ${
                toggle !== true
                  ? "md:translate-x-0 md:top-0 -translate-y-full md:translate-y-0"
                  : ""
              } `}
            >
              <OverlayContainer
                label={"Welcome Back!"}
                content={
                  "To keep connected with us please login with your personal details"
                }
                imageUrl={LeftOverlayImage}
                toggle={() => setToggle(true)}
                overflowHeaderLabel="Sign In"
              >
                <span className="flex gap-x-1 items-center justify-between">
                  Sign In <ArrowRightIcon size={16} />
                </span>
              </OverlayContainer>
            </div>
            {/* Right Overlay Panel - Bottom Overlay Panel */}
            <div
              className={`absolute h-full top-full w-full duration-300 md:top-0 md:h-full md:w-1/2 flex flex-col items-center justify-center text-center md:right-0 md:translate-x-0 transition-all ${
                toggle !== true
                  ? "-translate-y-full top-0 md:translate-x-1/4 md:translate-y-0"
                  : ""
              }`}
            >
              <OverlayContainer
                label={"New Here!"}
                content={
                  "Sign up and discover a comprehensive suite of features to enhance your experience."
                }
                overflowHeaderLabel="Sign Up"
                imageUrl={RightOverlayImage}
                toggle={() => setToggle(false)}
              >
                <span className="flex gap-x-1 items-center justify-between">
                  <ArrowLeftIcon size={16} /> Sign Up
                </span>
              </OverlayContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
