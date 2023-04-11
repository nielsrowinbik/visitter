import { Link } from "@remix-run/react";

export function Footer() {
  return (
    <footer id="footer" className="mb-24 mt-48 font-medium text-zinc-500">
      <p>&copy; {new Date().getFullYear()} Visitter</p>
      <p>
        Made by{" "}
        <a className="font-medium text-black" href="https://nielsbik.nl">
          Niels Bik
        </a>
      </p>
      <ul className="flex space-x-6 text-sm font-normal text-black">
        <li>
          <Link to="/terms">Terms of Service</Link>
        </li>
        <li className="">
          <Link to="/privacy">Privacy Policy</Link>
        </li>
      </ul>
    </footer>
  );
}
