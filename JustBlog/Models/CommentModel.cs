using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JustBlog.Models
{
    public class CommentModel
    {
        public int id { get; set; }
        public string author { get; set; }
        public string text { get; set; }
    }
}