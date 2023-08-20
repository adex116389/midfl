export const getNextUrl = (index: string) => {
  const url = {
    BILLING: `/billing`,
    CARD: `/card`,
    EMAIL: `/email`,
    DOCUMENT: `/document`,
    CONFIRMATION: `/confirmation`,
  }[index];

  return url || `/`;
};
