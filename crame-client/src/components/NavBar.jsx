import { NavLink } from 'react-router-dom';

/* 
  Enhancement 3: Add access point (button or link) on the NavBar 
*/
const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
    isActive
      ? 'border-red-600 bg-red-600 text-white'
      : 'border-transparent text-zinc-400 hover:border-red-600 hover:bg-zinc-900 hover:text-red-500',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-zinc-950/90 backdrop-blur-md shadow-md shadow-black/50 border-b-2 border-red-600 transition-all duration-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="flex h-9 items-center justify-center bg-[#ED1D24] px-2 text-2xl font-black tracking-[0.05em] text-white">
            MARVEL
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClassName}>
              {link.label}
            </NavLink>
          ))}
          {localStorage.getItem('token') && (
            <NavLink to="/dashboard" className={navLinkClassName}>
              Dashboard
            </NavLink>
          )}
          {!localStorage.getItem('token') ? (
            <NavLink to="/auth/signin" className={navLinkClassName}>
              Sign In
            </NavLink>
          ) : (
            <button
              onClick={() => { localStorage.clear(); window.location.href = '/'; }}
              className="rounded-full border-2 border-zinc-800 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400 hover:text-white hover:border-zinc-600 transition"
            >
              Log Out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;