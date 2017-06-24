using JustBlog.Core.Models;
using System.Collections.Generic;
using System.Linq;

namespace JustBlog.Core
{
    public class BlogRepository : IBlogRepository
	{
		private readonly BlogDbContext _context;

		public BlogRepository(BlogDbContext context)
		{
            _context = context;
		}

        public IList<Post> Posts(int pageNo, int pageSize, string sortColumn, bool sortByAscending)
        {
            return Enumerable.Empty<Post>().ToList(); 
            //return _context.Posts.ToList();
        }

        public int AddPost(Post post)
        {
            return _context.Posts.Add(post).Id;
        }

        public int TotalPosts(bool checkIsPublished = true)
        {
            return 0;
            //return _context.Posts.Count();
        }
	}
}