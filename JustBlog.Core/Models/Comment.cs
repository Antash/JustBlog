using System.ComponentModel.DataAnnotations;

namespace JustBlog.Core.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        public string Author { get; set; }

        public string Text { get; set; }
    }
}
