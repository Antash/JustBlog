﻿using System.Web.Mvc;
using System.Web.Routing;

namespace JustBlog
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Comments",
                url: "comments",
                defaults: new { controller = "Admin", action = "Comments" }
            );

            routes.MapRoute(
                name: "NewComment",
                url: "comments/new",
                defaults: new { controller = "Admin", action = "AddComment" }
            );

            routes.MapRoute(
                name: "DeleteComment",
                url: "comments/del",
                defaults: new { controller = "Admin", action = "DeleteComment" }
            );

            routes.MapRoute(
                name: "LikeComment",
                url: "comments/like",
                defaults: new { controller = "Admin", action = "LikeComment" }
            );

            routes.MapRoute(
                "Login",
                "Login",
                new { controller = "Admin", action = "Login" }
            );

            routes.MapRoute(
                "Logout",
                "Logout",
                new { controller = "Admin", action = "Logout" }
            );

            routes.MapRoute(
                "Manage",
                "Manage",
                new { controller = "Admin", action = "Manage" }
            );

            routes.MapRoute(
                "AdminAction",
                "Admin/{action}",
                new { controller = "Admin", action = "Login" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Blog", action = "Posts", id = UrlParameter.Optional }
            );
        }
    }
}
