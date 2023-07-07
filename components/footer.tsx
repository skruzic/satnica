'use client';

const Footer = () => (
  <footer className="px-2 py-3 mt-auto bg-gray-200">
    <div className="container">
      <p className="text-sm">Koristite na vlastitu odgovornost</p>
      <p className="text-sm text-muted-foreground">
        Copyright &copy; {new Date().getFullYear()}
      </p>
    </div>
  </footer>
);

export default Footer;
