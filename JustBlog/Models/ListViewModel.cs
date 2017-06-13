using JustBlog.Core;
using System.Collections.Generic;
using JustBlog.Core.Objects;

namespace JustBlog.Models
{
	public class ListViewModel
	{
		public ListViewModel(IBlogRepository _blogRepository, int p)
		{
			Posts = _blogRepository.Posts(p - 1, 10);
			TotalPosts = _blogRepository.TotalPosts();
		}

		public IList<Post> Posts { get; private set; }
		public int TotalPosts { get; private set; }
	}
}