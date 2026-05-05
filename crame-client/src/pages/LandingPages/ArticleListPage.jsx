import Button from '../../components/Button';
import ArticleList from '../../components/ArticleList';
import articles from '../../data/article-content';

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-6 bg-black min-h-screen text-white">
      <section className="bg-zinc-900 border-b-4 border-[#ED1D24] px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#ED1D24]">
          React Knowledge Base
        </p>
        <h1 className="max-w-xl text-4xl font-black leading-tight text-white sm:text-6xl uppercase tracking-tight">
          Articles
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-400">
          Explore and learn from our comprehensive guides on React development, routing, and state management.
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
              Top Resources
            </p>
            <h2 className="mt-2 text-3xl font-black text-white uppercase tracking-tight">Available Documentation</h2>
          </div>
        </div>

        <ArticleList articles={articles} />
      </section>
    </div>
  );
};

export default ArticleListPage;