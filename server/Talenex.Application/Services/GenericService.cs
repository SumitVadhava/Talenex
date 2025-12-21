using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;

namespace Talenex.Application.Services
{
    public class GenericService<T> : IService<T>
        where T : class, IEntity
    {
        protected readonly IRepository<T> _repository;

        public GenericService(IRepository<T> repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<T>> GetAllAsync()
            => _repository.GetAllAsync();

        public Task<T?> GetByIdAsync(Guid id)
            => _repository.GetByIdAsync(id);

        public Task<T> CreateAsync(T entity)
            => (Task<T>)_repository.AddAsync(entity);

        public Task<T> UpdateAsync(T entity)
            => _repository.UpdateAsync(entity);


        public Task<T> DeleteAsync(Guid id)
            => _repository.DeleteAsync(id);
    }
}