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
        <a href={href} className={classes}>
          {text}
        </a>
      ) : onClick ? (
        <button className={classes} onClick={() => onClick()}>
          {text}
        </button>
      ) : null}
    </li>
  );
}
