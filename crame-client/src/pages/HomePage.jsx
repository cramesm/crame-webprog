import Button from '../components/Button';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6 bg-black min-h-screen text-white">
      <section className="bg-zinc-900 border-b-4 border-[#ED1D24] px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#ED1D24]">
              Phase 5
            </p>
            <h1 className="max-w-xl text-4xl font-black leading-tight text-white sm:text-6xl uppercase tracking-tight">
              Welcome to the MCU
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-400">
              Explore the greatest cinematic universe ever created. From the streets of New York to the farthest reaches of the multiverse, Earth's mightiest heroes defend reality itself.
            </p>
            <div className="mt-8">
              <Button to="/about" className="bg-[#ED1D24] text-white hover:bg-red-700 border-[#ED1D24] px-8 py-3 font-bold uppercase tracking-widest text-sm rounded-none">
                Explore Heroes
              </Button>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-2xl shadow-red-900/40 border-4 border-zinc-800 bg-zinc-950">
            <div className="flex aspect-video items-center justify-center bg-zinc-950 overflow-hidden">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Marvel_Cinematic_Universe_logo.png/500px-Marvel_Cinematic_Universe_logo.png"
                alt="Cinematic Universe"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#ED1D24]">
            The Infinity Saga & Beyond
          </p>
          <h2 className="mt-2 text-3xl font-black text-white uppercase tracking-tight">Marvel by the Numbers</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Feature Films', value: '33+' },
            { label: 'Disney+ Series', value: '11+' },
            { label: 'Phases', value: '05' },
            { label: 'Avengers', value: '06' }
          ].map((stat, i) => (
            <div key={i} className="group relative rounded-none border-2 border-zinc-800 bg-zinc-900 p-8 shadow-[6px_6px_0px_#ED1D24] transition-transform hover:-translate-y-2 hover:shadow-[10px_10px_0px_#ED1D24]">
              <p className="text-5xl font-black text-white">{stat.value}</p>
              <p className="mt-4 text-[12px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
