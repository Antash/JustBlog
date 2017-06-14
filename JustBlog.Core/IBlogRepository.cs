using System.Collections.Generic;
using JustBlog.Core.Objects;

namespace JustBlog.Core
{
	public interface IBlogRepository
	{
        IList<Post> Posts(int pageNo, int pageSize, string sortColumn, bool sortByAscending);
        int AddPost(Post post);
        int TotalPosts(bool checkIsPublished = true);
	}
}