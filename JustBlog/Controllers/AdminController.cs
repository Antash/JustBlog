using JustBlog.Models;
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
                //TODO : validation
                if (FormsAuthentication.Authenticate(model.UserName, model.Password))
                //if (model.UserName == "admin" && model.Password == "admin")
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
    }
}