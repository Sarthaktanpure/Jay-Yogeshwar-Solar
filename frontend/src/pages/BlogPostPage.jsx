import { useParams, Link, Navigate } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import SEO from "../components/SEO";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";

function BlogPostPage() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="section-band pt-8 sm:pt-12">
      <SEO 
        title={post.seo.title}
        description={post.seo.description}
        keywords={post.seo.keywords}
      />
      
      <div className="page-wrap pb-20">
        <Link 
          to="/blog" 
          className="mb-8 inline-flex items-center gap-2 font-medium text-slate-600 hover:text-green-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <article className="mx-auto max-w-4xl">
          <div className="mb-8">
            <span className="chip mb-4 inline-block">{post.category}</span>
            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <button className="flex items-center gap-2 hover:text-green-700 transition-colors">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>

          <div className="mb-12 overflow-hidden rounded-[2.5rem] shadow-[0_30px_90px_rgba(31,90,42,0.12)]">
            <img 
              src={post.image} 
              alt={post.title}
              className="h-full w-full object-cover max-h-[500px]"
            />
          </div>

          <div className="prose prose-slate prose-lg max-w-none">
            {/* We use dangerouslySetInnerHTML here because the blog content is trusted static data */}
            <div 
              className="blog-content space-y-6 text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </div>

          <div className="mt-16 rounded-[2rem] bg-gradient-to-br from-green-800 to-green-950 p-8 text-white sm:p-12">
            <h3 className="text-2xl font-bold mb-4">Ready to go solar?</h3>
            <p className="text-green-100 mb-8 max-w-2xl">
              Jay Yogeshwar Solar Energy System is a trusted provider of solar solutions in Maharashtra. 
              Contact us today for a free consultation and quote.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="action-primary bg-yellow-400 text-slate-900 border-none hover:bg-yellow-300">
                Contact Us
              </Link>
              <Link to="/estimator" className="px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/10 transition-colors">
                Solar Estimator
              </Link>
            </div>
          </div>
        </article>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #0f172a;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .blog-content p {
          margin-bottom: 1.25rem;
        }
        .blog-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        .blog-content strong {
          font-weight: 600;
          color: #0f172a;
        }
      `}} />
    </div>
  );
}

export default BlogPostPage;
