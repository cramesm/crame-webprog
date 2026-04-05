import { Link } from 'react-router-dom';

const ArticleList = ({ articles }) => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
                <Link 
                    key={article.name} 
                    to={`/articles/${article.name}`} 
                    className="flex flex-col p-6 rounded-none border-2 border-zinc-800 bg-zinc-900 transition shadow-[4px_4px_0px_#ED1D24] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#ED1D24] group"
                >
                    <h3 className="text-xl font-black text-white uppercase mb-3 leading-snug group-hover:text-[#ED1D24] transition-colors">
                        {article.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mt-auto grow">
                        {article.content[0].length > 100 
                            ? article.content[0].substring(0, 100) + '...' 
                            : article.content[0]}
                    </p>
                </Link>
            ))}
        </div>
    );
};

export default ArticleList;