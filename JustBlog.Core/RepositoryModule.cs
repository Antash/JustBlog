using Ninject.Modules;
using Ninject.Web.Common;
using System.Data.Entity;

namespace JustBlog.Core
{
    public class RepositoryModule : NinjectModule
	{
		public override void Load()
		{
            Bind<DbContext>().To<BlogDbContext>().InRequestScope();
		}
	}
}