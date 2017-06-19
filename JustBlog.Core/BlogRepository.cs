using JustBlog.Core.Models;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace JustBlog.Core
{
    public class BlogRepository : IBlogRepository
	{
		private readonly DbContext context;

		public BlogRepository(DbContext context)
		{
            this.context = context;
		}

        public IList<Post> Posts(int pageNo, int pageSize, string sortColumn, bool sortByAscending)
        {
            return Enumerable.Empty<Post>().ToList();
        }

        public int AddPost(Post post)
        {
            return 1;
        }

        public int TotalPosts(bool checkIsPublished = true)
        {
            return 0;
        }
	}
}