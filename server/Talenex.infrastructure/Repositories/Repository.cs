using Microsoft.EntityFrameworkCore;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;
using Talenex.infrastructure.Data;

namespace Talenex.infrastructure.Repositories
{
    public class Repository<T> : IRepository<T>
        where T : class, IEntity
    {
        protected readonly AppDBContext _db;
        protected readonly DbSet<T> _table;

        public Repository(AppDBContext db)
        {
            _db = db;
            _table = _db.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _table.AsNoTracking().ToListAsync();
        }

        public async Task<T?> GetByIdAsync(Guid id)
        {
            return await _table.FindAsync(id);
        }

        public async Task<T> AddAsync(T entity)
        {
            await _table.AddAsync(entity);
            await _db.SaveChangesAsync();
            return entity;
        }
        public async Task<T> UpdateAsync(T entity)
        {
            _table.Attach(entity);
            _db.Entry(entity).State = EntityState.Modified;

            await _db.SaveChangesAsync();
            return entity;
        }
        public async Task<T?> DeleteAsync(Guid id)
        {
            var entity = await _table.FindAsync(id);
            if (entity == null)
                return null;

            _table.Remove(entity);
            await _db.SaveChangesAsync();
            return entity;
        }
    }
}
