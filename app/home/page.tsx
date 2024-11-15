// `app/page.tsx` is the UI for the `/` URL
import Navbar from "../components/navbar";

export default function Home() {
    return (<>
        <Navbar></Navbar>
    <h1>Hello, Home page!</h1>
    </>
);
  }