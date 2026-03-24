import Button from '../components/Button';
import img1 from '../assets/images/deadpool_wolverine.png';
import img2 from '../assets/images/fantastic_four.png';
import img3 from '../assets/images/multiverse_saga.png';
import img4 from '../assets/images/spiderman_4.png';

const ArticlePage = () => {
  const articles = [
    {
      id: "01",
      title: "Deadpool & Wolverine breaks records",
      desc: "The anticipated team-up film of the century shatters box office expectations in its opening weekend.",
      img: img1
    },
    {
      id: "02",
      title: "Fantastic Four Casting Rumors",
      desc: "Kevin Feige hints at the long-awaited arrival of Marvel's first family to the MCU in Phase 6.",
      img: img2
    },
    {
      id: "03",
      title: "The Multiverse Saga Escalates",
      desc: "How Secret Wars will reshape the landscape of the entire cinematic universe.",
      img: img3
    },
    {
      id: "04",
      title: "Spider-Man 4 Updates",
      desc: "Tom Holland reflects on his journey and teases the darker tone of his next solo outing.",
      img: img4
    }
  ];

  return (
    <div className="flex w-full flex-col gap-6 bg-black min-h-screen text-white">
      <section className="bg-zinc-900 border-b-4 border-[#ED1D24] px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#ED1D24]">
          Daily Bugle News
        </p>
        <h1 className="max-w-xl text-4xl font-black leading-tight text-white sm:text-6xl uppercase tracking-tight">
          Latest Marvel Updates
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-400">
          Stay up to date with the newest releases, casting announcements, and deep dives into the comic lore of the Marvel Cinematic Universe.
        </p>
        <div className="mt-8">
          <Button to="/" className="bg-[#ED1D24] text-white hover:bg-red-700 border-[#ED1D24] px-8 py-3 font-bold uppercase tracking-widest text-sm rounded-none">
            Back to Base
          </Button>
        </div>
      </section>

      <section className="bg-zinc-950 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-12 flex items-end justify-between border-b-2 border-zinc-800 pb-4">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#ED1D24]">
              Top Headlines
            </p>
            <h2 className="mt-2 text-3xl font-black text-white uppercase tracking-tight">Trending News</h2>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {articles.map((article) => (
            <article key={article.id} className="group relative flex flex-col justify-between rounded-none border-2 border-zinc-800 bg-zinc-900 overflow-hidden shadow-[4px_4px_0px_#ED1D24] hover:-translate-y-2 hover:shadow-[8px_8px_0px_#ED1D24] transition-all">
              <div>
                <div className="flex aspect-video items-center justify-center bg-zinc-950 overflow-hidden border-b-2 border-zinc-800">
                  <img src={article.img} alt={article.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
                </div>
                <div className="p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#ED1D24]">
                    File {article.id}
                  </p>
                  <h3 className="mt-3 text-xl font-black text-white uppercase leading-snug">{article.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-zinc-400">
                    {article.desc}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6">
                <Button className="w-full bg-zinc-800 text-white hover:bg-[#ED1D24] border-zinc-800 hover:border-[#ED1D24] rounded-none uppercase font-bold text-xs tracking-wider transition-colors">Read Full Report</Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;