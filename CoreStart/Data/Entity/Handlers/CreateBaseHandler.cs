using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.Requests.Users;
using CoreStart.CrossCutting.Structure.Responses;
using FluentValidation;

namespace CoreStart.Data.Entity.Handlers
{
    public abstract class CreateBaseHandler<TModel, TDto, TRequest, TResponse>
        where TModel : class, IEntity, new()
        where TDto : class, IEntity
        where TRequest : CreateRequestModel<TDto>
        where TResponse : CreateResponse<TDto>, new()
    {
        private IRepository<TModel> _repository;
        protected IReadOnlyCollection<IValidator<TDto>> Validators;

        public CreateBaseHandler(IRepository<TModel> repository, IReadOnlyCollection<IValidator<TDto>> validators)
        {
            _repository = repository;
            Validators = validators;
        }

        public async Task<TResponse> CreateItem(TRequest request)
        {
            var createdItem = DtoToModel(new TModel(), request.NewItem);

            var validationResult = Validate(createdItem);

            if (validationResult.Any())
            {
                var failureResponse = new TResponse
                {
                    IsSuccessful = false,
                    ValidationErrors = validationResult
                };

                return await Task.FromResult(failureResponse);
            }
            else
            {
                await _repository.AddAsAsync(createdItem);
                await _repository.CommitAsync();
            }

            return new TResponse
            {
                IsSuccessful = true,
                CreatedItem = ModelToDto(createdItem)
            };
        }

        protected IDictionary<string, string[]> Validate(TModel user)
        {
            var validationResult = Validators
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

        protected abstract TDto ModelToDto(TModel model);

        protected abstract TModel DtoToModel(TModel model, TDto dto);
    }

    public abstract class CreateBaseHandler<TModel, TDto, TRequest> : CreateBaseHandler<TModel, TDto, TRequest, CreateResponse<TDto>>
        where TModel : class, IEntity, new()
        where TDto : class, IEntity
        where TRequest : CreateRequestModel<TDto>
    {
        public CreateBaseHandler(IRepository<TModel> repository, IReadOnlyCollection<IValidator<TDto>> validators)
            : base(repository, validators)
        {
        }
    }

    public abstract class CreateBaseHandler<TModel, TDto> : CreateBaseHandler<TModel, TDto, CreateRequestModel<TDto>, CreateResponse<TDto>>
        where TModel : class, IEntity, new()
        where TDto : class, IEntity
    {
        public CreateBaseHandler(IRepository<TModel> repository, IReadOnlyCollection<IValidator<TDto>> validators)
            : base(repository, validators)
        {
        }
    }
}
