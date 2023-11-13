import Image from "next/image";
import Link from "next/link";
import Logo from "./dojo-logo.png";
import LogoutButton from "./LogoutButton";

export default function NavBar({ user }) {
  console.log(user);
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
      <Link href={"/tickets"} className="mr-auto">Tickets</Link>
      {user && <span>Hello, {user.email}</span>}
      <LogoutButton />
    </nav>
  );
}
