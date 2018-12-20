using Structure.UnitOfWork;

namespace Data.Repository
{
    internal abstract class UnitOfWork<TContext> : IUnitOfWork<TContext>
    {
        protected UnitOfWork(DbContext dcx) { }

        public TContext Repositories => throw new System.NotImplementedException();

        public void Commit()
        {
            throw new System.NotImplementedException();
        }

        public void Dispose()
        {
            throw new System.NotImplementedException();
        }
    }
}
