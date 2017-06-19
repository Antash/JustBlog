using JustBlog.Core.Models;
using System.Collections.Generic;
using System.Linq;

namespace JustBlog.Core
{
    public class BlogRepository : IBlogRepository
	{
		private readonly BlogDbContext context;

		public BlogRepository(BlogDbContext context)
		{
            this.context = context;
		}

        public IList<Post> Posts(int pageNo, int pageSize, string sortColumn, bool sortByAscending)
        {
            return context.Posts.ToList();
        }

        public int AddPost(Post post)
        {
            return context.Posts.Add(post).Id;
        }

        public int TotalPosts(bool checkIsPublished = true)
        {
            return context.Posts.Count();
        }
	}
}