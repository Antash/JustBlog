using System.Web.UI;
using JustBlog.Core;
using JustBlog.Core.Models;
using JustBlog.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace JustBlog.Controllers
{
    [Authorize]
    public class AdminController : Controller
    {
        private readonly IBlogRepository _blogRepository;
        private readonly IList<CommentModel> _comments;

        public AdminController(IBlogRepository blogRepository)
		{
			_blogRepository = blogRepository;
            _comments = new List<CommentModel>
            {
                new CommentModel
                {
                    id = 1,
                    author = "Daniel Lo Nigro",
                    text = "Hello ReactJS.NET World!"
                },
                new CommentModel
                {
                    id = 2,
                    author = "Pete Hunt",
                    text = "This is one comment"
                },
                new CommentModel
                {
                    id = 3,
                    author = "Jordan Walke",
                    text = "This is *another* comment"
                },
            };
		}

        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
            {
                if (!String.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
                    return Redirect(returnUrl);

                return RedirectToAction("Manage");
            }

            ViewBag.ReturnUrl = returnUrl;

            return View();
        }

        [HttpPost, AllowAnonymous, ValidateAntiForgeryToken]
        public ActionResult Login(LoginModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                if (FormsAuthentication.Authenticate(model.UserName, model.Password))
                {
                    FormsAuthentication.SetAuthCookie(model.UserName, false);

                    if (!String.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
                        return Redirect(returnUrl);

                    return RedirectToAction("Manage");
                }

                ModelState.AddModelError("", "The user name or password provided is incorrect.");
            }
            return View();
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();

            return RedirectToAction("Login", "Admin");
        }

        public ActionResult Manage()
        {
            return View();
        }

        [OutputCache(Location = OutputCacheLocation.None)]
        public JsonResult Comments()
        {
            return Json(_comments, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AddComment(CommentModel comment)
        {
            // Create a fake ID for this comment
            comment.id = _comments.Count + 1;
            _comments.Add(comment);
            return Content("Success :)");
        }

        public ActionResult Posts(JqInViewModel jqParams)
        {
            var posts = _blogRepository.Posts(jqParams.page - 1, jqParams.rows,
        jqParams.sidx, jqParams.sord == "asc");

            var totalPosts = _blogRepository.TotalPosts(false);

            return Json(new
            {
                page = jqParams.page,
                records = totalPosts,
                rows = posts,
                total = Math.Ceiling(Convert.ToDouble(totalPosts) / jqParams.rows)
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ContentResult AddPost(Post post)
        {
            string json;

            if (ModelState.IsValid)
            {
                var id = _blogRepository.AddPost(post);

                json = JsonConvert.SerializeObject(new
                {
                    id = id,
                    success = true,
                    message = "Post added successfully."
                });
            }
            else
            {
                json = JsonConvert.SerializeObject(new
                {
                    id = 0,
                    success = false,
                    message = "Failed to add the post."
                });
            }

            return Content(json, "application/json");
        }
    }
}