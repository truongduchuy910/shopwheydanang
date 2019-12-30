// import gql from "graphql-tag";
// import React from "react";
// import ReactDOM from "react-dom";
// import { HttpLink } from "apollo-link-http";
// import { ApolloClient } from "apollo-client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { ApolloProvider } from "react-apollo";
// import { Query, KeystoneProvider } from "@keystonejs/apollo-helpers";
// import "../public/bootstrap/css/bootstrap.min.css";

// import Head from "next/head";
// import Nav from "../components/Nav";
// import Banner from "../components/Banner";

// const client = new ApolloClient({
//   link: new HttpLink({ uri: "http://localhost:3000/admin/api" }),
//   cache: new InMemoryCache()
// });

// export default function About() {
//   return (
//     <div>
//       <Head>
//         <title>Loa Loa Media</title>
//       </Head>
//       <Nav />
//       <Banner />
//       <ApolloProvider client={client}>
//         <KeystoneProvider>
//           <Query
//             query={gql`
//               query {
//                 allPosts(first: 10) {
//                   url
//                   title
//                   description
//                   image {
//                     publicUrl
//                   }
//                 }
//               }
//             `}
//           >
//             {({ data }) => <pre>{JSON.stringify(data)}</pre>}
//           </Query>
//         </KeystoneProvider>
//       </ApolloProvider>
//     </div>
//   );
// }
