export const GET_CONDITIONS = (t: any) => {
  return [
    {
      title: t('Passport-Verification.title'),
      body: t('Passport-Verification.body'),
    },
    {
      title: t('Personal-Information-Accuracy.title'),
      body: t('Personal-Information-Accuracy.body'),
    },
    {
      title: t('Valid-Travel-Documents.title'),
      body: t('Valid-Travel-Documents.body'),
    },
    {
      title: t('Traveling-with-Children.title'),
      body: t('Traveling-with-Children.body'),
    },
    {
      title: t('Seating-Arrangements.title'),
      body: t('Seating-Arrangements.body'),
    },
    {
      title: t('Non-Transferable-Tickets.title'),
      body: t('Non-Transferable-Tickets.body'),
    },
    {
      title: t('Health-Safety.title'),
      body: t('Health-Safety.body'),
    },
    {
      title: t('Use-of-Personal-Information.title'),
      body: t('Use-of-Personal-Information.body'),
    },
    {
      title: t('Discount-Exclusions.title'),
      body: t('Discount-Exclusions.body'),
    },
    {
      title: t('Price-Modifications.title'),
      body: t('Price-Modifications.body'),
    },
    {
      title: t('Date-Reference.title'),
      body: t('Date-Reference.body'),
    },
    {
      title: t('No-Smoking-Policy.title'),
      body: t('No-Smoking-Policy.body'),
    },
    {
      title: t('Child-Supervision.title'),
      body: t('Child-Supervision.body'),
    },
    {
      title: t('Prohibited-Items.title'),
      body: t('Prohibited-Items.body'),
    },
    {
      title: t('Acceptance-of-Terms.title'),
      body: t('Acceptance-of-Terms.body'),
    },
  ] as const;
};
