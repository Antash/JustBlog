using Microsoft.AspNetCore.Mvc;
using SimpleBlog.Core;

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
