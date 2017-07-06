﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using JustBlog.Core;
using JustBlog.Models;

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
