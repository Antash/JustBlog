using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace SimpleBlog.Core.Models
{
	public class Category
	{
        [Key]
		public int Id { get; set; }

		public string Name { get; set; }

		public string UrlSlug { get; set; }

		public string Description { get; set; }

        [JsonIgnore]
		public IList<Post> Posts { get; set; }
	}
}
