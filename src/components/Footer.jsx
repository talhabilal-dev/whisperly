const Footer = () => {
  return (
    <footer className=" bg-zinc-950 py-12">
      <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-sm text-zinc-500">
        <p>
          Copyright &copy; {new Date().getFullYear()} Talha Bilal. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
