using ED.Result;
using LoginRegisterServer.Domain.Entities;
using MediatR;

namespace LoginRegisterServer.Application.Features.Users.GetUserById;
public sealed record GetUserByIdCommand(Guid Id): IRequest<Result<AppUser>>;
