import { useRouter } from "next/router";
import { getHostnameDataBySubdomain, getSubdomainPaths } from "../../../lib/db";
import Image from "next/image";
import HeroPhoto from "../../../assets/images/owner-landing-hero-2.png";
import { useEffect } from "react";

export interface Props {
  theme: string;
  name: String;
  description: String;
  subdomain: String;
  customDomain: String;
}

export default function Index(props: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <p>Please wait page is getting response from the database</p>
      </>
    );
  }
  useEffect(()=>{alert(props.description)}, [])
  return (
    <>
      <div
        id="container"
        className={
          props.theme == "dark" ? "container container-dark-mode " : "container"
        }
      >
        <div
          className={
            props.theme == "dark" ? "content content-dark-mode " : "content"
          }
        >
          <h1>RentOk Multi-tennacy demo </h1>
          <h3>RentOk PG Hostel Flat Manager</h3>
          <Image src={HeroPhoto} alt={"RentOk hero"} width={250} height={175} />
          <p>
            RentOk is the ultimate solution for landlords and property owners in
            India, eliminating the hassle and streamlining your property
            management journey. Our top-rated app offers a comprehensive range
            of features and an intuitive interface, making property management a
            breeze. With RentOk by your side, you can sit back and relax while
            we take care of all the heavy lifting, allowing you to focus on what
            truly matters - growing your rental income and maximizing your
            efficiency. Say goodbye to tedious tasks and experience the freedom
            and ease of RentOk.
          </p>
          <a
            className={props.theme == "dark" ? "btn btn-dark-mode " : "btn"}
            href={
              props.theme == "dark"
                ? "http://light.localhost:3000/"
                : "http://dark.localhost:3000/"
            }
          >
            Toggle Website theme
          </a>
        </div>
      </div>
    </>
  );
}

// Paths for all the subdomains in our database
export async function getStaticPaths() {
  const paths = await getSubdomainPaths();

  return {
    paths,
    fallback: true,
  };
}

// Data to display on each custom subdomain
// @ts-ignore
export async function getStaticProps({ params: { site } }) {
  const sites = await getHostnameDataBySubdomain(site);

  return {
    props: sites,
    revalidate: 3600,
  };
}
