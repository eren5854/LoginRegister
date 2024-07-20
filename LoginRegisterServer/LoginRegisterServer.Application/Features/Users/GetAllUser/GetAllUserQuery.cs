using ED.Result;
using LoginRegisterServer.Domain.Entities;
using MediatR;

namespace LoginRegisterServer.Application.Features.Users.GetAllUser;
public sealed record GetAllUserQuery() : IRequest<Result<List<AppUser>>>;
