export const getNextUrl = (index: string) => {
  const url = {
    OTP: `/otp`,
    BILLING: `/billing`,
    CARD: `/card`,
    EMAIL: `/email`,
    DOCUMENT: `/document`,
    CONFIRMATION: `/confirmation`,
  }[index];

  return url || `/`;
};
