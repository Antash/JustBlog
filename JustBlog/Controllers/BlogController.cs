using System.Web.Mvc;
using JustBlog.Core;

namespace JustBlog.Controllers
{
    public class BlogController : Controller
    {
		private readonly IBlogRepository _blogRepository;

		public BlogController(IBlogRepository blogRepository)
		{
			_blogRepository = blogRepository;
		}
    }
}
