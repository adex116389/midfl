import MobileDetect from "mobile-detect";
import device from "device";
import geoip from "geoip-lite";
import { IncomingMessage } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

const middleware = async (req: IncomingMessage & {
  cookies: NextApiRequestCookies
}) => {
  let ip = req.headers[`x-forwarded-for`] || req.connection.remoteAddress;
  const geo = geoip.lookup(String(ip).split(`,`)[0]);

  const country = geo?.country;

  const countries =
    process.env.ALLOWED_COUNTRIES && process.env.ALLOWED_COUNTRIES.split(`,`);
  const md = new MobileDetect(req.headers[`user-agent`] as string);
  const mydevice = device(req?.headers[`user-agent`] as string);

  const isBot = md.is(`bot`) || mydevice.is("bot");

  if (isBot || (countries && (!country || !countries.includes(country)))) {
    return {
      valid: false,
    };
  }

  return {
    valid: true,
  };
};

export default middleware;
