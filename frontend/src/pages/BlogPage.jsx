import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";
import { Calendar, User, ArrowRight } from "lucide-react";

function BlogPage() {
  return (
    <div className="section-band pt-8 sm:pt-12">
      <SEO 
        title="Solar Energy Blog | Jay Yogeshwar Solar Energy System" 
        description="Read the latest updates, guides, and news about solar energy in Maharashtra. Expert insights on solar pumps, on-grid and off-grid systems."
        keywords="solar blog india, solar news maharashtra, solar energy tips, jay yogeshwar solar blog"
      />
      
      <div className="page-wrap pb-20">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Our Blog"
            title="Insights into Renewable Energy"
            body="Educational content and updates about solar technology for farmers and homeowners."
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              className="group overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 shadow-[0_20px_55px_rgba(31,90,42,0.09)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(31,90,42,0.15)]"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="chip bg-green-600 text-white border-none">{post.category}</span>
                </div>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-4 text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {post.author}
                  </span>
                </div>
                
                <h2 className="mb-4 text-xl font-bold leading-tight text-slate-900 group-hover:text-green-700 transition-colors">
                  {post.title}
                </h2>
                
                <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 font-bold text-green-700 hover:gap-3 transition-all"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
