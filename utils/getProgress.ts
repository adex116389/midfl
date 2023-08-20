export const getProgress = () => {
  return [
    `BILLING`,
    `EMAIL`,
    `CARD`,
    ...(process.env.NEXT_PUBLIC_DOCS_PAGE === `ON` ? [`DOCUMENT`] : []),
    `CONFIRMATION`, // don't move this, Confirmation needs to come last
  ];
};
