import { Helmet } from "react-helmet-async";

type MetaTagsProps = {
  title?: string;
  description?: string;
  keywords?: string;
  pageUrl?: string;
};

const MetaTags = ({
  title = "Soar | Smart Financial Dashboard | Track, Analyze, and Optimize Finances",
  keywords = "Finance Dashboard, Financial Management, Expense Tracking, Budgeting, Financial Analysis, Investment, Money Management, Personal Finance, Soar",
  description = "Welcome to Soar - your all-in-one financial dashboard to track, manage, and optimize your finances effortlessly. Stay updated with real-time insights, budgeting tools, and financial reports.",
  pageUrl = window.location.href
}: MetaTagsProps) => {
  const imageUrl = `/assets/icons/soar-logo.svg`;

  return (
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href={imageUrl} />
      <link rel="canonical" href={pageUrl} />
      <title>{title}</title>
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Soar" />
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default MetaTags;
