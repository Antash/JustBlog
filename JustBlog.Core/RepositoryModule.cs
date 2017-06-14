using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using JustBlog.Core.Objects;
using NHibernate;
using NHibernate.Cache;
using NHibernate.Tool.hbm2ddl;
using Ninject;
using Ninject.Modules;
using Ninject.Web.Common;

namespace JustBlog.Core
{
	public class RepositoryModule : NinjectModule
	{
		public override void Load()
		{
            var dbconf = MySQLConfiguration.Standard;

			Bind<ISessionFactory>()
				.ToMethod
				(
					e =>
						Fluently.Configure()
                        .Database(dbconf.ConnectionString(c =>
							c.FromConnectionStringWithKey("JustBlogDbConnString")))
						.Cache(c => c.UseQueryCache().ProviderClass<HashtableCacheProvider>())
						.Mappings(m => m.FluentMappings.AddFromAssemblyOf<Post>())
						.ExposeConfiguration(cfg => new SchemaExport(cfg).Execute(true, true, false))
						.BuildConfiguration()
						.BuildSessionFactory()
				)
				.InSingletonScope();

			Bind<ISession>()
				.ToMethod((ctx) => ctx.Kernel.Get<ISessionFactory>().OpenSession())
				.InRequestScope();
		}
	}
}