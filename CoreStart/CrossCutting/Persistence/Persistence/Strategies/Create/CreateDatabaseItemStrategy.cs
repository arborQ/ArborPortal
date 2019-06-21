using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.Responses;
using CoreStart.CrossCutting.Structure.Services;
using CoreStart.CrossCutting.Structure.Strategies.Persistence;
namespace Persistence.Strategies.Create
{
    internal class CreateDatabaseItemStrategy<TModel, TContract> : ICreateItemStrategy<TModel, TContract>
         where TModel : class, IEntity, new()
    {
        private readonly IRepository<TModel> repository;
        private readonly IReadOnlyCollection<IValidator<TModel>> modelValidators;
        private readonly IMapperService<TContract, TModel> mapping;

        public CreateDatabaseItemStrategy(IRepository<TModel> repository, IReadOnlyCollection<IValidator<TModel>> modelValidators, IMapperService<TContract, TModel> mapping)
        {
            this.repository = repository;
            this.modelValidators = modelValidators;
            this.mapping = mapping;
        }

        public async Task<CreateResponse<TModel>> CreateItem(TContract model)
        {
            var createdItem = await mapping.Map(model);

            var validationResult = Validate(createdItem);

            if (validationResult.Any())
            {
                var failureResponse = new CreateResponse<TModel>
                {
                    IsSuccessful = false,
                    ValidationErrors = validationResult
                };

                return await Task.FromResult(failureResponse);
            }
            else
            {
                await repository.AddAsAsync(createdItem);
            }

            return new CreateResponse<TModel>
            {
                IsSuccessful = true,
                CreatedItem = createdItem
            };
        }

        protected virtual IDictionary<string, string[]> Validate(TModel user)
        {
            var validationResult = modelValidators
                .Select(validator => validator.Validate(user))
                .SelectMany(result => result.Errors)
                .Where(f => f != null)
                .ToList();

            return validationResult
                        .GroupBy(i => i.PropertyName)
                        .ToDictionary(
                            i => i.Key,
                            i => i.Select(v => v.ErrorMessage).ToArray()
                        );
        }
    }
}
