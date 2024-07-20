using ED.Result;
using LoginRegisterServer.Domain.Entities;
using MediatR;

namespace LoginRegisterServer.Application.Features.Users.GetUserById;
internal sealed class GetUserByIdCommandHandler(
    IAppUserRepository appUserRepository) : IRequestHandler<GetUserByIdCommand, Result<AppUser>>
{
    public async Task<Result<AppUser>> Handle(GetUserByIdCommand request, CancellationToken cancellationToken)
    {
        AppUser? user = await appUserRepository.GetByExpressionAsync(p => p.Id == request.Id);
        if (user is null)
        {
            return Result<AppUser>.Failure("User not found");
        }

        return Result<AppUser>.Succeed(user);
    }
}
