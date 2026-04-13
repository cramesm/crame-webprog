import Button from '../../components/Button';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6 bg-black min-h-screen text-white">
      <section className="bg-zinc-900 border-b-4 border-[#ED1D24] px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-xl overflow-hidden shadow-2xl shadow-red-900/40 border-4 border-zinc-800 bg-zinc-950">
            <div className="w-full aspect-4/3 lg:aspect-square bg-zinc-950 overflow-hidden">
              <img src="https://comicbook.com/wp-content/uploads/sites/4/2025/06/avengers-end-game-poster.jpg?resize=1536" alt="Iron Man" className="w-full h-full object-cover opacity-90" />
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#ED1D24]">
              Marvel Studios
            </p>
            <h1 className="max-w-xl text-4xl font-black leading-tight text-white sm:text-6xl uppercase tracking-tight">
              An Idea To Bring Together
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-400">
              There was an idea, to bring together a group of remarkable people, to see if they could become something more. See if they could work together when we needed them to, to fight the battles that we never could.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/" className="bg-[#ED1D24] text-white hover:bg-red-700 border-[#ED1D24] px-6 py-3 font-bold uppercase tracking-widest text-sm rounded-none">
                Back to HQ
              </Button>
              <Button to="/articles" className="bg-transparent text-white hover:bg-zinc-800 border-2 border-white px-6 py-3 font-bold uppercase tracking-widest text-sm rounded-none">
                Read Files
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#ED1D24]">
              The Avengers Initiative
            </p>
            <h2 className="mt-2 text-3xl font-black text-white uppercase tracking-tight">Earth's Mightiest</h2>

            <div className="mt-10 space-y-8">
              {[
                { title: 'The First Avenger', desc: 'A kid from Brooklyn given the Super Soldier serum, fighting for freedom in WWII and beyond.' },
                { title: 'Genius, Billionaire', desc: 'Armed with a suit of powered armor, Tony Stark protects the world while wrestling with his own legacy.' },
                { title: 'God of Thunder', desc: 'The mighty Thor hails from Asgard, wielding Mjolnir to protect the Nine Realms from destruction.' }
              ].map((item, i) => (
                <article key={i} className="group relative rounded-none border-l-4 border-[#ED1D24] bg-zinc-900 p-8 shadow-md hover:shadow-xl hover:shadow-red-900/20 transition-all">
                  <h3 className="text-2xl font-black text-white uppercase">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-zinc-400">
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#ED1D24]">
              Visual Archives
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="flex aspect-square items-center justify-center bg-zinc-900 overflow-hidden border-2 border-zinc-800 rounded-none shadow-[4px_4px_0px_#ED1D24]">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGWZ0Mmu-_WsgkR6hgeRsRoz0gHb1iTAq08MzE9EPUW3BQeoLi2FZXDynWrrlhyiUMj5q0glFSYCk_BgogBTRj1UGbBBnvDmZZVoGIe74Vg&s=10" alt="Comic 1" className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-110 hover:opacity-100" />
              </div>
              <div className="flex aspect-square items-center justify-center bg-zinc-900 overflow-hidden border-2 border-zinc-800 rounded-none shadow-[4px_4px_0px_#ED1D24]">
                <img src="https://wallpapers.com/images/hd/deadpool-art-1000-x-1667-wallpaper-sizx11eku3i7ztip.jpg" alt="Comic 2" className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-110 hover:opacity-100" />
              </div>
              <div className="flex aspect-square items-center justify-center bg-zinc-900 overflow-hidden border-2 border-zinc-800 rounded-none shadow-[4px_4px_0px_#ED1D24]">
                <img src="https://tse3.mm.bing.net/th/id/OIP.RlKlw9dS0JKUb1o5tvyTCgHaNK?cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Comic 3" className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-110 hover:opacity-100" />
              </div>
              <div className="flex aspect-square items-center justify-center bg-zinc-900 overflow-hidden border-2 border-zinc-800 rounded-none shadow-[4px_4px_0px_#ED1D24]">
                <img src="https://creator.nightcafe.studio/jobs/qMUElTIAd4EJ6K68Ot5P/qMUElTIAd4EJ6K68Ot5P--1--gk40e.jpg" alt="Comic 4" className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-110 hover:opacity-100" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
