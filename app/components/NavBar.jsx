import Image from "next/image";
import Link from "next/link";
import Logo from "./dojo-logo.png";

export default function NavBar() {
  return (
    <nav>
      <Image
        src={Logo}
        alt="Dojo Helpdesk logo"
        width={70}
        quality={100}
        placeholder="blur"
      />
      <Link href={"/"}>
        <h1>Dojo Helpdesk</h1>
      </Link>
      <Link href={"/"}>Dashboard</Link>
      <Link href={"/tickets"}>Tickets</Link>
    </nav>
  );
}
