export default function ExternalLink({ href, children }: any) {
  return (
    <a className="link-pink" target="_blank" rel="noreferrer" href={href}>
      {children}
    </a>
  );
}
