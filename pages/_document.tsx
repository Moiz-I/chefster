import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍🍳</text></svg>"
          />
          <meta
            name="description"
            content="Create 5sec recipies from just ingredients in your kitchen."
          />
          <meta property="og:site_name" content="chefster.vercel.app" />
          <meta
            property="og:description"
            content="Create 5sec recipies from just ingredients in your kitchen."
          />
          <meta property="og:title" content="Chefster AI" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Chefster AI" />
          <meta
            name="twitter:description"
            content="Create 5sec recipies from just ingredients in your kitchen."
          />
          <meta property="og:image" content="" />
          <meta name="twitter:image" content="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
