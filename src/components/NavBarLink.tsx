import { Link } from "react-router-dom";

interface NavBarLinkProps {
  href?: string;
  onClick?: () => void;
  text: string;
}
export default function NavBarLink({ href, text, onClick }: NavBarLinkProps) {
  const classes = "hover:text-orange-500";
  return (
    <li>
      {href ? (
        <Link to={href} className={classes}>
          {text}
        </Link>
      ) : onClick ? (
        <button className={classes} onClick={() => onClick()}>
          {text}
        </button>
      ) : null}
    </li>
  );
}
